# 21) Accessibility in CSS — ফোকাস ও মোশন কেয়ার

**কি শিখবেন**
- Focus styles কাস্টমাইজ; prefers-reduced-motion/contrast সম্মান।
- রঙ contrast বেসিক; high-contrast মোড বিবেচনা।

**Code**
```css
:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  * { scroll-behavior: auto !important; animation: none !important; transition: none !important; }
}

@media (prefers-contrast: more) {
  :root { --accent: #0b63ce; }
  .btn { border: 2px solid currentColor; }
}
```

**Interview takeaways**
- Focus-visible ব্যবহারে মাউস ইউজারদের অপ্রয়োজনীয় outline এড়ায় কিন্তু কিবোর্ড ইউজারদের রক্ষা করে।
- prefers-reduced-motion ও prefers-contrast সম্মান করলে a11y সচেতনতা প্রদর্শিত হয়।
- Contrast ratio AA (4.5:1) লক্ষ্য রাখুন; DevTools/axe দিয়ে মাপুন।

**আরো উদাহরণ (beginner → advanced)**
1) Focus ring on buttons/links
```css
button:focus-visible, a:focus-visible { box-shadow: 0 0 0 3px rgba(37,99,235,0.35); }
```
2) Hover vs focus parity
```css
.card:hover, .card:focus-within { border-color: #2563eb; }
```
3) Reduced motion on parallax
```css
@media (prefers-reduced-motion: reduce) { .parallax { background-attachment: initial; } }
```
4) High contrast alt theme
```css
@media (forced-colors: active) {
  * { border-color: ButtonText !important; }
}
```
5) Visible skip link
```css
.skip { position:absolute; left:-999px; }
.skip:focus { left: 12px; top:12px; background:#fff; padding:8px; }
```
6) `:target` highlight for in-page links
```css
:target { outline: 3px solid #22c55e; outline-offset: 4px; }
```
7) sr-only utility
```css
.sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); }
```
8) Form error border + message spacing
```css
.field[aria-invalid="true"] { border-color: #ef4444; }
.field + .error { color:#b91c1c; margin-top:4px; }
```
9) Prefers-reduced-transparency fallback
```css
@media (prefers-reduced-transparency: reduce) { .glass { background: #0f172a; backdrop-filter: none; } }
```
10) Larger tap targets on mobile
```css
@media (max-width: 640px) { button, a { min-height: 44px; padding: 12px 14px; } }
```

**Try it**
- Intake form-এ skip link যোগ করুন (main-এ জাম্প করে), focus-visible স্টাইল দিন।
- prefers-reduced-motion অন করলে hero animation বন্ধ হচ্ছে কিনা পরীক্ষা করুন।
- Contrast checker দিয়ে badge টেক্সটের contrast যাচাই করুন।  
