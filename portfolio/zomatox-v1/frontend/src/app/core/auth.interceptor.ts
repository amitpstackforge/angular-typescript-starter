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

export const authHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_AUTH_HEADER)) {
    return next(req);
  }

  const auth = inject(AuthService);
  const token = auth.accessToken;

  if (!token) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(cloned);
};

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
        switchMap(() => {
          const retriedRequest = req.clone({
            context: req.context.set(REFRESH_RETRY_ATTEMPTED, true),
          });
          return next(retriedRequest);
        }),
      );
    }),
  );
};

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

function clearSessionAndRouteToLogin(auth: AuthService, router: Router): void {
  auth.clearSession();
  void router.navigate(["/login"]);
}
