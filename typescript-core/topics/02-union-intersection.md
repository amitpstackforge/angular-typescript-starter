# 02) Union (`|`) ও Intersection (`&`)

**ধারণা**
- `Union`: একাধিক সম্ভাব্য টাইপের যেকোনো একটি।
- `Intersection`: একাধিক টাইপ একত্রে; সব property দরকার।

**হাসপাতাল উদাহরণ**
```ts
type StaffRole = 'doctor' | 'nurse' | 'admin'; // union literal

type Admittable = { admittedAt: Date };
type Billable = { billingAmount: number };

type InPatient = Patient & Admittable & Billable; // intersection

function admit(entity: Patient | InPatient) {
  if ('admittedAt' in entity) {
    console.log('Already admitted on', entity.admittedAt);
  } else {
    console.log('Admitting new patient');
  }
}
```

**Tips**
- union narrow করতে `in`, `typeof`, `instanceof` ব্যবহার করুন।
- intersection অতিরিক্ত property enforce করে—API response combine করতে সুবিধা।

**Try it**
- `type Appointment = WalkIn | Scheduled` ইউনিয়ন বানান; Scheduled এ `slot: string` যোগ করুন।

## ব্রাউজারে কনসোল টেস্ট (Union & Intersection)

1) **TypeScript এ Union Narrowing কীভাবে কাজ করে? (`in` operator সহ)**
```ts
type WalkIn = { kind: 'walkin'; name: string };
type Scheduled = { kind: 'scheduled'; name: string; slot: string };
type Appointment = WalkIn | Scheduled;

function label(appt: Appointment) {
  if ('slot' in appt) return `Scheduled at ${appt.slot}`;
  return 'Walk-in';
}
console.log(label({ kind: 'scheduled', name: 'Rima', slot: '10:30' }));
```

2)  **Intersection (&) দিয়ে একাধিক Type Combine করা**
```ts
type Billing = { amount: number };
type Identified = { id: string };
type BillablePatient = Billing & Identified;
const bp: BillablePatient = { id: 'P10', amount: 5000 };
console.log('Billable patient:', bp);
```

3) **Union Type দিয়ে Function Parameter Handle করা**

```ts
type StaffRole = 'doctor' | 'nurse' | 'admin';
function assign(role: StaffRole) {
  switch (role) {
    case 'doctor': return 'ICU';
    case 'nurse': return 'Ward';
    case 'admin': return 'Front desk';
  }
}
console.log(assign('nurse'));
```

4) **TypeScript এ Mixins বুঝুন Intersection দিয়ে**

```ts
type Timestamped = { createdAt: Date };
type Bed = { id: string; type: 'ICU' | 'GENERAL' };
const bed: Bed & Timestamped = { id: 'B9', type: 'ICU', createdAt: new Date() };
console.log('Bed with timestamp:', bed);
```
