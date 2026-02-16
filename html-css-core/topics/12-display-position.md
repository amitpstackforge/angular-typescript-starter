# 12) Display & positioning — block থেকে sticky পর্যন্ত

**কি শিখবেন**
- Display মান: block, inline, inline-block, none।
- Position: static, relative, absolute, fixed, sticky; stacking context ও z-index।

**Code**
```html
<header class="top">CityCare</header>
<div class="card">Content</div>
```
```css
.top { position: sticky; top: 0; background: #0f172a; color: #fff; z-index: 10; }
.card { display: inline-block; padding: 12px; border: 1px solid #cbd5e1; }
```

**Interview takeaways**
- inline এলিমেন্ট width/height সেট করতে পারে না; inline-block পারে কিন্তু লাইন-ফ্লো ধরে।
- Relative নিজস্ব জায়গা রেখে offset হয়; absolute নিকটতম positioned ancestor ধরে।
- Sticky স্ক্রল-সেন্সিটিভ; parent overflow hidden হলে কাজ নাও করতে পারে।
- z-index শুধুমাত্র positioned এলিমেন্টে কার্যকর; stacking context প্রায়শই transform/opacity দিয়ে নতুন হয়।

**আরো উদাহরণ (beginner → advanced)**
1) Inline বনাম block
```html
<span style="display:block">Block span</span>
<span>Inline span</span>
```
2) Relative + absolute badge
```css
.pill { position: relative; padding: 10px 14px; }
.pill__dot { position: absolute; top: -4px; right: -4px; width: 10px; height: 10px; background:#ef4444; border-radius: 50%; }
```
3) Fixed bar
```css
.status { position: fixed; bottom: 16px; right: 16px; background: #2563eb; color: #fff; padding: 10px; }
```
4) Sticky subheader
```css
.subhead { position: sticky; top: 64px; background: #fff; }
```
5) Stacking context trap
```css
.modal { position: fixed; z-index: 100; }
.modal * { position: relative; z-index: 1; } /* avoid unexpected overlay under transform parents */
```

**Try it**
- Bed list টেবিলের হেডার sticky করুন; scroll করলে উপরে থাকে কিনা দেখুন।
- Overlay modal absolute/fixed পার্থক্য পরীক্ষা করুন (body scroll lock?).
- z-index issue রেপ্রোডিউস করুন: parent-এ `transform: translateZ(0)` দিয়ে stacking context তৈরি করুন।  
