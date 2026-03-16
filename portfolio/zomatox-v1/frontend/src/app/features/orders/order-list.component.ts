import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
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
}

