# Frontend Developer Roadmap (Angular-focused) — 2026 track

Purpose: actionable ladder from zero → production-ready Angular engineer. Each row is a milestone you should be able to demo or ship.

## Timeline at a Glance
| Weeks | Focus | What you should ship |
| --- | --- | --- |
| 0–2 | Web + TS foundations | Static responsive page + TS katas repo with lint/format |
| 2–5 | Angular fundamentals | Angular app with routing, forms, HTTP, basic state + ESLint/Prettier |
| 5–8 | Architecture & state | Feature slice using ComponentStore/Nx or NgRx; design tokens theming |
| 8–10 | Performance & UX | Lazy-loaded routes, OnPush/signals, skeleton loading, bundle report |
| 10–12 | Testing & quality | Unit + component + e2e tests passing in CI |
| 12–14 | Build/Ops/Security | CI/CD pipeline, env configs, auth interceptor, error monitoring |
| 14–16 | Advanced | Storybook design system slice, PWA/offline or real-time demo |
| 16–18 | Portfolio | Public repo + deployed app + ADRs + perf/a11y report |

## 0. Foundations (Week 0–2)
- HTML5 semantics, forms, media; CSS layout (Flexbox/Grid), responsive units, accessibility basics (labels, landmarks, contrast).
- Modern JavaScript: ES modules, async/await, Promise patterns, array/object helpers, fetch/AbortController.
- TypeScript essentials: strict typing, generics, unions, narrowing, `tsconfig` hygiene.
- Git/GitHub workflow: branching, PRs, code reviews; Node/npm basics; ESLint/Prettier setup.
- What to ship: single-page responsive layout (header/hero/form/table) + TS kata notebook (map/filter/reduce, async/await fetch mock).
- Checkpoint: Lighthouse a11y ≥ 90, ESLint/Prettier on save, `tsc --noEmit` clean.

## 1. Angular Fundamentals (Week 2–5)
- Install Node LTS + Angular CLI; generate a project; CLI anatomy.
- Components: decorators, templates, style scoping, inputs/outputs, content projection.
- Templates: binding syntax, structural directives (`*ngIf`, `*ngFor`, `ngSwitch`), pipes, template refs, standalone components.
- Services & DI: providers, injection scopes, `HttpClient`, interceptors, environment configs.
- Routing: nested routes, lazy-loaded routes, route guards/resolvers, route data.
- Forms: template-driven vs reactive forms, validators, async validators, form arrays, custom controls.
- RxJS fundamentals: Observables, Subjects/BehaviorSubject, operators (map, switchMap, mergeMap, tap, catchError), unsubscribing patterns (`takeUntil`, `async` pipe).
- What to ship: CRUD feature with list + detail route, reactive form with validation, API calls via HttpClient (can be json-server/mock).
- Checkpoint: No template errors, strict TS enabled, `async` pipe replaces manual subscriptions where possible.

## HTML & CSS (Always-on)
- Semantic HTML, ARIA basics; forms with proper labels; media responsiveness.
- Layout: Flexbox, Grid, stacking contexts, positioning; responsive patterns (fluid, clamp()).
- Styling systems: CSS variables, BEM/utility-first hybrids; theming tokens; dark/light toggles.
- What to ship: A11y-friendly layout with nav/hero/cards/form; responsive at 360px–1440px.

## Version Control & Tooling
- Git fluency: branching model, rebase vs merge, stash, bisect for regressions.
- Tooling: npm/yarn/pnpm, package scripts, Nx/Turbo basics, lint-staged + husky pre-commit.
- IDE setup: ESLint, Prettier, EditorConfig, Angular Language Service.

## TypeScript (Highly Recommended)
- Strict mode everywhere; enums vs unions; generics in components/services; utility types (Partial, Pick, Omit).
- Narrowing patterns (in, instanceof, discriminated unions); mapped/conditional types for API DTOs.
- What to ship: Type-safe HttpClient wrappers; shared model library; zero `any` in app code.

