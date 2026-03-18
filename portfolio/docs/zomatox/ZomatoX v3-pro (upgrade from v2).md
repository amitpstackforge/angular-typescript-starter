 
---

# ZomatoX v3-pro Upgrade (from v2) — JWT + RBAC + Coupons/Pricing + Address Book + Favorites/Recents + Admin Ops

---

# ROLE

You are a **senior full-stack architect and lead engineer**.

Upgrade an existing **v2 codebase of “ZomatoX”** to **v3-pro**.

### v2 already includes

* PostgreSQL + Flyway
* Roles:

  * `CUSTOMER`
  * `OWNER`
  * `DELIVERY_PARTNER`
* Owner order processing
* Delivery partner acceptance flow
* Reviews system
* Order events timeline

### Requirements

* Keep **v1 and v2 endpoints working** where applicable
* Maintain **backward compatibility**
* Add **v3-pro features**
* Output must be **copy-paste ready and compile/run**

---

# UPGRADE GOAL — v3-pro

Add **production-grade authentication and advanced platform features**

### 1️⃣ Authentication & Authorization

* Implement **Spring Security JWT**
* Support **Access + Refresh tokens**
* Add **RBAC guards for all APIs**

---

### 2️⃣ Replace Dev Headers

Replace these dev headers:

```
X-User-Id
X-User-Role
```

With **JWT authentication**.

However:

* Keep headers **OPTIONAL in dev profile only**
* Disable them in **prod profile**

---

### 3️⃣ Coupons + Pricing Engine

Add support for:

* **Global coupons**
* **Restaurant-specific coupons**

Pricing breakdown must include:

```
itemTotal
restaurantPackagingFee (optional)
platformFee (optional)
deliveryFee
discount
payableTotal
```

---

### 4️⃣ Address Book

Customers can manage **multiple delivery addresses**.

---

### 5️⃣ Favorites + Recently Viewed

Customers can:

* Save favorite restaurants
* Track recently viewed restaurants

---

### 6️⃣ Admin Module

Admin can:

* Approve restaurants
* Reject restaurants
* Block / unblock restaurants
* Block / unblock menu items
* Moderate reviews

---

### 7️⃣ Observability

Add production observability tools:

* **Spring Boot Actuator**
* **Micrometer Metrics**
* **Structured logging**

---

### 8️⃣ OpenAPI Security

Add **JWT security definitions** to Swagger/OpenAPI.

---

# STACK — v3-pro

## Backend

* Java 17
* Spring Boot 3
* Spring Web
* Spring Validation
* Spring Data JPA
* Spring Security 6
* JWT (Access + Refresh)
* PostgreSQL
* Flyway
* OpenAPI / Swagger
* Actuator
* Micrometer
* JUnit 5

---

## Frontend

* Angular 17
* Tailwind CSS
* Role-based routing using **JWT claims**
* **HttpInterceptor** attaches access token
* **Refresh token flow**
* State management using **RxJS store**

---

# SECURITY REQUIREMENTS

### Access Token

* Short lived
* Duration: **10–15 minutes**

---

### Refresh Token

Stored server-side.

Table:

```
refresh_tokens
```

---

### Auth Endpoints

```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
```

---

### Login Response

```
accessToken
refreshToken
userProfile
```

---

### RBAC Rules

#### CUSTOMER

Access to:

* restaurant browsing
* menus
* cart
* checkout
* orders
* reviews
* favorites
* addresses

---

#### OWNER

Access to:

* manage own restaurants
* manage menu items
* process restaurant orders

---

#### DELIVERY_PARTNER

Access to:

* accept delivery jobs
* update delivery status

---

#### ADMIN

Access to:

* restaurant approvals
* moderation
* review moderation
* audit/metrics endpoints

---

### Dev Profile Behavior

Header-based authentication still allowed **only in dev profile**.

Disabled in **prod profile**.

---

# FEATURES TO ADD — v3-pro

---

# A) Coupons + Pricing Engine

### Coupon Types

```
PERCENT
FLAT
```

---

### Coupon Constraints

```
minOrderAmount
maxDiscountCap
validFrom
validTo
usageLimitPerUser
```

Optional restrictions:

```
applicableCuisineType
restaurantId
```

---

### Coupon API

```
POST /api/checkout/apply-coupon
```

Request:

```
couponCode
restaurantId
```

Response:

Updated **pricing preview**.

---

### Order Snapshot

When order is placed, snapshot must store:

```
appliedCouponCode
discountAmount
pricingJsonSnapshot (optional)
```

---

# B) Address Book (Customer)

### APIs

```
POST   /api/addresses
GET    /api/addresses
PUT    /api/addresses/{id}
DELETE /api/addresses/{id}
```

Checkout uses:

```
addressId
```

---

# C) Favorites + Recently Viewed

---

## Favorites APIs

```
POST   /api/favorites/restaurants/{restaurantId}
DELETE /api/favorites/restaurants/{restaurantId}
GET    /api/favorites/restaurants
```

---

## Recently Viewed APIs

```
POST /api/recent/restaurants/{restaurantId}
GET  /api/recent/restaurants?limit=10
```

---

# D) Admin Operations

---

## Restaurant Approval

Restaurants created by OWNER start as:

```
PENDING_APPROVAL
```

Admin can:

```
APPROVE
REJECT
```

---

## Restaurant Moderation

Admin can:

```
BLOCK
UNBLOCK
```

restaurants.

---

## Menu Item Moderation

Admin can:

```
BLOCK
UNBLOCK
```

menu items.

---

## Review Moderation

Admin can:

```
HIDE
UNHIDE
```

reviews.

---

### Admin APIs

