import { Injectable, signal } from '@angular/core';
import { Cart } from './models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CartStore {
  cart = signal<Cart | null>(null);
  loading = signal(false);
   error = signal<string | null>(null);

  constructor(private api: ApiService) {}

  load() {
    this.loading.set(true);

    this.api.getCart().subscribe({
      next: (c) => this.cart.set(c),
      error: () => {
         this.error.set('Failed to load cart');
        this.cart.set(null);
      },
      complete: () => this.loading.set(false),
    });
  }

  upsert(menuItemId: number, qty: number) {
     this.loading.set(true);
    this.error.set(null);

    this.api
    .upsertCartItem(menuItemId, qty)
     .subscribe({
      next: (c) => this.cart.set(c),
      error: () => this.error.set('Failed to update cart'),
      complete: () => this.loading.set(false)
    });
  }

  remove(menuItemId: number) {
    
    this.loading.set(true);
    this.error.set(null);

    this.api
    .removeCartItem(menuItemId)
    .subscribe({
      next:(c)=> this.cart.set(c),
      error:() =>this.error.set('Failed to remove item'),
      complete:()=> this.loading.set(false)
    });
  }
}
