# Cart Component: Enhancements and Potential Bugs

Target file: `src/app/features/cart/cart.component.ts`

## Enhancement Points

- Add `loading` and `error` UI states for cart fetch/update operations.
- Format `lineTotal` and `itemTotal` with Angular currency pipe for consistent INR display.
- Add `trackBy` to `*ngFor` for better rendering performance on item updates.
- Add `aria-label` text for `+` and `-` quantity buttons to improve accessibility.
- Disable quantity and remove buttons while update requests are in flight.
- Remove debug-style fields (`MenuItemId`, duplicated `Qty`) from customer-facing UI.
- Move inline template to a separate HTML file to make maintenance easier.
- Add component tests for empty state, quantity changes, remove action, and checkout enablement.

## Potential Bugs / Risks

- If `cartStore.load()` fails, users get no visible error feedback and may see a blank/partial cart view.
- Rapid clicks on quantity buttons can trigger multiple `upsert` calls and produce race-condition totals.
- `+` action has no client-side upper bound, so invalid high quantities may be sent to the backend.
- `Checkout` uses conditional `routerLink` with click prevention; behavior can still be confusing for keyboard/screen-reader users.
- Currency display is mixed (pipe + manual `₹`), which can produce inconsistent rounding/locale output.
- No `trackBy` in `*ngFor` can cause full row re-renders and focus jumps during updates.
 
