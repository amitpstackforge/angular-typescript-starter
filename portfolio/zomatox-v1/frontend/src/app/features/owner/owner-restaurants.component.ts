import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ApiService } from "../../core/api.service";
import { OwnerRestaurant } from "../../core/models";

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./owner-restaurants.component.html",
})
export class OwnerRestaurantsComponent {
  private api = inject(ApiService);

  restaurants = signal<OwnerRestaurant[]>([]);
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
