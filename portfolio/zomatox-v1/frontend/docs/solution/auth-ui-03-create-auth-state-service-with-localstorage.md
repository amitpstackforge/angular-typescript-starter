# AUTH-UI-03 - Create Auth State Service With localStorage

## Goal
Create a dedicated auth state service that stores and reads JWT session data from `localStorage`.

## Step-by-Step (Beginner Friendly)

1. Create a new file: `src/app/core/auth.service.ts`.
2. Add `@Injectable({ providedIn: 'root' })` so Angular can inject it anywhere.
3. Import `TokenPairResponse` and `AuthUserProfile` from `src/app/core/models.ts`.
4. Add localStorage keys:
   - `zomatox.accessToken`
   - `zomatox.refreshToken`
   - `zomatox.currentUser`
5. Add `setSession(session: TokenPairResponse)`:
   - Save `session.accessToken`
   - Save `session.refreshToken`
   - Save `JSON.stringify(session.user)`
6. Add `clearSession()`:
   - Remove all three keys from localStorage.
7. Add getter `accessToken`:
   - Return `string | null` from localStorage.
8. Add getter `refreshToken`:
   - Return `string | null` from localStorage.
9. Add getter `currentUser`:
   - Read `zomatox.currentUser`.
   - Parse JSON in `try/catch`.
   - Return `null` if JSON is missing/invalid.
10. Add `isLoggedIn()`:
   - Return `true` only when access token, refresh token, and parsed user all exist.
11. Run compile check (`npx ng build`) to ensure there are no TypeScript errors.

## Implemented API

```ts
setSession(TokenPairResponse)
clearSession()
get accessToken()
get refreshToken()
get currentUser()
isLoggedIn()
```

## Notes
- `currentUser` parsing is safe and returns `null` on malformed JSON.
- Service is framework-native Angular DI and ready for later auth integration.