## 2. Architecture & State (Week 5–8)
- Feature/module boundaries; smart vs presentational components; standalone vs NgModule interop.
- State choices: RxJS services with signals/subjects; ComponentStore; NgRx (actions, reducers, effects, selectors, entity adapters).
- Data contracts: API typing with interfaces/zod/io-ts; error and loading models; optimistic updates.
- UI composition: design system/theming (Angular Material or custom), accessibility-first components.
- What to ship: One feature slice using ComponentStore/NgRx (load/list/create/update), optimistic update example, theme tokens file.
- Checkpoint: No circular deps; selectors/memoized derived state; shared UI components documented.

## 3. Performance & UX (Week 8–10)
- Change detection: default vs `OnPush`, signals, zone-less options; async pipe vs manual subscribe.
- Code splitting: route-level lazy loading, `import()`-based feature chunks, preloading strategies.
- Rendering: SSR/SSG with Angular Universal; hydration; defer/lazy images; CDK virtual scroll.
- Profiling: Angular DevTools, Chrome Performance, Lighthouse; bundle analysis; perf budgets.
- Perceived UX: skeletons/shimmers, optimistic UI, toast patterns, progress indicators.
- What to ship: Enable OnPush or signals in hot paths, lazy-load at least one route, skeleton loader, bundle size report.
- Checkpoint: Bundle < target budget (set a KB budget), LCP within goal on lab run, no major hydration errors.

## 4. Testing & Quality (Week 10–12)
- Unit tests with TestBed + Jest/Vitest + Angular Testing Library; component harnesses; mocking HttpClient/Router.
- Integration/e2e: Playwright or Cypress; network stubbing; visual regression (optional).
- Accessibility checks: axe-core/Pa11y CI gates; keyboard traps; focus management tests.
- Static quality: ESLint (Angular rules), TypeScript strictness, commit hooks (lint-staged), formatting gates in CI.
- What to ship: 80%+ critical-path coverage; e2e smoke for auth + main flow; a11y lint step in CI.
- Checkpoint: CI green on lint/test/e2e; flaky tests addressed; axe violations fixed.

## 5. Build, Ops, Security (Week 12–14)
- Environments & configs; secret handling; API gateway auth (JWT/OAuth2), HttpInterceptor for auth/refresh.
- CI/CD: GitHub Actions pipeline (lint → test → build → preview deploy); artifact caching.
- Deploy targets: static hosting + functions (Netlify/Vercel), container image (Node 22 LTS) for SSR.
- Performance budgets in CI; bundle size guard; sourcemaps + error monitoring (Sentry/OpenTelemetry).
- Security hygiene: CSP basics, sanitization, trusted types, dependency auditing (`npm audit`, `depcheck`).
- What to ship: CI/CD workflow file, env var strategy, auth interceptor + refresh, error monitoring hook.
- Checkpoint: Deploy preview per PR; bundle-size check in pipeline; dependency scan passes.

## 6. Advanced Topics (Week 14–16)
- Design systems: tokens, theming, story-driven development with Storybook; snapshot + interaction tests.
- Forms at scale: dynamic forms, stepper/wizard flows, complex validation UX.
- Internationalization: built-in i18n; locale data; ICU messages; RTL support.
- Real-time & offline: WebSockets with RxJS, Service Worker/PWA, background sync, indexedDB wrappers.
- Large-repo productivity: Nx or Turborepo, path aliases, generators, affected builds/tests.
- What to ship: Storybook with 5+ components + controls; PWA toggle or WebSocket-powered widget; i18n demo page.
- Checkpoint: Design tokens consumed in components; build still passes budgets; Storybook CI build works.

## 7. Portfolio & Interview Prep (Week 16–18)
- Build a feature-complete app: auth, routing, forms, state, SSR, testing, accessibility report, CI/CD badge.
- Document architecture decisions (ADR), trade-offs, and perf results; add README runbook.
- Drill debugging: reproduce/patch 3 common prod bugs (memory leak from subscriptions, change detection churn, hydration mismatch).
- System design for frontend: routing strategy, data-fetch patterns, caching, error boundaries, loading states.
- What to ship: Public repo + live deploy; ADRs; perf (Lighthouse) + a11y (axe) report; short loom/video walkthrough.
- Checkpoint: Recruiter-ready README (what/why/how/run/test/deploy); issues board with closed tickets; release tag.

