# Delivery Feature - Bugs and Enhancements

## Bugs

1. Missing error handling for jobs and order fetch APIs.
   - Files: `delivery-jobs.component.ts`, `delivery-order.component.ts`
   - Current behavior: failed API calls are silent in `load()` and `reload()`.
   - Impact: empty/stale UI appears without any error message.

2. Missing error handling for job accept action.
   - File: `delivery-jobs.component.ts`
   - Current behavior: `accept()` handles success only and ignores failure callback.
   - Impact: user gets no feedback when accept fails and may retry blindly.

3. Invalid route parameter can produce `NaN` order ID.
   - File: `delivery-order.component.ts`
   - Current behavior: `Number(this.route.snapshot.paramMap.get('id'))` may be `NaN`, but API calls still run.
   - Impact: broken detail screen and unnecessary backend calls like `/orders/NaN`.

4. Route param is read only once with `snapshot`.
   - File: `delivery-order.component.ts`
   - Current behavior: moving between different delivery order IDs in the same component instance does not refresh `id`.
   - Impact: wrong order details can remain visible.

5. Request race condition when switching job tabs quickly.
   - File: `delivery-jobs.component.ts`
   - Current behavior: multiple `load()` requests can resolve out of order, causing `jobs` data to mismatch with current `mode`.
   - Impact: user can see `AVAILABLE` jobs while `ASSIGNED` tab is active (or vice versa).

6. Duplicate action calls are possible.
   - Files: `delivery-jobs.component.ts`, `delivery-order.component.ts`
   - Current behavior: Accept/Set Status buttons remain enabled while requests are in flight.
   - Impact: duplicate API calls and inconsistent status updates.

7. Missing empty-state UI when there are no jobs.
   - File: `delivery-jobs.component.ts`
   - Current behavior: empty array renders a blank list area with no explanation.
   - Impact: user cannot tell whether there are no jobs or loading/error issues.

## Enhancements

1. Replace `any` types with delivery-specific models.
   - Files: `delivery-jobs.component.ts`, `delivery-order.component.ts`, `models.ts`
   - Suggestion: define types for delivery job and delivery order to improve compile-time safety.

2. Type status transitions with strict unions.
   - Files: `delivery-order.component.ts`, `api.service.ts`
   - Suggestion: replace `set(next: string)` with a union like `'PICKED_UP' | 'OUT_FOR_DELIVERY' | 'DELIVERED'`.

3. Add loading, empty, and error states.
   - Files: `delivery-jobs.component.ts`, `delivery-order.component.ts`
   - Suggestion: introduce `isLoading` and `errorMessage` signals and render explicit UI states.

4. Validate/limit status transitions in UI.
   - File: `delivery-order.component.ts`
   - Suggestion: show only valid next actions based on current order status instead of always rendering all three buttons.

5. Use `trackBy` for jobs list rendering.
   - File: `delivery-jobs.component.ts`
   - Suggestion: add `trackBy` on order ID to reduce unnecessary DOM updates.

6. Keep user in the active mode after accepting a job.
   - File: `delivery-jobs.component.ts`
   - Suggestion: refresh both lists or update local state instead of hard-switching to `ASSIGNED` after `accept()`.

7. Improve feedback messaging for actions.
   - File: `delivery-order.component.ts`
   - Suggestion: distinguish API/network errors from business validation errors and show clearer user-facing messages.
