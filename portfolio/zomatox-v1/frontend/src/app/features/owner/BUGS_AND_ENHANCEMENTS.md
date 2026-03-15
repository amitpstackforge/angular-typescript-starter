# Owner Feature - Bugs and Enhancements

## Bugs

1. No error handling for API failures in both components.
   - Files: `owner-orders.component.ts`, `owner-restaurants.component.ts`
   - Current behavior: failed HTTP calls are silent and UI state is not updated.
   - Impact: owner does not know why data is missing or status update failed.

2. Orders list can show stale data when status update fails.
   - File: `owner-orders.component.ts`
   - Current behavior: `set()` assumes success path only and reloads on success, but gives no fallback on failure.
   - Impact: owner may think status update worked while backend rejected it.

3. Missing empty-state UI for both lists.
   - Files: `owner-orders.component.ts`, `owner-restaurants.component.ts`
   - Current behavior: when API returns empty array, screen looks blank.
   - Impact: unclear whether there is no data or loading/error issue.

## Enhancements

1. Replace `any[]` with typed models.
   - Files: `owner-orders.component.ts`, `owner-restaurants.component.ts`
   - Suggestion: introduce `OwnerOrder` and `OwnerRestaurant` interfaces for compile-time safety.

2. Add loading, empty, and error states.
   - Files: `owner-orders.component.ts`, `owner-restaurants.component.ts`
   - Suggestion: use signals like `isLoading`, `errorMessage`, and conditional templates for clearer UX.

3. Disable status action buttons while update is in progress.
   - File: `owner-orders.component.ts`
   - Suggestion: track pending order IDs to prevent duplicate clicks and race conditions.

4. Add `trackBy` for `*ngFor` lists.
   - Files: `owner-orders.component.ts`, `owner-restaurants.component.ts`
   - Suggestion: improve rendering performance and reduce DOM churn for list updates.

5. Validate allowed status transitions in UI.
   - File: `owner-orders.component.ts`
   - Suggestion: only show actions that are valid from the current state (for example, hide `PREPARING` when already preparing).

6. Improve order amount formatting.
   - File: `owner-orders.component.ts`
   - Suggestion: use Angular currency pipe for locale-safe formatting instead of raw interpolation.
