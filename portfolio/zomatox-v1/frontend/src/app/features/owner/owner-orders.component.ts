import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ApiService } from "../../core/api.service";

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-xl font-bold mb-3">Owner • Orders Queue</h1>

    <div *ngIf="loading()" class="text-sm">Loading...</div>

    <div *ngIf="error()" class="text-red-500 mb-3">
      {{ error() }}
    </div>

    <div class="flex gap-2 mb-3">
      <button class="border rounded px-3 py-1" (click)="load('CONFIRMED')">
        CONFIRMED
      </button>
      <button class="border rounded px-3 py-1" (click)="load('PREPARING')">
        PREPARING
      </button>
      <button
        class="border rounded px-3 py-1"
        (click)="load('READY_FOR_PICKUP')"
      >
        READY_FOR_PICKUP
      </button>
    </div>

    <div class="grid gap-3">
      <div *ngFor="let o of orders()" class="bg-white border rounded-xl p-4">
        <div class="flex justify-between">
          <div class="font-semibold">Order #{{ o.id }}</div>
          <div class="text-sm bg-slate-100 rounded px-2 py-1">
            {{ o.status }}
          </div>
        </div>

        <div class="text-sm text-slate-600 mt-1">
          Payable ₹{{ o.payableTotal }}
        </div>

        <div class="mt-3 flex gap-2">
          <button
            class="bg-black text-white rounded px-3 py-2"
            (click)="set(o.id, 'PREPARING')"
          >
            Set PREPARING
          </button>

          <button
            class="border rounded px-3 py-2"
            (click)="set(o.id, 'READY_FOR_PICKUP')"
          >
            Set READY_FOR_PICKUP
          </button>
        </div>
      </div>
    </div>
  `,
})
export class OwnerOrdersComponent {
  private api = inject(ApiService);

  orders = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.load("CONFIRMED");
  }

  load(status: string) {
    this.loading.set(true);
    this.error.set(null);

    this.api.ownerOrders(status).subscribe({
      next: (os) => {
        this.orders.set(os);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Failed to load orders");
        this.loading.set(false);
      },
    });
  }

  set(orderId: number, next: string) {
    this.loading.set(true);

    this.api.ownerSetOrderStatus(orderId, next).subscribe({
      next: () => {
        this.error.set(null);
        this.load(next);
      },
      error: () => {
        this.error.set("Failed to update order status");
        this.loading.set(false);
      },
    });
  }
}
