 

---

# ZomatoX v2 Upgrade (from v1) — PostgreSQL + Flyway + Owner Portal + Delivery Partner + Ratings/Reviews

## ROLE

You are a **senior full-stack architect and lead engineer**.

You are upgrading an existing **v1 codebase of “ZomatoX”** (restaurant discovery + menu + cart + order + mock payment) to **v2**.

**Important requirements:**

* Keep **v1 endpoints working (backward compatible)**
* Add **v2 features**
* Output must be **copy-paste ready and compile/run**

---

# INPUT CONTEXT

Assume **v1 already exists with:**

### Backend

* Spring Boot 3
* Java 17
* H2 database

### Entities

* `User`
* `Restaurant`
* `MenuItem`
* `Cart` / `CartItem`
* `Address`
* `Order` / `OrderItem`
* `Payment`

### APIs

```
/restaurants
/cart
/orders
/payments confirm
```

Plus **admin endpoints**

### Frontend

Angular app with:

* restaurant list/detail
* cart
* checkout
* orders page

### User Context

User identity passed via header:

```
X-User-Id
```

No JWT yet.

Security will be added in **v3-pro**.

---

# PRIMARY GOAL

Upgrade **v1 → v2** with the following capabilities:

### 1️⃣ Database Migration

Switch database:

```
H2 → PostgreSQL
```

Use:

```
Flyway migrations (mandatory)
```

---

### 2️⃣ Roles and Portals

Add new user roles:

* `RESTAURANT_OWNER`
* `DELIVERY_PARTNER`

---

### 3️⃣ Owner Capabilities

Restaurant owners can:

* Manage menu items
* Process order lifecycle

Order flow:

```
CONFIRMED → PREPARING → READY_FOR_PICKUP
```

---

### 4️⃣ Delivery Partner Capabilities

Delivery partners can:

* Accept delivery jobs
* Deliver orders

Delivery flow:

```
PICKED_UP → OUT_FOR_DELIVERY → DELIVERED
```

---

### 5️⃣ Ratings & Reviews

Customers can:

* Rate restaurants
* Add reviews

Constraints:

* Only **after delivery**
* Only **once per order**

---

### 6️⃣ Order Event Timeline

Every status change must be recorded.

Customers should be able to view the **order timeline**.

---

# UPGRADE ORDER — MUST FOLLOW

Upgrade steps must be implemented in this order:

```
A) Postgres + Flyway (first)
B) Role model + simple role checks (no JWT)
C) Owner portal features
D) Delivery partner features
E) Reviews + constraints
F) Frontend UI upgrades
```

---

# STACK — v2

## Backend

* Java 17
* Spring Boot 3
* Spring Web
* Spring Validation
* Spring Data JPA
* PostgreSQL
* Flyway (migrations only)
* OpenAPI / Swagger
* Actuator
* JUnit 5

---

## Frontend

* Angular 17
* Tailwind CSS
* Role-based routing using **local role state**
* State management using **RxJS store**

Customer UI from **v1 should remain unchanged**.

New sections must be added for:

* Owner
* Delivery partner

---

# DATA MODEL CHANGES — v2

Modify or add the following entities while preserving v1 schema.

---

## Users Table

Add column:

```
role
```

Values:

```
CUSTOMER
OWNER
DELIVERY_PARTNER
ADMIN (optional)
```

---

## Restaurants Table

Add:

```
owner_user_id (FK → users)
```

---

## Menu Items

Keep existing structure but ensure:

```
restaurant_id FK
```

---

## Orders Table

Add fields:

```
delivery_partner_user_id (nullable)
updated_at
```

Expanded status enum:

```
CREATED
PAYMENT_PENDING
PAID
CONFIRMED
PREPARING
READY_FOR_PICKUP
PICKED_UP
OUT_FOR_DELIVERY
DELIVERED
```

---

## Order Events (NEW TABLE)

```
id
order_id
status
message
created_at
```

Used for **timeline history**.

---

## Reviews (NEW TABLE)

Fields:

```
id
order_id
restaurant_id
user_id
rating (1-5)
comment
created_at
```

---

### Review Constraints

* Order must be **DELIVERED**
* Reviewer must be **same user**
* **Only one review per order**

---

# API CONTRACTS — v2

All **v1 APIs must continue working**.

---

# Owner APIs

Role: `OWNER`

Authentication source:

```
X-User-Role header
or
resolve from DB using X-User-Id
```

### Owner Restaurant APIs

```
GET  /api/owner/restaurants
POST /api/owner/restaurants
PUT  /api/owner/restaurants/{id}
```

---

### Menu Management

```
POST /api/owner/restaurants/{id}/menu-items
PUT  /api/owner/menu-items/{id}
```

---

### Owner Order Queue

```
GET /api/owner/orders?status=CONFIRMED|PREPARING|READY_FOR_PICKUP
```

Update status:

```
POST /api/owner/orders/{orderId}/status
```

Allowed transitions:

```
PREPARING
READY_FOR_PICKUP
```

---

# Delivery Partner APIs

Role: `DELIVERY_PARTNER`

### Delivery Jobs

