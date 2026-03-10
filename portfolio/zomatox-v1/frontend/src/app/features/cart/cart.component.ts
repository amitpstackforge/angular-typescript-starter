import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '../../core/cart.store';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
    templateUrl: './cart.component.html'
})
export class CartComponent {
  cartStore = inject(CartStore);

  constructor() {
    this.cartStore.load();
  }

  
  trackByMenuItemId(index: number, item: any) {
    return item.menuItemId;
  }
}
