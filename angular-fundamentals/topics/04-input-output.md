# 04) @Input/@Output ও কম্পোনেন্ট যোগাযোগ

- Parent → Child: `@Input()`
- Child → Parent: `@Output() event = new EventEmitter<...>()`
- ViewChild বেসিক: template reference ধরতে ব্যবহার।

**হাসপাতাল উদাহরণ** (patient-card শিশুকম্পোনেন্ট)
```ts
@Component({ selector: 'hms-patient-card', standalone: true, template: `
  <div class="card">
    <h4>{{ patient.name }}</h4>
    <p>Bed: {{ patient.bed }}</p>
    <button (click)="discharge.emit(patient.id)">Discharge</button>
  </div>
` })
export class PatientCardComponent {
  @Input() patient!: { id: string; name: string; bed: string };
  @Output() discharge = new EventEmitter<string>();
}
```

**Parent usage**
```html
<hms-patient-card
  *ngFor="let p of patients"
  [patient]="p"
  (discharge)="onDischarge($event)">
</hms-patient-card>
```

```ts
patients = [ { id: 'P1', name: 'Aisha', bed: 'ICU' } ];
onDischarge(id: string) { this.patients = this.patients.filter(p => p.id !== id); }
```

**Interview Q**
- ChangeDetection OnPush থাকলে Input mutation-এর ঝুঁকি কী?
- Output EventEmitter বনাম RxJS Subject কখন?

## Tailwind-ready HMS examples (@Input/@Output)
1) **Patient card (child)**  
```html
<div class="border rounded-lg p-3 flex justify-between">
  <div>
    <p class="font-semibold">{{ patient.name }}</p>
    <p class="text-xs text-slate-500">Bed: {{ patient.bed }}</p>
  </div>
  <button class="text-red-600 text-sm" (click)="discharge.emit(patient.id)">Discharge</button>
</div>
```
2) **Parent list**  
```html
<hms-patient-card *ngFor="let p of patients" [patient]="p" (discharge)="handle($event)"></hms-patient-card>
```
3) **Badge color via Input**  
```ts
@Input() tone: 'green'|'red'='green';
get classes() { return this.tone==='green' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'; }
```
4) **Child emits edit event**  
```html
<button class="text-blue-600" (click)="edit.emit(patient)">Edit</button>
```

**UI test hint**: Parent টেমপ্লেটে `console.log($event)` দিয়ে Output বাউন্ড করুন; ব্রাউজারে Discharge/Edit ক্লিক করলে কনসোলে id/অবজেক্ট দেখা যাবে। Tailwind ক্লাস দেখে স্টাইল যাচাই করুন।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `src/app/patient-card.component.ts` তৈরি করে child স্নিপেট পেস্ট করুন (`standalone:true` রাখুন)।
3) `app.component.ts` এ `imports:[PatientCardComponent, CommonModule]` যোগ করে parent টেমপ্লেটে child ব্যবহার করুন এবং handlers লিখুন।
4) Tailwind CDN যোগ করে `ng serve`; Chrome কনসোলে Output event লগ দেখা ও স্টাইল পরীক্ষা করুন।

## সম্পূর্ণ রানযোগ্য ডেমো (সব টপিক টেস্ট করুন)
1) প্রজেক্ট বানান: `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) কপি: `angular-fundamentals/demos/hms-appointments/*` → `src/app/`
3) Tailwind CDN: `src/index.html` এ `<script src="https://cdn.tailwindcss.com"></script>`
4) `ng serve`  
   - `/patients` এ `hms-patient-card` কম্পোনেন্টের Input/Output কাজ করছে কিনা দেখুন (Discharge/Edit লগ হবে)।
5) ট্রি: `components/patient-card.component.ts`, `pages/patients.component.ts` ইতিমধ্যেই ওয়্যার করা।

## পূর্ণ রানযোগ্য ন্যূনতম কোড (Input/Output ডেমো)
**ফোল্ডার ট্রি**
```
src/app/
  app.component.ts
  app.component.html
  patient-card.component.ts
```

**patient-card.component.ts**
```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'patient-card',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="border rounded-lg p-3 flex justify-between">
    <div>
      <p class="font-semibold">{{ patient.name }}</p>
      <p class="text-xs text-slate-500">Bed: {{ patient.bed }}</p>
    </div>
    <div class="flex gap-2">
      <button class="text-blue-600 text-sm" (click)="edit.emit(patient)">Edit</button>
      <button class="text-rose-600 text-sm" (click)="discharge.emit(patient.id)">Discharge</button>
    </div>
  </div>`,
})
export class PatientCardComponent {
  @Input() patient!: { id: string; name: string; bed: string };
  @Output() discharge = new EventEmitter<string>();
  @Output() edit = new EventEmitter<any>();
}
```

**app.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientCardComponent } from './patient-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PatientCardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  patients = [
    { id: 'P1', name: 'Aisha', bed: 'ICU' },
    { id: 'P2', name: 'Rahul', bed: 'GENERAL' },
  ];
  onDischarge(id: string) { console.log('Discharge', id); }
  onEdit(p: any) { console.log('Edit', p); }
}
```

**app.component.html**
```html
<div class="p-4 space-y-3">
  <patient-card
    *ngFor="let p of patients"
    [patient]="p"
    (discharge)="onDischarge($event)"
    (edit)="onEdit($event)">
  </patient-card>
</div>
```

**Run**: `ng serve` (Tailwind CDN in index.html for styling). Chrome console এ Edit/Discharge ইভেন্ট লগ দেখুন।
