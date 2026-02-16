# 11) Box model — padding/border/margin বোঝা

**কি শিখবেন**
- Content → padding → border → margin স্তর।
- `box-sizing: border-box` কেন ডিফল্ট ভালো।
- Margin collapse কবে হয় এবং কীভাবে এড়াবেন।

**Code**
```html
<div class="card">ICU-1</div>
```
```css
* { box-sizing: border-box; }
.card {
  width: 200px;
  padding: 12px;
  border: 2px solid #cbd5e1;
  margin: 16px;
}
```

**Interview takeaways**
- `box-sizing: border-box` এ width প্যাডিং+বর্ডার সহ হয়—layout কম চমক।
- Margin collapse শুধুমাত্র উল্লম্ব ব্লক মার্জিনে (parent/child ও sibling) ঘটে; padding বা border থাকলে ঠেকানো যায়।
- Debug: DevTools box model ভিউ দেখুন; layout shift ধরতে সাহায্য করে।

**আরো উদাহরণ (beginner → advanced)**
1) Default content-box width calc
```css
.box { width: 200px; padding: 20px; border: 2px solid #000; } /* renders >200px */
```
2) Border-box fix
```css
* { box-sizing: border-box; }
```
3) Margin collapse example
```css
p { margin: 16px 0; }
.wrapper { margin: 0; } /* first child p margin collapses unless wrapper has padding/border */
```
4) Padding for hit-area
```css
.btn { padding: 10px 14px; }
```
5) Outline vs border
```css
.input:focus { outline: 2px solid #2563eb; outline-offset: 2px; }
```
6) Min/max width guard
```css
.card { width: 100%; max-width: 420px; }
```
7) Negative margin nudge
```css
.banner { margin: -8px -16px 0; padding: 12px 16px; }
```
8) Box shadow doesn’t affect layout
```css
.panel { box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
```
9) Overflow to contain children
```css
.avatar-stack { overflow: hidden; border-radius: 999px; }
```
10) Inline-block gap awareness
```css
.tag { display: inline-block; margin-right: -4px; }
```

**Try it**
- একই width-এ content-box বনাম border-box তুলনা করুন।
- Margin collapse থামাতে parent-এ `padding:1px` বা `overflow:hidden` সেট করে দেখুন।
- Card grid-এ `gap` বনাম `margin` ব্যবহার করে spacing ডিবাগ করুন।  
