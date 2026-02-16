# 17) Responsive design — মোবাইল-প্রথম চিন্তা

**কি শিখবেন**
- Media queries, breakpoints; mobile-first।
- Fluid layouts, responsive টাইপ/ইমেজ, `clamp()`।

**Code**
```css
body { margin:0; padding: 1rem; }
.page { width: min(1100px, 92vw); margin: 0 auto; }
h1 { font-size: clamp(1.6rem, 2vw + 1rem, 2.4rem); }

@media (min-width: 768px) {
  .layout { display:grid; grid-template-columns: 240px 1fr; gap: 1rem; }
}
```

**Interview takeaways**
- Mobile-first: base styles small screens, তারপর min-width breakpoints।
- `clamp()` টাইপ/spacing smooth স্কেল দেয়; বড় ফাঁক ছাড়া।
- Responsive images: `max-width:100%; height:auto;` অথবা `srcset/sizes`।

**আরো উদাহরণ (beginner → advanced)**
1) Simple media query
```css
@media (max-width: 600px) { nav { flex-direction: column; } }
```
2) Fluid container
```css
.container { width: min(1200px, 95vw); }
```
3) Responsive table to cards
```css
@media (max-width: 640px) {
  table, thead, tbody, tr, td { display: block; }
  td::before { content: attr(data-label); font-weight: 700; }
}
```
4) Responsive image
```css
img { max-width: 100%; height: auto; }
```
5) Clamp spacing
```css
.section { padding: clamp(1rem, 2vw, 2rem); }
```
6) Orientation-specific rule
```css
@media (orientation: landscape) { .hero { min-height: 60vh; } }
```
7) Responsive gap via clamp
```css
.grid { display:grid; gap: clamp(10px, 2vw, 24px); }
```
8) Safe-area padding for notch devices
```css
header { padding-top: max(16px, env(safe-area-inset-top)); }
```
9) Container query (modern)
```css
@container (min-width: 500px) { .card { display:grid; grid-template-columns: 1fr 1fr; } }
```
10) Reduce motion for mobile
```css
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto; } }
```

**Try it**
- Intake form দুই কলাম (>=768px) থেকে এক কলাম (মোবাইল) করুন।
- Hero টেক্সট `clamp` দিয়ে স্কেল করুন; breakpoints কমান।
- একটি ছবিতে `srcset` যোগ করে নেটওয়ার্ক tab-এ লোড হওয়া সাইজ দেখুন।  
