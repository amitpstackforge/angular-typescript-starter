# Checkout Feature - Bugs and Enhancements

## Bugs

1. Duplicate order placement is possible.
   - File: `checkout.component.ts`
   - Current behavior: `Place Order` button stays enabled while API request is in flight.
   - Impact: users can trigger multiple `createOrder` calls and create duplicate orders.

2. Address select parsing can produce invalid number.
   - File: `checkout.component.ts`
   - Current behavior: `addressId.set(+$any($event.target).value)` may become `NaN` for unexpected values.
   - Impact: invalid payload can be sent to `createOrder`.

3. Stale/invalid selected address is not revalidated before submit.
   - File: `checkout.component.ts`
   - Current behavior: guard checks only truthiness (`!addressId()`), not whether ID exists in `addresses()`.
   - Impact: outdated selection may cause backend validation errors.

4. Cart refresh failure is silent after successful order placement.
   - File: `checkout.component.ts`
   - Current behavior: `this.cart.load()` is called without error handling and navigation proceeds.
   - Impact: cart UI can remain stale with no user feedback.

5. No route-level recovery when order response is malformed.
   - File: `checkout.component.ts`
   - Current behavior: navigation assumes `o.id` is always present.
   - Impact: malformed responses can route to invalid order URL.

6. Empty-address flow blocks checkout without in-flow action.
   - File: `checkout.component.ts`
   - Current behavior: when `addresses()` is empty, only a text warning is shown.
   - Impact: user is blocked and must leave flow manually to add address.

## Enhancements

1. Add submit/loading state management.
   - File: `checkout.component.ts`
   - Suggestion: track `isLoadingAddresses` and `isPlacingOrder` signals, and disable controls while requests run.

2. Move initial data fetch from constructor to `ngOnInit`.
   - File: `checkout.component.ts`
   - Suggestion: improve lifecycle clarity and make unit tests easier.

3. Add typed event handling for `<select>` change.
   - File: `checkout.component.ts`
   - Suggestion: avoid `$any` casts by using strongly typed event target parsing helpers.

4. Improve validation feedback for address selection.
   - File: `checkout.component.ts`
   - Suggestion: validate selected ID against current address list and show specific messages.

5. Provide quick action when no addresses exist.
   - File: `checkout.component.ts`
   - Suggestion: add "Add Address" CTA/navigation so checkout is recoverable in one step.

6. Improve accessibility and status announcements.
   - File: `checkout.component.ts`
   - Suggestion: add explicit label for the address select and `aria-live` region for errors/loading messages.

7. Add unit tests for checkout flows.
   - File: `checkout.component.ts`
   - Suggestion: cover address preload, empty state, invalid address guard, submit success, and submit failure.
