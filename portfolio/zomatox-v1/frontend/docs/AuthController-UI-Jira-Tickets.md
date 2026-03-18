# AuthController UI Implementation - Phased Jira Tickets (Beginner Friendly)

Source API contract: `docs/AuthController.md`

## Phase Plan (recommended order)
- Phase 1: Foundation (types, API methods, auth state, interceptor wiring)
- Phase 2: Public Auth Screens (`/signup`, `/login`)
- Phase 3: Session Management (`/refresh`, `/logout`)
- Phase 4: Protected User Flow (`/me`, guards, header/nav cleanup)
- Phase 5: QA and regression checklist

## Endpoint to Ticket Mapping
- `POST /api/auth/signup` -> `AUTH-UI-05`
- `POST /api/auth/login` -> `AUTH-UI-06`
- `POST /api/auth/refresh` -> `AUTH-UI-07`
- `POST /api/auth/logout` -> `AUTH-UI-08`
- `GET /api/auth/me` -> `AUTH-UI-09`

---

## Phase 1 - Foundation

### AUTH-UI-01 - Add auth models from API contract
- Type: Task
- Summary: Add TypeScript models for auth requests/responses and error envelope.
- Why: All later tickets depend on consistent typing.
- Changes required:
  - Update `src/app/core/models.ts`
  - Add:
    - `AuthRole = 'CUSTOMER' | 'OWNER' | 'DELIVERY_PARTNER' | 'ADMIN'`
    - `AuthUserProfile`
    - `TokenPairResponse`
    - `AuthErrorEnvelope`
    - DTOs: `SignupRequest`, `LoginRequest`, `RefreshRequest`, `LogoutRequest`
- Beginner steps:
  1. Open `models.ts` and add types near the bottom.
  2. Keep field names exactly same as backend JSON.
  3. Export all new types.
- Acceptance criteria:
  - Project compiles with new exported auth types.
  - No field name mismatch with `docs/AuthController.md`.

### AUTH-UI-02 - Add Auth API methods in ApiService
- Type: Story
- Summary: Add typed methods for signup/login/refresh/logout/me.
- Why: UI components should not call HttpClient directly.
- Changes required:
  - Update `src/app/core/api.service.ts`
  - Add methods:
    - `signup(payload: SignupRequest)` -> `POST /api/auth/signup`
    - `login(payload: LoginRequest)` -> `POST /api/auth/login`
    - `refresh(payload: RefreshRequest)` -> `POST /api/auth/refresh`
    - `logout(payload: LogoutRequest)` -> `POST /api/auth/logout`
    - `me()` -> `GET /api/auth/me`
- Beginner steps:
  1. Import new auth models from `models.ts`.
  2. Return typed observables (`TokenPairResponse`, `AuthUserProfile`, `void`).
  3. Keep existing non-auth APIs unchanged.
- Acceptance criteria:
  - All 5 auth methods exist and are typed.
  - Existing pages still compile.

### AUTH-UI-03 - Create Auth state service with localStorage
- Type: Story
- Summary: Add a dedicated service to store access token, refresh token, and current user.
- Why: Current `UserContextService` is demo-based (`X-User-Id`) and not JWT-based.
- Changes required:
  - Create `src/app/core/auth.service.ts`
  - Suggested API:
    - `setSession(TokenPairResponse)`
    - `clearSession()`
    - `get accessToken()`
    - `get refreshToken()`
    - `get currentUser()`
    - `isLoggedIn()`
  - Storage keys example:
    - `zomatox.accessToken`
    - `zomatox.refreshToken`
    - `zomatox.currentUser`
- Beginner steps:
  1. Start with plain service + getters/setters.
  2. Parse user JSON safely.
  3. Add helper boolean `isLoggedIn`.
- Acceptance criteria:
  - Login session can be persisted and cleared from localStorage.
  - Service has no compile warnings.

