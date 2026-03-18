import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ApiService } from "../../core/api.service";
import { Order } from "../../core/models";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./order-list.component.html",
})
export class OrderListComponent {
  private api = inject(ApiService);

  orders = signal<Order[]>([]);
  error = signal<string | null>(null);
  loading = signal(true); //  FIX
  sortedOrders = computed(() =>
    [...this.orders()].sort((a, b) => this.toEpoch(b.createdAt) - this.toEpoch(a.createdAt)),
  );

  constructor() {
    this.api.orders().subscribe({
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

  private toEpoch(value: string): number {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
}
