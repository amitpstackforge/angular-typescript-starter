import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { ApiService } from "../../core/api.service";
import { OwnerOrder } from "../../core/models";

type OwnerOrderStatus = "CONFIRMED" | "PREPARING" | "READY_FOR_PICKUP";
type OwnerOrderAction = { label: string; next: OwnerOrderStatus };

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./owner-orders.component.html",
})
export class OwnerOrdersComponent {
  private api = inject(ApiService);

  queueOptions: { value: OwnerOrderStatus; label: string; description: string }[] = [
    {
      value: "CONFIRMED",
      label: "Confirmed",
      description: "Fresh orders waiting for kitchen pickup",
    },
    {
      value: "PREPARING",
      label: "Preparing",
      description: "Orders currently being prepared",
    },
    {
      value: "READY_FOR_PICKUP",
      label: "Ready for Pickup",
      description: "Prepared orders waiting for delivery partner",
    },
  ];

  private actionsByStatus: Record<string, OwnerOrderAction | null> = {
    CONFIRMED: { label: "Start Preparing", next: "PREPARING" },
    PREPARING: { label: "Mark Ready for Pickup", next: "READY_FOR_PICKUP" },
    READY_FOR_PICKUP: null,
  };

  orders = signal<OwnerOrder[]>([]);
  selectedStatus = signal<OwnerOrderStatus>("CONFIRMED");
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  updatingOrderIds = signal<number[]>([]);

  queueLabel = computed(() => this.getStatusLabel(this.selectedStatus()));
  pendingUpdatesCount = computed(() => this.updatingOrderIds().length);

  constructor() {
    this.load(this.selectedStatus());
  }

  load(status: OwnerOrderStatus = this.selectedStatus()) {
    this.selectedStatus.set(status);
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.api.ownerOrders(status).subscribe({
      next: (orders: OwnerOrder[]) => {
        this.orders.set(orders);
        this.isLoading.set(false);
      },
      error: () => {
        this.orders.set([]);
        this.errorMessage.set("Failed to load orders. Please try again.");
        this.isLoading.set(false);
      },
    });
  }

  set(orderId: number, next: OwnerOrderStatus) {
    if (this.isOrderUpdating(orderId)) {
      return;
    }

    this.markOrderUpdating(orderId, true);

    this.api.ownerSetOrderStatus(orderId, next).subscribe({
      next: () => {
        this.errorMessage.set(null);
        this.markOrderUpdating(orderId, false);
        this.load(next);
      },
      error: () => {
        this.errorMessage.set("Failed to update order status. Please try again.");
        this.markOrderUpdating(orderId, false);
      },
    });
  }

  nextActionFor(status: string): OwnerOrderAction | null {
    return this.actionsByStatus[status] ?? null;
  }

  isOrderUpdating(orderId: number): boolean {
    return this.updatingOrderIds().includes(orderId);
  }

  statusBadgeClasses(status: string): string {
    switch (status) {
      case "CONFIRMED":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "PREPARING":
        return "bg-amber-50 border-amber-200 text-amber-700";
      case "READY_FOR_PICKUP":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      default:
        return "bg-slate-100 border-slate-200 text-slate-700";
    }
  }

  formatStatus(status: string): string {
    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  trackByOrderId = (_: number, order: OwnerOrder) => order.id;

  private markOrderUpdating(orderId: number, isUpdating: boolean) {
    const current = this.updatingOrderIds();

    if (isUpdating) {
      if (!current.includes(orderId)) {
        this.updatingOrderIds.set([...current, orderId]);
      }
      return;
    }

    this.updatingOrderIds.set(current.filter((id) => id !== orderId));
  }

  private getStatusLabel(status: OwnerOrderStatus): string {
    const option = this.queueOptions.find((queue) => queue.value === status);
    return option ? option.label : this.formatStatus(status);
  }
}