### AUTH-UI-04 - Replace header interceptor strategy
- Type: Story
- Summary: Stop sending `X-User-Id` and send bearer token from AuthService.
- Why: `/api/auth/me` and protected endpoints require `Authorization: Bearer <token>`.
- Changes required:
  - Update `src/app/core/api.service.ts` (or split interceptor to new file)
  - Update `src/main.ts` if interceptor symbol changes
  - Remove dependency on `UserContextService` from interceptor
  - Add `Authorization` header only when access token exists
- Beginner steps:
  1. Inject `AuthService` in interceptor.
  2. If token exists, clone request with `Authorization` header.
  3. Keep requests without token untouched.
- Acceptance criteria:
  - No outgoing request contains `X-User-Id`.
  - Authenticated requests include bearer token when logged in.

---

## Phase 2 - Public Auth Screens

### AUTH-UI-05 - Implement Signup UI (`POST /api/auth/signup`)
- Type: Story
- Summary: Build signup page/form and store token pair on success.
- Endpoint: `POST /api/auth/signup`
- Changes required:
  - Create `src/app/features/auth/signup.component.ts`
  - Optionally create `src/app/features/auth/signup.component.html`
  - Update `src/app/app.routes.ts` with route `/signup`
  - Use `ApiService.signup(...)`
  - On success call `AuthService.setSession(...)` and redirect to `/restaurants`
  - Show validation + business errors from API envelope:
    - `Validation failed`
    - `Email already exists`
- Beginner steps:
  1. Build reactive form: `name`, `email`, `password`.
  2. Add required and email validators.
  3. Submit -> call API -> handle loading, success, error states.
- Acceptance criteria:
  - Valid signup logs user in (session saved).
  - Duplicate email shows backend message.
  - Validation errors are shown near fields.

### AUTH-UI-06 - Implement Login UI (`POST /api/auth/login`)
- Type: Story
- Summary: Build login page/form and store token pair on success.
- Endpoint: `POST /api/auth/login`
- Changes required:
  - Create `src/app/features/auth/login.component.ts`
  - Optionally create `src/app/features/auth/login.component.html`
  - Update `src/app/app.routes.ts` with route `/login`
  - Use `ApiService.login(...)`
  - On success call `AuthService.setSession(...)` and redirect to role-appropriate page
- Error handling required:
  - `401 Invalid credentials`
  - `403 User is inactive`
  - `400 Validation failed`
- Beginner steps:
  1. Build reactive form: `email`, `password`.
  2. Map API error `message` to a user-readable alert text.
  3. Add a link from login to signup page.
- Acceptance criteria:
  - Valid login stores tokens and user.
  - Invalid credentials and inactive-user states are shown correctly.

---

## Phase 3 - Session Management

### AUTH-UI-07 - Implement refresh token flow (`POST /api/auth/refresh`)
- Type: Story
- Summary: Automatically refresh access token on `401 Unauthorized` and retry once.
- Endpoint: `POST /api/auth/refresh`
- Changes required:
  - Add/extend HTTP interceptor (new file recommended: `src/app/core/auth.interceptor.ts`)
  - Call `ApiService.refresh({ refreshToken })` or HttpClient directly from interceptor helper
  - Update `src/main.ts` interceptor registration order
  - Update `AuthService` to replace both tokens after refresh success
- Behavior rules:
  - Retry original request only once after successful refresh.
  - If refresh fails (`Invalid refresh token` or expired/revoked), clear session and route to `/login`.
- Beginner steps:
  1. Guard against infinite retry loops (use request context/flag).
  2. Skip refresh for `/api/auth/login` and `/api/auth/signup` calls.
  3. Test by manually invalidating access token.
- Acceptance criteria:
  - Expired access token recovers automatically when refresh token is valid.
  - Session is cleared when refresh fails.

### AUTH-UI-08 - Implement logout flow (`POST /api/auth/logout`)
- Type: Story
- Summary: Add logout action that revokes refresh token and clears local session.
- Endpoint: `POST /api/auth/logout`
- Changes required:
  - Update `src/app/app.component.ts` (add Logout button)
  - Use `ApiService.logout({ refreshToken })`
  - Call `AuthService.clearSession()` in both success and error cases
  - Navigate to `/login` after logout
