# ফ্রন্টএন্ড ডেভেলপার রোডম্যাপ (Angular-কেন্দ্রিক) — ২০২৬ ট্র্যাক

উদ্দেশ্য: একদম শুরু থেকে প্রোডাকশন-রেডি Angular ইঞ্জিনিয়ার হওয়ার সিঁড়ি। প্রতিটি ধাপ একটি ডেলিভারেবল।

## টাইমলাইন এক নজরে
| সপ্তাহ | ফোকাস | কী শিপ করবেন |
| --- | --- | --- |
| 0–2 | Web + TS বেসিক | রেসপন্সিভ স্ট্যাটিক পেজ + TS কাতা রেপো (lint/format সহ) |
| 2–5 | Angular fundamentals | রাউটিং/ফর্ম/HTTP/বেসিক স্টেটসহ Angular অ্যাপ + ESLint/Prettier |
| 5–8 | আর্কিটেকচার & স্টেট | ComponentStore/Nx বা NgRx দিয়ে একটি ফিচার স্লাইস; ডিজাইন টোকেন থিমিং |
| 8–10 | পারফরম্যান্স & UX | Lazy routes, OnPush/Signals, স্কেলেটন লোডার, বাণ্ডেল রিপোর্ট |
| 10–12 | টেস্টিং & কোয়ালিটি | ইউনিট + কম্পোনেন্ট + e2e টেস্ট CI-তে পাস |
| 12–14 | Build/Ops/Sec | CI/CD পাইপলাইন, env কনফিগ, auth interceptor, error monitoring |
| 14–16 | অ্যাডভান্সড | Storybook ডিজাইন সিস্টেম স্লাইস, PWA/অফলাইন বা রিয়েল-টাইম ডেমো |
| 16–18 | পোর্টফোলিও | পাবলিক রেপো + লাইভ ডেপ্লয় + ADR + perf/a11y রিপোর্ট |

## ০. Foundations (সপ্তাহ 0–2)
- HTML5 semantics, ফর্ম, মিডিয়া; CSS Flexbox/Grid, responsive units; a11y বেসিক (labels/landmarks/contrast)।
- Modern JS: ES modules, async/await, Promise প্যাটার্ন, array/object হেল্পার, fetch/AbortController।
- TypeScript বেসিক: strict, generics, unions, narrowing, `tsconfig` hygiene।
- Git/GitHub ওয়ার্কফ্লো; Node/npm; ESLint/Prettier সেটআপ।
- What to ship: এক পেজের রেসপন্সিভ লেআউট + TS কাতা (map/filter/reduce, async/await fetch mock)।
- Checkpoint: Lighthouse a11y ≥ 90; ESLint/Prettier on-save; `tsc --noEmit` ক্লিন।

## ১. Angular Fundamentals (সপ্তাহ 2–5)
- Angular CLI ইনস্টল ও প্রজেক্ট স্ক্যাফোল্ড; CLI অ্যানাটমি।
- Components: decorator, template, style scope, inputs/outputs, content projection।
- Template সিনট্যাক্স: binding, `*ngIf`, `*ngFor`, `ngSwitch`, pipes, template refs, standalone components।
- Services & DI: providers, injection scope, `HttpClient`, interceptors, environment config।
- Routing: nested/lazy routes, guards/resolvers, route data।
- Forms: template vs reactive, validators/async validators, form arrays, custom controls।
- RxJS: Observable, Subject/BehaviorSubject, map/switchMap/mergeMap/tap/catchError, unsubscribe প্যাটার্ন (`takeUntil`, `async` pipe)।
- What to ship: CRUD ফিচার (list + detail route), reactive form validation, HttpClient API কল (mock/json-server চলবে)।
- Checkpoint: টেমপ্লেট এরর নেই; strict TS on; যেখানে সম্ভব `async` pipe।

