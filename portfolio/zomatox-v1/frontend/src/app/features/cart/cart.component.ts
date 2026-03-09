import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '../../core/cart.store';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <h1 class="text-xl font-bold mb-3">Cart</h1>


  <!-- Loading -->
<div *ngIf="cartStore.loading()" 
     class="flex items-center p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50"
     role="alert">
     
  <svg class="flex-shrink-0 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 4h2v6H9V4zm0 8h2v2H9v-2z"/>
  </svg>

  <span class="text-sm font-medium">
    Loading cart...
  </span>
</div>

  <!-- Error -->
<div *ngIf="cartStore.error()" 
     class="flex items-center p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50"
     role="alert">
     
  <svg class="flex-shrink-0 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm1 10H9v2h2v-2zm0-6H9v4h2V6z"/>
  </svg>

  <span class="text-sm font-medium">
    {{ cartStore.error() }}
  </span>
</div>




  <div *ngIf="cartStore.cart() as cart" class="bg-white border rounded-xl p-4">
    <div *ngIf="cart.items.length===0" class="text-slate-600">
      Cart is empty. <a routerLink="/restaurants" class="underline">Browse restaurants</a>
    </div>

    <div *ngFor="let it of cart.items" class="flex items-center justify-between py-2 border-b last:border-b-0">
      <div>
        <div class="font-medium">{{it.name}}</div>
        <div class="text-sm text-slate-600">{{it.price | currency:'INR'}} × {{it.qty}} = ₹{{it.lineTotal}}</div>
      </div>

      <div class="flex gap-2">
        <p>MenuItemId : {{it.menuItemId}}</p>
        <p>Qty : {{it.qty}}</p>


         <button class="border rounded px-2 py-1" (click)="cartStore.upsert(it.menuItemId, it.qty-1)" [disabled]="it.qty<=1">-</button>
        <button class="border rounded px-2 py-1" (click)="cartStore.upsert(it.menuItemId, it.qty+1)">+</button>
        <button class="border rounded px-2 py-1" (click)="cartStore.remove(it.menuItemId)"
        
         [attr.aria-label]="'Remove ' + it.name + ' from cart'"
        >Remove</button>
      </div>
    </div>

    <div class="mt-4 flex items-center justify-between">
      <div class="font-semibold">Item Total: ₹{{cart.itemTotal}}</div>
      <a class="bg-black text-white rounded px-4 py-2" 
        
        [routerLink]="cart.items.length ? '/checkout' : null"
         [class.opacity-50]="cart.items.length===0"
          (click)="cart.items.length===0 && $event.preventDefault()"

         >Checkout</a>
    </div>
  </div>
  `,
})
export class CartComponent {
  cartStore = inject(CartStore);

  constructor() {
    this.cartStore.load();
  }
}
