# AUTH-UI-09 - Fetch Current User On App Load (GET /api/auth/me)

## Summary

Bootstrap the user profile from the backend when an access token exists. If the token is invalid (401 or user not found), clear the stale session and route to `/login`.

## Update Path

`GET /api/auth/me`

## Why This Change

Without a `/me` check on app start, a page refresh can lose the in-memory user profile even when a valid token exists. This change restores the user profile and keeps the session consistent across reloads.

## Files Updated

1. `src/app/app.component.ts`
2. `src/app/core/api.service.ts`

## Step-By-Step Changes (Beginner Friendly)

### 1) Add a simple loading state and session bootstrap in AppComponent

File: `src/app/app.component.ts`

Where to change (line numbers from the current file):

1. Template loading UI and guarded outlet:
   - Add the loading block around lines `53-60`.
   - Keep the `router-outlet` hidden while `authLoading()` is true.

2. State and init call:
   - Add `authLoading = signal(false);` at line `73`.
   - Call `this.initAuth();` in the constructor at line `85`.

3. Init and failure handlers:
   - Add `initAuth()` and `handleInvalidSession()` methods at lines `127-149`.

Code to paste (exact blocks):

```ts
// In the template
<div
  *ngIf="authLoading()"
  class="rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
>
  Checking session...
</div>
<router-outlet *ngIf="!authLoading()"></router-outlet>
```

```ts
// Class fields
authLoading = signal(false);
```

```ts
// Constructor
this.initAuth();
```

```ts
private initAuth() {
  if (!this.auth.accessToken) {
    return;
  }

  this.authLoading.set(true);
  this.api.me().subscribe({
    next: (user) => {
      if (!user || typeof user.id !== 'number') {
        this.handleInvalidSession();
        return;
      }
      this.auth.setCurrentUser(user);
      this.authLoading.set(false);
    },
    error: () => this.handleInvalidSession(),
  });
}

private handleInvalidSession() {
  this.auth.clearSession();
  this.authLoading.set(false);
  void this.router.navigate(['/login']);
}
```

Why we add it:
- `authLoading` prevents the UI from showing protected pages until the session is validated.
- `initAuth()` fetches `/api/auth/me` when a token exists and restores the user profile.
- `handleInvalidSession()` clears stale data and redirects if the token is invalid.

### 2) Type the `/me` API response

File: `src/app/core/api.service.ts`

Where to change (line numbers from the current file):

1. Import `AuthUserProfile` at line `5`.
2. Update `me()` at lines `131-132`.

Code to paste:

```ts
import {
  Address,
  AuthUserProfile,
  Cart,
  // ...
} from "./models";
```

```ts
me() {
  return this.http.get<AuthUserProfile>(`${API}/auth/me`);
}
```

Why we add it:
- Ensures the `/me` response is typed and matches the user profile shape expected by `AuthService`.

### 3) Show customer name in the navigation bar

File: (your navigation bar component template)

Use the `/api/auth/me` response stored in `AuthService` to render the customer name in the nav bar. Bind to the current user profile and show a safe fallback when the user is not loaded yet.

Example binding (adjust field names to match your `AuthUserProfile`):

```html
<span class="nav-user-name">
  {{ auth.currentUser?.name || (auth.currentUser?.firstName + ' ' + auth.currentUser?.lastName) || 'Guest' }}
</span>
```

Why we add it:
- Displays the logged-in customer name using the same profile restored from `/api/auth/me`.

## Acceptance Criteria

1. Page refresh keeps user logged in when token is valid.
2. Invalid token sends user to `/login` and clears session data.

## Manual Test Checklist

1. Log in to create tokens in Local Storage.
2. Refresh the page.
3. Verify `/api/auth/me` is called and the user stays logged in.
4. Set `zomatox.accessToken` to an invalid value and refresh.
5. Verify redirect to `/login` and Local Storage is cleared.
