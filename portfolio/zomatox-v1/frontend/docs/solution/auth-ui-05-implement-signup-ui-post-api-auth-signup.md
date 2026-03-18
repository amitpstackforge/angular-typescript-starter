# AUTH-UI-05 - Implement Signup UI (POST /api/auth/signup)

## Goal
Build a beginner-friendly signup screen that:
- calls `POST /api/auth/signup`
- stores access/refresh token + user using `AuthService.setSession(...)`
- redirects to `/restaurants` on success
- shows backend validation/business errors clearly

## Files You Will Touch
1. `src/app/features/auth/signup.component.ts`
2. `src/app/features/auth/signup.component.html`
3. `src/app/core/api.service.ts`
4. `src/app/app.routes.ts`

## Part A: `signup.component.ts` (Step by Step)

### Step 1: Add imports
You need Angular form/router imports, plus your API/Auth services and signup model.

```ts
import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ApiService } from "../../core/api.service";
import { AuthService } from "../../core/auth.service";
import { SignupRequest } from "../../core/models";
```

### Step 2: Create standalone component
Use standalone component so no NgModule changes are needed.

```ts
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./signup.component.html",
})
export class SignupComponent {}
```

### Step 3: Add injected services + UI state
Use signals for `loading`, `errorMessage`, and backend `validationErrors`.

```ts
private fb = inject(FormBuilder);
private api = inject(ApiService);
private auth = inject(AuthService);
private router = inject(Router);

loading = signal(false);
errorMessage = signal<string | null>(null);
validationErrors = signal<Record<string, string>>({});
```

### Step 4: Build reactive form
Create form with `name`, `email`, `password` and validators.

```ts
form = this.fb.nonNullable.group({
  name: ["", Validators.required],
  email: ["", [Validators.required, Validators.email]],
  password: ["", Validators.required],
});
```

### Step 5: Add submit flow
1. clear old errors  
2. stop if form invalid  
3. call signup API  
4. on success save session + navigate  
5. on error show API message + field errors

```ts
submit(): void {
  if (this.loading()) {
    return;
  }

  this.errorMessage.set(null);
  this.validationErrors.set({});

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const payload: SignupRequest = this.form.getRawValue();
  this.loading.set(true);

  this.api.signup(payload).subscribe({
    next: (session) => {
      this.auth.setSession(session);
      this.router.navigate(["/restaurants"]);
    },
    error: (error) => {
      const message = typeof error?.error?.message === "string"
        ? error.error.message
        : "Signup failed";
      this.errorMessage.set(message);
      this.validationErrors.set(
        this.normalizeValidationErrors(error?.error?.validationErrors),
      );
      this.loading.set(false);
    },
    complete: () => this.loading.set(false),
  });
}
```

### Step 6: Add helper methods
Use one helper for client-side invalid checks and one for backend field error mapping.

```ts
isTouchedAndInvalid(field: "name" | "email" | "password"): boolean {
  const control = this.form.controls[field];
  return control.touched && control.invalid;
}

backendErrorFor(field: "name" | "email" | "password"): string | null {
  return this.validationErrors()[field] ?? null;
}

private normalizeValidationErrors(value: unknown): Record<string, string> {
  if (typeof value !== "object" || value === null) {
    return {};
  }

  const normalized: Record<string, string> = {};
  for (const [field, message] of Object.entries(value as Record<string, unknown>)) {
    if (typeof message === "string") {
      normalized[field] = message;
    }
  }

  return normalized;
}
```

### Full `signup.component.ts`

```ts
import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ApiService } from "../../core/api.service";
import { AuthService } from "../../core/auth.service";
import { SignupRequest } from "../../core/models";

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./signup.component.html",
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  errorMessage = signal<string | null>(null);
  validationErrors = signal<Record<string, string>>({});

  form = this.fb.nonNullable.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  submit(): void {
    if (this.loading()) {
      return;
    }

    this.errorMessage.set(null);
    this.validationErrors.set({});

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: SignupRequest = this.form.getRawValue();
    this.loading.set(true);

    this.api.signup(payload).subscribe({
      next: (session) => {
        this.auth.setSession(session);
        this.router.navigate(["/restaurants"]);
      },
      error: (error) => {
        const message = typeof error?.error?.message === "string"
          ? error.error.message
          : "Signup failed";
        this.errorMessage.set(message);
        this.validationErrors.set(
          this.normalizeValidationErrors(error?.error?.validationErrors),
        );
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  isTouchedAndInvalid(field: "name" | "email" | "password"): boolean {
    const control = this.form.controls[field];
    return control.touched && control.invalid;
  }

  backendErrorFor(field: "name" | "email" | "password"): string | null {
    return this.validationErrors()[field] ?? null;
  }

  private normalizeValidationErrors(value: unknown): Record<string, string> {
    if (typeof value !== "object" || value === null) {
      return {};
    }

    const normalized: Record<string, string> = {};
    for (const [field, message] of Object.entries(value as Record<string, unknown>)) {
      if (typeof message === "string") {
        normalized[field] = message;
      }
    }

    return normalized;
  }
}
```

