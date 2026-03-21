import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from './core/api.service';
import { AuthService } from './core/auth.service';
import { UserContextService } from './core/user-context.service';
import { CartStore } from './core/cart.store';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
  <div class="min-h-screen">
    <header class="sticky top-0 z-10 bg-white border-b">
      <div class="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <a routerLink="/restaurants" class="font-bold text-lg">ZomatoX</a>

        <nav class="flex gap-3 text-sm">
         <a routerLink="/restaurants" class="hover:underline">Customer</a>
          <a routerLink="/owner/orders" class="hover:underline">Owner</a>
           <a routerLink="/delivery/jobs" class="hover:underline">Delivery</a>
             <a routerLink="/cart" class="hover:underline">Cart</a>
            <a routerLink="/orders" class="hover:underline">Orders</a>
        </nav>

        <div class="ml-auto flex items-center gap-3">
          <select class="border rounded px-2 py-1 text-sm"
                  [value]="selectedKey()"
                  (change)="switchUser($any($event.target).value)">
           <option *ngFor="let u of users" [value]="u.id + ':' + u.role">
              {{u.label}} • {{u.role}}
            </option>
          </select>

          <div class="text-sm bg-slate-100 rounded px-2 py-1">
            Cart: {{cartCount()}}
          </div>

          <button
            *ngIf="auth.isLoggedIn()"
            type="button"
            class="text-sm border rounded px-3 py-1 disabled:opacity-60 disabled:cursor-not-allowed"
            [disabled]="logoutLoading()"
            (click)="logout()"
          >
            {{ logoutLoading() ? 'Logging out...' : 'Logout' }}
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-6">
      <router-outlet></router-outlet>
    </main>
  </div>
  `,
})
export class AppComponent {
  private uc = inject(UserContextService);
  private cartStore = inject(CartStore);
  private api = inject(ApiService);
  readonly auth = inject(AuthService);
  private router = inject(Router);

  logoutLoading = signal(false);

  users = this.uc.users;
  selectedKey = computed(() => `${this.uc.userId}:${this.uc.role}`);
  cartCount = computed(() => this.cartStore.cart()?.items?.reduce((a, x) => a + x.qty, 0) ?? 0);

  constructor() {
    this.cartStore.load();
  }

  switchUser(v: string) {
    const [id, role] = v.split(':');
    const user = this.users.find(u => u.id === Number(id) && u.role === role);
    if (user) {
      this.uc.setUser(user);
    }
    this.cartStore.load();
  }

  logout() {
    if (this.logoutLoading()) {
      return;
    }

    const refreshToken = this.auth.refreshToken;
    if (!refreshToken) {
      this.finalizeLogout();
      return;
    }

    this.logoutLoading.set(true);
    this.api.logout({ refreshToken }).subscribe({
      next: () => this.finalizeLogout(),
      error: () => this.finalizeLogout(),
    });
  }

  private finalizeLogout() {
    this.auth.clearSession();
    this.logoutLoading.set(false);
    void this.router.navigate(['/login']);
  }
}
