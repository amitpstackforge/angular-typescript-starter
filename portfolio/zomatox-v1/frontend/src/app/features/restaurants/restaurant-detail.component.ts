import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../core/api.service";
import { CartStore } from "../../core/cart.store";
import { MenuItem, Restaurant } from "../../core/models";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: "./restaurant-detail.component.html",
})
export class RestaurantDetailComponent {
  private api = inject(ApiService);
  private cart = inject(CartStore);
  private route = inject(ActivatedRoute);

  restaurant = signal<Restaurant | null>(null);
  menu = signal<MenuItem[]>([]);
  reviews = signal<any[]>([]);
  reviewError = signal("");

  reviewOrderId = 0;
  reviewRating = 5;
  reviewComment = "";

  qty: Record<number, number> = {};

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.api.restaurant(id).subscribe((r) => {
      this.restaurant.set(r);
      this.loadReviews();
    });
    this.api.menu(id).subscribe((ms) => {
      this.menu.set(ms);
      ms.forEach((m) => (this.qty[m.id] = 1));
    });
  }

  add(menuItemId: number) {
    const q = this.qty[menuItemId] ?? 1;
    this.cart.upsert(menuItemId, q);
  }

  loadReviews() {
    const id = this.restaurant()?.id;
    if (!id) return;
    this.api
      .restaurantReviews(id, 0)
      .subscribe((p) => this.reviews.set(p.content ?? []));
  }

  postReview() {
    const id = this.restaurant()?.id;
    if (!id) return;
    this.reviewError.set("");
    this.api
      .postReview(id, this.reviewOrderId, this.reviewRating, this.reviewComment)
      .subscribe({
        next: () => {
          this.reviewOrderId = 0;
          this.reviewRating = 5;
          this.reviewComment = "";
          this.loadReviews();
        },
        error: (e) =>
          this.reviewError.set(e?.error?.message ?? "Failed to post review"),
      });
  }
}
