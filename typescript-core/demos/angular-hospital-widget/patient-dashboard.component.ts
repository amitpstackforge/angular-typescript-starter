import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// -------- Types shared with vanilla demo --------
export type BedType = 'ICU' | 'GENERAL' | 'PRIVATE';

export enum AdmissionStatus {
  New = 'NEW',
  Admitted = 'ADMITTED',
  Discharged = 'DISCHARGED',
}

interface Ward { name: string; floor: number; }
interface Person { id: string; name: string; }

export interface Patient {
  id: string;
  name: string;
  age?: number;
  status: AdmissionStatus;
  ward?: Ward;
  readonly registeredAt: Date;
}

export type InPatient = Patient & { admittedAt: Date; bedType: BedType };

export type Nurse = Person & { shift: 'day' | 'night'; ward: Ward };
export type Doctor = Person & { specialty: 'cardio' | 'er' | 'general' };
export type Staff = Doctor | Nurse;

// Pharmacy (topic 10)
type DrugForm = 'tablet' | 'syrup' | 'injection';
type Strength = '250mg' | '500mg' | '1g';
interface StockItem {
  id: string;
  name: string;
  form: DrugForm;
  strength: Strength;
  quantity: number;
  reorderLevel?: number;
}

// Lab reports (topic 11)
type LabReport =
  | { status: 'requested'; id: string; test: string; requestedBy: string }
  | { status: 'in-progress'; id: string; test: string; technician: string }
  | { status: 'completed'; id: string; test: string; result: 'positive' | 'negative'; verifiedBy: string }
  | { status: 'rejected'; id: string; test: string; reason: string };

// Generic response wrapper
interface ApiResponse<T> { data: T; message: string; success: boolean; }
function wrapResponse<T>(data: T, message = 'ok'): ApiResponse<T> {
  return { data, message, success: true };
}

// Simple in-memory repo using Map
class Repo<T extends { id: string }> {
  private store = new Map<string, T>();
  upsert(entity: T) { this.store.set(entity.id, entity); }
  all(): T[] { return Array.from(this.store.values()); }
}

class BillingService {
  private taxRate = 0.05;
  constructor(private readonly hospitalName: string) {}
  calculate(amount: number) {
    return amount + amount * this.taxRate;
  }
}

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDashboardComponent {
  private bedRepo = new Repo<Bed>();
  private patientRepo = new Repo<Patient | InPatient>();
  pharmacy: StockItem[] = [];
  labReports: LabReport[] = [];
  billing = new BillingService('CityCare');

  constructor() {
    this.seed();
  }

  get beds() { return this.bedRepo.all(); }
  get patients() { return this.patientRepo.all(); }
  get bedStats() {
    const total = this.beds.length;
    const occupied = this.beds.filter(b => b.patientId).length;
    const icuFree = this.beds.filter(b => b.bedType === 'ICU' && !b.patientId).length;
    return { total, occupied, icuFree };
  }

  async admitWalkIn() {
    const payload = { name: `Walk-in ${Math.floor(Math.random() * 90)}` };
    const parsed = parsePatient(payload);
    const inpatient: InPatient = {
      ...parsed,
      status: AdmissionStatus.Admitted,
      admittedAt: new Date(),
      bedType: this.pickAvailableBedType() ?? 'GENERAL',
    };
    this.patientRepo.upsert(inpatient);
    this.assignBedToPatient(inpatient);
    await this.logAsync('New patient admitted via fake API');
  }

  statusLabel(status: AdmissionStatus) {
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

  dispenseOne(item: StockItem) {
    if (item.quantity <= 0) return;
    item.quantity -= 1;
  }

  restock(id: string, qty = 20) {
    const found = this.pharmacy.find(p => p.id === id);
    if (found) found.quantity += qty;
  }

  labStatusLabel(report: LabReport) {
    switch (report.status) {
      case 'requested':
        return `Waiting: ${report.test}`;
      case 'in-progress':
        return `Running by ${report.technician}`;
      case 'completed':
        return `Result: ${report.result}`;
      case 'rejected':
        return `Rejected: ${report.reason}`;
      default:
        return assertNever(report);
    }
  }

  trackById(_index: number, item: { id: string }) {
    return item.id;
  }

  // ------------------- helpers -------------------
  private seed() {
    const wards: Ward[] = [
      { name: 'ICU-A', floor: 3 },
      { name: 'Ward-1', floor: 1 },
    ];

    const patients: InPatient[] = [
      {
        id: 'P-201',
        name: 'Aisha',
        age: 45,
        status: AdmissionStatus.Admitted,
        admittedAt: new Date(Date.now() - 3600_000),
        bedType: 'ICU',
        ward: wards[0],
        registeredAt: new Date(),
      },
      {
        id: 'P-202',
        name: 'Rahul',
        age: 30,
        status: AdmissionStatus.Admitted,
        admittedAt: new Date(Date.now() - 7200_000),
        bedType: 'GENERAL',
        ward: wards[1],
        registeredAt: new Date(),
      },
    ];
    patients.forEach(p => this.patientRepo.upsert(p));

    const beds: Bed[] = [
      { id: 'B1', bedType: 'ICU', patientId: 'P-201' },
      { id: 'B2', bedType: 'GENERAL', patientId: 'P-202' },
      { id: 'B3', bedType: 'GENERAL', patientId: null },
      { id: 'B4', bedType: 'PRIVATE', patientId: null },
    ];
    beds.forEach(b => this.bedRepo.upsert(b));

    this.pharmacy = [
      { id: 'AMOX', name: 'Amoxicillin', form: 'tablet', strength: '500mg', quantity: 40 },
      { id: 'PARA', name: 'Paracetamol', form: 'tablet', strength: '500mg', quantity: 120 },
      { id: 'ORS', name: 'ORS Solution', form: 'syrup', strength: '250mg', quantity: 25 },
    ];

    this.labReports = [
      { status: 'requested', id: 'L1', test: 'CBC', requestedBy: 'Dr. Sen' },
      { status: 'in-progress', id: 'L2', test: 'D-Dimer', technician: 'Tech-01' },
      { status: 'completed', id: 'L3', test: 'X-Ray Chest', result: 'negative', verifiedBy: 'Dr. Ray' },
    ];
  }

  private pickAvailableBedType(): BedType | null {
    const freeBed = this.beds.find(b => !b.patientId);
    return freeBed?.bedType ?? null;
  }

  private assignBedToPatient(patient: InPatient) {
    const freeBed = this.beds.find(b => !b.patientId && b.bedType === patient.bedType)
      ?? this.beds.find(b => !b.patientId);
    if (!freeBed) return;
    this.bedRepo.upsert({ ...freeBed, patientId: patient.id });
  }

  private async logAsync(msg: string) {
    const res = await fakeApi({ note: msg });
    console.log(res.message, res.data);
  }
}

// ------------------- helper functions -------------------

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

async function fakeApi<T>(data: T, delay = 300): Promise<ApiResponse<T>> {
  return new Promise(resolve => setTimeout(() => resolve(wrapResponse(data)), delay));
}

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(16).slice(2, 6)}`;
}

// ------------------- supporting interfaces -------------------
interface Bed {
  id: string;
  bedType: BedType;
  patientId?: string | null;
}
