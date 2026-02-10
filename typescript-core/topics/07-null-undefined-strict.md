# 07) `null` / `undefined` + strict mode

**strictNullChecks**
- চালু থাকলে `string` এ `null` assign করা যায় না; union দরকার (`string | null`).

**হাসপাতাল উদাহরণ**
```ts
interface Bed {
  id: string;
  patientId?: string | null; // undefined = not recorded, null = empty bed
}

function bedLabel(bed: Bed) {
  if (bed.patientId == null) { // null বা undefined দুটোই cover
    return 'Empty bed';
  }
  return `Occupied by ${bed.patientId}`;
}
```

**Tips**
- optional chaining `patient?.address?.city` ব্যবহার করুন।
- default value: `const name = patient.name ?? 'Anonymous';`

**Try it**
- `getNextAppointment(patientId?: string)` লিখে missing id এর জন্য error throw করুন।
