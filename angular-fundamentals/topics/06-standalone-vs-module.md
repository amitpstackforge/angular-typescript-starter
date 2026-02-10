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
2) `src/main.ts` খুলে `bootstrapApplication(ShellComponent, { providers: [provideRouter(routes)] });` রাখুন।
3) `app.routes.ts` এ lazy route যোগ করুন (উদাহরণ: pharmacy loadComponent); সংশ্লিষ্ট কম্পোনেন্ট ফাইল তৈরি করুন।
4) Tailwind CDN যোগ করে `ng serve`; Chrome Network ট্যাবে lazy chunk লোড হচ্ছে কিনা যাচাই করুন, UI স্টাইল দেখুন।
