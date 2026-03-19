# AUTH-UI-07 - Implement Refresh Token Flow (`POST /api/auth/refresh`)

## Goal
Automatically recover from expired access tokens by refreshing once on `401` and retrying the failed request.

## Step-by-Step (Beginner Friendly, with Code)

### 1) Create a dedicated auth interceptor file
Create `src/app/core/auth.interceptor.ts` and add imports + constants first:

```ts
import {
  HttpBackend,
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import {
  catchError,
  finalize,
  Observable,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from "rxjs";
import { AuthService } from "./auth.service";
import { TokenPairResponse } from "./models";

const API = "http://localhost:8080/api";
const SKIP_REFRESH_PATHS = ["/api/auth/login", "/api/auth/signup", "/api/auth/refresh"];

const REFRESH_RETRY_ATTEMPTED = new HttpContextToken<boolean>(() => false);
const SKIP_AUTH_HEADER = new HttpContextToken<boolean>(() => false);

let refreshInFlight$: Observable<TokenPairResponse> | null = null;
```

### 2) Add the bearer-token header interceptor
This keeps existing auth header behavior in one place:

```ts
export const authHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_AUTH_HEADER)) {
    return next(req);
  }

  const auth = inject(AuthService);
  const token = auth.accessToken;

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
```

### 3) Add the `401` refresh + retry interceptor
This is the main flow: detect `401`, refresh token, retry once:

```ts
export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const rawHttp = new HttpClient(inject(HttpBackend));

  return next(req).pipe(
    catchError((error: unknown) => {
      if (!shouldRefresh(req, error)) {
        return throwError(() => error);
      }

      const refreshToken = auth.refreshToken;
      if (!refreshToken) {
        clearSessionAndRouteToLogin(auth, router);
        return throwError(() => error);
      }

      return refreshSession(rawHttp, auth, refreshToken).pipe(
        catchError((refreshError) => {
          clearSessionAndRouteToLogin(auth, router);
          return throwError(() => refreshError);
        }),
        switchMap(() =>
          next(
            req.clone({
              context: req.context.set(REFRESH_RETRY_ATTEMPTED, true),
            }),
          ),
        ),
      );
    }),
  );
};
```

### 4) Guard against infinite loops and skip auth endpoints
Only refresh when:
- error is `401`
- request has not already been retried
- request is API request
- request is not login/signup/refresh

```ts
function shouldRefresh(
  req: HttpRequest<unknown>,
  error: unknown,
): error is HttpErrorResponse {
  if (!(error instanceof HttpErrorResponse)) {
    return false;
  }

  if (error.status !== 401) {
    return false;
  }

  if (req.context.get(REFRESH_RETRY_ATTEMPTED)) {
    return false;
  }

  if (!req.url.includes("/api/")) {
    return false;
  }

  return !SKIP_REFRESH_PATHS.some((path) => req.url.includes(path));
}
```

### 5) Call `/api/auth/refresh` and update session on success
Use `HttpClient` from `HttpBackend` so refresh call bypasses interceptors and avoids recursion:

```ts
function refreshSession(
  rawHttp: HttpClient,
  auth: AuthService,
  refreshToken: string,
): Observable<TokenPairResponse> {
  if (!refreshInFlight$) {
    refreshInFlight$ = rawHttp
      .post<TokenPairResponse>(`${API}/auth/refresh`, { refreshToken }, {
        context: new HttpContext()
          .set(SKIP_AUTH_HEADER, true)
          .set(REFRESH_RETRY_ATTEMPTED, true),
      })
      .pipe(
        tap((session) => {
          auth.replaceTokens(session.accessToken, session.refreshToken);
          auth.setCurrentUser(session.user);
        }),
        finalize(() => {
          refreshInFlight$ = null;
        }),
        shareReplay(1),
      );
  }

  return refreshInFlight$;
}
```

### 6) On refresh failure, clear session and route to login

```ts
function clearSessionAndRouteToLogin(auth: AuthService, router: Router): void {
  auth.clearSession();
  void router.navigate(["/login"]);
}
```

### 7) Update `AuthService` so refresh can replace both tokens
In `src/app/core/auth.service.ts`, add/update methods:

```ts
setSession(session: TokenPairResponse): void {
  this.replaceTokens(session.accessToken, session.refreshToken);
  this.setCurrentUser(session.user);
}

replaceTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(this.accessTokenKey, accessToken);
  localStorage.setItem(this.refreshTokenKey, refreshToken);
}

setCurrentUser(user: AuthUserProfile): void {
  localStorage.setItem(this.currentUserKey, JSON.stringify(user));
}

clearSession(): void {
  localStorage.removeItem(this.accessTokenKey);
  localStorage.removeItem(this.refreshTokenKey);
  localStorage.removeItem(this.currentUserKey);
}
```

### 8) Register interceptors in `main.ts` in correct order
Refresh interceptor should run before auth header interceptor:

```ts
import {
  authHeadersInterceptor,
  refreshTokenInterceptor,
} from './app/core/auth.interceptor';

provideHttpClient(
  withInterceptors([refreshTokenInterceptor, authHeadersInterceptor]),
),
```

### 9) Remove old inline interceptor from `ApiService`
Keep `ApiService` focused on endpoint methods only; interceptor logic is now in `auth.interceptor.ts`.

## Compile Check

```bash
npx ng build
```

## Manual Verification

1. Login/signup and confirm localStorage has:
   - `zomatox.accessToken`
   - `zomatox.refreshToken`
   - `zomatox.currentUser`
2. Manually set an invalid access token in localStorage.
3. Trigger a protected API call.
4. Confirm:
   - interceptor calls `/api/auth/refresh`
   - original request retries once
   - request succeeds with new token
5. Manually set an invalid refresh token.
6. Trigger protected API call again.
7. Confirm:
   - refresh fails with `401`
   - session keys are cleared
   - app navigates to `/login`

## Acceptance Mapping

- Expired access token recovers automatically:
  - `401` triggers refresh, then original request retries once.
- Session is cleared when refresh fails:
  - refresh failure path clears local state and navigates to `/login`.