## HTML & CSS (সর্বক্ষণিক)
- Semantic HTML, ARIA বেসিক; সঠিক label সহ ফর্ম; responsive মিডিয়া।
- Layout: Flexbox, Grid, stacking context, positioning; fluid/clamp() প্যাটার্ন।
- Styling সিস্টেম: CSS variables, BEM বা utility-hybrid; থিম টোকেন; dark/light টগল।
- What to ship: নেভ/হিরো/কার্ড/ফর্মসহ a11y-ফ্রেন্ডলি লেআউট; 360px–1440px রেসপন্সিভ।

## Version Control & Tooling
- Git দক্ষতা: branching, rebase বনাম merge, stash, bisect।
- Tooling: npm/yarn/pnpm, package scripts, Nx/Turbo বেসিক, lint-staged + husky।
- IDE: ESLint, Prettier, EditorConfig, Angular Language Service।

## TypeScript (Highly Recommended)
- সর্বত্র strict; enum বনাম union; generics কম্পোনেন্ট/সার্ভিসে; utility types (Partial/Pick/Omit)।
- Narrowing (in/instanceof/discriminated unions); mapped/conditional types API DTO-তে।
- What to ship: টাইপ-সেইফ HttpClient র‍্যাপার; শেয়ার্ড মডেল লাইব; কোডে `any` শূন্য।

## ২. Architecture & State (সপ্তাহ 5–8)
- Feature boundary; smart vs presentational; standalone vs NgModule ইন্টারঅপ।
- State: RxJS services + signals/subjects; ComponentStore; NgRx (actions/reducers/effects/selectors/entities)।
- Data contracts: interfaces/zod/io-ts; error/loading মডেল; optimistic update।
- UI composition: ডিজাইন সিস্টেম/Material, a11y-প্রথম কম্পোনেন্ট।
- What to ship: ComponentStore/NgRx দিয়ে একটি ফিচার (load/list/create/update), optimistic উদাহরণ, থিম টোকেন।
- Checkpoint: কোনো circular dep নয়; মেমোয়াইজড selectors; শেয়ার্ড UI ডকুমেন্টেড।

## ৩. Performance & UX (সপ্তাহ 8–10)
- Change detection: default বনাম `OnPush`, signals, zone-less; async pipe বনাম ম্যানুয়াল subscribe।
- Code splitting: route-level lazy, `import()` chunks, preloading।
- Rendering: SSR/SSG (Angular Universal), hydration; lazy/defer images; CDK virtual scroll।
- Profiling: Angular DevTools, Chrome Performance, Lighthouse; bundle analysis; perf budget।
- Perceived UX: skeleton/shimmer, optimistic UI, toast, progress indicators।
- What to ship: hot path-এ OnPush/Signals, অন্তত ১ lazy route, skeleton loader, bundle রিপোর্ট।
- Checkpoint: বাণ্ডেল বাজেটের মধ্যে; LCP লক্ষ্য পূরণ; hydration error নেই।

## ৪. Testing & Quality (সপ্তাহ 10–12)
- ইউনিট: TestBed + Jest/Vitest + Angular Testing Library; harness; HttpClient/Router মক।
- e2e: Playwright/Cypress; নেটওয়ার্ক স্টাব; ভিজুয়াল রিগ্রেশন (ঐচ্ছিক)।
- A11y চেক: axe-core/Pa11y CI; কী-বোর্ড ট্র্যাপ/ফোকাস ম্যানেজমেন্ট।
- Static quality: ESLint (Angular rules), strict TS, lint-staged হুক, CI format গেট।
- What to ship: critical path 80%+ কভারেজ; auth + main flow e2e smoke; CI-তে a11y লিন্ট।
- Checkpoint: CI সবুজ; ফ্লেকি টেস্ট ঠিক; axe violations শূন্য।

