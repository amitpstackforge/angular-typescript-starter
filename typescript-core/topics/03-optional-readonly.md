# 03) `optional ?` ও `readonly`

**optional**
- property থাকতে বা না-ও থাকতে পারে; handle করতে guard/ডিফল্ট দরকার।

**readonly**
- runtime নয়, compile-time সুরক্ষা; immutability বাড়ায়।

**হাসপাতাল উদাহরণ**
```ts
interface PatientProfile {
  readonly id: string;
  name: string;
  emergencyContact?: string;
}

const p: PatientProfile = { id: 'P-100', name: 'Rima' };
// p.id = 'X'; // error: readonly

function formatContact(profile: PatientProfile) {
  return profile.emergencyContact ?? 'not provided';
}
```

**Interview Q**
- readonly shallow না deep? → শ্যালো। nested object সুরক্ষার জন্য readonly utility বা `as const` দরকার।

**Try it**
- `readonly wardList: string[]` দিলে array mutate করলে কী হবে? পরীক্ষা করুন।
