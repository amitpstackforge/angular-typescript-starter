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

**UI test hint**: `AppComponent` টেমপ্লেটে উপরোক্ত স্নিপেট রেখে `ng serve`; Elements প্যানেলে `hms-card` shadow-free render ও Tailwind ক্লাস প্রয়োগ দেখা যাবে।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `src/app/` এ নতুন ফাইল বানান: `badge.component.ts`, `card.component.ts` ইত্যাদি; স্নিপেটগুলো পেস্ট করুন।
3) `app.component.ts` এ `imports`-এ তৈরি কম্পোনেন্টগুলো যোগ করুন; `app.component.html` এ ব্যবহার করুন।
4) `src/index.html` এ Tailwind CDN যোগ করুন (বা proper build); `ng serve` চালিয়ে Chrome এ ফলাফল দেখুন।

## সম্পূর্ণ রানযোগ্য ডেমো (সব টপিক টেস্ট করুন)
1) প্রজেক্ট তৈরি:  
   ```bash
   ng new hms-demo --standalone --routing --style=scss
   cd hms-demo
   ```
2) এই রিপো থেকে কপি: `angular-fundamentals/demos/hms-appointments/*` → `src/app/`
3) Tailwind CDN: `src/index.html` এ `<script src="https://cdn.tailwindcss.com"></script>`
4) রান: `ng serve` → http://localhost:4200  
   - কম্পোনেন্ট ব্যবহার: `components/` ফোল্ডারের badge/card/patient-card প্রস্তুত আছে।
5) স্ট্রাকচার দেখুন:
```
src/app/components/ (badge, card, patient-card)
src/app/pages/ (login, dashboard, patients, patient-details, appointments)
src/app/services/, guards/, resolvers/, interceptors/
```

## পূর্ণ রানযোগ্য ন্যূনতম কোড (শুধু কম্পোনেন্ট পরীক্ষার জন্য)
**ফোল্ডার ট্রি (Angular CLI প্রজেক্টের `src/app/`):**
```
src/app/
  app.component.ts
  app.component.html
  components/
    badge.component.ts
    card.component.ts
    patient-card.component.ts
```

**app.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './components/badge.component';
import { CardComponent } from './components/card.component';
import { PatientCardComponent } from './components/patient-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BadgeComponent, CardComponent, PatientCardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  patients = [
    { id: 'P1', name: 'Aisha', bed: 'ICU', status: 'Admitted' },
    { id: 'P2', name: 'Rahul', bed: 'GENERAL', status: 'New' },
  ];
  onDischarge(id: string) { console.log('Discharge', id); }
  onEdit(p: any) { console.log('Edit', p); }
}
```

**app.component.html**
```html
<div class="p-4 space-y-4">
  <h1 class="text-2xl font-semibold text-slate-900">Components Demo</h1>

  <hms-card>
    <h2 class="text-lg font-semibold mb-2">Badges</h2>
    <hms-badge label="Admitted" tone="green"></hms-badge>
    <hms-badge label="New" tone="amber"></hms-badge>
    <hms-badge label="Critical" tone="red"></hms-badge>
  </hms-card>

  <hms-card>
    <h2 class="text-lg font-semibold mb-2">Patient Cards</hms-card>
    <div class="space-y-3">
      <hms-patient-card
        *ngFor="let p of patients"
        [patient]="p"
        (discharge)="onDischarge($event)"
        (edit)="onEdit($event)">
      </hms-patient-card>
    </div>
  </hms-card>
</div>
```

**components/badge.component.ts**
```ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<span [ngClass]="classes" class="px-2 py-1 rounded text-xs font-medium">{{label}}</span>`,
})
export class BadgeComponent {
  @Input() label = '';
  @Input() tone: 'green' | 'red' | 'blue' | 'amber' = 'blue';
  get classes() {
    return {
      green: 'bg-emerald-100 text-emerald-700',
      red: 'bg-rose-100 text-rose-700',
      blue: 'bg-blue-100 text-blue-700',
      amber: 'bg-amber-100 text-amber-700',
    }[this.tone];
  }
}
```

**components/card.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hms-card',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"><ng-content></ng-content></div>`,
})
export class CardComponent {}
```

**components/patient-card.component.ts**
```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './badge.component';

@Component({
  selector: 'hms-patient-card',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  template: `
  <div class="border rounded-lg p-3 flex justify-between items-center">
    <div>
      <p class="font-semibold">{{ patient.name }}</p>
      <p class="text-xs text-slate-500">Bed: {{ patient.bed }}</p>
      <hms-badge [label]="patient.status" [tone]="patient.status === 'Admitted' ? 'green' : 'amber'"></hms-badge>
    </div>
    <div class="flex gap-2">
      <button class="text-blue-600 text-sm" (click)="edit.emit(patient)">Edit</button>
      <button class="text-rose-600 text-sm" (click)="discharge.emit(patient.id)">Discharge</button>
    </div>
  </div>`,
})
export class PatientCardComponent {
  @Input() patient!: { id: string; name: string; bed: string; status: string };
  @Output() discharge = new EventEmitter<string>();
  @Output() edit = new EventEmitter<any>();
}
```

**Run it**
```bash
ng serve
```
Open http://localhost:4200 in Chrome. (Tailwind via CDN already in index.html if you added it.)  
You’ll see badges and patient cards; clicking Edit/Discharge logs events in console.