## ৫. Build, Ops, Security (সপ্তাহ 12–14)
- Environments/config; সিক্রেট হ্যান্ডলিং; JWT/OAuth2; auth/refresh interceptor।
- CI/CD: GitHub Actions (lint → test → build → preview); cache।
- Deploy: static + functions (Netlify/Vercel) অথবা SSR কন্টেইনার (Node 22 LTS)।
- Budgets: CI বাণ্ডেল গার্ড; sourcemap + error monitoring (Sentry/Otel)।
- Security: CSP বেসিক, sanitization, Trusted Types, dep audit (`npm audit`, `depcheck`)।
- What to ship: workflow ফাইল, env স্ট্র্যাটেজি, auth interceptor+refresh, monitoring হুক।
- Checkpoint: প্রতি PR প্রিভিউ; bundle-size চেক; ডিপেন্ডেন্সি স্ক্যান পাস।

## ৬. Advanced Topics (সপ্তাহ 14–16)
- Design systems: tokens/theming, Storybook, snapshot + interaction tests।
- Forms at scale: dynamic forms, stepper/wizard, complex validation UX।
- i18n: built-in, locale data, ICU, RTL।
- Real-time/offline: WebSockets + RxJS, Service Worker/PWA, background sync, indexedDB।
- Large repo: Nx/Turbo, path aliases, generators, affected builds/tests।
- What to ship: Storybook 5+ কম্পোনেন্ট, PWA বা WebSocket উইজেট, i18n ডেমো।
- Checkpoint: টোকেন ব্যবহার হচ্ছে; বাজেট পাস; Storybook CI সবুজ।

## ৭. Portfolio & Interview Prep (সপ্তাহ 16–18)
- ফিচার-কমপ্লিট অ্যাপ: auth, routing, forms, state, SSR, testing, a11y রিপোর্ট, CI/CD ব্যাজ।
- ADR ও README রানবুক লিখুন; পারফরম্যান্স ফলাফল ডকুমেন্ট করুন।
- ডিবাগ ড্রিল: সাবস্ক্রিপশন লিক, change-detection churn, hydration mismatch পুনরুত্পাদন ও ঠিক।
- Frontend system design: routing, data-fetch, caching, error boundary, loading স্টেট।
- What to ship: পাবলিক রেপো + লাইভ ডেপ্লয়; ADR; Lighthouse + axe রিপোর্ট; ছোট ভিডিও walkthrough।
- Checkpoint: রিক্রুটার-রেডি README; বন্ধ টিকিটসহ বোর্ড; রিলিজ ট্যাগ।

## APIs & Backend Basics
- REST: resources, status codes, pagination, filtering; OpenAPI/Swagger পড়া।
- Auth: JWT, refresh, cookie বনাম header; CORS বেসিক।
- Mocking: json-server, MSW; contract tests; 4xx/5xx/timeout UI হ্যান্ডলিং।

## State Management (Angular flavor)
- কখন service + BehaviorSubject যথেষ্ট; কখন ComponentStore; কখন NgRx।
- প্যাটার্ন: normalized entities, cache invalidation, optimistic update, error/loading slice।
- Signals + RxJS ইন্টারঅপ; selector memoization; reducer/effect/store টেস্টিং।

## Testing (recap + specifics)
- ইউনিট: pure functions, pipes, services; harness; Testing Library DOM queries।
- e2e: auth flow, guard চেক, offline/slow নেটওয়ার্ক সিমুলেশন।
- Contract: API schema validation; MSW মক; Storybook snapshot vs interaction tests।

## Performance & Optimization (recap)
- মেট্রিক: LCP, CLS, TTI, TBT; Lighthouse/Web Vitals দিয়ে মাপুন।
- টেকনিক: code splitting, prefetch/preload, ইমেজ অপ্টিমাইজ, caching, OnPush/Signals, trackBy, virtual scroll।
- টুল: Angular DevTools profiler, Chrome Performance, source-map-explorer।

