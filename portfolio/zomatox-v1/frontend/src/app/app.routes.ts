import { Routes } from '@angular/router';
import { RestaurantListComponent } from './features/restaurants/restaurant-list.component';
import { RestaurantDetailComponent } from './features/restaurants/restaurant-detail.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrderListComponent } from './features/orders/order-list.component';
import { OrderDetailComponent } from './features/orders/order-detail.component';
import { OwnerOrdersComponent } from './features/owner/owner-orders.component';
import { OwnerRestaurantsComponent } from './features/owner/owner-restaurants.component';
import { DeliveryJobsComponent } from './features/delivery/delivery-jobs.component';
import { DeliveryOrderComponent } from './features/delivery/delivery-order.component';
import { SignupComponent } from './features/auth/signup.component';
import { deliveryGuard, ownerGuard } from './core/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'restaurants' },

  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'restaurants/:id', component: RestaurantDetailComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/:id', component: OrderDetailComponent },

  { path: 'owner/restaurants', component: OwnerRestaurantsComponent, canActivate: [ownerGuard] },
  { path: 'owner/orders', component: OwnerOrdersComponent, canActivate: [ownerGuard] },

  { path: 'delivery/jobs', component: DeliveryJobsComponent, canActivate: [deliveryGuard] },
  { path: 'delivery/order/:id', component: DeliveryOrderComponent, canActivate: [deliveryGuard] },

  { path: '**', redirectTo: 'restaurants' },
];
