# 04) Generics `<T>`

**কেন দরকার?**
- পুনঃব্যবহারযোগ্য ফাংশন/ক্লাসে টাইপ নিরাপত্তা রাখা।

**হাসপাতাল উদাহরণ**
```ts
// API response wrapper
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

function wrapResponse<T>(data: T, message = 'ok'): ApiResponse<T> {
  return { data, message, success: true };
}

const patientResp = wrapResponse<Patient>({ id: 'P1', name: 'Asha' });
const billResp = wrapResponse<number>(4500);

// Generic repository
class Repo<T extends { id: string }> {
  private store = new Map<string, T>();
  upsert(entity: T) { this.store.set(entity.id, entity); }
  find(id: string) { return this.store.get(id); }
}

const patientRepo = new Repo<Patient>();
patientRepo.upsert({ id: 'P2', name: 'Tomal' });
```

**Interview Q**
- `T extends` কবে? constraint দিলে ভেতরে property safe হয়।
- default generic: `function fetchOne<T = Patient>() {}`

**Try it**
- `PaginatedResponse<T>` বানান: `{ items: T[]; total: number; page: number; }` এবং `wrapResponse` এর মতো ব্যবহার করুন।