## Part B: `signup.component.html` (Step by Step)

### Step 1: Create form container
Add title, subtitle, and form wrapper.

### Step 2: Add 3 fields
Inputs for `name`, `email`, `password` with `formControlName`.

### Step 3: Add client validation messages
Show required/email messages when touched + invalid.

### Step 4: Add backend field errors
Render `backendErrorFor('field')` below each input.

### Step 5: Add global error + submit button
Show API message and disable button while loading.

### Full `signup.component.html`

```html
<section class="mx-auto max-w-md">
  <h1 class="mb-2 text-2xl font-bold">Create your account</h1>
  <p class="mb-6 text-sm text-slate-600">
    Sign up to place orders and track your deliveries.
  </p>

  <form
    [formGroup]="form"
    (ngSubmit)="submit()"
    class="space-y-4 rounded-xl border bg-white p-5 shadow-sm"
    novalidate
  >
    <div>
      <label for="name" class="mb-1 block text-sm font-medium">Name</label>
      <input
        id="name"
        type="text"
        formControlName="name"
        class="w-full rounded border px-3 py-2"
        placeholder="Your full name"
      />
      <p
        *ngIf="isTouchedAndInvalid('name') && form.controls.name.hasError('required')"
        class="mt-1 text-xs text-red-600"
      >
        Name is required.
      </p>
      <p *ngIf="backendErrorFor('name')" class="mt-1 text-xs text-red-600">
        {{ backendErrorFor("name") }}
      </p>
    </div>

    <div>
      <label for="email" class="mb-1 block text-sm font-medium">Email</label>
      <input
        id="email"
        type="email"
        formControlName="email"
        class="w-full rounded border px-3 py-2"
        placeholder="you@example.com"
      />
      <p
        *ngIf="isTouchedAndInvalid('email') && form.controls.email.hasError('required')"
        class="mt-1 text-xs text-red-600"
      >
        Email is required.
      </p>
      <p
        *ngIf="isTouchedAndInvalid('email') && form.controls.email.hasError('email')"
        class="mt-1 text-xs text-red-600"
      >
        Enter a valid email address.
      </p>
      <p *ngIf="backendErrorFor('email')" class="mt-1 text-xs text-red-600">
        {{ backendErrorFor("email") }}
      </p>
    </div>

    <div>
      <label for="password" class="mb-1 block text-sm font-medium">Password</label>
      <input
        id="password"
        type="password"
        formControlName="password"
        class="w-full rounded border px-3 py-2"
        placeholder="Create a password"
      />
      <p
        *ngIf="isTouchedAndInvalid('password') && form.controls.password.hasError('required')"
        class="mt-1 text-xs text-red-600"
      >
        Password is required.
      </p>
      <p *ngIf="backendErrorFor('password')" class="mt-1 text-xs text-red-600">
        {{ backendErrorFor("password") }}
      </p>
    </div>

    <div *ngIf="errorMessage()" class="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {{ errorMessage() }}
    </div>

    <button
      type="submit"
      [disabled]="loading()"
      class="w-full rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {{ loading() ? "Creating account..." : "Sign up" }}
    </button>

    <a routerLink="/restaurants" class="block text-center text-sm text-slate-600 hover:underline">
      Back to restaurants
    </a>
  </form>
</section>
```

## Route and API Wiring

1. In `src/app/core/api.service.ts`, ensure:
```ts
signup(payload: SignupRequest) {
  return this.http.post<TokenPairResponse>(`${API}/auth/signup`, payload);
}
```

2. In `src/app/app.routes.ts`, add:
```ts
{ path: 'signup', component: SignupComponent }
```

## Quick Manual Test

1. Open `/signup`.
2. Submit empty form -> required field messages should appear.
3. Submit invalid email -> email validator message should appear.
4. Submit duplicate email -> backend message `Email already exists` should appear.
5. Submit valid data -> session should be saved and app should redirect to `/restaurants`.
