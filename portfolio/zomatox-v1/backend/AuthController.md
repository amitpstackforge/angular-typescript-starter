# AuthController API Contract

## Overview
- Controller: `AuthController`
- Base path: `/api/auth`
- Content type: `application/json`
- Auth strategy:
    - `POST /signup`, `POST /login`, `POST /refresh`, `POST /logout` do not require `Authorization` header.
    - `GET /me` requires a valid bearer access token in `Authorization: Bearer <token>`.

## Shared Response Models

### TokenPairResponse
```json
{
  "accessToken": "string (JWT)",
  "refreshToken": "string (opaque token)",
  "user": {
    "id": 1,
    "name": "string",
    "email": "string",
    "role": "CUSTOMER | OWNER | DELIVERY_PARTNER | ADMIN"
  }
}
```

### AuthUserProfile
```json
{
  "id": 1,
  "name": "string",
  "email": "string",
  "role": "CUSTOMER | OWNER | DELIVERY_PARTNER | ADMIN"
}
```

### Error Envelope
All handled errors follow:
```json
{
  "message": "string",
  "validationErrors": {
    "fieldName": "validation message"
  }
}
```

For non-validation errors, `validationErrors` is an empty object.

## Endpoints

### 1) `POST /api/auth/signup`
Creates a new customer account and returns access/refresh tokens.

#### Request body
```json
{
  "name": "string (required, not blank)",
  "email": "string (required, valid email)",
  "password": "string (required, not blank)"
}
```

#### Success response
- `200 OK` with `TokenPairResponse`

#### Error responses
- `400 Bad Request`
    - Validation failure (`message: "Validation failed"`)
    - Business rule: `message: "Email already exists"`

---

### 2) `POST /api/auth/login`
Authenticates a user and returns access/refresh tokens.

#### Request body
```json
{
  "email": "string (required, valid email)",
  "password": "string (required, not blank)"
}
```

#### Success response
- `200 OK` with `TokenPairResponse`

#### Error responses
- `400 Bad Request` (validation failure)
- `401 Unauthorized` (`message: "Invalid credentials"`)
- `403 Forbidden` (`message: "User is inactive"`)

---

### 3) `POST /api/auth/refresh`
Rotates refresh token and issues a new access/refresh token pair.

#### Request body
```json
{
  "refreshToken": "string (required, not blank)"
}
```

#### Success response
- `200 OK` with `TokenPairResponse`

#### Error responses
- `400 Bad Request` (validation failure)
- `401 Unauthorized`
    - `message: "Invalid refresh token"`
    - `message: "Refresh token expired/revoked"`

---

### 4) `POST /api/auth/logout`
Revokes the provided refresh token (idempotent no-op if token is unknown).

#### Request body
```json
{
  "refreshToken": "string (required, not blank)"
}
```

#### Success response
- `200 OK`
- Empty response body

#### Error responses
- `400 Bad Request` (validation failure)

---

### 5) `GET /api/auth/me`
Returns the profile of the currently authenticated user.

#### Headers
- `Authorization: Bearer <accessToken>` (required)

#### Success response
- `200 OK` with `AuthUserProfile`

#### Error responses
- `401 Unauthorized`
    - `message: "Unauthorized"` (missing/invalid bearer token)
    - `message: "User not found"` (token user no longer exists)

## Requestly-Friendly cURL + Sample Responses

These are ready to import into Requestly as cURL.
Replace `PASTE_ACCESS_TOKEN_HERE` and `PASTE_REFRESH_TOKEN_HERE` after login/signup.

