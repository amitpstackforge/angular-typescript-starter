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
