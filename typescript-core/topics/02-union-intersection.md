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
