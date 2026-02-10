# 15) Forms (Angular fresher interview killer topic) – বাংলা + হাসপাতাল উদাহরণ

Reactive Forms দ্রুত শিখুন: FormGroup, FormControl, FormArray, Validators, custom validator, async validator, valueChanges, submit patterns। উদাহরণ: হাসপাতাল অ্যাপয়েন্টমেন্ট/ইনটেক ফর্ম।

## কী শিখবেন
- ReactiveFormsModule বেসিক
- Validators (required, minLength, pattern), custom validator
- FormArray dynamic fields
- valueChanges দিয়ে live UI আপডেট
- Submit best practice (disabled + loading)

## হাসপাতাল উদাহরণ (সম্ভাব্য প্রশ্নের সাথে)
- Patient intake form (name, age, symptoms FormArray)
- Appointment form (patient, doctor, slot, notes)
- Custom validator: age <= 120, slot future date
- Async validator (optional): email uniqueness (fake)

## পূর্ণ রানযোগ্য ন্যূনতম কোড (folder tree + files)
**ট্রি (`src/app/`):**
```
src/app/
  app.component.ts
  app.component.html
```

### app.component.ts
```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

function futureSlot(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  const chosen = new Date(value).getTime();
  return chosen > Date.now() ? null : { pastSlot: true };
}

function ageLimit(control: AbstractControl): ValidationErrors | null {
  const v = control.value;
  if (v == null) return null;
  return v <= 120 ? null : { ageTooHigh: true };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  loading = false;

  intakeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    age: new FormControl<number | null>(null, { validators: [ageLimit] }),
    symptoms: this.fb.array([this.fb.control('')]),
  });

  apptForm = this.fb.group({
    patient: ['', Validators.required],
    doctor: ['Dr. Sen', Validators.required],
    slot: ['', [Validators.required, futureSlot]],
    notes: [''],
  });

  constructor(private fb: FormBuilder) {}

  get symptoms() { return this.intakeForm.controls.symptoms as FormArray; }
  addSymptom() { this.symptoms.push(this.fb.control('')); }
  removeSymptom(i: number) { this.symptoms.removeAt(i); }

  submitIntake() {
    if (this.intakeForm.invalid) return;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      alert('Intake saved: ' + JSON.stringify(this.intakeForm.value));
      this.intakeForm.reset();
    }, 800);
  }

  submitAppt() {
    if (this.apptForm.invalid) return;
    alert('Appointment: ' + JSON.stringify(this.apptForm.value));
  }
}
```

### app.component.html
```html
<div class="p-4 space-y-6">
  <section class="bg-white border rounded-xl p-4 shadow">
    <h2 class="text-lg font-semibold">Patient Intake (FormArray + custom validator)</h2>
    <form [formGroup]="intakeForm" (ngSubmit)="submitIntake()" class="space-y-3">
      <div class="grid gap-3 md:grid-cols-2">
        <div>
          <label class="label">Name</label>
          <input class="input" formControlName="name" />
          <p *ngIf="intakeForm.controls.name.touched && intakeForm.controls.name.invalid" class="text-xs text-rose-600">
            Name is required (min 2 chars)
          </p>
        </div>
        <div>
          <label class="label">Age</label>
          <input class="input" type="number" formControlName="age" />
          <p *ngIf="intakeForm.controls.age.errors?.ageTooHigh" class="text-xs text-rose-600">Age must be ≤ 120</p>
        </div>
      </div>

      <div>
        <label class="label">Symptoms</label>
        <div formArrayName="symptoms" class="space-y-2">
          <div *ngFor="let c of symptoms.controls; let i = index" class="flex gap-2">
            <input class="input flex-1" [formControlName]="i" placeholder="Symptom" />
            <button type="button" class="text-sm text-rose-600" (click)="removeSymptom(i)">✕</button>
          </div>
        </div>
        <button type="button" class="text-sm text-blue-600 mt-1" (click)="addSymptom()">+ Add symptom</button>
      </div>

      <button class="btn" type="submit" [disabled]="loading || intakeForm.invalid">
        <span *ngIf="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2"></span>
        Save Intake
      </button>
    </form>
  </section>

  <section class="bg-white border rounded-xl p-4 shadow">
    <h2 class="text-lg font-semibold">Appointment (slot future-date validator)</h2>
    <form [formGroup]="apptForm" (ngSubmit)="submitAppt()" class="space-y-3">
      <div class="grid gap-3 md:grid-cols-2">
        <div>
          <label class="label">Patient</label>
          <input class="input" formControlName="patient" placeholder="Patient name" />
        </div>
        <div>
          <label class="label">Doctor</label>
          <input class="input" formControlName="doctor" />
        </div>
      </div>
      <div class="grid gap-3 md:grid-cols-2">
        <div>
          <label class="label">Slot</label>
          <input type="datetime-local" class="input" formControlName="slot" />
          <p *ngIf="apptForm.controls.slot.errors?.pastSlot" class="text-xs text-rose-600">Slot must be future</p>
        </div>
        <div>
          <label class="label">Notes</label>
          <input class="input" formControlName="notes" />
        </div>
      </div>
      <button class="btn w-auto px-4" type="submit" [disabled]="apptForm.invalid">Create Appointment</button>
    </form>
  </section>
</div>
```

