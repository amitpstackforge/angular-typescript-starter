# 06) Components & utilities — buttons, badges, utilities for vitals

**কি শিখবেন**
- ছোট কম্পোনেন্ট স্টাইল (button, badge) এবং utility ক্লাস (flex, gap, text)।
- Reuse বনাম override সিদ্ধান্ত; specificity কম রাখা।
- State style: hover/focus/disabled নিরাপদ motion সহ।

**Code**
```html
<style>
.u-flex { display: flex; }
.u-gap-sm { gap: 0.5rem; }
.u-center { align-items: center; }
.u-wrap { flex-wrap: wrap; }

.btn {
  border: none;
  border-radius: 8px;
  padding: 0.6rem 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease;
}
.btn--primary { background: #2563eb; color: #fff; }
.btn--ghost   { background: transparent; color: #2563eb; border: 1px solid currentColor; }
.btn:focus-visible { outline: 2px solid #0ea5e9; outline-offset: 2px; }
.btn:active { transform: translateY(1px); }
@media (prefers-reduced-motion: reduce) {
  .btn { transition: none; }
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  padding: 0.3rem 0.6rem;
  font-size: 0.85rem;
  background: #e0f2fe;
  color: #075985;
}
</style>

<div class="u-flex u-gap-sm u-wrap u-center">
  <button class="btn btn--primary">Admit</button>
  <button class="btn btn--ghost" disabled>Discharge</button>
  <span class="badge">SpO2 96%</span>
  <span class="badge">HR 88</span>
</div>
```

**Interview takeaways**
- Utilities দ্রুত লেআউট সাজায়; কম্পোনেন্ট ক্লাস মূল ভিজ্যুয়াল সিস্টেম ধরে রাখে—মিশ্রণই বাস্তবসম্মত।
- `prefers-reduced-motion` দিয়ে মাইক্রো-মোশন safe করা ইন্টারভিউতে plus point।
- Focus-visible ব্যবহার করুন—keyboard users এর জন্য স্পষ্ট ফোকাস রিং দিন।

**আরো উদাহরণ (beginner → advanced)**
1) Beginner — pill badge
```html
<span style="display:inline-flex;align-items:center;padding:4px 10px;border-radius:999px;background:#eef2ff;color:#3730a3;">ICU</span>
```
2) Beginner — utility stack
```html
<div style="display:flex;gap:8px;flex-wrap:wrap;">
  <button class="btn btn--primary">Admit</button>
  <button class="btn btn--ghost">Cancel</button>
</div>
```
3) Intermediate — icon button a11y
```html
<button class="btn btn--ghost" aria-label="Refresh beds">
  &#x21bb;
</button>
```
4) Intermediate — disabled style
```css
.btn[disabled] { opacity: 0.55; cursor: not-allowed; }
```
5) Advanced — utility for stack/cluster
```css
.stack { display:flex; flex-direction:column; gap:12px; }
.cluster { display:flex; gap:12px; flex-wrap:wrap; align-items:center; }
```
```html
<div class="stack">
  <div class="cluster"><span class="badge">HR 88</span><span class="badge">BP 120/80</span></div>
  <div class="cluster"><button class="btn btn--primary">Save</button></div>
</div>
```
6) Intermediate — focus-visible utility
```css
.focus-ring:focus-visible { outline:2px solid #2563eb; outline-offset:2px; }
```
7) Intermediate — toggle switch markup
```html
<label class="toggle">
  <input type="checkbox" aria-label="Enable alerts" />
  <span></span>
</label>
```
8) Advanced — skeleton loader
```css
.skeleton { background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 37%,#e5e7eb 63%); background-size:400% 100%; animation: shimmer 1.2s infinite; }
@keyframes shimmer { 100% { background-position: -100% 0; } }
```
9) Advanced — tooltip with data attribute
```html
<button data-tip="Edit patient" class="btn btn--ghost">✎</button>
```
```css
[data-tip]{ position:relative; }
[data-tip]::after{ content:attr(data-tip); position:absolute; inset:auto auto 110% 50%; transform:translateX(-50%); background:#111827; color:#fff; padding:4px 8px; border-radius:6px; opacity:0; pointer-events:none; transition:opacity .15s; }
[data-tip]:hover::after,[data-tip]:focus-visible::after{ opacity:1; }
```
10) Advanced — modal shell
```html
<dialog id="assign"><p>Assign bed?</p><button onclick="assign.close()">Close</button></dialog>
<button onclick="assign.showModal()">Open</button>
```

**Try it**
- Badge এ status ভ্যারিয়েন্ট যোগ করুন (`badge--warn`, `badge--ok`) রঙ ভ্যারিয়েবল দিয়ে।
- Button-এর disabled স্টেটে opacity + cursor স্টাইল যোগ করুন।
- Utilities দিয়ে vitals কার্ড লেআউট বানান (row wrap + gap)।  
