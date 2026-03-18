# AUTH-UI-04 - Replace Header Interceptor Strategy

## Goal
Stop sending `X-User-Id` and send `Authorization: Bearer <token>` using `AuthService`.

## Step-by-Step (Beginner Friendly)

1. Open `src/app/core/api.service.ts`.
2. Replace `UserContextService` import with `AuthService`.
3. In `apiHeadersInterceptor`, inject `AuthService`.
4. Read token from `auth.accessToken`.
5. If token does not exist:
   - return `next(req)` (do not change request).
6. If token exists:
   - clone request and set header:
   - `Authorization: Bearer ${token}`
7. Remove any `X-User-Id` header logic from interceptor.
8. Check `src/main.ts`:
   - no change needed if interceptor export name is still `apiHeadersInterceptor`.
9. Run compile check: `npx ng build`.
10. Optional verify:
   - search source for `X-User-Id` and confirm no matches.

## Acceptance Mapping
- No outgoing request contains `X-User-Id`:
  - interceptor no longer sets this header.
- Authenticated requests include bearer token:
  - interceptor adds `Authorization` only when `accessToken` exists.
