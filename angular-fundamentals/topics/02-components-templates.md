# 02) Components & templates বেসিক

- Component = TS class + template + styles.
- Decorator: `@Component({ selector, templateUrl/inline, styleUrls, standalone })`
- Template binding: interpolation `{{ }}`, property `[value]`, event `(click)`, two-way `[(ngModel)]` (FormsModule)

**হাসপাতাল উদাহরণ (inline template)**
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'hms-hello',
  standalone: true,
  template: `
    <h2>Welcome {{ hospitalName }}</h2>
    <p>Total beds: {{ beds }}</p>
  `,
})
export class HelloComponent {
  hospitalName = 'CityCare';
  beds = 42;
}
```

**Console টেস্ট**
- এই কম্পোনেন্টকে `main.ts` এ bootstrap করে ব্রাউজারে `hospitalName` বদলিয়ে devtools Elements প্যানেলে live change দেখুন।

**Interview Q**
- selector naming convention?
- templateUrl বনাম inline template কখন?

## Tailwind-ready HMS examples (Components)
1) **Patient badge component (inline)**  
```ts
@Component({selector:'hms-badge',standalone:true,template:`<span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{{label}}</span>`})
export class Badge { @Input() label=''; }
```
2) **Card with inputs**  
```ts
@Component({selector:'hms-card',standalone:true,template:`<div class="border rounded-xl p-4 shadow bg-white"><ng-content/></div>`})
export class Card {}
```
3) **Template string with Tailwind**  
```ts
template: `<button class="btn" (click)="admit()">Admit</button>`,
styles: [`.btn{ @apply bg-blue-600 text-white rounded px-3 py-2; }`]
```
4) **List rendering**  
```html
<hms-card><ul class="divide-y divide-slate-200">
  <li *ngFor="let p of patients" class="py-2 flex justify-between">
    <span>{{p.name}}</span><span class="text-slate-500">{{p.bed}}</span>
  </li>
</ul></hms-card>
```
