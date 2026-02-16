# 10) Selectors & specificity — নির্বাচন শিখুন

**কি শিখবেন**
- Class, id, grouping, universal, descendant/child/sibling, attribute selectors।
- Pseudo-classes (`:hover`, `:focus`, `:nth-child`) ও pseudo-elements (`::before`, `::after`)।
- Specificity নিয়ম: inline > id > class/attr/pseudo > element > universal।

**Code**
```html
<ul class="beds">
  <li class="bed bed--icu" data-status="occupied">ICU-1</li>
  <li class="bed bed--ward" data-status="empty">Ward-2</li>
</ul>
```
```css
.bed { padding: 8px; }
.bed--icu { color: #ef4444; }                 /* class */
.beds li[data-status="empty"] { color: #16a34a; } /* attribute */
.beds li:first-child { font-weight: 700; }    /* pseudo-class */
.bed::before { content: "🛏 "; }               /* pseudo-element */
```

**Interview takeaways**
- Descendant (`.a .b`) vs child (`.a > .b`) specificity সমান কিন্তু matching scope আলাদা।
- Attribute selectors শক্তিশালী; data-* দিয়ে JS হিন্ট ও স্টাইল একসাথে।
- Pseudo-element দু’টাই (::before/::after) inline content যোগ করতে সেরা উপায়।
- Specificity ladder মনে রাখুন; !important এড়িয়ে চলুন।

**আরো উদাহরণ (beginner → advanced)**
1) Grouping
```css
h1, h2, h3 { font-family: "Inter"; }
```
2) Sibling (adjacent)
```css
label + input { margin-top: 4px; }
```
3) General sibling
```css
.alert ~ .hint { opacity: 0.7; }
```
4) :nth-child pattern
```css
.beds li:nth-child(odd) { background: #f8fafc; }
```
5) Specificity demo
```css
.card p { color: #0f172a; }
.card .highlight { color: #2563eb; } /* wins over element rule */
#main .card .highlight { color: #dc2626; }   /* id wins */
```
6) Attribute selector
```css
input[readonly] { background: #f3f4f6; }
```
7) :not filter
```css
.nav a:not(.active) { color: #475569; }
```
8) :is with low specificity
```css
:is(h1, h2, h3) { margin-bottom: 0.4em; }
```
9) :where zero specificity helper
```css
.card :where(h3, p) { margin: 0; }
```
10) :has parent selector (modern)
```css
.field:has(input:invalid) { border-color: #ef4444; }
```

**Try it**
- Pharmacy টেবিলে attribute selector `td[data-low="true"]` লাল করুন।
- `:not()` ব্যবহার করে “empty” বাদে সব bed bold করুন।
- একই এলিমেন্টে সংঘর্ষ তৈরি করুন এবং DevTools-এ “Styles” প্যানেলে winning rule দেখুন।  
