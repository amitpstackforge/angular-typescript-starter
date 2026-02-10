# 05) Services & Dependency Injection (DI)

- DI pattern: provider registry → constructor injection
- Provider scopes: root, component-level
- Value/token use-case: API_BASE_URL

**হাসপাতাল উদাহরণ**
```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private http = inject(HttpClient);
  private base = 'https://dummyjson.com';

  list() { return this.http.get(`${this.base}/users?limit=5`); }
}
```

**Component usage**
```ts
patients$ = this.patientService.list();
constructor(private patientService: PatientService) {}
```

**Interview Q**
- providedIn: 'root' বনাম feature provider এর পার্থক্য?
- multi provider (HTTP_INTERCEPTORS) কীভাবে কাজ করে?

## Tailwind-ready HMS examples (Services/DI)
1) **Injection in component**  
```ts
constructor(private patientService: PatientService) {}
patients$ = this.patientService.list();
```
2) **Status pill bound to service state**  
```html
<span class="px-2 py-1 rounded bg-slate-100 text-slate-600">API: {{ patientService.base }}</span>
```
3) **Service providing loading observable**  
```ts
loading$ = this.http.get(...).pipe(startWith(true), finalize(() => this.loading = false));
```
4) **Value provider token**  
```ts
export const API_URL = new InjectionToken<string>('API_URL');
{ provide: API_URL, useValue: 'https://dummyjson.com' }
```
5) **Component uses token**  
```ts
constructor(@Inject(API_URL) api:string, private http:HttpClient) {}
```

**UI test hint**: Component template এ `{{ patientService.base }}` বাউন্ড করুন; `ng serve` চালিয়ে Network ট্যাবে service call (dummyjson) দেখুন, এবং DevTools Components প্যানেলে provider tree পরখ করুন।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `src/app/patient.service.ts` বানিয়ে সার্ভিস স্নিপেট পেস্ট করুন; `providedIn: 'root'` রাখুন।
3) যে কম্পোনেন্টে ব্যবহার করবেন, `constructor(private patientService: PatientService)` ইনজেক্ট করে template এ `patients$ | async` বাউন্ড করুন।
4) Tailwind CDN যোগ করে `ng serve`; Chrome Network ট্যাবে GET কল দেখুন, UI তে data render ও status pill দেখুন।

## সম্পূর্ণ রানযোগ্য ডেমো (সব টপিক টেস্ট করুন)
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `angular-fundamentals/demos/hms-appointments/*` কপি করুন `src/app/` এ।
3) Tailwind CDN যোগ করুন: `src/index.html` এ `<script src="https://cdn.tailwindcss.com"></script>`
4) `ng serve` → `/patients` ও `/appointments` পেজে সার্ভিস + Http + DI এর কল Network ট্যাবে দেখুন।
5) ট্রি: `services/patient.service.ts`, `services/bed.service.ts` ইতিমধ্যে ওয়্যার্ড; কম্পোনেন্টে inject করা আছে।

## পূর্ণ রানযোগ্য ন্যূনতম কোড (Services/DI ডেমো)
**ফোল্ডার ট্রি**
```
src/app/
  app.component.ts
  app.component.html
  patient.service.ts
```

**patient.service.ts**
```ts
import { Injectable } from '@angular/core';

export interface Patient { id: string; name: string; ward: string; }

@Injectable({ providedIn: 'root' })
export class PatientService {
  patients: Patient[] = [
    { id: 'P1', name: 'Aisha', ward: 'ICU' },
    { id: 'P2', name: 'Rahul', ward: 'Ward-1' },
  ];
  list() { return this.patients; }
}
```

**app.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from './patient.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public patientService: PatientService) {}
}
```

**app.component.html**
```html
<div class="p-4 space-y-2">
  <p class="text-sm text-slate-500">API: mock in-memory (DI demo)</p>
  <ul class="divide-y divide-slate-200">
    <li *ngFor="let p of patientService.list()" class="py-2 flex justify-between">
      <span>{{ p.name }}</span><span class="text-xs text-slate-500">{{ p.ward }}</span>
    </li>
  </ul>
</div>
```

**Run**: `ng serve` (Tailwind CDN optional) → see list rendered via injected service.
