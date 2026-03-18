import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpInterceptorFn } from "@angular/common/http";
import {
  Address,
  Cart,
  LoginRequest,
  LogoutRequest,
  MenuItem,
  Order,
  RefreshRequest,
  Restaurant,
  SignupRequest,
  TokenPairResponse,
} from "./models";
import { AuthService } from "./auth.service";

const API = "http://localhost:8080/api";

export const apiHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.accessToken;

  if (!token) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(cloned);
};

@Injectable({ providedIn: "root" })
export class ApiService {
  private http = inject(HttpClient);

  restaurants(params: any) {
    return this.http.get<any>(`${API}/restaurants`, { params });
  }
  restaurant(id: number) {
    return this.http.get<Restaurant>(`${API}/restaurants/${id}`);
  }
  menu(restaurantId: number) {
    return this.http.get<MenuItem[]>(`${API}/restaurants/${restaurantId}/menu`);
  }

  getCart() {
    return this.http.get<Cart>(`${API}/cart`);
  }
  upsertCartItem(menuItemId: number, qty: number) {
    return this.http.put<Cart>(`${API}/cart/items`, { menuItemId, qty });
  }
  removeCartItem(menuItemId: number) {
    return this.http.delete<Cart>(`${API}/cart/items/${menuItemId}`);
  }

  createOrder(addressId: number) {
    return this.http.post<Order>(`${API}/orders`, { addressId });
  }
  orders() {
    return this.http.get<Order[]>(`${API}/orders`);
  }
  order(id: number) {
    return this.http.get<Order>(`${API}/orders/${id}`);
  }
  myAddresses() {
    return this.http.get<Address[]>(`${API}/users/me/addresses`);
  }

  confirmPayment(orderId: number, result: "SUCCESS" | "FAIL") {
    return this.http.post<any>(`${API}/payments/${orderId}/confirm`, null, {
      params: { result },
    });
  }

  orderEvents(orderId: number) {
    return this.http.get<any[]>(`${API}/orders/${orderId}/events`);
  }

  restaurantReviews(restaurantId: number, page = 0) {
    return this.http.get<any>(`${API}/restaurants/${restaurantId}/reviews`, {
      params: { page },
    });
  }

  postReview(
    restaurantId: number,
    orderId: number,
    rating: number,
    comment: string,
  ) {
    return this.http.post<any>(`${API}/restaurants/${restaurantId}/reviews`, {
      orderId,
      rating,
      comment,
    });
  }

  ownerRestaurants() {
    return this.http.get<any[]>(`${API}/owner/restaurants`);
  }
  ownerOrders(status?: string) {
    return this.http.get<any[]>(`${API}/owner/orders`, {
      params: status ? { status } : ({} as any),
    });
  }
  ownerSetOrderStatus(orderId: number, next: string) {
    return this.http.post<any>(`${API}/owner/orders/${orderId}/status`, null, {
      params: { next },
    });
  }

  deliveryJobs(status: "AVAILABLE" | "ASSIGNED") {
    return this.http.get<any[]>(`${API}/delivery/jobs`, { params: { status } });
  }
  deliveryAccept(orderId: number) {
    return this.http.post<any>(`${API}/delivery/jobs/${orderId}/accept`, null);
  }
  deliverySetStatus(orderId: number, next: string) {
    return this.http.post<any>(
      `${API}/delivery/orders/${orderId}/status`,
      null,
      { params: { next } },
    );
  }

  signup(payload: SignupRequest) {
    return this.http.post<TokenPairResponse>(`${API}/auth/signup`, payload);
  }

  // logout(payload: LogoutRequest) -> POST /api/
  // me() -> GET /api/auth/me

  login(payload: LoginRequest) {
    return this.http.post<any>(`${API}/auth/login`, payload);
  }
  refresh(payload: RefreshRequest) {
    return this.http.post<any>(`${API}/auth/refresh`, payload);
  }

  logout(payload: LogoutRequest) {
    return this.http.post<any>(`${API}/auth/logout`, payload);
  }

  me() {
    return this.http.get<any>(`${API}/auth/me`);
  }
}
