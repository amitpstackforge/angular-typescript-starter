# 15) Flexbox — অবশ্যই আয়ত্ত করুন

**কি শিখবেন**
- Main axis বনাম cross axis; direction/wrap।
- justify-content, align-items/content; grow/shrink/basis; gap।

**Code**
```html
<div class="toolbar">
  <button class="btn">Admit</button>
  <button class="btn">Discharge</button>
  <span class="badge">Beds: 12/17</span>
</div>
```
```css
.toolbar {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}
.btn { flex: 0 0 auto; }
.badge { margin-left: auto; } /* pushes to end */
```

**Interview takeaways**
- Direction বদলালে main/cross এক্সিস বদলে যায়; justify main, align cross।
- `flex: 1` মানে `flex: 1 1 0` → grow এবং shrink দুটোই on, basis 0।
- Gap flex-এ এখন নেটিভ; মার্জিন হ্যাকের প্রয়োজন কম।

**আরো উদাহরণ (beginner → advanced)**
1) Centering
```css
.center { display:flex; align-items:center; justify-content:center; }
```
2) Wrap + min width
```css
.cards { display:flex; flex-wrap:wrap; gap:12px; }
.cards > article { flex:1 1 200px; }
```
3) Column layout
```css
.stack { display:flex; flex-direction:column; gap:8px; }
```
4) Grow vs shrink
```css
.grow { flex: 1 1 0; }
.no-shrink { flex-shrink: 0; }
```
5) Align-self override
```css
.card:nth-child(2) { align-self: stretch; }
```
6) Order for priority
```css
.cta { order: -1; } /* moves before siblings */
```
7) Fixed + fluid combo
```css
.shell { display:flex; gap:12px; }
.shell .sidebar { flex:0 0 220px; }
.shell .main { flex:1 1 auto; }
```
8) Space-between nav
```css
.nav { display:flex; justify-content:space-between; align-items:center; }
```
9) Align-content for wrapped rows
```css
.tiles { display:flex; flex-wrap:wrap; align-content: start; gap: 12px; height: 300px; }
```
10) Sticky footer with flex column
```css
body { min-height:100vh; display:flex; flex-direction:column; }
main { flex:1; }
footer { margin-top:auto; }
```

**Try it**
- Toolbar-এ একটি সার্চ ইনপুট `flex:1` দিয়ে বাকি বোতাম স্থির রাখুন।
- Card row-তে wrap on/off করে viewport resize করে পার্থক্য দেখুন।
- `align-content` কীভাবে কাজ করে দেখতে multi-row flex wrap গ্রিড বানান।  
