# 07) Performance & tooling — images, fonts, audits

**কি শিখবেন**
- Critical CSS বনাম defer; CSS/JS কমানো।
- ইমেজ অপ্টিমাইজেশন (size, format, lazy); font-display।
- Lighthouse/a11y audit দ্রুত চেকলিস্ট।

**Code**
```html
<link rel="preload" as="style" href="/css/main.css" />
<link rel="stylesheet" href="/css/main.css" media="all" />

<img src="icu-640.webp"
     srcset="icu-320.webp 320w, icu-640.webp 640w, icu-960.webp 960w"
     sizes="(max-width: 600px) 90vw, 400px"
     alt="ICU bed"
     loading="lazy" />

<style>
@font-face {
  font-family: 'InterVar';
  src: url('/fonts/Inter.var.woff2') format('woff2-variations');
  font-display: swap;
}
:root { font-family: 'InterVar', system-ui; }
</style>
```

**Interview takeaways**
- `preload` critical CSS দ্রুত করে; বাকি CSS split করুন।
- Responsive `srcset` + `sizes` ব্যান্ডউইথ বাঁচায়; `loading="lazy"` ফোল্ড-এর নিচের ছবির জন্য।
- `font-display: swap` FOIT এড়ায়; variable fonts ফাইল সংখ্যা কমায়।
- Lighthouse → Performance + A11y স্কোর শেয়ার করতে পারা স্টার্টআপ ইন্টারভিউতে শক্তি।

**আরো উদাহরণ (beginner → advanced)**
1) Beginner — defer JS
```html
<script src="/app.js" defer></script>
```
2) Beginner — preload font
```html
<link rel="preload" as="font" href="/fonts/Inter.var.woff2" type="font/woff2" crossorigin>
```
3) Intermediate — lazy iframe
```html
<iframe src="beds.html" loading="lazy" title="Beds overview"></iframe>
```
4) Intermediate — compression hint
```bash
npx imagemin assets/* --out-dir=public/img
```
5) Advanced — inline critical CSS
```html
<style>
/* critical above-the-fold */
body { margin:0; font-family:system-ui; }
.topbar { position:sticky; top:0; }
</style>
<link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
```

**Try it**
- Pharmacy পেজে `picture` ট্যাগ দিয়ে webp+fallback যোগ করুন।
- main.css split করে `critical.css` ইনলাইন করুন; বাকি `media="print"` হ্যাক এড়িয়ে rel=preload + onload সুইচ ব্যবহার করুন।
- Lighthouse রান করে LCP কমানোর ২টি একশন নোট করুন।  
