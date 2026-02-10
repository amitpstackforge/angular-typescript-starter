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

**UI test hint**: ReactiveFormsModule ইমপোর্ট করে ফর্মটি বসান; invalid state-এ Submit বাটন disable হচ্ছে কিনা আর error মেসেজ দেখাচ্ছে কিনা ব্রাউজারে দেখুন। Tailwind spinner দেখা যায় কিনা `loading=true` করে কনসোল থেকে ট্রিগার করুন।

## কীভাবে VS Code + Chrome এ দ্রুত চালাবেন
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) আপনার কম্পোনেন্টে `imports:[CommonModule, ReactiveFormsModule]` দিন; TS এ ফর্ম অবজেক্ট ও helper ফাংশন পেস্ট করুন।
3) একই কম্পোনেন্টের template এ গ্রিড ফর্ম/এরর/FormArray/spinner স্নিপেট পেস্ট করুন।
4) Tailwind CDN যোগ করে `ng serve`; Chrome এ ফর্ম পূরণ/খালি রেখে disable/error/spinner আচরণ দেখুন।

## সম্পূর্ণ রানযোগ্য ডেমো (সব টপিক টেস্ট করুন)
1) `ng new hms-demo --standalone --routing --style=scss` → `cd hms-demo`
2) `angular-fundamentals/demos/hms-appointments/*` → `src/app/` কপি করুন।
3) Tailwind CDN `src/index.html` এ যোগ করুন।
4) `ng serve`; `/appointments` পেজে reactive form, errors, spinner, disable state—all observable। Network ট্যাবে POST (jsonplaceholder) দেখুন।

## পূর্ণ রানযোগ্য ন্যূনতম কোড (Reactive Forms ডেমো)
**ট্রি**
```
src/app/app.component.ts
src/app/app.component.html
```

**app.component.ts**
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  loading = false;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    age: new FormControl<number | null>(null),
    symptoms: this.fb.array([this.fb.control('')]),
  });

  constructor(private fb: FormBuilder) {}

  get symptoms() { return this.form.controls.symptoms as FormArray; }
  addSymptom() { this.symptoms.push(this.fb.control('')); }
  remove(i: number) { this.symptoms.removeAt(i); }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    setTimeout(() => { this.loading = false; alert(JSON.stringify(this.form.value)); }, 800);
  }
}
```

**app.component.html**
```html
<div class="p-4 space-y-3">
  <h1 class="text-xl font-semibold">Patient Intake</h1>
  <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-3">
    <div class="grid gap-3 md:grid-cols-2">
      <div>
        <label class="label">Name</label>
        <input class="input" formControlName="name" placeholder="Patient name" />
        <p *ngIf="form.controls.name.invalid && form.controls.name.touched" class="text-xs text-rose-600">Name required</p>
      </div>
      <div>
        <label class="label">Age</label>
        <input class="input" type="number" formControlName="age" />
      </div>
    </div>

    <div>
      <label class="label">Symptoms</label>
      <div formArrayName="symptoms" class="space-y-2">
        <div *ngFor="let c of symptoms.controls; let i=index" class="flex gap-2">
          <input class="input flex-1" [formControlName]="i" placeholder="Symptom" />
          <button type="button" class="text-sm text-rose-600" (click)="remove(i)">✕</button>
        </div>
      </div>
      <button type="button" class="text-sm text-blue-600 mt-1" (click)="addSymptom()">+ Add symptom</button>
    </div>

    <button class="btn" type="submit" [disabled]="loading || form.invalid">
      <span *ngIf="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2"></span>
      Submit
    </button>
  </form>
</div>
```

**Run**: `ng serve` → fill form; invalid হলে submit disabled; spinner দেখাবে।
