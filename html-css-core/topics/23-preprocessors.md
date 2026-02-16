# 23) CSS preprocessors (ঐচ্ছিক) — Sass/SCSS দ্রুত ঝটপট

**কি শিখবেন**
- Sass/SCSS বেসিক: nesting, variables, mixins, partials/import।
- কবে ব্যবহার করবেন, কবে না (উত্তর: ছোট প্রজেক্টে vanilla যথেষ্ট)।

**Code (SCSS)**
```scss
$accent: #2563eb;
$radius: 12px;

@mixin card {
  border: 1px solid #cbd5e1;
  border-radius: $radius;
  padding: 1rem;
}

.card {
  @include card;
  &--alert { border-color: #ef4444; }
  h3 { color: $accent; }
}
```
Compiled CSS:
```css
.card { border: 1px solid #cbd5e1; border-radius: 12px; padding: 1rem; }
.card--alert { border-color: #ef4444; }
.card h3 { color: #2563eb; }
```

**Interview takeaways**
- Nesting বেশি করলে specificity বাড়ে—এক স্তর বা দুই স্তরে সীমিত রাখুন।
- Mixins/variables কোড রিপিট কমায়; partials (`_buttons.scss`) + main import গুছিয়ে রাখে।
- Build স্টেপ দরকার—CI-তে লিন্ট/compile ফেল হলে কারণ বোঝাতে পারবেন।

**আরো উদাহরণ (beginner → advanced)**
1) Variable
```scss
$space: 12px;
.btn { padding: $space; }
```
2) Nested hover
```scss
.btn { color: white; &:hover { background: darken(#2563eb, 5%); } }
```
3) Mixin with args
```scss
@mixin rounded($r) { border-radius: $r; }
.pill { @include rounded(999px); }
```
4) Partials import
```scss
@use 'tokens';
@use 'buttons';
```
5) Function
```scss
@function rem($px) { @return $px / 16 * 1rem; }
.title { font-size: rem(28); }
```
6) Placeholder + extend
```scss
%card { border-radius: 12px; padding: 16px; }
.note { @extend %card; background:#fef3c7; }
```
7) Map + map-get
```scss
$status: (ok: #22c55e, warn: #f59e0b, danger: #ef4444);
.badge--warn { background: map-get($status, warn); }
```
8) Loop generate spacers
```scss
@each $i in 1,2,3 { .mt-#{$i} { margin-top: $i * 4px; } }
```
9) Conditional mixin
```scss
@mixin shadow($on: true) { @if $on { box-shadow: 0 8px 20px rgba(0,0,0,.08); } }
.card { @include shadow(false); }
```
10) Forward with namespace
```scss
// _tokens.scss
$radius: 12px;
// _index.scss
@forward 'tokens' as tok-*;
// use
.card { border-radius: tok-$radius; }
```

**Try it**
- উপরের SCSS ফাইল `sass demo.scss demo.css` দিয়ে কম্পাইল করুন এবং আউটপুট দেখুন।
- Nesting তিন স্তরের বেশি হলে flatten করুন।
- Mixins বনাম extends পার্থক্য লিখে রাখুন।  
