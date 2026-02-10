# 06) Standalone vs Module

- Standalone component (Angular 15+): `standalone: true`, `imports: []`, NgModule ছাড়াই bootstrap করা যায়।
- Benefits: ছোট bundle, কম boilerplate, সহজ lazy route.
- এখনো module দরকার? বড় লিগ্যাসি বা লাইব্রেরি compat কেসে।

**হাসপাতাল উদাহরণ**
```ts
@Component({
  selector: 'hms-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class ShellComponent {}
```

**Bootstrap (main.ts)**
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { ShellComponent } from './shell.component';

bootstrapApplication(ShellComponent, { providers: [provideRouter(routes)] });
```

**Interview Q**
- Standalone lazy route config কীভাবে করবেন? (route object-এ `loadComponent`)।

## Tailwind-ready HMS examples (Standalone vs Module)
1) **Standalone shell**  
```ts
bootstrapApplication(ShellComponent, { providers: [provideRouter(routes)] });
```
2) **Lazy load standalone component**  
```ts
{ path: 'beds', loadComponent: () => import('./beds.component').then(m => m.BedsComponent) }
```
3) **Card component import (standalone)**  
```ts
@Component({standalone:true, imports:[CommonModule, BadgeComponent], ...})
```
4) **Legacy module declaration (contrast)**  
```ts
@NgModule({ declarations:[BedsComponent], imports:[CommonModule], exports:[BedsComponent] })
```
5) **Hybrid tip**  
- Standalone root + feature module lazy works; Tailwind classes usable in both.

**UI test hint**: Standalone `ShellComponent` bootstrap করে `ng serve`; Lazy routeে (Network tab) JS chunk লোড হচ্ছে কিনা দেখুন, এবং Tailwind ক্লাস সহ লেজি কম্পোনেন্ট রেন্ডার হচ্ছে কিনা চোখে দেখুন।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `src/main.ts` খুলে `bootstrapApplication(...)` ফরম্যাট রাখুন; `app.routes.ts` এর lazy route নিশ্চিত করুন।
3) Tailwind CDN `src/index.html` এ যোগ করুন।
4) `ng serve`; Chrome Network ট্যাবে lazy chunk load নিশ্চিত করুন।

## সম্পূর্ণ রানযোগ্য ডেমো (সব টপিক টেস্ট করুন)
1) প্রজেক্ট: `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) কপি: `angular-fundamentals/demos/hms-appointments/*` → `src/app/`
3) Tailwind CDN: `src/index.html` এ `<script src="https://cdn.tailwindcss.com"></script>`
4) `ng serve`; `/appointments` পেজে standalone components + lazy routing কাজ করছে কিনা দেখুন।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `src/main.ts` খুলে `bootstrapApplication(ShellComponent, { providers: [provideRouter(routes)] });` রাখুন।
3) `app.routes.ts` এ lazy route যোগ করুন (উদাহরণ: pharmacy loadComponent); সংশ্লিষ্ট কম্পোনেন্ট ফাইল তৈরি করুন।
4) Tailwind CDN যোগ করে `ng serve`; Chrome Network ট্যাবে lazy chunk লোড হচ্ছে কিনা যাচাই করুন, UI স্টাইল দেখুন।

## পূর্ণ রানযোগ্য ন্যূনতম কোড (Standalone + lazy ডেমো)
**ট্রি**
```
src/main.ts
src/app/app.routes.ts
src/app/shell.component.ts
src/app/beds.component.ts
```

**main.ts**
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { ShellComponent } from './app/shell.component';

bootstrapApplication(ShellComponent, { providers: [provideRouter(routes)] });
```

**app.routes.ts**
```ts
import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

export const routes: Routes = [
  { path: '', component: ShellComponent },
  { path: 'beds', loadComponent: () => import('./beds.component').then(m => m.BedsComponent) },
  { path: '**', redirectTo: '' },
];
```

**shell.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'hms-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
  <div class="p-4 space-y-3">
    <a routerLink="/beds" class="text-blue-600">Go to Beds (lazy)</a>
    <router-outlet></router-outlet>
  </div>
  `,
})
export class ShellComponent {}
```

**beds.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'hms-beds',
  imports: [CommonModule],
  template: `
  <div class="bg-white border rounded-xl p-4 shadow">
    <h2 class="text-lg font-semibold">Lazy Beds Component</h2>
    <p class="text-sm text-slate-600">Loaded via loadComponent.</p>
  </div>
  `,
})
export class BedsComponent {}
```

**Run**: `ng serve` → http://localhost:4200 → “Go to Beds (lazy)” ক্লিক করুন; Network ট্যাবে lazy chunk দেখুন।
