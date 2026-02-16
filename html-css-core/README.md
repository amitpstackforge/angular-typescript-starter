# HTML & CSS Core — Startup Interview Track (Bengali, 2-week plan)

হাসপাতাল ম্যানেজমেন্ট ডোমেইন ব্যবহার করে HTML/CSS ফাউন্ডেশন থেকে ইন্টারভিউ-রেডি পর্যায়ে পৌঁছানোর জন্য সংক্ষিপ্ত, প্র্যাক্টিক্যাল ট্র্যাক।

## কার জন্য
- B.Tech fresher / জুনিয়র ইঞ্জিনিয়ার
- ভারতীয় স্টার্টআপ ইন্টারভিউ (frontend/Jr. web dev) ফোকাস
- Angular/TypeScript ট্র্যাকের সাথে সমান্তরালে নেওয়া যায়

## দ্রুত শুরু (tooling)
- Node LTS + `npm i -g live-server` (বা VS Code Live Server extension)।
- `cd html-css-core/demos/hospital-landing && live-server` → ডেমো পেজ দেখুন।
- Browser support: modern evergreen (Chrome/Edge/Firefox). CSS clamp(), Grid, flex gap দরকার।


## Most-asked HTML/CSS interview questions (স্টার্টআপে)
1. Semantic tags কেন জরুরি? `<div>` vs `<main>/<section>`?
2. Flexbox vs Grid পার্থক্য ও কখন কোনটা?
3. Responsive units: `px` vs `rem` vs `%` vs `vw/vh` vs `clamp()`?
4. Form accessibility: label-for, aria-describedby, error messaging কিভাবে করবেন?
5. Specificity কিভাবে কাজ করে? কনফ্লিক্ট হলে কীভাবে ডিবাগ?
6. BEM/utility ক্লাস প্যাটার্নের সুবিধা কী?
7. Box model: padding/border/margin, `box-sizing: border-box` কেন প্র্যাকটিস?
8. Positioning: relative/absolute/fixed/sticky পার্থক্য ও ব্যবহার।
9. CSS performance: layout thrash এড়াতে কী করবেন? heavy shadow/filters এর প্রভাব?
10. prefers-reduced-motion কী? কিভাবে হ্যান্ডল করবেন?

## Topics (ordered, copy the files under `topics/`)
01) [topics/01-html-semantics-aria.md](topics/01-html-semantics-aria.md) — Semantics, landmarks, basic a11y  
02) [topics/02-forms-accessibility.md](topics/02-forms-accessibility.md) — Forms, validation, aria-live  
03) [topics/03-css-layout-flex-grid.md](topics/03-css-layout-flex-grid.md) — Flex/Grid basics for layout shell  
04) [topics/04-css-architecture-theme.md](topics/04-css-architecture-theme.md) — Tokens, BEM vs utility, theming  
05) [topics/05-responsive-media.md](topics/05-responsive-media.md) — clamp(), auto-fit grid, responsive media  
06) [topics/06-components-utilities.md](topics/06-components-utilities.md) — Buttons/badges + utility patterns  
07) [topics/07-performance-tooling.md](topics/07-performance-tooling.md) — Critical CSS, responsive images, fonts  
08) [topics/08-testing-debugging.md](topics/08-testing-debugging.md) — DevTools, Lighthouse/axe, smoke tests  
09) [topics/09-css-basics.md](topics/09-css-basics.md) — CSS syntax, inline/internal/external, colors/units  
10) [topics/10-selectors-specificity.md](topics/10-selectors-specificity.md) — Selectors, pseudo, specificity ladder  
11) [topics/11-box-model.md](topics/11-box-model.md) — Padding/border/margin, box-sizing, collapse  
12) [topics/12-display-position.md](topics/12-display-position.md) — Display modes, positioning, z-index  
13) [topics/13-typography.md](topics/13-typography.md) — Font stacks, size/weight/line-height, webfonts  
14) [topics/14-background-borders.md](topics/14-background-borders.md) — Backgrounds, gradients, shadows, radius  
15) [topics/15-flexbox.md](topics/15-flexbox.md) — Flexbox deep-dive (grow/shrink/basis, alignment)  
16) [topics/16-grid.md](topics/16-grid.md) — CSS Grid deep-dive, areas, auto-fit/fill  
17) [topics/17-responsive-design.md](topics/17-responsive-design.md) — Media queries, fluid layouts, responsive type/images  
18) [topics/18-transitions-animations.md](topics/18-transitions-animations.md) — Transition/transform, keyframes, motion safety  
19) [topics/19-modern-css.md](topics/19-modern-css.md) — Variables, calc/min/max/clamp, aspect-ratio, scroll snap  
20) [topics/20-advanced-effects.md](topics/20-advanced-effects.md) — Clip-path, filters, blend, backdrop-filter  
21) [topics/21-accessibility-css.md](topics/21-accessibility-css.md) — Focus styles, reduced motion/contrast  
22) [topics/22-performance-best.md](topics/22-performance-best.md) — Specificity hygiene, critical CSS, architecture  
23) [topics/23-preprocessors.md](topics/23-preprocessors.md) — Sass/SCSS basics, mixins, partials  
24) [topics/24-css-frameworks.md](topics/24-css-frameworks.md) — Tailwind intro, when/why, purge/JIT note  

## ফোল্ডার গাইড
- `topics/` — ছোট ছোট Markdown নোট (বাংলা ব্যাখ্যা + English কোড)।
- `demos/` — রানযোগ্য উদাহরণ; hospital data দিয়ে।
- `README.md` — এই ওভারভিউ + প্ল্যান + প্রশ্ন।

## এগিয়ে কী
1) `topics/01-html-semantics-aria.md` দিয়ে শুরু করুন।  
2) প্রতিটি “Try it” টাস্ক ছোট PR হিসেবে করুন।  
3) Day 14-এ “Mini project idea” অংশ ফলো করে ডেপ্লয়/ডেমো দিন।  
