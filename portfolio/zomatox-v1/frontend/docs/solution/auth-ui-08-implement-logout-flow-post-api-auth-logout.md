# AUTH-UI-08 - Implement Logout Flow (`POST /api/auth/logout`)

## Goal
Add a logout action that revokes the refresh token (when available), clears local session state, and redirects user to `/login`.

## Step-by-Step (Beginner Friendly, with Code)

### 1) Update `AppComponent` imports
In `src/app/app.component.ts`, add `signal`, `Router`, and auth/api services:

```ts
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from './core/api.service';
import { AuthService } from './core/auth.service';
```

### 2) Inject services and add loading state
Inside `AppComponent`:

```ts
private api = inject(ApiService);
readonly auth = inject(AuthService);
private router = inject(Router);

logoutLoading = signal(false);
```

### 3) Add Logout button visible only when logged in
In template header actions:

```html
<button
  *ngIf="auth.isLoggedIn()"
  type="button"
  class="text-sm border rounded px-3 py-1 disabled:opacity-60 disabled:cursor-not-allowed"
  [disabled]="logoutLoading()"
  (click)="logout()"
>
  {{ logoutLoading() ? 'Logging out...' : 'Logout' }}
</button>
```

### 4) Add `logout()` method
Call backend logout when refresh token exists; otherwise directly clear local session and redirect:

```ts
logout() {
  if (this.logoutLoading()) {
    return;
  }

  const refreshToken = this.auth.refreshToken;
  if (!refreshToken) {
    this.finalizeLogout();
    return;
  }

  this.logoutLoading.set(true);
  this.api.logout({ refreshToken }).subscribe({
    next: () => this.finalizeLogout(),
    error: () => this.finalizeLogout(),
  });
}
```

### 5) Add shared cleanup method
This satisfies clearing session in both success and error cases:

```ts
private finalizeLogout() {
  this.auth.clearSession();
  this.logoutLoading.set(false);
  void this.router.navigate(['/login']);
}
```

## Behavior Rules Mapping

- Backend logout idempotent:
  - still call `POST /api/auth/logout` when token exists.
- Refresh token missing locally:
  - skip API call, still clear session, route to `/login`.
- Clear session on both success and error:
  - both subscribe handlers call `finalizeLogout()`.

## Compile Check

```bash
npx ng build
```

## Manual Verification

1. Login/signup and confirm localStorage contains tokens.
2. Click `Logout` and verify:
   - request sent to `POST /api/auth/logout`
   - localStorage auth keys are removed
   - app navigates to `/login`
3. Set `zomatox.refreshToken` to empty/missing and click `Logout`:
   - no API call required
   - localStorage still cleared
   - app still navigates to `/login`

## Acceptance Mapping

- User can log out cleanly from UI:
  - logout button visible when logged in; click executes flow.
- Tokens and user removed from localStorage:
  - `AuthService.clearSession()` always runs in logout completion path.
