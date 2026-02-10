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
