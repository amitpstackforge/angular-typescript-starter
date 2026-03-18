import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
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
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);
  searchTerm = signal("");
  selectedCity = signal("ALL");

  cityOptions = computed(() => {
    const cities = Array.from(new Set(this.restaurants().map((restaurant) => restaurant.city)));
    return ["ALL", ...cities.sort((a, b) => a.localeCompare(b))];
  });

  hasActiveFilters = computed(
    () => this.searchTerm().trim().length > 0 || this.selectedCity() !== "ALL",
  );

  filteredRestaurants = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const city = this.selectedCity();

    return this.restaurants().filter((restaurant) => {
      const matchesCity = city === "ALL" || restaurant.city === city;
      const matchesSearch =
        search.length === 0 ||
        restaurant.name.toLowerCase().includes(search) ||
        restaurant.city.toLowerCase().includes(search) ||
        restaurant.cuisineType.toLowerCase().includes(search);

      return matchesCity && matchesSearch;
    });
  });

  constructor() {
    this.load();
  }

  load() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.api.ownerRestaurants().subscribe({
      next: (restaurants: OwnerRestaurant[]) => {
        this.restaurants.set(restaurants);

        const selected = this.selectedCity();
        if (selected !== "ALL" && !restaurants.some((restaurant) => restaurant.city === selected)) {
          this.selectedCity.set("ALL");
        }

        this.isLoading.set(false);
      },
      error: () => {
        this.restaurants.set([]);
        this.errorMessage.set("Failed to load restaurants. Please try again.");
        this.isLoading.set(false);
      },
    });
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
  }

  onCityChange(value: string) {
    this.selectedCity.set(value);
  }

  clearFilters() {
    this.searchTerm.set("");
    this.selectedCity.set("ALL");
  }

  trackByRestaurantId = (_: number, restaurant: OwnerRestaurant) => restaurant.id;
}
