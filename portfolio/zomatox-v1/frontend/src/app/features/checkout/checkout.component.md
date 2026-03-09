# Checkout Component: Enhancements and Potential Bugs

Target file: `src/app/features/checkout/checkout.component.ts`

## Enhancement Points

- Add a `loading` state while fetching addresses and while placing an order to prevent duplicate actions.
- Disable the address `<select>` and `Place Order` button during submission.
- Add a visual success/processing indicator after `Place Order` is clicked.
- Use Angular `currency` pipe for any monetary values shown in checkout summary (if added later), instead of manual formatting.
- Add support for creating a new address directly from checkout when no addresses are available.
- Move initial API call from constructor to `ngOnInit` for better lifecycle clarity and easier testing.
- Add typed error mapping helper to avoid repeating fallback message logic.
- Improve accessibility by linking labels with `for`/`id` and adding `aria-live` to error messages.
- Add unit tests for address preload, invalid address guard, successful place order flow, and API error cases.

## Potential Bugs / Risks

- `Place Order` can be clicked multiple times quickly; duplicate order API calls may occur without submission locking.
- `addressId.set(+$any($event.target).value)` can produce `NaN` if the event value is unexpected.
- No explicit handling for unauthorized/session-expired responses; user may only see generic errors.
- Navigation to order details assumes `o.id` always exists; malformed API responses can break route navigation.
- Checkout currently relies on saved addresses only; when empty, user is blocked with no in-flow recovery.
- `this.cart.load()` is called after order creation without error handling; cart refresh failures are silent.
