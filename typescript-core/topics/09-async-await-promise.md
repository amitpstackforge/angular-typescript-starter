# 09) async/await + Promise basics

**মূল কথা**
- async ফাংশন সবসময় Promise রিটার্ন করে।
- `await` শুধু Promise-like (thenable) এর ওপর করা যায়।

**হাসপাতাল উদাহরণ**
```ts
interface LabReport { id: string; patientId: string; result: 'positive' | 'negative'; }

function fakeApi<T>(data: T, delay = 500): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

async function fetchLabReports(patientId: string): Promise<LabReport[]> {
  const reports = await fakeApi<LabReport[]>([
    { id: 'L1', patientId, result: 'negative' },
  ]);
  return reports;
}

async function showFirstReport(patientId: string) {
  try {
    const [first] = await fetchLabReports(patientId);
    console.log(first?.result ?? 'No report');
  } catch (err) {
    console.error('Failed to load', err);
  }
}
```

**Interview Q**
- Promise resolve vs reject flow? finally কোথায় লাগে?
- parallel fetch → `await Promise.all([fetchPatients(), fetchDoctors()])`

**Try it**
- `checkBedAvailability` নামে async ফাংশন বানিয়ে 1 সেকেন্ড পরে boolean resolve করুন।
