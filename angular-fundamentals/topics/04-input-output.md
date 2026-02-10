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
