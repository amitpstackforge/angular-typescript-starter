import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ApiService } from "../../core/api.service";

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./owner-restaurants.component.html",
})
export class OwnerRestaurantsComponent {
  private api = inject(ApiService);

  restaurants = signal<any[]>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  constructor() {
    this.api.ownerRestaurants().subscribe({
      next: (rs) => {
        this.restaurants.set(rs);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set("Failed to load restaurants");
        this.isLoading.set(false);
      },
    });
  }
}
