# 13) Typography — পড়া সহজ করা

**কি শিখবেন**
- font-family stack, size/weight, line-height, letter-spacing।
- Text align/transform/decoration; web fonts দ্রুত লোড।

**Code**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
<h1 class="title">ICU Dashboard</h1>
<p class="lede">Monitor patients, beds, and pharmacy stock.</p>
```
```css
body { font-family: "Inter", system-ui, -apple-system, sans-serif; line-height: 1.6; }
.title { font-size: 2rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }
.lede { font-size: 1rem; color: #475569; }
```

**Interview takeaways**
- Line-height 1.4–1.7 পড়া আরামদায়ক; unitless হলে শিশু এলিমেন্টে উত্তরাধিকার পায়।
- Web font `display=swap` FOIT কমায়; ভ্যারিয়েবল ফন্ট ফাইল সংখ্যা কমায়।
- Typography tokens (size/weight/line-height) নির্ধারণ করে consistency বজায় রাখুন।

**আরো উদাহরণ (beginner → advanced)**
1) System stack fallback
```css
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
```
2) Responsive type with clamp
```css
h1 { font-size: clamp(1.6rem, 2vw + 1rem, 2.4rem); }
```
3) Small caps via transform
```css
.pill { text-transform: uppercase; letter-spacing: 0.08em; }
```
4) Text decoration control
```css
a { text-decoration: none; }
a:hover { text-decoration: underline; text-decoration-thickness: 2px; }
```
5) Font-feature-settings
```css
.nums { font-variant-numeric: tabular-nums; }
```

**Try it**
- Lede paragraph-এর line-height 1.8 করে দেখুন পড়া কেমন লাগে।
- Body ফন্ট Inter থেকে system-ui-তে বদলে FOIT পার্থক্য দেখুন (Chrome DevTools offline)।
- Numeric data টেবিলে tabular numbers ব্যবহার করুন।  
