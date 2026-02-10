# 08) Classes + access modifiers + getter/setter

**ধারণা**
- `public` (default), `private`, `protected`।
- getter/setter দিয়ে validation/derived field।

**হাসপাতাল উদাহরণ**
```ts
class BillingService {
  private taxRate = 0.05;
  constructor(private readonly hospitalName: string) {}

  calculate(amount: number) {
    return amount + amount * this.taxRate;
  }
}

class PatientAccount {
  constructor(private _due: number = 0) {}
  get due() { return this._due; }
  set due(value: number) {
    if (value < 0) throw new Error('Negative due not allowed');
    this._due = value;
  }
}
```

**Interview Q**
- `private` vs `#private` field? → `#` সত্যিকারের JS প্রাইভেট, TS private শুধুই compile-time।

**Try it**
- `class BedManager` বানান; private array-এ beds রাখুন; public method দিয়ে নতুন bed add করুন।
