# 16) CSS Grid — 2D লেআউটের জন্য সেরা

**কি শিখবেন**
- Rows/columns, `grid-template-columns/rows`, `fr` ইউনিট, gap।
- grid-column/row span, auto-fit/auto-fill, implicit বনাম explicit grid।

**Code**
```html
<section class="grid">
  <article class="card">ICU</article>
  <article class="card">ER</article>
  <article class="card">Ward</article>
  <article class="card span">Pharmacy</article>
</section>
```
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.span { grid-column: span 2; }
```

**Interview takeaways**
- `fr` space-sharing সহজ করে; minmax + auto-fit responsive কার্ডে সেরা।
- Explicit grid (template) বনাম implicit (auto placed) — implicit rows তৈরি হয় স্বয়ংক্রিয়ভাবে।
- grid-area নামকরণ করে টেমপ্লেট স্ট্রিং লেখা যায়; বড় লেআউটে পরিষ্কার।

**আরো উদাহরণ (beginner → advanced)**
1) Fixed tracks
```css
.g { display:grid; grid-template-columns: 200px 1fr; }
```
2) Named areas
```css
.layout { display:grid;
  grid-template-areas:"h h" "s m" "f f";
  grid-template-columns: 240px 1fr;
}
header{grid-area:h;} aside{grid-area:s;} main{grid-area:m;} footer{grid-area:f;}
```
3) Align/justify items
```css
.cards { justify-items: stretch; align-items: start; }
```
4) Implicit rows sizing
```css
.g { grid-auto-rows: minmax(120px, auto); }
```
5) auto-fill vs auto-fit demo
```css
.auto-fill { grid-template-columns: repeat(auto-fill, minmax(180px,1fr)); }
.auto-fit  { grid-template-columns: repeat(auto-fit,  minmax(180px,1fr)); }
```
6) Gap shorthand
```css
.grid { display:grid; gap: 12px 20px; } /* row col */
```
7) Full-bleed hero within centered page
```css
.page { display:grid; grid-template-columns: 1fr minmax(0, 960px) 1fr; }
.page > * { grid-column: 2; }
.hero { grid-column: 1 / -1; }
```
8) Track repeat shortcut
```css
.stats { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); }
```
9) Justify/align content
```css
.board { display:grid; justify-content:center; align-content:start; height:400px; }
```
10) Subgrid (Firefox/modern)
```css
.list { display:grid; grid-template-columns: 1fr 1fr; }
.item { display:grid; grid-template-columns: subgrid; grid-column: span 2; }
```

**Try it**
- Bed dashboardে header/sidebar/main/footer grid areas তৈরি করুন।
- এক কার্ডকে দুই কলাম স্প্যান করান; মোবাইলে এক কলামে নামিয়ে দিন।
- `grid-auto-flow: dense` দিয়ে ফাঁক পূরণ পরীক্ষা করুন।  
