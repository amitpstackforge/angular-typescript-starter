// Generated manually to mirror src/app.ts (compile target: ES6 module)
export var AdmissionStatus;
(function (AdmissionStatus) {
    AdmissionStatus["New"] = "NEW";
    AdmissionStatus["Admitted"] = "ADMITTED";
    AdmissionStatus["Discharged"] = "DISCHARGED";
})(AdmissionStatus || (AdmissionStatus = {}));
export function wrapResponse(data, message = 'ok') {
    return { data, message, success: true };
}
class Repo {
    constructor() {
        this.store = new Map();
    }
    upsert(entity) { this.store.set(entity.id, entity); }
    all() { return Array.from(this.store.values()); }
}
class BillingService {
    constructor(hospitalName) {
        this.hospitalName = hospitalName;
        this.taxRate = 0.05;
    }
    calculate(amount) {
        return amount + amount * this.taxRate;
    }
}
function parsePatient(json) {
    if (typeof json === 'object' && json !== null && 'name' in json) {
        const obj = json;
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
function assertNever(x) {
    throw new Error(`Unhandled variant: ${String(x)}`);
}
function statusLabel(status) {
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
async function fakeApi(data, delay = 300) {
    return new Promise(resolve => setTimeout(() => resolve(wrapResponse(data)), delay));
}
const bedRepo = new Repo();
const patientRepo = new Repo();
const billing = new BillingService('CityCare');
function seed() {
    const wards = [
        { name: 'ICU-A', floor: 3 },
        { name: 'Ward-1', floor: 1 },
    ];
    const patients = [
        {
            id: 'P-101',
            name: 'Aisha',
            age: 45,
            status: AdmissionStatus.Admitted,
            admittedAt: new Date(Date.now() - 3600 * 1000),
            bedType: 'ICU',
            ward: wards[0],
            registeredAt: new Date(),
        },
        {
            id: 'P-102',
            name: 'Rahul',
            age: 30,
            status: AdmissionStatus.Admitted,
            admittedAt: new Date(Date.now() - 7200 * 1000),
            bedType: 'GENERAL',
            ward: wards[1],
            registeredAt: new Date(),
        },
    ];
    patients.forEach(p => patientRepo.upsert(p));
    const beds = [
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
const bedStatusEl = document.getElementById('bed-status');
const patientListEl = document.getElementById('patient-list');
const admitBtn = document.getElementById('admit-btn');
const billingEl = document.getElementById('billing');
function renderBeds() {
    if (!bedStatusEl)
        return;
    const beds = bedRepo.all();
    const occupied = beds.filter(b => b.patientId);
    const icuFree = beds.filter(b => b.bedType === 'ICU' && !b.patientId).length;
    bedStatusEl.innerHTML = `Total: ${beds.length} | Occupied: ${occupied.length} | ICU free: ${icuFree}`;
}
function renderPatients() {
    if (!patientListEl)
        return;
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
    if (!billingEl)
        return;
    const due = billing.calculate(5000);
    billingEl.textContent = `Sample bill (₹5000 + tax): ₹${due.toFixed(2)}`;
}
function pickAvailableBedType() {
    const freeBed = bedRepo.all().find(b => !b.patientId);
    return (freeBed === null || freeBed === void 0 ? void 0 : freeBed.bedType) ?? null;
}
function assignBedToPatient(patient) {
    var _a;
    const freeBed = (_a = bedRepo.all().find(b => !b.patientId && b.bedType === patient.bedType)) !== null && _a !== void 0 ? _a : bedRepo.all().find(b => !b.patientId);
    if (!freeBed)
        return;
    bedRepo.upsert({ ...freeBed, patientId: patient.id });
}
admitBtn === null || admitBtn === void 0 ? void 0 : admitBtn.addEventListener('click', async () => {
    const payload = { name: `Walk-in ${Math.floor(Math.random() * 90)}` };
    const parsed = parsePatient(payload);
    const inpatient = {
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
async function renderAsyncMessage(msg) {
    const res = await fakeApi({ note: msg });
    console.log(res.message, res.data);
}
function makeId(prefix) {
    return `${prefix}-${Math.random().toString(16).slice(2, 6)}`;
}
seed();
render();
