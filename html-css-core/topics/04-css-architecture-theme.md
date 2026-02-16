# 04) CSS architecture & theming — tokens for wards/pharmacy

**কি শিখবেন**
- CSS variables দিয়ে রঙ/spacing/token সেট; light/dark toggle বেসিক।
- BEM নামকরণ বনাম utility-first (সংক্ষিপ্ত সিদ্ধান্ত মানদণ্ড)।
- Component স্কোপিং ও ক্যাসকেড এড়ানোর কৌশল।

**Code**
```html
<style>
:root {
  --bg: #0f172a;
  --card: #ffffff;
  --text: #0f172a;
  --accent: #2563eb;
  --radius: 10px;
  --space: 0.75rem;
}
[data-theme="dark"] {
  --bg: #0b1220;
  --card: #111827;
  --text: #e5e7eb;
  --accent: #38bdf8;
}
body { margin: 0; font-family: system-ui; background: var(--bg); color: var(--text); }
.card { background: var(--card); border-radius: var(--radius); padding: var(--space); }
.btn { display: inline-block; background: var(--accent); color: #fff; padding: 0.5rem 0.9rem; border-radius: 6px; text-decoration: none; }

.bed-card { /* BEM-ish block */
  border: 1px solid #cbd5e1;
  margin-bottom: var(--space);
}
.bed-card__title { font-weight: 700; }
.bed-card--critical { border-color: #ef4444; }
</style>

<button id="toggle" class="btn">Toggle theme</button>

<article class="card bed-card bed-card--critical">
  <div class="bed-card__title">ICU-1</div>
  <div class="bed-card__body">Patient: P-11 | SpO2: 92%</div>
</article>

<script>
const toggle = document.querySelector('#toggle');
toggle.addEventListener('click', () => {
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
});
</script>
```

**Interview takeaways**
- CSS variables runtime-এ টগলযোগ্য; JS/ডাটা-অ্যাট্রিবিউট দিয়ে থিম সুইচ করা যায়।
- BEM নামকরণ specificity কম ও পড়তে সহজ; utility-first (যেমন `flex`, `gap-4`) দ্রুত কিন্তু স্প্রেডেড—প্রসঙ্গে বেছে নিন।
- Global leakage রোধে: লোয়ার specificity, কম্পোনেন্ট রুট ক্লাস, এবং reset/normalize ব্যবহার করুন।

**আরো উদাহরণ (beginner → advanced)**
1) Beginner — root color tokens
```css
:root { --accent: #2563eb; }
.link { color: var(--accent); }
```
2) Beginner — BEM button variants
```css
.btn { padding:8px 12px; border-radius:8px; }
.btn--primary { background:#2563eb; color:#fff; }
.btn--danger { background:#ef4444; color:#fff; }
```
3) Intermediate — utility class set
```css
.u-flex { display:flex; }
.u-gap-sm { gap:8px; }
.u-center { align-items:center; }
```
4) Intermediate — theme switch by data attr
```css
[data-theme="dark"] { --card: #111827; --text:#e2e8f0; }
.card { background:var(--card); color:var(--text); }
```
5) Advanced — scope via container class
```css
.pharmacy { --accent: #f97316; }
.pharmacy .btn--primary { background: var(--accent); }
```

**Try it**
- Pharmacy সতর্কতা কার্ডে `bed-card--warning` ভ্যারিয়েন্ট বানান (`border-color: amber`), থিমেও কাজ করতে হবে।
- CSS variables দিয়ে spacing scale (`--s-1`, `--s-2`) বানিয়ে `.card` মার্জিন/প্যাডিং সেখানে রেফার করুন।
- prefers-reduced-motion থাকলে থিম টগল ট্রানজিশন এড়ান।  
