# 05) `enum` বনাম string literal union

**নিয়ম**
- ছোট নির্দিষ্ট ভ্যালু? → string literal union (`'ICU' | 'GENERAL'`).
- runtime-এ iterate/lookup দরকার? → `enum` সুবিধাজনক (object হিসাবে থাকে)।

**হাসপাতাল উদাহরণ**
```ts
type BedType = 'ICU' | 'GENERAL' | 'PRIVATE';

enum AdmissionStatus {
  NEW = 'NEW',
  ADMITTED = 'ADMITTED',
  DISCHARGED = 'DISCHARGED',
}

function allocate(bed: BedType) {
  if (bed === 'ICU') console.log('High priority');
}

function statusLabel(s: AdmissionStatus) {
  return s === AdmissionStatus.NEW ? 'Waiting for bed' : s;
}
```

**Trade-off**
- union → treeshake সহজ, autocomplete ভালো, অতিরিক্ত কোড জেন হয় না।
- enum → value lookup (`AdmissionStatus['NEW']`) ও reverse mapping (numeric enum এ) সম্ভব।

**Try it**
- `enum Role { DOCTOR='DOCTOR', NURSE='NURSE' }` ও একই union `'DOCTOR' | 'NURSE'` লিখে bundle size পার্থক্য সম্পর্কে নোট করুন।
