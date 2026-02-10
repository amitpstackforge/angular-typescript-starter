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
