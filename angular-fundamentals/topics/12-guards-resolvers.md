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
