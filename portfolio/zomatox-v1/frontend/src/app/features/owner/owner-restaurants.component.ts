import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ApiService } from "../../core/api.service";

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-xl font-bold mb-3">Owner • My Restaurants</h1>

    <div *ngIf="loading()">Loading restaurants...</div>

    <div *ngIf="error()" class="text-red-500">
      {{ error() }}
    </div>

    <div class="grid gap-3">
      <div
        *ngFor="let r of restaurants()"
        class="bg-white border rounded-xl p-4"
      >
        <div class="font-semibold">{{ r.name }}</div>
        <div class="text-sm text-slate-600">
          {{ r.city }} • {{ r.cuisineType }}
        </div>
      </div>
    </div>
  `,
})
export class OwnerRestaurantsComponent {
  private api = inject(ApiService);

  restaurants = signal<any[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.api.ownerRestaurants().subscribe({
      next: (rs) => {
        this.restaurants.set(rs);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Failed to load restaurants");
        this.loading.set(false);
      },
    });
  }
}
