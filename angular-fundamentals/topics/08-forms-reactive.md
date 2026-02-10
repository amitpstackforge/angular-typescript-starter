# 08) Reactive Forms (hospital forms)

- ReactiveFormModule → `FormGroup`, `FormControl`, `FormArray`
- Validators: required, minLength, pattern, custom

**হাসপাতাল উদাহরণ**
```ts
form = new FormGroup({
  name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
  age: new FormControl<number | null>(null),
  symptoms: new FormArray([ new FormControl('') ]),
});

addSymptom() { this.form.controls.symptoms.push(new FormControl('')); }
```

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="name" placeholder="Patient name" />
  <input formControlName="age" type="number" />
  <div formArrayName="symptoms">
    <input *ngFor="let c of form.controls.symptoms.controls; let i = index" [formControlName]="i" placeholder="Symptom" />
  </div>
  <button type="submit" [disabled]="form.invalid">Save</button>
</form>
```

**Try it**
- Custom validator: age < 120 না হলে invalid; error মেসেজ দেখান।

## Tailwind-ready HMS examples (Reactive Forms)
1) **Grid form layout**  
```html
<form [formGroup]="form" class="grid gap-3 md:grid-cols-2">
  <input class="input" formControlName="name" placeholder="Patient name" />
  <input class="input" type="number" formControlName="age" placeholder="Age" />
  <button class="btn md:col-span-2" [disabled]="form.invalid">Save</button>
</form>
```
2) **Error message**  
```html
<p *ngIf="form.controls.name.invalid && form.controls.name.touched" class="text-xs text-rose-600">Name required</p>
```
3) **Dynamic FormArray**  
```html
<div formArrayName="symptoms" class="space-y-2">
  <div *ngFor="let c of form.controls.symptoms.controls; let i=index" class="flex gap-2">
    <input class="input flex-1" [formControlName]="i" placeholder="Symptom" />
    <button class="text-sm text-rose-600" type="button" (click)="remove(i)">✕</button>
  </div>
</div>
```
4) **Submit spinner**  
```html
<button class="btn" type="submit">
  <span *ngIf="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2"></span>
  Submit
</button>
```
5) **SCSS Tailwind helpers**  
```scss
.input { @apply w-full border rounded px-3 py-2; }
.btn { @apply w-full bg-blue-600 text-white rounded px-4 py-2; }
```
