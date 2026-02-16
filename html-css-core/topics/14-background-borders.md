# 14) Backgrounds & borders — ভিজুয়াল হাইলাইট

**কি শিখবেন**
- background-color/image/size/position; গ্রেডিয়েন্ট।
- Border styles/radius; box-shadow, text-shadow।

**Code**
```html
<div class="card">
  <h3>Pharmacy</h3>
  <p>AMOX stock: 40</p>
</div>
```
```css
.card {
  background: linear-gradient(135deg, #e0f2fe, #fff);
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
  padding: 1rem;
}
```

**Interview takeaways**
- `background-size: cover` হিরোতে; `contain` লোগো/আইকনে।
- Shadows বেশি হলে পারফরম্যান্সে প্রভাব; subtle রাখুন।
- Gradients CSS-এ রাখুন—ইমেজ ডাউনলোড দরকার নেই।

**আরো উদাহরণ (beginner → advanced)**
1) Solid background
```css
.badge { background-color: #fef3c7; }
```
2) Background image cover
```css
.hero { background: url('icu.jpg') center/cover no-repeat; }
```
3) Repeating pattern
```css
.grid-bg { background-image: linear-gradient(#e2e8f0 1px, transparent 1px); background-size: 24px 24px; }
```
4) Radial gradient
```css
.pill { background: radial-gradient(circle at 20% 20%, #38bdf8, #0ea5e9); }
```
5) Text shadow subtle
```css
h1 { text-shadow: 0 1px 2px rgba(0,0,0,0.12); }
```

**Try it**
- Hero-তে background-blend-mode ব্যবহার করে গ্রেডিয়েন্ট + ছবি মিক্স করুন।
- Card-এর border-radius পরিবর্তন করে 4px বনাম 16px তুলনা করুন।
- Shadow পারফরম্যান্স প্রভাব দেখতে DevTools → Rendering → Paint flashing অন করুন।  
