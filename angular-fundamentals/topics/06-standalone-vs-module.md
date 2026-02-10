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
