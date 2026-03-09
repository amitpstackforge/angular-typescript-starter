# Restaurant List Component: Enhancements and Potential Bugs

Target file: `src/app/features/restaurants/restaurant-list.component.ts`

## Enhancement Points

- Add `loading` and `error` states so users understand when data is being fetched or when API calls fail.
- Show an explicit empty state when `restaurants().length === 0` (for example, "No restaurants found").
- Add pagination or infinite scroll support; current request always uses `page: 0`.
- Use `trackBy` with `*ngFor` to reduce DOM re-renders for larger lists.
- Replace hardcoded city options with API-driven or config-driven values.
- Add stronger typing for `sort` (for example a union type: `'rating' | 'time'`) to prevent invalid values.
- Move API trigger for search to a reactive flow (debounce input) or keep button search but disable while loading.
- Improve accessibility: connect labels to controls using `for`/`id`, and add `alt` text for restaurant images.
- Add skeleton cards while loading instead of showing a blank list area.

## Potential Bugs / Risks

- `r.ratingAvg.toFixed(1)` can throw if `ratingAvg` is `null`/`undefined` or not a number.
- API errors are not handled (`subscribe` has no error callback), so failures silently break list refresh.
- Defaulting `city = 'Kolkata'` may unintentionally hide restaurants from other cities on first load.
- Image loading has no fallback handler for broken URLs (`(error)` not handled), so users may see broken image icons.
- External fallback image (`picsum.photos`) adds a third-party dependency and can fail unpredictably.
- Using constructor for initial data load works, but `ngOnInit` is generally safer for lifecycle clarity and testability.
