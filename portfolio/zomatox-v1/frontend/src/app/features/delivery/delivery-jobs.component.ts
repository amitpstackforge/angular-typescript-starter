import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/api.service';

type DeliveryJobsMode = 'AVAILABLE' | 'ASSIGNED';
type DeliveryJob = {
  id: number;
  status: string;
  payableTotal?: number;
};

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <section class="space-y-4">
    <div class="bg-white border rounded-2xl p-5 shadow-sm">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Delivery Console
          </p>
          <h1 class="text-2xl font-bold text-slate-900">Jobs</h1>
          <p class="text-sm text-slate-600 mt-1">
            Pick a queue and open orders with one click.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div class="rounded-xl border bg-slate-50 px-3 py-2 text-center w-24">
            <p class="text-xs text-slate-500">Queue</p>
            <p class="text-sm font-semibold text-slate-900">{{ modeLabel() }}</p>
          </div>

          <div class="rounded-xl border bg-slate-50 px-3 py-2 text-center w-24">
            <p class="text-xs text-slate-500">In List</p>
            <p class="text-sm font-semibold text-slate-900">{{ jobs().length }}</p>
          </div>

          <div class="rounded-xl border bg-slate-50 px-3 py-2 text-center w-24">
            <p class="text-xs text-slate-500">Accepting</p>
            <p class="text-sm font-semibold text-slate-900">
              {{ acceptingCount() }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid gap-2 md:grid-cols-2 mt-4">
        <button
          *ngFor="let option of modeOptions"
          type="button"
          class="rounded-xl border px-3 py-3 text-left transition"
          [ngClass]="
            mode() === option.value ? 'bg-black border-black text-white' : 'hover:bg-slate-50'
          "
          (click)="load(option.value)"
        >
          <p class="text-sm font-semibold">{{ option.label }}</p>
          <p
            class="text-xs mt-1"
            [class.text-slate-200]="mode() === option.value"
            [class.text-slate-500]="mode() !== option.value"
          >
            {{ option.description }}
          </p>
        </button>
      </div>
    </div>

    <div *ngIf="loading()" class="grid gap-3 md:grid-cols-2">
      <div
        *ngFor="let placeholder of [1, 2, 3, 4]"
        class="bg-white border rounded-xl p-4 animate-pulse"
      >
        <div class="h-5 w-32 rounded bg-slate-200"></div>
        <div class="h-4 w-20 rounded bg-slate-200 mt-3"></div>
        <div class="h-9 w-full rounded bg-slate-200 mt-4"></div>
      </div>
    </div>

    <div
      *ngIf="errorMessage() && !loading()"
      class="border border-red-200 bg-red-50 rounded-xl p-4 text-red-700"
    >
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="font-semibold">Could not load delivery jobs</p>
          <p class="text-sm">{{ errorMessage() }}</p>
        </div>

        <button
          type="button"
          class="rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium hover:bg-red-100"
          (click)="load()"
        >
          Retry
        </button>
      </div>
    </div>

    <div
      *ngIf="!loading() && !errorMessage() && jobs().length === 0"
      class="bg-white border rounded-xl p-8 text-center"
    >
      <p class="text-lg font-semibold text-slate-900">
        {{ mode() === 'AVAILABLE' ? 'No available jobs right now' : 'No assigned jobs yet' }}
      </p>
      <p class="text-sm text-slate-600 mt-1">
        {{
          mode() === 'AVAILABLE'
            ? 'New delivery-ready orders will appear here.'
            : 'Accept a job from Available to see it here.'
        }}
      </p>
    </div>

    <div *ngIf="!loading() && !errorMessage() && jobs().length > 0" class="grid gap-3 md:grid-cols-2">
      <article
        *ngFor="let job of jobs(); trackBy: trackByOrderId"
        class="bg-white border rounded-xl p-4 hover:shadow-sm transition"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs text-slate-500">Order</p>
            <p class="font-semibold text-slate-900">#{{ job.id }}</p>
          </div>

          <span class="text-xs font-semibold px-2 py-1 rounded-full border" [ngClass]="statusBadgeClasses(job.status)">
            {{ formatStatus(job.status) }}
          </span>
        </div>

        <div *ngIf="job.payableTotal != null" class="mt-3 text-sm text-slate-600">
          Payable:
          <span class="font-semibold text-slate-900">
            {{ job.payableTotal | currency : "INR" : "symbol" : "1.0-0" }}
          </span>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <button
            *ngIf="mode() === 'AVAILABLE'"
            type="button"
            class="rounded-lg px-3 py-2 text-sm font-medium bg-black text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            (click)="accept(job.id)"
            [disabled]="isAccepting(job.id)"
          >
            {{ isAccepting(job.id) ? "Accepting..." : "Accept Job" }}
          </button>

          <a
            class="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-50"
            [routerLink]="['/delivery/order', job.id]"
          >
            Open Order
          </a>
        </div>
      </article>
    </div>
  </section>
  `,
})
export class DeliveryJobsComponent {
  private api = inject(ApiService);
  modeOptions: { value: DeliveryJobsMode; label: string; description: string }[] = [
    {
      value: 'AVAILABLE',
      label: 'Available',
      description: 'New jobs ready for delivery pickup',
    },
    {
      value: 'ASSIGNED',
      label: 'Assigned',
      description: 'Jobs currently assigned to you',
    },
  ];

  jobs = signal<DeliveryJob[]>([]);
  mode = signal<DeliveryJobsMode>('AVAILABLE');
  loading = signal(true);
  errorMessage = signal<string | null>(null);
  acceptingOrderIds = signal<number[]>([]);

  modeLabel = computed(() => (this.mode() === 'AVAILABLE' ? 'Available' : 'Assigned'));
  acceptingCount = computed(() => this.acceptingOrderIds().length);

  constructor() {
    this.load('AVAILABLE');
  }

  load(mode: DeliveryJobsMode = this.mode()) {
    this.mode.set(mode);
    this.loading.set(true);
    this.errorMessage.set(null);

    this.api.deliveryJobs(mode).subscribe({
      next: (jobs: DeliveryJob[]) => {
        this.jobs.set(jobs);
        this.loading.set(false);
      },
      error: (e) => {
        this.jobs.set([]);
        this.errorMessage.set(e?.error?.message ?? 'Failed to load delivery jobs. Please try again.');
        this.loading.set(false);
      },
    });
  }

  accept(orderId: number) {
    if (this.isAccepting(orderId)) {
      return;
    }

    this.markAccepting(orderId, true);
    this.errorMessage.set(null);

    this.api.deliveryAccept(orderId).subscribe({
      next: () => {
        this.markAccepting(orderId, false);
        this.load('ASSIGNED');
      },
      error: (e) => {
        this.markAccepting(orderId, false);
        this.errorMessage.set(e?.error?.message ?? 'Failed to accept delivery job.');
      },
    });
  }

  isAccepting(orderId: number): boolean {
    return this.acceptingOrderIds().includes(orderId);
  }

  formatStatus(status: string): string {
    return status
      .replaceAll('_', ' ')
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  statusBadgeClasses(status: string): string {
    switch (status) {
      case 'READY_FOR_PICKUP':
      case 'ASSIGNED':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'PICKED_UP':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'OUT_FOR_DELIVERY':
        return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      case 'DELIVERED':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-700';
    }
  }

  trackByOrderId = (_: number, job: DeliveryJob) => job.id;

  private markAccepting(orderId: number, accepting: boolean) {
    const current = this.acceptingOrderIds();

    if (accepting) {
      if (!current.includes(orderId)) {
        this.acceptingOrderIds.set([...current, orderId]);
      }
      return;
    }

    this.acceptingOrderIds.set(current.filter((id) => id !== orderId));
  }
}
