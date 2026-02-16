# 20) Advanced layout & effects — clip, filter, blend

**কি শিখবেন**
- CSS shapes/clip-path, filters/backdrop-filter, blend modes, custom scrollbar ইঙ্গিত।

**Code**
```css
.hero-mask {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  color: #fff;
  padding: 2rem;
}

.glass {
  backdrop-filter: blur(8px);
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
}
```

**Interview takeaways**
- clip-path দিয়ে হিরো শেপ/ডায়াগোনাল কাট—SVG দরকার নেই।
- backdrop-filter শুধু সাপোর্টেড ব্রাউজারে; ফ্যালব্যাক রঙ রাখুন।
- blend-mode ইমেজ + গ্রেডিয়েন্ট মিক্সে কাজে লাগে; অ্যাক্সেসিবিলিটি (contrast) খেয়াল।

**আরো উদাহরণ (beginner → advanced)**
1) Simple drop shadow filter
```css
.thumb { filter: drop-shadow(0 10px 20px rgba(0,0,0,0.12)); }
```
2) Blur backdrop card
```css
.frost { backdrop-filter: blur(6px); background: rgba(15,23,42,0.3); }
```
3) Multiply blend
```css
.hero-img { mix-blend-mode: multiply; }
```
4) Custom scrollbar (WebKit)
```css
*::-webkit-scrollbar { height: 8px; }
*::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 999px; }
```
5) Clip-path circle avatar
```css
.avatar { clip-path: circle(50%); }
```

**Try it**
- Hero সেকশনে diagonal clip-path যোগ করুন; মোবাইলে ফ্যালব্যাক হিসেবে square রাখুন।
- Dashboard কার্ডে subtle blur overlay দিন; prefers-reduced-transparency থাকলে ফ্যালব্যাক দিন।
- Scrollbar স্টাইল করুন কিন্তু contrast বজায় রাখুন।  