- Behavior rules:
  - Backend logout is idempotent; unknown token still returns `200`.
  - If local refresh token missing, still clear session and route to login.
- Beginner steps:
  1. Add logout button visible only when logged in.
  2. Add method in component to call API and finalize cleanup.
  3. Disable button while request is running.
- Acceptance criteria:
  - User can log out cleanly from UI.
  - Tokens and user are removed from localStorage.

---

## Phase 4 - Protected User Flow and Authorization

### AUTH-UI-09 - Fetch current user on app load (`GET /api/auth/me`)
- Type: Story
- Summary: Bootstrap user profile from backend if token exists.
- Endpoint: `GET /api/auth/me`
- Changes required:
  - Update `src/app/app.component.ts` (or create startup init service)
  - On app start, if access token exists, call `ApiService.me()`.
  - Sync response into `AuthService` current user.
  - If `401 Unauthorized` or `User not found`, clear session and redirect to `/login`.
- Beginner steps:
  1. Add init method called from constructor/ngOnInit.
  2. Show simple loading state while validating session.
  3. Handle failure by clearing stale data.
- Acceptance criteria:
  - Page refresh keeps user logged in when token is valid.
  - Invalid token sends user to login.

### AUTH-UI-10 - Replace demo role guards with auth-aware guards
- Type: Story
- Summary: Refactor route guards to use logged-in user role from AuthService.
- Changes required:
  - Update `src/app/core/role.guard.ts`
  - (Optional) create `src/app/core/auth.guard.ts` for generic logged-in check
  - Update `src/app/app.routes.ts`:
    - Protect business routes (`/cart`, `/checkout`, `/orders`, owner, delivery)
    - Keep `/login` and `/signup` public
- Beginner steps:
  1. Replace reads from `UserContextService` with `AuthService.currentUser`.
  2. Redirect unauthenticated users to `/login`.
  3. Redirect wrong-role users to safe page (`/restaurants`).
- Acceptance criteria:
  - Owner and delivery routes are blocked for unauthorized roles.
  - Logged-out users cannot access protected pages.

### AUTH-UI-11 - Remove demo user switcher and update header/nav
- Type: Task
- Summary: Clean app shell for real authentication.
- Changes required:
  - Update `src/app/app.component.ts`
  - Remove dropdown created from `UserContextService.users`
  - Show auth-aware nav:
    - Logged out: `Login`, `Signup`
    - Logged in: app links + `Logout` + user role/name badge
- Beginner steps:
  1. Remove `switchUser` code path.
  2. Show links conditionally using `AuthService.isLoggedIn()`.
  3. Keep cart count logic unchanged.
- Acceptance criteria:
  - No demo user selector remains.
  - Header reflects real auth state.

---

## Phase 5 - QA and Documentation

### AUTH-UI-12 - Manual test checklist for AuthController integration
- Type: Task
- Summary: Validate all success and error flows from `AuthController.md` in UI.
- Changes required:
  - Update `MANUAL_TESTING.md` with new auth test cases
  - Add test cases for:
    - Signup success + duplicate email + validation errors
    - Login success + invalid credentials + inactive user
    - Refresh success + invalid token + expired/revoked token
    - Logout success (including idempotent unknown token)
    - `/me` unauthorized and success
- Beginner steps:
  1. Add section: "Auth flows".
  2. Write preconditions + exact user actions + expected results.
  3. Include localStorage validation checks.
- Acceptance criteria:
  - Tester can run auth scenarios without reading backend code.
  - All endpoint error messages are mapped in test docs.

---

## Suggested Jira Epic/Labels
- Epic: `AUTH-UI-INTEGRATION`
- Labels: `frontend`, `angular`, `auth`, `beginner-friendly`, `api-contract`

## Definition of Done (applies to all tickets)
- Code compiles with `ng serve`.
- No route dead-ends after login/logout.
- Error states show backend `message` and field-level `validationErrors` where available.
- Existing non-auth features continue to work.
