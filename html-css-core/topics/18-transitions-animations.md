# 18) Transitions & animations — মুভমেন্ট, কিন্তু নিরাপদ

**কি শিখবেন**
- transition + transform (scale/rotate/translate)।
- keyframes animation ও পারফরম্যান্স টিপস।

**Code**
```css
.btn {
  background: #2563eb;
  color: #fff;
  border-radius: 10px;
  padding: 0.7rem 1rem;
  transition: transform 120ms ease, box-shadow 120ms ease;
}
.btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(37,99,235,0.25); }
@media (prefers-reduced-motion: reduce) {
  .btn { transition: none; }
}
```

**Interview takeaways**
- Transform/opacity GPU-ফ্রেন্ডলি; layout-affecting props (width/height/left) এড়িয়ে চলুন।
- `prefers-reduced-motion` সম্মান করা a11y সিগন্যাল।
- অল্প ডিউরেশন (120–200ms) UI তে দ্রুত ফিডব্যাক দেয়।

**আরো উদাহরণ (beginner → advanced)**
1) Simple transition
```css
.card { transition: box-shadow 150ms ease; }
.card:hover { box-shadow: 0 10px 20px rgba(0,0,0,0.12); }
```
2) Scale tap effect
```css
.pill:active { transform: scale(0.98); }
```
3) Keyframes pulse
```css
@keyframes pulse { 0%{transform:scale(1);} 50%{transform:scale(1.05);} 100%{transform:scale(1);} }
.alert { animation: pulse 1.5s ease-in-out infinite; }
```
4) Loading skeleton shimmer
```css
.skeleton { background: linear-gradient(90deg,#e5e7eb 25%,#f8fafc 37%,#e5e7eb 63%); background-size: 400% 100%; animation: shimmer 1.4s ease infinite; }
@keyframes shimmer { 0%{background-position:100% 0;}100%{background-position:-100% 0;} }
```
5) Reduce motion guard
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
}
```
6) Multiple-property transition
```css
.card { transition: transform 160ms ease, box-shadow 160ms ease; }
```
7) Custom easing curve
```css
.fab { transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1); }
```
8) Delayed tooltip fade
```css
.tip { opacity:0; transition: opacity 120ms ease 120ms; }
.btn:hover .tip { opacity:1; }
```
9) Animation-fill-mode
```css
.toast { animation: slide-in 180ms ease forwards; }
```
10) Step animation (progress)
```css
.progress { animation: steps(5) fill-bar 2s infinite; }
```

**Try it**
- Admit বাটনে hover lift + focus outline রাখুন; reduced-motion এ lift বন্ধ করুন।
- Skeleton loader যোগ করুন bed list লোডিং সময়।
- একটি modal খুললে fade+scale অ্যানিমেশন দিন, কিন্তু prefers-reduced-motion এ ইনস্ট্যান্ট করুন।  
