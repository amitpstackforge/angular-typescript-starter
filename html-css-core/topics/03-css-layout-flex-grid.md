# 03) Layout basics — Flexbox & Grid for wards/dashboard

**কি শিখবেন**
- Flexbox দিয়ে নেভ, কার্ড লিস্ট, বাটন গ্রুপ সাজানো।
- CSS Grid দিয়ে পেজ shell (header/main/sidebar/footer) ও কার্ড গ্যালারি।
- Gap, wrap, minmax — responsive লেআউটের প্রধান হুক।

**Code**
```html
<style>
body { margin: 0; font-family: system-ui; }
.shell {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}
header { grid-area: header; padding: 1rem; background: #0f172a; color: #fff; }
aside  { grid-area: sidebar; padding: 1rem; background: #e2e8f0; }
main   { grid-area: main; padding: 1rem; }
footer { grid-area: footer; padding: 1rem; background: #0f172a; color: #fff; }

.bed-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card {
  flex: 1 1 180px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.75rem;
}
</style>

<div class="shell">
  <header>CityCare Dashboard</header>
  <aside>Sidebar nav</aside>
  <main>
    <h2>Beds</h2>
    <div class="bed-cards">
      <div class="card"><strong>ICU-1</strong><br />Occupied: P-11</div>
      <div class="card"><strong>ICU-2</strong><br />Empty</div>
      <div class="card"><strong>Ward-3</strong><br />P-22</div>
    </div>
  </main>
  <footer>&copy; 2026</footer>
</div>
```

**Interview takeaways**
- Flexbox এক্সিস-ভিত্তিক (রো/কলাম) আইটেম alignment; Grid দুই-মাত্রায় ট্র্যাক/এরিয়া সংজ্ঞায়িত করে।
- `gap` flex ও grid দুটোতেই কাজ করে; `flex: 1 1 180px` সহজ responsive কার্ড।
- Desktop-first বা mobile-first—Grid টেম্পলেটে `minmax()` ও মিডিয়া কুয়েরি দিয়ে সিদ্ধান্ত নিন।

**আরো উদাহরণ (beginner → advanced)**
1) Beginner — flex row nav
```html
<nav style="display:flex; gap:8px;">
  <a>Home</a><a>Beds</a><a>Pharmacy</a>
</nav>
```
2) Beginner — flex wrap cards
```html
<div style="display:flex; gap:12px; flex-wrap:wrap;">
  <div style="flex:1 1 160px; border:1px solid #ccc;">ICU-1</div>
  <div style="flex:1 1 160px; border:1px solid #ccc;">ICU-2</div>
</div>
```
3) Intermediate — grid shell areas
```html
<div style="display:grid;grid-template-areas:'h h''s m''f f';grid-template-columns:220px 1fr;min-height:100vh;">
  <header style="grid-area:h">Header</header>
  <aside style="grid-area:s">Sidebar</aside>
  <main style="grid-area:m">Main</main>
  <footer style="grid-area:f">Footer</footer>
</div>
```
4) Intermediate — auto-fit cards
```html
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;">
  <article class="card">Bed A</article>
  <article class="card">Bed B</article>
</div>
```
5) Advanced — sticky header + scroll area
```html
<style>
.layout { display:grid; grid-template-rows:64px 1fr; height:100vh; }
.top { position:sticky; top:0; background:#0f172a; color:#fff; padding:12px; }
.scroll { overflow:auto; padding:12px; }
</style>
<div class="layout">
  <div class="top">Sticky Ops Bar</div>
  <div class="scroll">...long bed list...</div>
</div>
```
6) Intermediate — equal-height cards with grid auto-rows
```html
.cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); grid-auto-rows:1fr; gap:12px; }
.cards article { padding:12px; border:1px solid #d0d7de; }
```
7) Intermediate — flexbox for action bar spacing
```html
.actions { display:flex; gap:8px; justify-content:space-between; align-items:center; }
```
8) Advanced — grid with named lines
```html
.shell { display:grid; grid-template-columns:[sidebar] 240px [content] 1fr [end]; }
```
9) Advanced — clamp() container width + center
```html
.page { width:clamp(320px, 90vw, 1100px); margin:0 auto; }
```
10) Advanced — CSS grid masonry-ish via `grid-auto-flow: dense`
```html
.feed { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); grid-auto-flow:dense; gap:10px; }
.wide { grid-column:span 2; }
```

**Try it**
- Sidebar মোবাইলে উপরে নিয়ে আসুন (`grid-template-areas` সুইচ) — 600px ব্রেকপয়েন্টে।
- Cards-কে দুই-কলাম গ্রিড করুন (`grid-template-columns: repeat(auto-fit, minmax(200px,1fr))`) এবং Flex version এর পার্থক্য নোট করুন।
- Cards এ `:hover` শ্যাডো যোগ করুন কিন্তু `prefers-reduced-motion` থাকলে ট্রানজিশন অফ করুন।  