### 1) `POST /api/auth/signup`
Success cURL:
```bash
curl -i -X POST "http://localhost:8080/api/auth/signup" -H "Content-Type: application/json" -d "{\"name\":\"Requestly User\",\"email\":\"requestly.user.unique@example.com\",\"password\":\"Pass@123\"}"
```
Success response (`200`):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9....",
  "refreshToken": "4c2d...-uuid.8f5a...-uuid",
  "user": {
    "id": 11,
    "name": "Requestly User",
    "email": "requestly.user.unique@example.com",
    "role": "CUSTOMER"
  }
}
```
Error cURL (duplicate email):
```bash
curl -i -X POST "http://localhost:8080/api/auth/signup" -H "Content-Type: application/json" -d "{\"name\":\"Customer One\",\"email\":\"customer@zomatox.local\",\"password\":\"customer123\"}"
```
Error response (`400`):
```json
{
  "message": "Email already exists",
  "validationErrors": {}
}
```
Validation cURL:
```bash
curl -i -X POST "http://localhost:8080/api/auth/signup" -H "Content-Type: application/json" -d "{\"name\":\"\",\"email\":\"not-an-email\",\"password\":\"\"}"
```
Validation response (`400`):
```json
{
  "message": "Validation failed",
  "validationErrors": {
    "name": "must not be blank",
    "email": "must be a well-formed email address",
    "password": "must not be blank"
  }
}
```

### 2) `POST /api/auth/login`
Success cURL:
```bash
curl -i -X POST "http://localhost:8080/api/auth/login" -H "Content-Type: application/json" -d "{\"email\":\"customer@zomatox.local\",\"password\":\"customer123\"}"
```
Success response (`200`):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9....",
  "refreshToken": "d8a1...-uuid.e5c3...-uuid",
  "user": {
    "id": 1,
    "name": "Customer One",
    "email": "customer@zomatox.local",
    "role": "CUSTOMER"
  }
}
```
Error cURL (wrong password):
```bash
curl -i -X POST "http://localhost:8080/api/auth/login" -H "Content-Type: application/json" -d "{\"email\":\"customer@zomatox.local\",\"password\":\"wrong-pass\"}"
```
Error response (`401`):
```json
{
  "message": "Invalid credentials",
  "validationErrors": {}
}
```
Validation cURL:
```bash
curl -i -X POST "http://localhost:8080/api/auth/login" -H "Content-Type: application/json" -d "{\"email\":\"bad-email\",\"password\":\"\"}"
```
Validation response (`400`):
```json
{
  "message": "Validation failed",
  "validationErrors": {
    "email": "must be a well-formed email address",
    "password": "must not be blank"
  }
}
```

### 3) `POST /api/auth/refresh`
Success cURL:
```bash
curl -i -X POST "http://localhost:8080/api/auth/refresh" -H "Content-Type: application/json" -d "{\"refreshToken\":\"PASTE_REFRESH_TOKEN_HERE\"}"
```
Success response (`200`):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9....",
  "refreshToken": "new-uuid-part1.new-uuid-part2",
  "user": {
    "id": 1,
    "name": "Customer One",
    "email": "customer@zomatox.local",
    "role": "CUSTOMER"
  }
}
```
Error cURL (invalid/unknown token):
```bash
curl -i -X POST "http://localhost:8080/api/auth/refresh" -H "Content-Type: application/json" -d "{\"refreshToken\":\"invalid.refresh.token\"}"
```
Error response (`401`):
```json
{
  "message": "Invalid refresh token",
  "validationErrors": {}
}
```
Validation cURL:
```bash
curl -i -X POST "http://localhost:8080/api/auth/refresh" -H "Content-Type: application/json" -d "{\"refreshToken\":\"\"}"
```
Validation response (`400`):
```json
{
  "message": "Validation failed",
  "validationErrors": {
    "refreshToken": "must not be blank"
  }
}
```

### 4) `POST /api/auth/logout`
Success cURL:
```bash
curl -i -X POST "http://localhost:8080/api/auth/logout" -H "Content-Type: application/json" -d "{\"refreshToken\":\"PASTE_REFRESH_TOKEN_HERE\"}"
```
Success response (`200`): empty body.

Error cURL:
`/logout` is idempotent. Unknown refresh token still returns `200` with empty body.

Validation cURL:
```bash
curl -i -X POST "http://localhost:8080/api/auth/logout" -H "Content-Type: application/json" -d "{\"refreshToken\":\"\"}"
```
Validation response (`400`):
```json
{
  "message": "Validation failed",
  "validationErrors": {
    "refreshToken": "must not be blank"
  }
}
```

### 5) `GET /api/auth/me`
Success cURL:
```bash
curl -i "http://localhost:8080/api/auth/me" -H "Authorization: Bearer PASTE_ACCESS_TOKEN_HERE"
```
Success response (`200`):
```json
{
  "id": 1,
  "name": "Customer One",
  "email": "customer@zomatox.local",
  "role": "CUSTOMER"
}
```
Error cURL (missing/invalid bearer token):
```bash
curl -i "http://localhost:8080/api/auth/me"
```
Error response (`401`):
```json
{
  "message": "Unauthorized",
  "validationErrors": {}
}
```
Validation:
No request-body validation for this endpoint.
