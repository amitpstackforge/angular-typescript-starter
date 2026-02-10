# 06) `any` / `unknown` / `never`

**any**
- টাইপ চেক বন্ধ; দ্রুত কিন্তু বাগ-প্রবণ।

**unknown**
- safe any; আগে narrow করতে হয়। API/JSON input এর জন্য ideal।

**never**
- কোনো মান ফেরত না দেয় (error throw, infinite loop), অথবা exhaustive check।

**হাসপাতাল উদাহরণ**
```ts
function parsePatient(json: unknown): Patient {
  if (typeof json === 'object' && json !== null && 'name' in json) {
    const obj = json as { name: string; id?: string };
    return { id: obj.id ?? crypto.randomUUID(), name: obj.name };
  }
  throw new Error('invalid patient'); // returns never
}

function assertNever(x: never): never {
  throw new Error(`Unhandled variant: ${String(x)}`);
}
```

**Interview Q**
- `unknown` কে সরাসরি property অ্যাক্সেস করা যায়? → না, narrow দরকার।
- exhaustive check কেন গুরুত্বপূর্ণ? → future role যোগ হলে কম্পাইলার সতর্ক করবে।

**Try it**
- `type PaymentMethod = 'cash' | 'card' | 'upi'` নিয়ে switch লিখে `assertNever` কল করুন।
