# Orders Feature - Bugs and Enhancements

## Bugs

1. Missing error handling for list and detail fetch APIs.
   - Files: `order-list.component.ts`, `order-detail.component.ts`
   - Current behavior: failed API calls are silent, leaving the user with empty or stale UI and no explanation.
   - Impact: users cannot distinguish between "no orders" and "request failed".

2. Invalid route parameter can produce `NaN` order ID.
   - File: `order-detail.component.ts`
   - Current behavior: `Number(this.route.snapshot.paramMap.get('id'))` can become `NaN` when `id` is missing/invalid, but API calls still run.
   - Impact: unnecessary backend calls like `/orders/NaN` and broken detail screen behavior.

3. Route param is read only once via `snapshot`.
   - File: `order-detail.component.ts`
   - Current behavior: navigating between order IDs while reusing the same component instance does not update `id` and data.
   - Impact: wrong order details can stay on screen.

4. Duplicate payment confirmation can be triggered.
   - File: `order-detail.component.ts`
   - Current behavior: `Mock Pay SUCCESS` / `Mock Pay FAIL` buttons remain active during request.
   - Impact: duplicate API calls and race conditions in payment state.

5. Partial reload failure leaves inconsistent screen.
   - File: `order-detail.component.ts`
   - Current behavior: `reload()` makes separate calls for order and events; one can fail while the other succeeds, with no recovery/error state.
   - Impact: timeline and order header can represent different states.

## Enhancements

1. Add loading, empty, and error states for orders and events views.
   - Files: `order-list.component.ts`, `order-detail.component.ts`
   - Suggestion: track `isLoading` and `errorMessage` signals and render explicit states.

2. Introduce strong typing for order timeline events.
   - Files: `order-detail.component.ts`, `api.service.ts`, `models.ts`
   - Suggestion: replace `any[]` with an `OrderEvent` model (`status`, `message`, `createdAt`, etc.).

3. Format money and date/time values with Angular pipes.
   - Files: `order-list.component.ts`, `order-detail.component.ts`
   - Suggestion: use `currency` and `date` pipes instead of raw `₹{{...}}` and raw timestamps.

4. Add `trackBy` to list loops.
   - Files: `order-list.component.ts`, `order-detail.component.ts`
   - Suggestion: use `trackBy` for `orders`, `items`, and `events` loops to reduce DOM re-rendering.

5. Guard detail route on invalid/non-numeric IDs.
   - File: `order-detail.component.ts`
   - Suggestion: validate parsed ID before API calls, show a friendly error, and/or navigate back.

6. Show payment actions conditionally by status.
   - File: `order-detail.component.ts`
   - Suggestion: hide mock payment buttons once payment is finalized to prevent invalid transitions.
