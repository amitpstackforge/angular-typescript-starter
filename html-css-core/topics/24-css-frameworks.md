# 24) CSS frameworks (পরের ধাপ) — Tailwind উদাহরণ

**কি শিখবেন**
- কখন ফ্রেমওয়ার্ক নেবেন: দ্রুত প্রোটোটাইপ, টিম কনসিসটেন্সি।
- Tailwind utility মানসিকতা; custom design system ওভাররাইড।

**Code (Tailwind CDN demo)**
```html
<script src="https://cdn.tailwindcss.com"></script>
<div class="max-w-xl mx-auto p-4">
  <h1 class="text-2xl font-bold text-slate-900">CityCare Beds</h1>
  <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
    <div class="border rounded-lg p-3 shadow-sm">
      <div class="font-semibold">ICU-1</div>
      <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-sm">Occupied</span>
    </div>
    <div class="border rounded-lg p-3 shadow-sm">
      <div class="font-semibold">ICU-2</div>
      <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm">Empty</span>
    </div>
  </div>
</div>
```

**Interview takeaways**
- ফ্রেমওয়ার্ক গ্রহণ মানে মূল CSS জ্ঞান এড়ানো নয়; ডিবাগ/override করতে বেসিক জানতে হবে।
- Tailwind ক্লাস কম্পোজিশন দ্রুত, কিন্তু ডোমেইন টোকেন (spacing/color) কাস্টমাইজ করতে config লাগবে।
- পারফরম্যান্স: JIT/purge ছাড়া CDN ভার্সন প্রডে ব্যবহার করবেন না।

**আরো উদাহরণ (beginner → advanced)**
1) Spacing utility
```html
<div class="p-4 space-y-2">...</div>
```
2) Flex utilities
```html
<div class="flex items-center gap-2"><button class="btn-primary">...</button></div>
```
3) Theme config hint (tailwind.config.js)
```js
module.exports = { theme: { extend: { colors: { accent: '#2563eb' } } } };
```
4) Component extraction
```html
<div class="card shadow-sm border rounded-lg p-4">...</div>
```
5) Purge/JIT note
```js
module.exports = { content: ['./index.html'], mode: 'jit' };
```
6) @apply to extract component
```css
.btn { @apply inline-flex items-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700; }
```
7) Custom container width
```js
module.exports = { theme: { container: { center: true, padding: '1rem', screens: { lg: '1100px' } } } };
```
8) Forms plugin enable
```js
module.exports = { plugins: [require('@tailwindcss/forms')] };
```
9) Utility merge with clsx (React)
```jsx
import clsx from 'clsx';
<button className={clsx('btn', disabled && 'opacity-50 cursor-not-allowed')}>Save</button>
```
10) DaisyUI theme swap example
```html
<html data-theme="corporate">
  <button class="btn btn-primary">Admit</button>
</html>
```

**Try it**
- CDN ডেমোকে স্থানীয় Tailwind JIT সেটআপে নিয়ে যান (content paths ঠিক করে)।
- Accent color config করে `.text-accent` ব্যবহার করুন।
- Card utility extract করে `@apply` দিয়ে ছোট CSS লিখুন।  
