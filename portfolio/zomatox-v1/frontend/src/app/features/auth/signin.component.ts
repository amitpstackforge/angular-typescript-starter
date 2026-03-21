import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ApiService } from "../../core/api.service";
import { AuthService } from "../../core/auth.service";
import { AuthErrorEnvelope, LoginRequest, TokenPairResponse } from "../../core/models";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: "./signin.component.html",
})
export class SignInComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);

  backendErrors: Record<string, string> = {};
  generalError = "";

  signInForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  get f() {
    return this.signInForm.controls;
  }
  backendErrorFor(field: string): string | null {
    return this.backendErrors[field] ?? null;
  }

  onSubmit() {
    if (this.isLoading()) {
      return;
    }

    this.backendErrors = {};
    this.generalError = "";

    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const payload: LoginRequest = this.signInForm.value as LoginRequest;

    this.isLoading.set(true);

    this.api.login(payload).subscribe({
      next: (session: TokenPairResponse) => {
        this.auth.setSession(session);
        this.router.navigate(["/restaurants"]);
      },

      error: (err) => {
        const envelope: AuthErrorEnvelope = err.error;

        this.backendErrors = envelope?.validationErrors || {};

        if (!Object.keys(this.backendErrors).length) {
          this.generalError = envelope?.message || "signIn failed";
        }
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
