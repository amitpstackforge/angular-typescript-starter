# 01) `type` বনাম `interface`

**কখন কী?**
- `interface`: shape বা contract; অন্য interface extend করা সহজ; class `implements` করতে পারে।
- `type`: union/intersection, utility type, primitive alias; দ্রুত composition।

**হাসপাতাল উদাহরণ**
```ts
interface Patient {
  id: string;
  name: string;
  age?: number;
}

type Doctor = {
  id: string;
  name: string;
  specialty: 'cardio' | 'neuro' | 'er';
};

// composition সহজে
interface EmergencyPatient extends Patient {
  triageLevel: 1 | 2 | 3;
}

type Staff = Doctor | Nurse; // union শুধু type দিয়ে করা যায়

type Nurse = PatientCare & { shift: 'day' | 'night' };
type PatientCare = { ward: string };
```

**Interview Q**
- `type` দিয়ে কি class implement করা যায়? → না, কিন্তু class type-এর structure implement করতে পারে।
- multiple declaration merging হয়? → interface হয়, type হয় না।

**Try it**
- `BillingContact` interface বানিয়ে `type ContactMethod = 'phone' | 'email'` union ব্যবহার করুন।

## ব্রাউজারে কনসোল টেস্টের ৪টি দ্রুত উদাহরণ

> ক্রোম DevTools Console এ কপি-পেস্ট করুন (ES2020+ ধরেই লেখা)।

1) **TypeScript এ Interface extends Interface কীভাবে কাজ করে?**
```ts
interface Patient { id: string; name: string; }
interface EmergencyPatient extends Patient { triageLevel: 1 | 2 | 3; }
const e: EmergencyPatient = { id: 'P1', name: 'Rima', triageLevel: 2 };
console.log('Emergency patient:', e);
```

2) **TypeScript এ Union কেন শুধু Type দিয়ে হয়? Interface দিয়ে কেন নয়?** 
```ts
type Doctor = { id: string; name: string; specialty: 'cardio' | 'er' };
type Nurse  = { id: string; name: string; ward: string };
type Staff = Doctor | Nurse;
const team: Staff[] = [
  { id: 'D1', name: 'Dr. Sen', specialty: 'cardio' },
  { id: 'N1', name: 'Anu', ward: 'ICU' },
];
console.log('Staff union:', team);
```

3) **Declaration Merging কী? Interface merge হয় কিন্তু Type কেন হয় না?**
```ts
interface Bed { id: string; type: 'ICU' | 'GENERAL'; }
interface Bed { occupied?: boolean; } // merge works
const bed: Bed = { id: 'B1', type: 'ICU', occupied: false };
console.log('Merged interface:', bed);

type Pharmacy = { name: string; }; 
// type Pharmacy = { code: string; }; // uncomment করলে error: duplicate identifier
```

4) **Class কেন Interface implement করে, Type না? TypeScript Explained**
```ts
interface Repo<T> { upsert(entity: T): void; all(): T[]; }
class InMemoryRepo<T extends { id: string }> implements Repo<T> {
  store = new Map<string, T>();
  upsert(entity: T) { this.store.set(entity.id, entity); }
  all() { return [...this.store.values()]; }
}
const r = new InMemoryRepo<{ id: string; value: number }>();
r.upsert({ id: 'x', value: 10 });
console.log('Repo values:', r.all());
```
