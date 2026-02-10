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

## ব্রাউজারে কনসোল টেস্ট (async/await)

1) **Basic async**
```ts
async function greet(name) { return `Hi ${name}`; }
greet('Asha').then(console.log);
```

2) **Await + try/catch**
```ts
async function risky(ok = true) {
  if (!ok) throw new Error('fail');
  return 'success';
}
(async () => {
  try { console.log(await risky(false)); }
  catch (e) { console.log('Caught:', e.message); }
})();
```

3) **Parallel calls**
```ts
function fake(delay, value) { return new Promise(r => setTimeout(() => r(value), delay)); }
(async () => {
  const [p, d] = await Promise.all([fake(200, 'patient'), fake(300, 'doctor')]);
  console.log(p, d);
})();
```

4) **Finally usage**
```ts
fake(100, 'done')
  .finally(() => console.log('cleanup after API'));
```

## লাইভ ডামি API উদাহরণ (HMS প্রসঙ্গ ধরে)

> নেটওয়ার্ক কল করবে, তাই ব্রাউজার কনসোল থেকে চালান। এন্ডপয়েন্টগুলো CORS-enabled পাবলিক fake API—ডেটা স্থায়ী নয়।

1) **Patients list (DummyJSON users)**  
```ts
async function loadPatients() {
  const res = await fetch('https://dummyjson.com/users?limit=5'); // fake “patients”
  const data = await res.json();
  console.log('Patients:', data.users.map(u => u.firstName));
}
loadPatients();
```

2) **Create appointment (JSONPlaceholder post)**  
```ts
async function createAppointment() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Checkup', patientId: 101, slot: '2026-02-12T10:00' })
  });
  const data = await res.json();
  console.log('Appointment created (mock id):', data);
}
createAppointment();
```

3) **Pharmacy stock (FakerAPI companies as suppliers)**  
```ts
async function loadSuppliers() {
  const res = await fetch('https://fakerapi.it/api/v1/companies?_quantity=3&_seed=hospital');
  const data = await res.json();
  console.log('Suppliers:', data.data.map(c => c.name));
}
loadSuppliers();
```

4) **Parallel fetch: patients + suppliers**  
```ts
async function loadDashboard() {
  const [patients, suppliers] = await Promise.all([
    fetch('https://dummyjson.com/users?limit=3').then(r => r.json()),
    fetch('https://fakerapi.it/api/v1/companies?_quantity=2&_seed=hospital').then(r => r.json()),
  ]);
  console.log('Patients:', patients.users.map(u => u.firstName));
  console.log('Suppliers:', suppliers.data.map(s => s.name));
}
loadDashboard();
```

## Tailwind + async (এক পেজে কপি-পেস্ট করে চলবে)

নিচের ব্লকটা নতুন `async-tailwind-demo.html` এ রাখুন, ব্রাউজারে খুলুন। Tailwind CDN + async fetch ব্যবহার করে patients লিস্ট ও অ্যাপয়েন্টমেন্ট POST দেখানো হয়েছে।

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <script src="https://cdn.tailwindcss.com"></script>
  <title>HMS Async Demo</title>
</head>
<body class="bg-slate-50 p-6">
  <div class="mx-auto max-w-3xl space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-slate-900">Hospital Async Demo</h1>
      <span id="status" class="text-sm text-slate-500">Idle</span>
    </div>

    <!-- Patients card -->
    <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div class="flex items-center gap-2 mb-3">
        <div class="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">P</div>
        <h2 class="text-lg font-semibold text-slate-900">Patients (dummyjson)</h2>
      </div>
      <ul id="patientList" class="space-y-2 text-sm text-slate-700">
        <li class="text-slate-400">Loading...</li>
      </ul>
    </div>

    <!-- Appointment form -->
    <form id="apptForm" class="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 class="text-lg font-semibold text-slate-900">Create Appointment (JSONPlaceholder)</h3>
      <div class="grid gap-3 md:grid-cols-2">
        <div>
          <label class="text-sm font-medium text-slate-700">Patient</label>
          <input id="patientName" class="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm" placeholder="Aisha" required>
        </div>
        <div>
          <label class="text-sm font-medium text-slate-700">Slot</label>
          <input id="slot" type="datetime-local" class="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm" required>
        </div>
      </div>
      <button class="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60" type="submit">Create</button>
      <div id="result" class="text-sm text-emerald-700"></div>
    </form>
  </div>

  <script type="module">
    const statusEl = document.getElementById('status');
    const listEl = document.getElementById('patientList');
    const form = document.getElementById('apptForm');
    const resultEl = document.getElementById('result');
    const submitBtn = form.querySelector('button');

    async function loadPatients() {
      statusEl.textContent = 'Fetching patients...';
      const res = await fetch('https://dummyjson.com/users?limit=6');
      const data = await res.json();
      listEl.innerHTML = '';
      data.users.forEach(u => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2';
        li.innerHTML = `<span class="h-6 w-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-semibold">${u.id}</span>
                        <span>${u.firstName} ${u.lastName}</span>
                        <span class="text-slate-400 text-xs">(${u.email})</span>`;
        listEl.appendChild(li);
      });
      statusEl.textContent = 'Loaded';
    }

    loadPatients().catch(err => {
      statusEl.textContent = 'Error';
      listEl.innerHTML = `<li class="text-red-600 text-sm">${err}</li>`;
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      resultEl.textContent = '';
      statusEl.textContent = 'Posting appointment...';
      const payload = {
        title: 'Appointment',
        patient: document.getElementById('patientName').value,
        slot: document.getElementById('slot').value,
      };
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        resultEl.textContent = `Mock ID: ${data.id}, patient: ${payload.patient}`;
        statusEl.textContent = 'Created (mock)';
      } catch (err) {
        resultEl.textContent = 'Failed to create';
        statusEl.textContent = 'Error';
      } finally {
        submitBtn.disabled = false;
      }
    });
  </script>
</body>
</html>
```
