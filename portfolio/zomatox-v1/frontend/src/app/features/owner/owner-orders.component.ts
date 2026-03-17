import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ApiService } from "../../core/api.service";

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./owner-orders.component.html",
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
