# 03) Data binding ও directives

**Binding summary**
- Interpolation: `{{ patient.name }}`
- Property: `[disabled]="isICUFull"`
- Event: `(click)="admit()"`
- Two-way: `[(ngModel)]="form.name"`

**Built-in directives**
- Structural: `*ngIf`, `*ngFor`, `ngSwitch`
- Attribute: `[ngClass]`, `[ngStyle]`

**হাসপাতাল উদাহরণ**
```html
<ul>
  <li *ngFor="let bed of beds; trackBy: trackById">
    {{ bed.id }} - {{ bed.type }}
    <span [ngClass]="{ 'text-red-600': bed.occupied }">
      {{ bed.occupied ? 'Occupied' : 'Free' }}
    </span>
  </li>
</ul>
<button (click)="admitNew()" [disabled]="isICUFull">Admit ICU</button>
```

```ts
beds = [
  { id: 'B1', type: 'ICU', occupied: true },
  { id: 'B2', type: 'ICU', occupied: false },
];
get isICUFull() { return this.beds.every(b => b.occupied); }
trackById = (_: number, item: any) => item.id;
```

**Try it**
- `ngSwitch` দিয়ে role অনুযায়ী badge রঙ বদলান (doctor/nurse/admin)।

## Tailwind-ready HMS examples (Binding + Directives)
1) **ngIf skeleton**  
```html
<div *ngIf="loading" class="animate-pulse h-16 bg-slate-200 rounded"></div>
<div *ngIf="!loading" class="p-3 bg-white rounded shadow">Loaded beds</div>
```
2) **ngFor with badge**  
```html
<li *ngFor="let bed of beds" class="flex justify-between py-2 border-b">
  {{ bed.id }} <span [ngClass]="bed.occupied ? 'text-red-600' : 'text-emerald-600'">
    {{ bed.occupied ? 'Occupied' : 'Free' }}
  </span>
</li>
```
3) **ngSwitch for status**  
```html
<div [ngSwitch]="patient.status">
  <span *ngSwitchCase="'NEW'" class="badge bg-amber-100 text-amber-700">New</span>
  <span *ngSwitchCase="'ADMITTED'" class="badge bg-emerald-100 text-emerald-700">Admitted</span>
  <span *ngSwitchDefault class="badge bg-slate-100 text-slate-600">Unknown</span>
</div>
```
4) **Two-way + disable button**  
```html
<input class="input" [(ngModel)]="search" placeholder="Search patient" />
<button class="btn" [disabled]="!search" (click)="doSearch()">Search</button>
```

**UI test hint**: `FormsModule` ইমপোর্ট করে কম্পোনেন্টে উপরের টেমপ্লেট দিন; DevTools → Toggle `search` মডেল (Component tab) আর বাটনের disabled state একসাথে দেখুন।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) আপনার কম্পোনেন্টে `imports: [CommonModule, FormsModule]` যোগ করুন।
3) `app.component.html` এ এই binding/directive স্নিপেটগুলো পেস্ট করুন; `app.component.ts` এ `beds`, `search`, `doSearch()` ডিফাইন করুন।
4) Tailwind CDN যোগ করে `ng serve`; Chrome এ UI টেস্ট করুন (ngIf/ngFor/ngSwitch, disabled বাটন)। 

## সম্পূর্ণ রানযোগ্য ডেমো (সব টপিক টেস্ট করুন)
1) `ng new hms-demo --standalone --routing --style=scss` && `cd hms-demo`
2) `angular-fundamentals/demos/hms-appointments/*` কপি করে `src/app/` এ পেস্ট।
3) Tailwind CDN যোগ করুন: `src/index.html` `<head>` এ `<script src="https://cdn.tailwindcss.com"></script>`
4) `ng serve` → http://localhost:4200  
   - `/patients` পেজে `ngFor/ngClass`, debounced search, directive টেস্ট করুন।
5) ফোল্ডার ট্রি: `components/`, `pages/`, `services/`, `guards/`, `resolvers/`, `interceptors/` সব প্রস্তুত।

## পূর্ণ রানযোগ্য ন্যূনতম কোড (Binding/Directive ডেমো)
**ফোল্ডার ট্রি (Angular CLI `src/app/`):**
```
src/app/
  app.component.ts
  app.component.html
```

**app.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  search = '';
  beds = [
    { id: 'B1', type: 'ICU', occupied: true },
    { id: 'B2', type: 'ICU', occupied: false },
    { id: 'B3', type: 'GENERAL', occupied: true },
  ];
  get filtered() {
    return this.beds.filter(b => b.id.toLowerCase().includes(this.search.toLowerCase()));
  }
  admit() { alert('Admit clicked'); }
}
```

**app.component.html**
```html
<div class="p-4 space-y-4">
  <input class="input" [(ngModel)]="search" placeholder="Search bed" />
  <button class="btn w-auto px-3 py-2" [disabled]="!search" (click)="admit()">Admit ICU</button>

  <ul class="divide-y divide-slate-200">
    <li *ngFor="let bed of filtered; trackBy: trackById" class="py-2 flex justify-between">
      <span>{{ bed.id }} ({{ bed.type }})</span>
      <span [ngClass]="bed.occupied ? 'text-red-600' : 'text-emerald-600'">
        {{ bed.occupied ? 'Occupied' : 'Free' }}
      </span>
    </li>
  </ul>
</div>
```

**(helper)** trackBy ইনলাইন: `trackById = (_:number, item:any) => item.id;` (TS এ যোগ করুন)  
**Run**: `ng serve` → http://localhost:4200 (Tailwind CDN থাকলে স্টাইল মিলবে)।
