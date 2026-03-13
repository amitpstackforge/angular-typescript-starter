import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CartStore } from "../../core/cart.store";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./cart.component.html",
})
export class CartComponent {
  increaseQty(item: any) {
    if (!this.cartStore.loading()) {
      this.cartStore.upsert(item.menuItemId, item.qty + 1);
    }
  }

  decreaseQty(item: any) {
    if (!this.cartStore.loading() && item.qty > 1) {
      this.cartStore.upsert(item.menuItemId, item.qty - 1);
    }
  }
  cartStore = inject(CartStore);
  ngOnInit() {
    this.cartStore.load();
  }

  trackByMenuItemId(index: number, item: any) {
    return item.menuItemId;
  }
}
