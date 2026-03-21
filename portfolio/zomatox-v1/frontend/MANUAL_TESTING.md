# ZomatoX Frontend Manual Testing Guide

This guide covers manual testing for the full application across Customer, Owner, and Delivery flows.

## 1. Prerequisites

1. Backend API is running at `http://localhost:8080`.
2. Frontend dependencies are installed:
   ```bash
   npm install
   ```
3. Start frontend:
   ```bash
   npm start
   ```
4. Open the app at `http://localhost:4200`.

## 2. Test Accounts and Roles

Use the header dropdown to switch users:

1. `Customer (id=1) • CUSTOMER`
2. `Owner (id=2) • OWNER`
3. `Delivery (id=3) • DELIVERY_PARTNER`

## 3. Smoke Test (All Builds)

1. App loads without blank screen or console crash.
2. Header navigation links render: `Customer`, `Owner`, `Delivery`, `Cart`, `Orders`.
3. Switching user updates role in dropdown and keeps app responsive.
4. Cart count in header updates after adding/removing items.

## 4. Customer Flow Tests

### 4.1 Restaurant List (`/restaurants`)

1. Open `/restaurants`.
2. Verify list loads with cards.
3. Use search input and confirm results refresh.
4. Change city filter and confirm data updates.
5. Change sort option (`Rating`, `Delivery time`) and confirm result order changes.
6. Use `Next` and `Previous` pagination buttons.
7. If a query returns no results, confirm empty-state UI appears.

### 4.2 Restaurant Detail (`/restaurants/:id`)

1. Open any restaurant card.
2. Verify restaurant details and menu items appear.
3. Change quantity for an item.
4. Click `Add` and confirm cart count increases in header.
5. Validate reviews section loads.
6. Submit a review with valid values and confirm list refreshes.
7. Submit an invalid review (wrong order id or missing required data) and confirm error message appears.

### 4.3 Cart (`/cart`)

1. Open `/cart`.
2. Verify cart items render with qty and line totals.
3. Click `+` and `-` for item quantity and verify totals update.
4. Click `Remove` and verify item is removed.
5. For empty cart, verify empty-state message is shown.
6. Confirm `Checkout` is disabled or prevented when cart is empty.

### 4.4 Checkout (`/checkout`)

1. Open `/checkout` with non-empty cart.
2. Verify saved addresses are listed in dropdown.
3. Click `Place Order`.
4. Confirm app navigates to `/orders/:id`.
5. If no addresses exist, verify warning message appears.

### 4.5 Orders List + Detail (`/orders`, `/orders/:id`)

1. Open `/orders`.
2. Verify created order appears in list.
3. Open that order.
4. Verify order items, totals, and timeline events are visible.
5. Click `Mock Pay SUCCESS` and verify status/event updates.
6. Click `Mock Pay FAIL` on another pending order and verify error/failure update behavior.

## 5. Owner Flow Tests

### 5.1 Owner Restaurants (`/owner/restaurants`)

1. Switch to `Owner (id=2) • OWNER`.
2. Open `/owner/restaurants`.
3. Verify summary cards (`Total`, `Visible`) display.
4. Test search and city filters.
5. Click `Clear filters` and verify full list returns.
6. Verify empty state with non-matching search.
7. Verify retry flow by stopping backend briefly and using `Retry`.

### 5.2 Owner Orders (`/owner/orders`)

1. Open `/owner/orders`.
2. Verify queue tabs: `Confirmed`, `Preparing`, `Ready for Pickup`.
3. Switch tabs and verify list refresh.
4. From `Confirmed`, click `Start Preparing` on an order.
5. Confirm button shows `Updating...` during request.
6. Verify order moves into `Preparing`.
7. From `Preparing`, click `Mark Ready for Pickup`.
8. Verify order moves into `Ready for Pickup`.

Detailed owner checks are also available in:
`src/app/features/owner/OWNER_TESTING.md`

## 6. Delivery Flow Tests

### 6.1 Delivery Jobs (`/delivery/jobs`)

1. Switch to `Delivery (id=3) • DELIVERY_PARTNER`.
2. Open `/delivery/jobs`.
3. Verify `AVAILABLE` and `ASSIGNED` toggles work.
4. In `AVAILABLE`, click `Accept` on one order.
5. Verify order appears in `ASSIGNED`.

### 6.2 Delivery Order (`/delivery/order/:id`)

1. Open accepted order from jobs page.
2. Click `PICKED_UP`, then `OUT_FOR_DELIVERY`, then `DELIVERED`.
3. Verify success message after each update.
4. Confirm status changes persist after refresh.

## 7. Authorization Guard Tests

1. While in `Customer` role, navigate to `/owner/orders` or `/owner/restaurants`.
2. Verify redirect to `/restaurants`.
3. While in `Customer` role, navigate to `/delivery/jobs`.
4. Verify redirect to `/restaurants`.
5. While in correct role (`OWNER` or `DELIVERY_PARTNER`), verify protected pages are accessible.

## 8. Error Handling Checks

1. Stop backend API while frontend is open.
2. Reload pages: `/restaurants`, `/orders`, `/owner/orders`, `/owner/restaurants`.
3. Verify error states appear (message or retry UI).
4. Start backend again and verify recovery by refresh or retry button.

## 9. Refresh Token Flow

1. Log in from `/login` and confirm tokens exist in Local Storage:
   `zomatox.accessToken`, `zomatox.refreshToken`, `zomatox.currentUser`.
2. In DevTools, set `zomatox.accessToken` to an invalid value (leave refresh token intact).
3. Trigger any API call (refresh page, open `/orders`, or add to cart).
4. Verify a `POST /api/auth/refresh` call is sent and returns 200.
5. Confirm Local Storage tokens are replaced with new values.
6. Verify the original request completes successfully after refresh.

Negative case:

1. Remove `zomatox.refreshToken` from Local Storage.
2. Trigger an API call that requires auth.
3. Verify user is redirected to `/login` and session is cleared.

## 10. Regression Checklist

1. No route shows Angular template errors in browser console.
2. All role switches work without full browser restart.
3. Cart state reloads correctly after user switch.
4. Navigation links remain functional after completing one end-to-end order lifecycle.
