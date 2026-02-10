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
