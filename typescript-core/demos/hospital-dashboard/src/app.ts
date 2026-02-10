// ছোট ডেমো: TypeScript core ধারণা + হাসপাতাল ম্যানেজমেন্ট কনটেক্সট

// type vs interface + literal union
export type BedType = 'ICU' | 'GENERAL' | 'PRIVATE';

export enum AdmissionStatus {
  New = 'NEW',
  Admitted = 'ADMITTED',
  Discharged = 'DISCHARGED',
}

// interface + optional + readonly
export interface Patient {
  id: string;
  name: string;
  age?: number;
  status: AdmissionStatus;
  ward?: Ward;
  readonly registeredAt: Date;
}

// intersection & union
export type Ward = { name: string; floor: number };
export type InPatient = Patient & { admittedAt: Date; bedType: BedType };

export type Nurse = Person & { shift: 'day' | 'night'; ward: Ward };
export type Doctor = Person & { specialty: 'cardio' | 'er' | 'general' };
export type Staff = Doctor | Nurse; // union

interface Person { id: string; name: string; }

// generic wrapper
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export function wrapResponse<T>(data: T, message = 'ok'): ApiResponse<T> {
  return { data, message, success: true };
}

// generic repository + access modifiers
class Repo<T extends { id: string }> {
  private store = new Map<string, T>();
  upsert(entity: T) { this.store.set(entity.id, entity); }
  all(): T[] { return Array.from(this.store.values()); }
}

// billing service with private & getter/setter idea
class BillingService {
  private taxRate = 0.05;
  constructor(private readonly hospitalName: string) {}
  calculate(amount: number) {
    return amount + amount * this.taxRate;
  }
}

// unknown + narrowing + never (error throw)
function parsePatient(json: unknown): Patient {
  if (typeof json === 'object' && json !== null && 'name' in json) {
    const obj = json as { name: string; age?: number };
    return {
      id: makeId('P'),
      name: obj.name,
      age: obj.age,
      status: AdmissionStatus.New,
      registeredAt: new Date(),
    };
  }
  throw new Error('invalid patient payload');
}

function assertNever(x: never): never {
  throw new Error(`Unhandled variant: ${String(x)}`);
}

function statusLabel(status: AdmissionStatus): string {
  switch (status) {
    case AdmissionStatus.New:
      return 'Waiting for bed';
    case AdmissionStatus.Admitted:
      return 'Admitted';
    case AdmissionStatus.Discharged:
      return 'Discharged';
    default:
      return assertNever(status);
  }
}

// async/await + Promise
async function fakeApi<T>(data: T, delay = 300): Promise<ApiResponse<T>> {
  return new Promise(resolve => setTimeout(() => resolve(wrapResponse(data)), delay));
}

// mini in-memory data
const bedRepo = new Repo<Bed>();
const patientRepo = new Repo<Patient | InPatient>();
const billing = new BillingService('CityCare');

interface Bed {
  id: string;
  bedType: BedType;
  patientId?: string | null;
}

seed();
render();

// DOM references
const bedStatusEl = document.getElementById('bed-status');
const patientListEl = document.getElementById('patient-list');
const admitBtn = document.getElementById('admit-btn');
const billingEl = document.getElementById('billing');

admitBtn?.addEventListener('click', async () => {
  const payload = { name: `Walk-in ${Math.floor(Math.random() * 90)}` };
  const parsed = parsePatient(payload);
  const inpatient: InPatient = {
    ...parsed,
    status: AdmissionStatus.Admitted,
    admittedAt: new Date(),
    bedType: pickAvailableBedType() ?? 'GENERAL',
  };
  patientRepo.upsert(inpatient);
  assignBedToPatient(inpatient);
  await renderAsyncMessage('New patient admitted via fake API');
  render();
});

// helpers
function seed() {
  const wards: Ward[] = [
    { name: 'ICU-A', floor: 3 },
    { name: 'Ward-1', floor: 1 },
  ];

  const patients: InPatient[] = [
    {
      id: 'P-101',
      name: 'Aisha',
      age: 45,
      status: AdmissionStatus.Admitted,
      admittedAt: new Date(Date.now() - 3600_000),
      bedType: 'ICU',
      ward: wards[0],
      registeredAt: new Date(),
    },
    {
      id: 'P-102',
      name: 'Rahul',
      age: 30,
      status: AdmissionStatus.Admitted,
      admittedAt: new Date(Date.now() - 7200_000),
      bedType: 'GENERAL',
      ward: wards[1],
      registeredAt: new Date(),
    },
  ];

  patients.forEach(p => patientRepo.upsert(p));

  const beds: Bed[] = [
    { id: 'B1', bedType: 'ICU', patientId: 'P-101' },
    { id: 'B2', bedType: 'GENERAL', patientId: 'P-102' },
    { id: 'B3', bedType: 'GENERAL', patientId: null },
    { id: 'B4', bedType: 'PRIVATE', patientId: null },
  ];
  beds.forEach(b => bedRepo.upsert(b));
}

function render() {
  renderBeds();
  renderPatients();
  renderBilling();
}

function renderBeds() {
  if (!bedStatusEl) return;
  const beds = bedRepo.all();
  const occupied = beds.filter(b => b.patientId); // optional/null check
  const icuFree = beds.filter(b => b.bedType === 'ICU' && !b.patientId).length;
  bedStatusEl.innerHTML = `Total: ${beds.length} | Occupied: ${occupied.length} | ICU free: ${icuFree}`;
}

function renderPatients() {
  if (!patientListEl) return;
  patientListEl.innerHTML = '';
  patientRepo.all().forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.name} (${statusLabel(p.status)})`;
    if ('bedType' in p) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = `Bed: ${p.bedType}`;
      li.appendChild(badge);
    }
    patientListEl.appendChild(li);
  });
}

function renderBilling() {
  if (!billingEl) return;
  const due = billing.calculate(5000); // tax সহ
  billingEl.textContent = `Sample bill (₹5000 + tax): ₹${due.toFixed(2)}`;
}

function pickAvailableBedType(): BedType | null {
  const freeBed = bedRepo.all().find(b => !b.patientId);
  return freeBed?.bedType ?? null;
}

function assignBedToPatient(patient: InPatient) {
  const freeBed = bedRepo.all().find(b => !b.patientId && b.bedType === patient.bedType)
    ?? bedRepo.all().find(b => !b.patientId);
  if (!freeBed) return;
  bedRepo.upsert({ ...freeBed, patientId: patient.id });
}

async function renderAsyncMessage(msg: string) {
  const res = await fakeApi({ note: msg });
  console.log(res.message, res.data);
}

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(16).slice(2, 6)}`;
}
