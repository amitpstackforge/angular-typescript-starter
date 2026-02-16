# 09) CSS Basics — syntax, selectors শুরু

**কি শিখবেন**
- CSS কীভাবে কাজ করে (cascade → specificity → inheritance)।
- Inline, internal, external CSS পার্থক্য ও ব্যবহার।
- বেসিক সিনট্যাক্স, সিলেক্টর (element/class/id), রঙ ও ইউনিট।

**Code (external CSS উদাহরণ)**
```html
<!-- index.html -->
<link rel="stylesheet" href="styles.css">
<h1 class="title" id="page-title">CityCare Beds</h1>
```
```css
/* styles.css */
body { font-family: system-ui; }
h1 { color: #2563eb; }       /* element selector */
.title { text-transform: uppercase; } /* class */
#page-title { letter-spacing: 1px; }  /* id */
```

**Interview takeaways**
- Cascade order: browser default < external < internal < inline < !important (avoid).
- External CSS cache-friendly; inline scope ছোট কিন্তু maintainability কম।
- রঙ: hex সংক্ষিপ্ত (#2563eb), rgb(), hsl() → hsl এ hue/sat/light সহজে টিউন।
- ইউনিট: `rem` root-relative; `em` parent-relative; viewport units (`vh/vw`) hero/section-এ কাজে লাগে।

**আরো উদাহরণ (beginner → advanced)**
1) Inline style (avoid for scale)
```html
<p style="color: tomato;">Inline</p>
```
2) Internal style
```html
<style>
  .badge { background: #e0f2fe; padding: 4px 8px; }
</style>
```
3) External with multiple files
```html
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="theme.css">
```
4) HSL color tweak
```css
.alert { background: hsl(12 80% 54%); }
.alert:hover { background: hsl(12 80% 48%); }
```
5) Viewport unit hero
```css
.hero { min-height: 70vh; padding: 4vw; }
```

**Try it**
- একই এলিমেন্টে element + class + id রুল লিখে specificity ফল দেখুন।
- `rem` ও `em` দিয়ে বাটন সাইজ করুন; প্যারেন্ট ফন্ট-সাইজ বদলে পার্থক্য লক্ষ্য করুন।
- External CSS-এ মন্তব্য (`/* ... */`) ব্যবহার করে সেকশন আলাদা করুন।  
