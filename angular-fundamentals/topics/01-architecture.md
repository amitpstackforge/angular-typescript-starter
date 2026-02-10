# 01) Angular architecture ও SPA ধারণা

- Angular = component-based SPA ফ্রেমওয়ার্ক (HTML + TS + RxJS)।
- Core ব্লক: Component, Template, Dependency Injection, Router, Forms, HttpClient.
- Change Detection: zone.js + Ivy; OnPush থাকলে input/observable/promise এ change হলে update।
- Standalone যুগ: module না বানিয়েও component bootstrap করা যায় (Angular 15+)।

**হাসপাতাল উদাহরণ**: Hospital dashboard SPA → Navbar (Patients, Beds, Pharmacy), Router দিয়ে view বদলায়, state service দিয়ে shared data।

**Interview Q**
- Angular vs React-এর প্রধান architectural পার্থক্য?
- Standalone component কেন এসেছে?

**Quick check**
- Browser console এ `ng.version.full` (devtools console if Angular app loaded) দেখুন; Ivy default কিনা নিশ্চিত করুন।

## Tailwind-ready HMS examples (SPA অনুভূতি)
1) **Shell layout**  
```html
<div class="min-h-screen bg-slate-50">
  <header class="px-4 py-3 bg-white shadow">Hospital Dashboard</header>
  <main class="p-4"><router-outlet></router-outlet></main>
</div>
```
2) **Nav links (SPA)**  
```html
<nav class="flex gap-3 text-sm">
  <a routerLink="/patients" routerLinkActive="text-blue-600 font-semibold">Patients</a>
  <a routerLink="/beds" routerLinkActive="text-blue-600 font-semibold">Beds</a>
  <a routerLink="/pharmacy" routerLinkActive="text-blue-600 font-semibold">Pharmacy</a>
</nav>
```
3) **Dashboard cards**  
```html
<div class="grid md:grid-cols-3 gap-3">
  <div class="rounded-lg bg-white p-4 shadow border">Beds: 42</div>
  <div class="rounded-lg bg-white p-4 shadow border">Patients: 31</div>
  <div class="rounded-lg bg-white p-4 shadow border">ICU Free: 4</div>
</div>
```
4) **SPA footer**  
```html
<footer class="mt-8 text-center text-xs text-slate-500">CityCare HMS · Angular SPA</footer>
```
