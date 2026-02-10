# 09) HttpClient + Interceptor (JWT, error)

- HttpClient observable রিটার্ন করে; টাইপ যোগ করুন `http.get<ApiResponse<Patient[]>>()`.
- Interceptor: request/response pipeline; JWT attach, global error/logging।

**JWT attach interceptor**
```ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
    return next.handle(authReq).pipe(
      catchError(err => {
        console.error('API error', err);
        return throwError(() => err);
      })
    );
  }
}
```

**Provider (standalone bootstrap)**
```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptorFn]))
  ]
});
```

**Fake hospital API**
- GET patients: `https://dummyjson.com/users?limit=5`
- POST appointment: `https://jsonplaceholder.typicode.com/posts`

**Interview Q**
- Interceptor order? (provider array order)
- clone vs mutate request difference?

## Tailwind-ready HMS examples (Http + Interceptor)
1) **Loading bar**  
```html
<div *ngIf="loading" class="h-1 bg-blue-200">
  <div class="h-full w-1/3 bg-blue-600 animate-pulse"></div>
</div>
```
2) **Error toast**  
```html
<div *ngIf="error" class="mt-2 inline-flex items-center gap-2 rounded bg-rose-50 px-3 py-2 text-rose-700">
  ⚠️ {{ error }}
</div>
```
3) **JWT badge**  
```html
<span class="text-xs text-slate-500">Token: {{ token ? 'set' : 'missing' }}</span>
```
4) **HTTP call button**  
```html
<button class="btn" (click)="refresh()">Reload patients</button>
```
5) **TS snippet with interceptor fn**  
```ts
export const authInterceptorFn: HttpInterceptorFn = (req,next)=> {
  const token = localStorage.getItem('token');
  return next(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req);
};
```

**UI test hint**: DevTools Network এ Authorization হেডার যাচ্ছে কিনা দেখুন; টোকেন মুছে `ng serve` রিফ্রেশে guarded API তে error toast উঠছে কিনা দেখে নিন।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `auth.interceptor.ts` বানিয়ে interceptor fn পেস্ট করুন; `main.ts` এ `provideHttpClient(withInterceptors([authInterceptorFn]))` যোগ করুন।
3) যে কম্পোনেন্টে কল করবেন, সেখানে loading bar/error toast/JWT badge স্নিপেট টেমপ্লেটে রাখুন; TS এ `loading`/`error` ফ্ল্যাগ সেট করুন।
4) Tailwind CDN যোগ করে `ng serve`; Chrome Network ট্যাবে হেডার দেখুন, error হলে toast দেখা যায় কিনা টোকেন মুছে টেস্ট করুন।

## সম্পূর্ণ রানযোগ্য ডেমো (সব টপিক টেস্ট করুন)
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) কপি: `angular-fundamentals/demos/hms-appointments/*` → `src/app/`
3) Tailwind CDN: `src/index.html` এ `<script src="https://cdn.tailwindcss.com"></script>`
4) `ng serve`; `/appointments` এ interceptor-সহ POST, `/patients` এ debounced GET দেখুন। Network ট্যাবে Authorization হেডার; টোকেন মুছে error toast দেখুন।

## পূর্ণ রানযোগ্য ন্যূনতম কোড (Http + Interceptor ডেমো)
**ট্রি**
```
src/main.ts
src/app/app.routes.ts
src/app/app.component.ts
src/app/app.component.html
src/app/interceptors/auth.interceptor.ts
```

**main.ts**
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authInterceptorFn } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorFn])),
  ],
});
```

**auth.interceptor.ts**
```ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  return next(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req);
};
```

**app.routes.ts**
```ts
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [{ path: '', component: AppComponent }];
```

**app.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  loading = false;
  error = '';
  patients: any[] = [];
  tokenSet = false;

  constructor(private http: HttpClient) {}

  setToken() { localStorage.setItem('token', 'demo'); this.tokenSet = true; }
  clearToken() { localStorage.removeItem('token'); this.tokenSet = false; }

  load() {
    this.loading = true; this.error = '';
    this.http.get<any>('https://dummyjson.com/users?limit=5').subscribe({
      next: res => { this.patients = res.users; this.loading = false; },
      error: () => { this.error = 'API failed'; this.loading = false; },
    });
  }
}
```

**app.component.html**
```html
<div class="p-4 space-y-3">
  <div class="flex gap-2">
    <button class="btn w-auto px-3 py-2" (click)="setToken()">Set Token</button>
    <button class="btn w-auto px-3 py-2 bg-slate-500 hover:bg-slate-600" (click)="clearToken()">Clear Token</button>
    <span class="text-xs text-slate-500">Token: {{ tokenSet ? 'set' : 'missing' }}</span>
  </div>

  <button class="btn w-auto px-3 py-2" (click)="load()" [disabled]="loading">
    <span *ngIf="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2"></span>
    Load patients
  </button>
  <div *ngIf="loading" class="h-1 bg-blue-200 mt-2"><div class="h-full w-1/3 bg-blue-600 animate-pulse"></div></div>
  <div *ngIf="error" class="mt-2 inline-flex items-center gap-2 rounded bg-rose-50 px-3 py-2 text-rose-700">⚠️ {{ error }}</div>

  <ul class="divide-y divide-slate-200">
    <li *ngFor="let p of patients" class="py-2 flex justify-between">
      <span>{{ p.firstName }} {{ p.lastName }}</span><span class="text-xs text-slate-500">{{ p.email }}</span>
    </li>
  </ul>
</div>
```

**Run**: `ng serve` → token সেট/ক্লিয়ার করুন; Network ট্যাবে Authorization হেডার ও error toast দেখুন।