```
GET  /api/admin/restaurants?status=PENDING_APPROVAL|APPROVED|REJECTED
POST /api/admin/restaurants/{id}/approve
POST /api/admin/restaurants/{id}/reject
POST /api/admin/restaurants/{id}/block
POST /api/admin/restaurants/{id}/unblock

POST /api/admin/menu-items/{id}/block
POST /api/admin/menu-items/{id}/unblock

GET  /api/admin/reviews?status=VISIBLE|HIDDEN
POST /api/admin/reviews/{id}/hide
POST /api/admin/reviews/{id}/unhide
```

---

# E) Cart / Checkout Updates

Cart must prevent adding items from:

```
BLOCKED restaurant
BLOCKED menu item
```

Checkout must fail if:

```
restaurant is BLOCKED
restaurant is NOT APPROVED
```

Coupon validation must also verify restaurant approval.

---

# DATA MODEL — v3-pro CHANGES

Add via **Flyway V3 migration**

---

## Users Table

Add fields:

```
password_hash
is_active
```

Role column already exists.

---

## Refresh Tokens

```
id
user_id
token_hash
expires_at
revoked_at
created_at
```

---

## Restaurants

Add:

```
approval_status
is_blocked
blocked_reason
```

---

## Menu Items

Add:

```
is_blocked
```

---

## Coupons

Fields:

```
id
code
type
value
min_order
max_cap
valid_from
valid_to
active
restaurant_id
usage_limit_per_user
```

---

## Coupon Redemptions

```
id
coupon_id
user_id
order_id
redeemed_at
```

---

## Addresses

```
id
user_id
fields...
```

---

## Favorites

Table:

```
favorites_restaurants
```

Fields:

```
user_id
restaurant_id
created_at
```

Unique constraint:

```
user_id + restaurant_id
```

---

## Recently Viewed

```
recent_restaurants
```

Fields:

```
user_id
restaurant_id
viewed_at
```

---

## Reviews

Add column:

```
status
```

Values:

```
VISIBLE
HIDDEN
```

---

## Optional Table

```
audit_logs
```

Track admin actions.

---

# BACKEND ARCHITECTURE — v3-pro

Base package:

```
com.example.zomatox
```

---

### Security Packages

```
security/
 ├── jwt
 ├── config
 ├── filter
 └── auth
```

---

### Authorization

Use:

```
@PreAuthorize
```

for RBAC enforcement.

---

### Global Error Format

```
{
  "message": "...",
  "validationErrors": {
    "field": "error"
  }
}
```

---

### Order Events

Continue storing order lifecycle events.

---

### Coupon Snapshot on Orders

Add fields:

```
appliedCouponCode
discountAmount
pricingJsonSnapshot
```

---

# FRONTEND — v3-pro

---

# Authentication Module

Add:

* Login page
* Token storage
* Refresh token handling

Store tokens in:

```
memory
localStorage
```

---

### HTTP Interceptor

Automatically attach:

```
Authorization: Bearer <accessToken>
```

---

### Role-Based Routes

```
/customer/*
/owner/*
/delivery/*
/admin/*
```

---

# Customer Features

Add pages:

```
Address Book
Favorites
Recent Restaurants
Checkout Coupon Support
Pricing Breakdown
```

---

# Owner Updates

Restaurant creation page shows status:

```
PENDING
APPROVED
REJECTED
```

---

# Admin Panel

Add pages:

```
Restaurant approval queue
Restaurant moderation
Menu moderation
Review moderation
```

---

# TESTS — v3-pro

---

## JwtAuthIntegrationTest

Verify:

* login returns tokens
* protected endpoints require token

---

## RefreshFlowTest

Verify:

* refresh generates new access token
* logout revokes refresh token

---

## CouponValidationTest

Verify:

* expired coupon rejected
* minimum order enforced
* restaurant-specific coupon validation

---

## AdminApprovalTest

Flow:

```
Owner creates restaurant → PENDING
Admin approves → APPROVED
Blocked restaurant cannot accept orders
```

---

## FavoritesUniquenessTest

Verify:

```
cannot favorite same restaurant twice
```

---

# RUN INSTRUCTIONS

Start PostgreSQL:

```bash
docker-compose up -d
```

Run backend:

```bash
mvn spring-boot:run
```

Run frontend:

```bash
npm i
ng serve
```

Swagger should demonstrate **JWT authentication flow**.

---

# CURL EXAMPLES

### Signup

```
POST /api/auth/signup
```

---

### Login

```
POST /api/auth/login
```

---

### Refresh Token

```
POST /api/auth/refresh
```

---

### Admin Approves Restaurant

```
POST /api/admin/restaurants/{id}/approve
```

---

### Apply Coupon

```
POST /api/checkout/apply-coupon
```

---

### Place Order

```
POST /api/orders
```

---

# OUTPUT FORMAT — MUST FOLLOW

Your final output must include:

1️⃣ **Upgrade Diff Checklist**
2️⃣ **Updated repository tree**
3️⃣ **Full code for new/changed files**
4️⃣ **Flyway V3 migration SQL**
5️⃣ **Seed data**
6️⃣ **Angular updates (services, interceptors, guards)**
7️⃣ **Tests + run steps + curl**

---

# GIT TAG COMMANDS

```bash
git status
git add .
git commit -m "v3-pro: JWT+refresh RBAC, coupons/pricing, addresses, favorites/recents, admin approvals/moderation"
git tag v3-zomatox-pro
git tag -n
```

---

# QUALITY BAR

The implementation must:

* Compile and run on **PostgreSQL + Flyway**
* Maintain **v2 compatibility**
* Use **JWT authentication in prod profile**
* Allow **dev headers only in dev profile**
* Provide **clean validation and error responses**
* Avoid copyrighted assets
* Use **generic icons only**

--- 
