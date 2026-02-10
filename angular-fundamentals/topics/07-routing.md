# 07) Routing + params + lazy intro

- Router config: `Routes` array, `path`, `component`/`loadComponent`
- Route param: `route.paramMap.get('id')`
- Query param: `route.queryParamMap.get('tab')`
- Lazy load: `loadComponent: () => import('./patient-details.component').then(m => m.PatientDetailsComponent)`

**হাসপাতাল উদাহরণ**
```ts
export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'patients/:id', loadComponent: () => import('./patient-details.component').then(m => m.PatientDetailsComponent) },
  { path: '**', redirectTo: '' }
];
```

```ts
// patient-details.component.ts (snippet)
ngOnInit() {
  this.route.paramMap.subscribe(p => {
    const id = p.get('id');
    this.loadPatient(id);
  });
}
```

**Try it**
- Query param `?tab=lab` পড়ে কোন ট্যাব অ্যাকটিভ হবে সেট করুন।

## Tailwind-ready HMS examples (Routing)
1) **Navbar with routerLinkActive**  
```html
<nav class="flex gap-4 text-sm">
  <a routerLink="/" routerLinkActive="text-blue-600 font-semibold">Home</a>
  <a routerLink="/patients" routerLinkActive="text-blue-600 font-semibold">Patients</a>
  <a routerLink="/appointments" routerLinkActive="text-blue-600 font-semibold">Appointments</a>
</nav>
```
2) **Param link list**  
```html
<a *ngFor="let p of patients" [routerLink]=\"['/patients', p.id]\" class="block py-2 border-b">{{p.name}}</a>
```
3) **Query param tabs**  
```html
<button (click)=\"setTab('info')\" [class.text-blue-600]=\"tab==='info'\">Info</button>
<button (click)=\"setTab('lab')\" [class.text-blue-600]=\"tab==='lab'\">Lab</button>
```
4) **Lazy component route**  
```ts
{ path: 'pharmacy', loadComponent: () => import('./pharmacy.component').then(m => m.PharmacyComponent) }
```
5) **Fallback**  
```ts
{ path: '**', redirectTo: '' }
```

**UI test hint**: Router devtools বা ব্রাউজার URL বারে `/patients/3?tab=lab` খুলুন; ব্যাজ/ট্যাব ক্লাস স্যুইচ হচ্ছে ও lazy chunk নেটওয়ার্কে লোড হচ্ছে কিনা দেখুন।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `app.routes.ts` এ navbar অনুযায়ী path যোগ করুন; param route `/patients/:id` এবং lazy route উদাহরণ পেস্ট করুন।
3) `app.component.html` এ nav এবং তালিকা/ট্যাব স্নিপেট পেস্ট করুন।
4) Tailwind CDN যোগ করে `ng serve`; Chrome এ URL পরিবর্তন করে param/query টেস্ট করুন, Network এ lazy chunk দেখুন।

## সম্পূর্ণ রানযোগ্য ডেমো (সব টপিক টেস্ট করুন)
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) কপি: `angular-fundamentals/demos/hms-appointments/*` → `src/app/`
3) Tailwind CDN: `src/index.html` এ `<script src="https://cdn.tailwindcss.com"></script>`
4) `ng serve`; `/patients`, `/patients/1`, `/appointments` এ ন্যাভ/params/lazy route যাচাই করুন।
5) রাউট কনফিগ দেখুন `src/app/app.routes.ts` এ।

## পূর্ণ রানযোগ্য ন্যূনতম কোড (Routing ডেমো)
**ট্রি**
```
src/main.ts
src/app/app.routes.ts
src/app/app.component.ts
src/app/app.component.html
src/app/patient-list.component.ts
src/app/patient-details.component.ts
```

**main.ts**
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, { providers: [provideRouter(routes)] });
```

**app.routes.ts**
```ts
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient-list.component';
import { PatientDetailsComponent } from './patient-details.component';

export const routes: Routes = [
  { path: '', component: PatientListComponent },
  { path: 'patients/:id', component: PatientDetailsComponent },
  { path: '**', redirectTo: '' },
];
```

**app.component.ts**
```ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

**app.component.html**
```html
<div class="p-4 space-y-3">
  <nav class="flex gap-4 text-sm">
    <a routerLink="/" routerLinkActive="text-blue-600 font-semibold">Patients</a>
  </nav>
  <router-outlet></router-outlet>
</div>
```

**patient-list.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <ul class="divide-y divide-slate-200">
    <li *ngFor="let p of patients" class="py-2 flex justify-between">
      <span>{{ p.name }}</span>
      <a [routerLink]="['/patients', p.id]" class="text-blue-600 text-sm">View</a>
    </li>
  </ul>
  `,
})
export class PatientListComponent {
  patients = [
    { id: 1, name: 'Aisha' },
    { id: 2, name: 'Rahul' },
  ];
}
```

**patient-details.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bg-white border rounded p-4 shadow">
    <h2 class="text-lg font-semibold">Patient ID: {{ id }}</h2>
    <p class="text-sm text-slate-600">Param-based route example.</p>
  </div>
  `,
})
export class PatientDetailsComponent {
  id = this.route.snapshot.paramMap.get('id');
  constructor(private route: ActivatedRoute) {}
}
```

**Run**: `ng serve` → list page at `/`; click a patient to go to `/patients/:id`.
