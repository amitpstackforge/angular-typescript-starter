# 22) Performance & best practices — CSS হালকা রাখুন

**কি শিখবেন**
- Specificity wars এড়ানো, BEM/utility ব্যবহার।
- CSS সাইজ কমানো: purge/unused, minify, critical CSS।
- Architecture: SMACSS/ITCSS হিন্ট।

**Code**
```css
/* BEM + utilities mix */
.card { border: 1px solid #cbd5e1; padding: 1rem; border-radius: 10px; }
.card--alert { border-color: #ef4444; }
.u-flex { display: flex; gap: 0.75rem; }

/* Critical inline (above-the-fold) + async rest */
<style>body{margin:0;font-family:system-ui}</style>
<link rel="preload" as="style" href="/css/main.css">
<link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
```

**Interview takeaways**
- Low specificity → সহজ override → কম !important।
- CSS bundle কমাতে: unused purge (e.g., PurgeCSS), split critical vs rest, minify।
- Naming conventions (BEM) ও ITCSS স্তর (settings/tools/generic/elements/objects/components/trumps) structure দেয়।

**আরো উদাহরণ (beginner → advanced)**
1) Avoid deep selectors
```css
/* bad */ .app .main .card h3 { ... }
/* better */ .card__title { ... }
```
2) Utility reuse
```css
.u-gap-sm { gap: 8px; } .u-center { align-items: center; justify-content: center; }
```
3) Purge hint (Tailwind style)
```js
// purgecss.config.js
module.exports = { content: ['./**/*.html'], css: ['./dist/styles.css'] };
```
4) Critical CSS inline
```html
<style>header{position:sticky;top:0;background:#fff;}</style>
```
5) Media split
```html
<link rel="stylesheet" href="print.css" media="print">
```
6) Use :where to keep specificity low
```css
:where(h1, h2, h3) { margin: 0; }
```
7) Sprite sheet for icons
```css
.icon { width:16px; height:16px; background:url('/img/sprite.svg') no-repeat; background-size: 200px 200px; }
.icon--alert { background-position: -20px -40px; }
```
8) Containment for widgets
```css
.widget { contain: content; }
```
9) Font-display swap
```css
@font-face { font-family:'Inter'; src:url('/Inter.woff2') format('woff2'); font-display: swap; }
```
10) Lightweight shadow token
```css
:root { --shadow-sm: 0 4px 10px rgba(15,23,42,0.08); }
.card { box-shadow: var(--shadow-sm); }
```

**Try it**
- main.css থেকে অপ্রয়োজনীয় ক্লাস কেটে PurgeCSS চালিয়ে সাইজ তুলুন।
- DevTools Coverage ট্যাবে unused CSS শতাংশ দেখুন।
- BEM রুলে ৩টি কম্পোনেন্ট নাম লিখে specificity ladder কম রাখুন।  
