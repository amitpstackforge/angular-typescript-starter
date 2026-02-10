# Angular Hospital Widget (side-by-side with vanilla demo)

এই standalone Angular কম্পোনেন্টে একই TypeScript core লজিক ব্যবহার করা হয়েছে যাতে আপনি vanilla ডেমোর সাথে তুলনা করতে পারেন।

## কী আছে
- Standalone component (`PatientDashboardComponent`) + template + minimal CSS
- Type/interfaces, union/intersection, enum, generic `wrapResponse`, async/await `fakeApi`
- in-memory repo pattern (Map) ও billing service

## কীভাবে প্রোজেক্টে যোগ করবেন (Angular 15+)
1) একটি বিদ্যমান Angular CLI প্রোজেক্ট খুলুন।
2) নিচের ফাইলগুলো কপি করুন (path adjust করুন):
   - `patient-dashboard.component.ts`
   - `patient-dashboard.component.html`
   - `patient-dashboard.component.css`
3) রুটে রেজিস্টার (standalone):
```ts
// app.routes.ts
import { Routes } from '@angular/router';
import { PatientDashboardComponent } from './patient-dashboard.component';

export const routes: Routes = [
  { path: '', component: PatientDashboardComponent },
];
```

4) অথবা bootstrap-এ ব্যবহার করুন:
```ts
// main.ts (Angular 15+)
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { PatientDashboardComponent } from './patient-dashboard.component';

bootstrapApplication(PatientDashboardComponent, {
  providers: [provideAnimations(), provideRouter(routes)],
});
```

5) রান: `ng serve` → ব্রাউজারে UI/console দেখে TypeScript core ধারণা রিভিউ করুন।

## দ্রষ্টব্য
- ডেটা in-memory; API replace করতে `fakeApi` অংশ পরিবর্তন করুন।
- Angular <15 হলে কম্পোনেন্টটিকে module declarations এ যোগ করুন এবং `CommonModule` ইমপোর্ট করুন।
