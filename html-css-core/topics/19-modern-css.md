# 19) Modern CSS features — variables, math, aspect-ratio

**কি শিখবেন**
- CSS variables, `calc()/min()/max()/clamp()`।
- `aspect-ratio`, `object-fit`, scroll-behavior/snap, container queries (সংক্ষেপে)।

**Code**
```css
:root {
  --space: 1rem;
  --accent: #2563eb;
}
.card { padding: var(--space); border: 1px solid #cbd5e1; }
.hero { padding: calc(var(--space) * 2); }
.hero img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }

html { scroll-behavior: smooth; }
```

**Interview takeaways**
- Variables runtime-এ টগল করা যায়; JS ছাড়াই থিমিং/spacing স্কেল।
- `clamp()` responsive টাইপ/spacing; `min/max` প্রান্তিক সীমা সেট করে।
- `aspect-ratio` CSS native, iframe/video/card সব জায়গায় কাজে লাগে।
- Scroll snap/behavior মাইক্রো-UX কিন্তু `prefers-reduced-motion` বিবেচনা করুন।

**আরো উদাহরণ (beginner → advanced)**
1) clamp spacing
```css
.section { padding: clamp(1rem, 2vw, 2rem); }
```
2) min/max math
```css
.sidebar { width: min(320px, 28vw); }
```
3) Object-fit cover
```css
.thumb { width:100%; height:160px; object-fit: cover; }
```
4) Scroll snap
```css
.carousel { scroll-snap-type: x mandatory; display:flex; overflow-x:auto; }
.slide { scroll-snap-align: start; min-width: 280px; }
```
5) Container query (syntax preview)
```css
@container (min-width: 600px) {
  .card { display: grid; grid-template-columns: 1fr 1fr; }
}
```

**Try it**
- Hero image aspect-ratio 16/9 বনাম 4/3 তুলনা করুন।
- Sidebar width `min()` ও `max()` দিয়ে আলাদা সীমা দিন।
- Scroll snap দিয়ে pharmacy কার্ড ক্যারোসেল বানান; reduce-motion থাকলে snap বন্ধ করুন।  