## Deployment & DevOps Basics
- Pipeline: lint/test/build PR-এ; প্রিভিউ ডেপ্লয়; env promotion (dev→stg→prod)।
- Hosting: static vs SSR container; CDN cache; cache-busting; rollback কৌশল।
- Monitoring: Sentry/Otel traces, uptime/synthetic checks; লগ হাইজিন।

## Advanced Topics (To Stand Out)
- Micro-frontend (Module Federation); Web Components ইন্টারঅপ।
- A11y depth: focus trap, roving tabindex, reduced motion, screen reader scripts।
- Security depth: CSP nonce, Trusted Types, dependency signing/SBOM।
- Perf depth: 103 Early Hints/edge cache স্ট্র্যাটেজি।

## Build Projects (VERY IMPORTANT)
- ৩টি বাছুন: ফর্ম-হেভি ইন্টেক, ডেটা-গ্রিড অ্যাডমিন, রিয়েল-টাইম ড্যাশবোর্ড, PWA অফলাইন নোট, SSR কনটেন্ট + i18n।
- প্রতিটিতে: ADR, টেস্ট, perf/a11y মাপ, বাজেট সেট, প্রিভিউ/প্রড ডেপ্লয়, রিলিজ ট্যাগ।

## Become Job Ready
- পোর্টফোলিও: ১টি পালিশড অ্যাপ + ২টি ফোকাসড ডেমো; লাইভ লিঙ্ক, স্ক্রিনশট, README রানবুক।
- ইন্টারভিউ: change detection, RxJS অপারেটর, state চয়েস, perf ট্যাকটিক্স ব্যাখ্যা প্র্যাকটিস।
- ক্যারিয়ার হাইজিন: ভালো কমিট মেসেজ, ইস্যু ট্র্যাকিং, PR ডিসক্রিপশন; প্রতি প্রকল্পে ছোট ডেমো ভিডিও।

## Practice Projects (প্রগতি অনুযায়ী কঠিন)
- Form-heavy: reactive ফর্মসহ মাল্টি-স্টেপ ইন্টেক, async validator, autosave।
- Data-heavy: অ্যাডমিন টেবিল (server pagination, filter, virtual scroll, CSV export)।
- Real-time: WebSocket ড্যাশবোর্ড, backpressure সহ RxJS, offline fallback।
- Full-stack: SSR অ্যাপ with auth, feature flags, role-based nav, e2e + a11y CI।

## Habit Checklist (চলমান)
- ছোট PR শিপ; টেস্ট সবুজ; lint/format চালান।
- a11y অ্যাকসেপ্টেন্স: কিবোর্ড, screen-reader label, focus order।
- ইন্সট্রুমেন্টেশন: লগ/ট্রেস; বড় UI কাজের পর FCP/LCP/TTI মাপুন।
- ডিপেন্ডেন্সি আপডেট রাখুন; Angular রিলিজ নোট পড়ুন; signals/standalone দিকে রিফ্যাক্টর করুন।

## Suggested Weekly Cadence
- সোম: স্প্রিন্ট লক্ষ্য, টিকিট, measurable checkpoint (perf budget, coverage) সেট।
- মঙ্গল–বুধ: ফিচার বিল্ড; জটিল RxJS/স্টেট পেয়ার করুন; PR <300 লাইন।
- বৃহস্পতি: টেস্ট লিখুন/বাড়ান; Lighthouse/axe রান; রিগ্রেশন ঠিক; বাণ্ডেল টিউন।
- শুক্র: পিয়ার ডেমো; সিদ্ধান্ত ডক; ট্যাগড রিলিজ; ব্যাকলগ গ্রুম।

## Minimal Resource Pack
- Docs: Angular.dev, RxJS.dev, TypeScript Handbook।
- Tools: Angular CLI, Nx (ঐচ্ছিক), Angular DevTools, Chrome Performance, Lighthouse, axe-core, Playwright/Cypress।
- Reference repos: অফিসিয়াল Angular উদাহরণ, Angular Material, ComponentStore/NgRx স্যাম্পল।