## APIs & Backend Basics
- REST fundamentals: resources, status codes, pagination, filtering; OpenAPI/Swagger reading.
- Auth flows: JWT, refresh tokens, cookie vs header; CORS basics.
- Mocking: json-server, MSW; contract tests; error-state UIs for 4xx/5xx/timeouts.

## State Management (Angular flavor)
- When service + BehaviorSubject is enough; when to reach for ComponentStore; when NgRx fits.
- Patterns: normalized entities, cache invalidation, optimistic updates, error/loading slices.
- Signals interop with RxJS; selector memoization; testing reducers/effects/stores.

## Testing (recap + specifics)
- Unit: pure functions, pipes, services; component harnesses; DOM queries via Testing Library.
- e2e: auth flow, routing guard checks, offline/slow network simulations.
- Contract: schema validation of API responses; mocking with MSW; snapshot vs interaction tests in Storybook.

## Performance & Optimization (recap)
- Metrics: LCP, CLS, TTI, TBT; measure via Lighthouse/Web Vitals.
- Techniques: code splitting, prefetch/preload, image optimization, caching strategies, OnPush/signals, trackBy, virtual scroll.
- Tooling: Angular DevTools profiler, Chrome Performance, source-map-explorer.

## Deployment & DevOps Basics
- Pipelines: lint/test/build on PR; preview deploys; env promotion (dev→stg→prod).
- Hosting: static vs SSR container; CDN caching; cache-busting; rollbacks.
- Monitoring: Sentry/OpenTelemetry traces, uptime + synthetic checks; log hygiene.

## Advanced Topics (To Stand Out)
- Micro-frontends (Module Federation); Web Components interoperability.
- Accessibility depth: focus traps, roving tabindex, reduced motion, screen reader testing scripts.
- Security depth: CSP nonces, Trusted Types, dependency signing/SBOM.
- Performance depth: Server Push alternatives (103 Early Hints), edge caching strategies.

## Build Projects (VERY IMPORTANT)
- Pick 3: form-heavy intake app, data-grid admin, real-time dashboard, PWA offline notes, SSR content site with i18n.
- For each: write ADRs, add tests, measure perf/a11y, set budgets, deploy to preview/prod, tag release.

## Become Job Ready
- Portfolio: 1 polished app + 2 smaller focused demos; live links + screenshots + README runbooks.
- Interviews: rehearse whiteboardless explanations of change detection, RxJS operators, state choices, perf tactics.
- Career hygiene: commit history with good messages, issue tracking, PR descriptions; short demo video/loom per project.

## Practice Projects (progressively harder)
- Form-heavy: Multi-step patient intake with reactive forms, async validators, autosave.
- Data-heavy: Admin table with server pagination, column filters, virtual scroll, CSV export.
- Real-time: Live dashboard using WebSocket feed, backpressure with RxJS, offline fallback.
- Full-stack: SSR app with protected routes, feature flags, role-based nav, e2e + a11y checks in CI.

## Habit Checklist (keep recurring)
- Ship small PRs; keep tests green; run lint/format before push.
- Add a11y acceptance: keyboard, screen-reader labels, focus order.
- Instrument: log/trace key flows; measure FCP/LCP/TTI after major UI work.
- Keep dependencies current; read Angular release notes; refactor toward signals/standalone as appropriate.

## Suggested Weekly Cadence (lightweight)
- Mon: Plan sprint goals; create tickets; set measurable checkpoints (perf budgets, coverage).
- Tue–Wed: Build features; pair on tricky RxJS/state pieces; keep PRs <300 lines.
- Thu: Write/expand tests; run Lighthouse/axe; fix regressions; tune bundle.
- Fri: Demo to a peer; document decisions/notes; cut a tagged release; backlog grooming.

## Minimal Resource Pack
- Docs: Angular.dev (latest), RxJS.dev, TypeScript handbook.
- Tools: Angular CLI, Nx (optional), Angular DevTools, Chrome DevTools Performance, Lighthouse, axe-core, Playwright/Cypress.
- Reference repos to study: official Angular examples, Angular Material docs, ComponentStore and NgRx example apps.
