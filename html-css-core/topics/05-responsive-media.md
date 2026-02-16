# 05) Responsive patterns & media — clamp, fluid grids, images

**কি শিখবেন**
- `clamp()` দিয়ে fluid টাইপোগ্রাফি ও spacing।
- Auto-fit গ্রিড লেআউট; mobile-first মিডিয়া কুয়েরি।
- Responsive ইমেজ (width 100%, object-fit) ও aspect-ratio।

**Code**
```html
<style>
:root {
  --step-0: clamp(1rem, 1vw + 0.8rem, 1.3rem);
  --step-1: clamp(1.25rem, 1vw + 1rem, 1.6rem);
}
body { font-family: system-ui; margin: 0; padding: 1rem; }
h1 { font-size: var(--step-1); }
p  { font-size: var(--step-0); }

.dept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.card { border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; }
.card img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.card__body { padding: 0.75rem; }

@media (max-width: 600px) {
  body { padding: 0.75rem; }
}
</style>

<h1>Hospital Departments</h1>
<div class="dept-grid">
  <article class="card">
    <img src="https://via.placeholder.com/400x300?text=ICU" alt="ICU ward" />
    <div class="card__body">
      <strong>ICU</strong><br />Critical care, 24x7 monitors.
    </div>
  </article>
  <article class="card">
    <img src="https://via.placeholder.com/400x300?text=ER" alt="ER" />
    <div class="card__body">
      <strong>ER</strong><br />Triage and trauma.
    </div>
  </article>
</div>
```

**Interview takeaways**
- `clamp(min, preferred, max)` এক্সপ্রেশন টাইপ/spacing ধারাবাহিক রাখে—hard breakpoints কমে।
- `auto-fit + minmax()` সহজে responsive grid দেয়, gap বজায় থাকে।
- `aspect-ratio` ও `object-fit` দিয়ে ছবি বিকৃতি রোধ; placeholder সাইজ consistent রাখুন।

**আরো উদাহরণ (beginner → advanced)**
1) Beginner — simple media query
```css
@media (max-width: 600px) { body { padding: 12px; } }
```
2) Beginner — fluid heading with clamp
```css
h1 { font-size: clamp(1.6rem, 2vw + 1rem, 2.4rem); }
```
3) Intermediate — auto-fit cards
```css
.cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1rem; }
```
4) Intermediate — aspect-ratio utility
```css
.thumb { width:100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px; }
```
5) Advanced — container width clamp
```css
.page { width: min(1100px, 92vw); margin: 0 auto; }
```

**Try it**
- টাইপ স্কেল `--step-2` যোগ করে হেডার বড় করুন, কিন্তু max সীমা রাখুন।
- 900px এর নিচে গ্রিডকে এক কলামে নামিয়ে আনুন; 600px এর নিচে padding কমান।
- হিরো ব্যাকগ্রাউন্ডে `image-set()` ব্যবহার করে 1x/2x রেজোলিউশন দিন।  
