# 12) Guards & Resolvers

- Guard types: `CanActivate`, `CanMatch`, `CanDeactivate`, `Resolve`.
- Use-cases: auth, role-based, unsaved form warning, preload data।

**হাসপাতাল উদাহরণ**
```ts
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate() {
    const loggedIn = !!localStorage.getItem('token');
    return loggedIn || inject(Router).createUrlTree(['/login']);
  }
}
```

**Resolver উদাহরণ**
```ts
@Injectable({ providedIn: 'root' })
export class PatientResolver implements Resolve<Observable<any>> {
  constructor(private http: HttpClient) {}
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.http.get(`https://dummyjson.com/users/${id}`);
  }
}
```

**Routes with guard+resolver**
```ts
{ path: 'patients/:id',
  loadComponent: () => import('./patient-details.component').then(m => m.PatientDetailsComponent),
  canActivate: [AuthGuard],
  resolve: { patient: PatientResolver }
}
```

**Interview Q**
- CanMatch বনাম CanActivate পার্থক্য?
- Resolver না পেলে কী হয়? (navigation cancel/error)

## Tailwind-ready HMS examples (Guards & Resolvers)
1) **Login page UI**  
```html
<div class="max-w-md mx-auto bg-white p-4 rounded-lg shadow">
  <h2 class="text-xl font-semibold mb-2">Login</h2>
  <input class="input mb-2" placeholder="Email" />
  <input class="input mb-2" type="password" placeholder="Password" />
  <button class="btn">Login</button>
</div>
```
2) **Guard badge**  
```html
<span class="text-xs text-slate-500">Guard: AuthGuard active</span>
```
3) **Resolver-bound template**  
```html
<div *ngIf="route.data | async as d" class="p-3 bg-emerald-50 rounded">
  Resolved patient: {{ d.patient.firstName }}
</div>
```
4) **Unauthorized redirect note**  
```html
<p class="text-sm text-amber-600">Login required to view patients.</p>
```
5) **Tailwind helpers**  
```scss
.input { @apply w-full border rounded px-3 py-2; }
.btn { @apply w-full bg-blue-600 text-white rounded px-4 py-2; }
```

**UI test hint**: টোকেন ছাড়া `/patients/1` এ গেলে guard redirect করছে কিনা দেখুন; resolver ডেটা `route.data` থেকে এসে টেমপ্লেটে দেখানো হচ্ছে কিনা Network + console এ verify করুন।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `auth.guard.ts` ও `patient.resolver.ts` ফাইল বানিয়ে কোড পেস্ট করুন; `app.routes.ts` এ guard/resolver অ্যাটাচ করুন।
3) Login UI স্নিপেট একটি কম্পোনেন্টে রাখুন; রুট `/` এ সেট করুন, protected route `/patients/:id` এ guard+resolver ব্যবহার করুন।
4) Tailwind CDN যোগ করে `ng serve`; Chrome এ টোকেন ছাড়া প্রবেশ করলে redirect হয় কিনা এবং resolver data template এ আসে কিনা দেখুন।

## সম্পূর্ণ রানযোগ্য ডেমো (সব টপিক টেস্ট করুন)
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `angular-fundamentals/demos/hms-appointments/*` → `src/app/` কপি করুন।
3) Tailwind CDN: `src/index.html` এ `<script src="https://cdn.tailwindcss.com"></script>`
4) `ng serve`;  
   - `/` (login) → টোকেন সেট হয়  
   - `/patients/:id` → guard+resolver কাজ করে, data দেখায়  
   - `/appointments` → interceptor সহ protected route

## পূর্ণ রানযোগ্য ন্যূনতম কোড (Guard + Resolver)
**ট্রি**
```
src/main.ts
src/app/app.routes.ts
src/app/app.component.ts
src/app/login.component.ts / .html
src/app/guards/auth.guard.ts
src/app/resolvers/patient.resolver.ts
src/app/patient.component.ts
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
import { LoginComponent } from './login.component';
import { PatientComponent } from './patient.component';
import { authGuard } from './guards/auth.guard';
import { patientResolver } from './resolvers/patient.resolver';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'patients/:id', component: PatientComponent, canActivate: [authGuard], resolve: { patient: patientResolver } },
  { path: '**', redirectTo: '' },
];
```

**guards/auth.guard.ts**
```ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  return token ? true : inject(Router).createUrlTree(['/']);
};
```

**resolvers/patient.resolver.ts**
```ts
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const patientResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id');
  return inject(HttpClient).get(`https://dummyjson.com/users/${id}`);
};
```

**login.component.ts**
```ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'hms-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  submit() {
    if (this.form.invalid) return;
    localStorage.setItem('token', 'demo');
    this.router.navigateByUrl('/patients/1');
  }
}
```

**login.component.html**
```html
<div class="min-h-screen flex items-center justify-center bg-slate-50">
  <div class="bg-white border rounded-xl p-5 shadow-md w-full max-w-md space-y-3">
    <h1 class="text-xl font-semibold">Login</h1>
    <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-3">
      <input class="input" formControlName="email" placeholder="email" />
      <input class="input" type="password" formControlName="password" placeholder="password" />
      <button class="btn" type="submit" [disabled]="form.invalid">Login</button>
    </form>
  </div>
  <router-outlet></router-outlet>
</div>
```

**patient.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'hms-patient',
  imports: [CommonModule, HttpClientModule],
  template: `
  <div class="p-4 bg-white border rounded shadow">
    <h2 class="text-lg font-semibold">Resolved Patient</h2>
    <pre class="text-xs text-slate-700">{{ data | json }}</pre>
  </div>
  `,
})
export class PatientComponent {
  data = this.route.snapshot.data['patient'];
  constructor(private route: ActivatedRoute) {}
}
```

**app.component.ts**
```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
```

**Run**: `ng serve` → `/` login → token set → auto-nav `/patients/1` → resolver fetches data; clear token in DevTools localStorage to test guard redirect.
