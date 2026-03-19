import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CartStore } from "../../core/cart.store";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ApiService } from "../../core/api.service";
import { AuthErrorEnvelope, LoginRequest } from "../../core/models";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: "./signin.component.html",
})
export class SignInComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

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
    this.backendErrors = {};
    this.generalError = "";

    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const payload: LoginRequest = this.signInForm.value as LoginRequest;

    this.isLoading.set(true);

    this.api.login(payload).subscribe({
      next: (res) => {
        console.log("signIn success", res);
        this.isLoading.set(false);
      },

      error: (err) => {
        const envelope: AuthErrorEnvelope = err.error;

        this.backendErrors = envelope?.validationErrors || {};

        if (!Object.keys(this.backendErrors).length) {
          this.generalError = envelope?.message || "signIn failed";
        }
        this.isLoading.set(false);
      },
    });
  }
}
