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
