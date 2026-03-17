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
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    this.load("CONFIRMED");
  }

  load(status: string) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.api.ownerOrders(status).subscribe({
      next: (os) => {
        this.orders.set(os);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set("Failed to load orders");
        this.isLoading.set(false);
      },
    });
  }

  set(orderId: number, next: string) {
    this.isLoading.set(true);

    this.api.ownerSetOrderStatus(orderId, next).subscribe({
      next: () => {
        this.errorMessage.set(null);
        this.load(next);
      },
      error: () => {
        this.errorMessage.set("Failed to update order status");
        this.isLoading.set(false);
      },
    });
  }
}
