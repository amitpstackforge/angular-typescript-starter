# Add TypeScript Models For Auth Requests/Responses And Error Envelope

## Goal
Add shared auth request/response/error types in `src/app/core/models.ts` so future auth tickets use one consistent contract.

## Step-by-Step (Beginner Friendly)

1. Open `src/app/core/models.ts`.
2. Scroll to the bottom of the file (after existing model exports).
3. Add the auth role union type:
   - `AuthRole = 'CUSTOMER' | 'OWNER' | 'DELIVERY_PARTNER' | 'ADMIN'`
4. Add user profile type with exact backend keys:
   - `id`, `name`, `email`, `role`
5. Add token response type with exact backend keys:
   - `accessToken`, `refreshToken`, `user`
6. Add auth error envelope type with exact backend keys:
   - `message`
   - `validationErrors` (object map of field -> error message)
7. Add request DTOs:
   - `SignupRequest` with `name`, `email`, `password`
   - `LoginRequest` with `email`, `password`
   - `RefreshRequest` with `refreshToken`
   - `LogoutRequest` with `refreshToken`
8. Make sure every new model is exported (use `export type ...`).
9. Verify names against `docs/AuthController.md`:
   - `TokenPairResponse.user`
   - `AuthUserProfile.role`
   - `AuthErrorEnvelope.validationErrors`
10. Compile the app to confirm there are no TypeScript issues.

## Implemented Types

```ts
export type AuthRole = 'CUSTOMER' | 'OWNER' | 'DELIVERY_PARTNER' | 'ADMIN';

export type AuthUserProfile = {
  id: number;
  name: string;
  email: string;
  role: AuthRole;
};

export type TokenPairResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUserProfile;
};

export type AuthErrorEnvelope = {
  message: string;
  validationErrors: Record<string, string>;
};

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type LogoutRequest = {
  refreshToken: string;
};
```

## Notes
- Field names are kept exactly as backend JSON from `docs/AuthController.md`.
- These models are ready for upcoming auth service/store/component tickets.
