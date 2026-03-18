import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Order } from '../../core/models';

type DeliveryAction = { label: string; next: string };

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <a routerLink="/delivery/jobs" class="text-sm underline">← Back</a>

  <section class="mt-3 space-y-4">
    <div class="bg-white border rounded-2xl p-5 shadow-sm">
      <p class="text-xs uppercase tracking-wide text-slate-500 font-semibold">
        Delivery Console
      </p>
      <h1 class="text-2xl font-bold text-slate-900 mt-1">Delivery Order</h1>
      <p class="text-sm text-slate-600 mt-1">
        Complete this order using one guided step at a time.
      </p>
    </div>

    <div *ngIf="loading()" class="bg-white border rounded-xl p-6 text-sm text-slate-600">
      Loading order details...
    </div>

    <div
      *ngIf="error() && !loading()"
      class="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700"
    >
      <p class="font-semibold">Could not load delivery order</p>
      <p class="text-sm mt-1">{{ error() }}</p>
      <button
        type="button"
        class="mt-3 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium hover:bg-red-100"
        (click)="reload()"
      >
        Retry
      </button>
    </div>

    <div *ngIf="order() as currentOrder" class="bg-white border rounded-xl p-5 space-y-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p class="text-xs text-slate-500">Order</p>
          <p class="text-xl font-bold text-slate-900">#{{ currentOrder.id }}</p>
        </div>

        <span class="text-xs font-semibold px-2 py-1 rounded-full border" [ngClass]="statusBadgeClasses()">
          {{ formatStatus(currentOrder.status) }}
        </span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div
          *ngFor="let step of flowSteps"
          class="text-xs rounded-lg border px-2 py-2 text-center font-medium"
          [ngClass]="stepClasses(step)"
        >
          {{ formatStatus(step) }}
        </div>
      </div>

      <div class="border rounded-xl bg-slate-50 p-3">
        <p class="text-xs text-slate-500">Payable Total</p>
        <p class="text-lg font-semibold text-slate-900">
          {{ currentOrder.payableTotal | currency : "INR" : "symbol" : "1.0-0" }}
        </p>
      </div>

      <div class="border-t pt-4">
        <ng-container *ngIf="nextAction() as action; else noActionNeeded">
          <p class="text-sm text-slate-600 mb-3">
            Next step: <span class="font-semibold text-slate-900">{{ action.label }}</span>
          </p>
          <button
            type="button"
            class="w-full sm:w-auto rounded-lg px-4 py-2 text-sm font-medium bg-black text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            (click)="set(action.next)"
            [disabled]="updating()"
          >
            {{ updating() ? "Updating..." : action.label }}
          </button>
        </ng-container>

        <ng-template #noActionNeeded>
          <p class="text-sm text-slate-600">
            {{
              currentOrder.status === "DELIVERED"
                ? "Order has been delivered successfully."
                : "No delivery action available from this status."
            }}
          </p>
        </ng-template>
      </div>

      <div *ngIf="msg()" class="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
        {{ msg() }}
      </div>
    </div>
  </section>
  `,
})
export class DeliveryOrderComponent {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  flowSteps = ['ASSIGNED', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'];

  order = signal<Order | null>(null);
  loading = signal(true);
  updating = signal(false);
  error = signal('');
  msg = signal('');
  nextAction = computed(() => {
    const status = this.order()?.status;
    if (!status) {
      return null;
    }

    const actionByStatus: Record<string, DeliveryAction | null> = {
      READY_FOR_PICKUP: { label: 'Mark Picked Up', next: 'PICKED_UP' },
      ASSIGNED: { label: 'Mark Picked Up', next: 'PICKED_UP' },
      PICKED_UP: { label: 'Start Delivery', next: 'OUT_FOR_DELIVERY' },
      OUT_FOR_DELIVERY: { label: 'Mark Delivered', next: 'DELIVERED' },
      DELIVERED: null,
    };

    return actionByStatus[status] ?? null;
  });

  private id = Number(this.route.snapshot.paramMap.get('id'));

  constructor() {
    this.reload();
  }

  reload() {
    this.loading.set(true);
    this.error.set('');

    this.api.order(this.id).subscribe({
      next: (order) => {
        this.order.set(order);
        this.loading.set(false);
      },
      error: (e) => {
        this.order.set(null);
        this.error.set(e?.error?.message ?? 'Failed to load order');
        this.loading.set(false);
      },
    });
  }

  set(next: string) {
    if (this.updating()) {
      return;
    }

    this.msg.set('');
    this.updating.set(true);
    this.api.deliverySetStatus(this.id, next).subscribe({
      next: () => {
        this.msg.set('Updated to ' + next);
        this.updating.set(false);
        this.reload();
      },
      error: (e) => {
        this.msg.set(e?.error?.message ?? 'Failed');
        this.updating.set(false);
      },
    });
  }

  formatStatus(status: string): string {
    return status
      .replaceAll('_', ' ')
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  statusBadgeClasses(): string {
    const status = this.order()?.status ?? '';
    switch (status) {
      case 'ASSIGNED':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'READY_FOR_PICKUP':
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

  stepClasses(step: string): string {
    const currentStatus = this.order()?.status;
    const currentIndex = this.stepIndex(currentStatus);
    const stepIndex = this.stepIndex(step);

    if (currentIndex === -1 || stepIndex === -1) {
      return 'bg-white text-slate-500 border-slate-200';
    }

    if (stepIndex < currentIndex) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }

    if (stepIndex === currentIndex) {
      return 'bg-slate-900 text-white border-slate-900';
    }

    return 'bg-white text-slate-500 border-slate-200';
  }

  private stepIndex(status: string | undefined): number {
    if (!status) {
      return -1;
    }

    if (status === 'READY_FOR_PICKUP') {
      return 0;
    }

    return this.flowSteps.indexOf(status);
  }
}
