import { CommonModule } from "@angular/common";
import { Component, inject, signal, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ApiService } from "../../core/api.service";
import { Restaurant } from "../../core/models";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./restaurant-list.component.html",
})
export class RestaurantListComponent implements OnInit {
  private api = inject(ApiService);

  restaurants = signal<Restaurant[]>([]);
  page = signal(0);
  loading = signal(false);
  error = signal<string | null>(null);
  fallback = "https://picsum.photos/seed/fallback/640/360";

  city = "Kolkata";
  q = "";
  sort = "rating";
  pageSize = 2;

  totalPages = 0;

  ngOnInit() {
    this.load(); // ✅ lifecycle safe
  }
  load() {
    this.loading.set(true); // start loading
    this.error.set(null);

    (this.api
      .restaurants({
        city: this.city,
        q: this.q,
        sort: this.sort,
        page: this.page(),
        size: this.pageSize, // ✅ new line
      })
      .subscribe((res) => {
        this.restaurants.set(res.content ?? []);
        this.totalPages = res.totalPages; // if backend provides
        this.loading.set(false); // stop loading
      }),
      this.error.set("Failed to load restaurants. Please try again."));
    this.loading.set(false);
      
      
      ;
  }

  next() {
    this.page.set(this.page() + 1);
    this.load();
  }
  prev() {
    if (this.page() > 0) {
      this.page.set(this.page() - 1);
      this.load();
    }
  }
}
