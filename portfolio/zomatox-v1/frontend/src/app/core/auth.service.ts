import { Injectable } from "@angular/core";
import { AuthRole, AuthUserProfile, TokenPairResponse } from "./models";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly accessTokenKey = "zomatox.accessToken";
  private readonly refreshTokenKey = "zomatox.refreshToken";
  private readonly currentUserKey = "zomatox.currentUser";

  setSession(session: TokenPairResponse): void {
    localStorage.setItem(this.accessTokenKey, session.accessToken);
    localStorage.setItem(this.refreshTokenKey, session.refreshToken);
    localStorage.setItem(this.currentUserKey, JSON.stringify(session.user));
  }

  clearSession(session: TokenPairResponse): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.currentUserKey);
  }
  get accessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  get currentUser(): AuthUserProfile | null {
    const rawUser = localStorage.getItem(this.currentUserKey);
    return this.parseUser(rawUser);
  }

  private parseUser(rawUser: string | null): AuthUserProfile | null {
    if (!rawUser) return null;

    try {
      const parsed: unknown = JSON.parse(rawUser);
      return this.isAuthUserProfile(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  private isAuthUserProfile(value: unknown): value is AuthUserProfile {
    if (typeof value !== "object" || value === null) {
      return false;
    }

    const user = value as Record<string, unknown>;
    return (
      typeof user["id"] === "number" &&
      typeof user["name"] === "string" &&
      typeof user["email"] === "string" &&
      this.isAuthRole(user["role"])
    );
  }

  private isAuthRole(role: unknown): role is AuthRole {
    return (
      role === "CUSTOMER" ||
      role === "OWNER" ||
      role === "DELIVERY_PARTNER" ||
      role === "ADMIN"
    );
  }
}
