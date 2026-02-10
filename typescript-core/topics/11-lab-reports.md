# 11) Lab scenario: report workflow + exhaustive checks

**কী শিখবেন**
- discriminated union দিয়ে স্টেট মেশিন মডেল
- `never` ব্যবহার করে exhaustive switch

**হাসপাতাল উদাহরণ**
```ts
type LabStatus = 'requested' | 'in-progress' | 'completed' | 'rejected';

type LabReport =
  | { status: 'requested'; id: string; test: string; requestedBy: string }
  | { status: 'in-progress'; id: string; test: string; technician: string }
  | { status: 'completed'; id: string; test: string; result: 'positive' | 'negative'; verifiedBy: string }
  | { status: 'rejected'; id: string; test: string; reason: string };

function statusMessage(report: LabReport) {
  switch (report.status) {
    case 'requested':
      return `Waiting to start: ${report.test}`;
    case 'in-progress':
      return `Running by ${report.technician}`;
    case 'completed':
      return `Result: ${report.result} (verified by ${report.verifiedBy})`;
    case 'rejected':
      return `Rejected: ${report.reason}`;
    default:
      return assertNever(report); // compile-time guard
  }
}

function assertNever(x: never): never {
  throw new Error('Unhandled state: ' + JSON.stringify(x));
}
```

**Interview takeaways**
- discriminated union (tagged union) = compile-time state machine
- নতুন status যোগ করলে switch এ কম্পাইলার error দেবে → বাগ আগে থেকে ধরা পড়ে

**Try it**
- নতুন state `archived` যোগ করে switch আপডেট না করলে কী error আসে দেখুন।