```
GET /api/delivery/jobs?status=AVAILABLE|ASSIGNED
```

AVAILABLE means:

```
READY_FOR_PICKUP orders
with no delivery partner assigned
```

---

### Accept Delivery

```
POST /api/delivery/jobs/{orderId}/accept
```

---

### Update Delivery Status

```
POST /api/delivery/orders/{orderId}/status
```

Statuses:

```
PICKED_UP
OUT_FOR_DELIVERY
DELIVERED
```

---

# Customer APIs

### Post Review

```
POST /api/restaurants/{id}/reviews
```

Body:

```
orderId
rating
comment
```

---

### Fetch Reviews

```
GET /api/restaurants/{id}/reviews?page=
```

---

### Order Timeline

```
GET /api/orders/{id}/events
```

---

# BACKWARD COMPATIBILITY RULES

These APIs must **still work exactly as in v1**:

```
/api/restaurants
/api/cart
/api/orders
/api/payments confirm
```

User identification:

```
X-User-Id header
```

Optional dev header:

```
X-User-Role
```

If role header missing:

Resolve role from **users table**.

---

# BACKEND ARCHITECTURE

Base package:

```
com.example.zomatox
```

### Package Structure

```
controller
dto
entity
repository
service
config
exception
util
```

---

### Order State Machine

Add service validator:

```
OrderStateMachine
```

Responsibilities:

* Prevent illegal order transitions
* Validate role permissions

---

### Order Event Logging

Every status change must create:

```
order_events record
```

---

### Global Exception Handler

Response format:

```json
{
  "message": "Validation failed",
  "validationErrors": {
    "field": "error message"
  }
}
```

---

### Logging

Services must use:

```
@Slf4j
```

---

# FLYWAY REQUIREMENTS

Provide:

### Docker Compose

PostgreSQL container.

---

### Flyway Migrations

```
V1__init.sql
V2__add_roles_owner_delivery_reviews_events.sql
```

---

### Seed Data

Provide SQL or Java initializer.

Seed:

Users

```
customer
owner
delivery partner
```

Restaurants mapped to owners.

Menu items.

Orders in different statuses.

---

# FRONTEND REQUIREMENTS — v2

Customer pages remain unchanged.

Add new portals.

---

## Owner Portal

Routes:

```
/owner/restaurants
/owner/menu/:restaurantId
/owner/orders
```

Features:

* Manage restaurants
* Manage menu
* Process order queue

---

## Delivery Portal

Routes:

```
/delivery/jobs
/delivery/order/:id
```

Features:

* Accept jobs
* Update delivery status

---

## Customer Additions

Add:

* Restaurant review section
* Order timeline view

---

## Frontend Integration

Continue using header:

```
X-User-Id
```

Add demo role switch dropdown.

Example users:

```
customer
owner
delivery partner
```

---

# TESTS — v2 MINIMUM

### OrderTransitionTest

Valid transitions:

```
CONFIRMED → PREPARING → READY_FOR_PICKUP
```

Invalid transitions must fail.

---

### DeliveryAcceptTest

Acceptance allowed only if:

```
status = READY_FOR_PICKUP
delivery partner not assigned
```

---

### ReviewConstraintsTest

Validation rules:

* Order must be DELIVERED
* Only one review per order

---

### FlywayMigrationTest (optional)

Ensure:

* App starts successfully
* Flyway migrations apply

---

# RUN INSTRUCTIONS

## Backend

Start PostgreSQL

```bash
docker-compose up -d
```

Run backend

```bash
mvn spring-boot:run
```

---

## Frontend

Install dependencies

```bash
npm i
```

Start Angular

```bash
ng serve
```

---

# CURL EXAMPLES

### Create Owner Restaurant

```
curl -X POST /api/owner/restaurants
```

---

### Owner Updates Order Status

```
POST /api/owner/orders/{id}/status
```

Body:

```
PREPARING
```

or

```
READY_FOR_PICKUP
```

---

### Delivery Accepts Job

```
POST /api/delivery/jobs/{orderId}/accept
```

---

### Delivery Marks Delivered

```
POST /api/delivery/orders/{orderId}/status
```

Body:

```
DELIVERED
```

---

### Customer Posts Review

```
POST /api/restaurants/{id}/reviews
```

---

# OUTPUT FORMAT — MUST FOLLOW

Your final output must contain:

1️⃣ Files to **ADD/MODIFY** from v1
2️⃣ Updated **repository tree**
3️⃣ **Full code** for new/changed files
4️⃣ **Flyway migrations + docker-compose**
5️⃣ **Seed data**
6️⃣ **Angular updates**
7️⃣ **Tests + run steps + curl examples**

---

# GIT TAG COMMANDS

```bash
git status

git add .

git commit -m "v2: Postgres+Flyway + owner portal + delivery partner + reviews + order events"

git tag v2-zomatox-owner-delivery

git tag -n
```

---

# QUALITY BAR

The solution must:

* Compile successfully
* Run on **PostgreSQL + Flyway**
* Maintain **v1 API compatibility**
* Use **clean DTO validation**
* Provide **global error handling**
* Avoid copyrighted assets
* Use **generic icons only**

---
 