## VS Code + Chrome রান স্টেপ (বিগিনার)
1) `ng new hms-forms --standalone --routing --style=scss` → `cd hms-forms`
2) `src/index.html` এ Tailwind CDN: `<script src="https://cdn.tailwindcss.com"></script>`
3) `src/app/app.component.ts` ও `app.component.html` তৈরি করে উপরের কোড পেস্ট করুন।
4) `ng serve` → http://localhost:4200
5) টেস্ট:
   - name খালি রাখলে বা ছোট হলে error দেখায়; age >120 এ error; submit disabled।
   - symptoms add/remove কাজ করে।
   - slot অতীতে দিলে error।
   - loading spinner দেখায় (save intake)।

## Interview ঝটপট
- Reactive বনাম Template-driven? (startup এ Reactive বেশি)
- FormArray কবে দরকার? (dynamic ফিল্ড যেমন symptoms/meds)
- Custom validator কোথায় রাখবেন? (pure function; শেয়ার করলে আলাদা ফাইল)
- Disable submit কখন? (form.invalid || loading)

## Extra HMS examples (কপি-পেস্ট করতে পারবেন)
1) **Medication FormArray (dose + frequency)**  
```ts
meds = this.fb.array([
  this.fb.group({ drug: ['Paracetamol', Validators.required], dose: ['500mg'], freq: ['TID'] })
]);
addMed() { this.meds.push(this.fb.group({ drug: ['', Validators.required], dose: [''], freq: [''] })); }
removeMed(i:number){ this.meds.removeAt(i); }
```
```html
<div formArrayName="meds" class="space-y-2">
  <div *ngFor="let m of meds.controls; let i=index" [formGroupName]="i" class="grid md:grid-cols-3 gap-2">
    <input class="input" formControlName="drug" placeholder="Drug" />
    <input class="input" formControlName="dose" placeholder="Dose" />
    <input class="input" formControlName="freq" placeholder="Frequency" />
    <button type="button" class="text-sm text-rose-600" (click)="removeMed(i)">✕</button>
  </div>
</div>
```

2) **Billing form (amount + GST auto-calc via valueChanges)**  
```ts
billingForm = this.fb.group({
  amount: [0, [Validators.required, Validators.min(0)]],
  gst: [{value:0, disabled:true}],
  total: [{value:0, disabled:true}],
});

ngOnInit() {
  this.billingForm.controls.amount.valueChanges.subscribe(v => {
    const amt = Number(v) || 0;
    const gst = +(amt * 0.18).toFixed(2);
    this.billingForm.patchValue({ gst, total: +(amt + gst).toFixed(2) }, { emitEvent: false });
  });
}
```
```html
<form [formGroup]="billingForm" class="grid md:grid-cols-3 gap-3">
  <div><label class="label">Amount</label><input class="input" type="number" formControlName="amount"></div>
  <div><label class="label">GST 18%</label><input class="input" formControlName="gst" disabled></div>
  <div><label class="label">Total</label><input class="input" formControlName="total" disabled></div>
</form>
```

3) **Async validator (fake email check)**  
```ts
import { of, delay, map } from 'rxjs';
function fakeEmailExists(email: string) { return of(email === 'taken@hms.com').pipe(delay(500)); }
const asyncEmailValidator = (control: AbstractControl) =>
  fakeEmailExists(control.value).pipe(map(exists => exists ? { emailTaken: true } : null));

userForm = this.fb.group({
  email: ['', [Validators.required, Validators.email], [asyncEmailValidator]],
});
```
```html
<input class="input" formControlName="email" placeholder="Email (async check)" />
<p *ngIf="userForm.controls.email.pending" class="text-xs text-slate-500">Checking...</p>
<p *ngIf="userForm.controls.email.errors?.emailTaken" class="text-xs text-rose-600">Email already used</p>
```
