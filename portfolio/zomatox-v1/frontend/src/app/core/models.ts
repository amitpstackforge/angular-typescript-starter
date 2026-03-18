export type Restaurant = {
  id: number;
  name: string;
  city: string;
  cuisineType: string;
  ratingAvg: number;
  deliveryTimeMin: number;
  imageUrl?: string;
};

export type MenuItem = {
  id: number;
  restaurantId: number;
  name: string;
  price: number;
  isVeg: boolean;
  available: boolean;
  stockQty: number;
};

export type CartLine = {
  menuItemId: number;
  name: string;
  price: number;
  qty: number;
  lineTotal: number;
};

export type Cart = {
  cartId: number;
  userId: number;
  restaurantId: number | null;
  items: CartLine[];
  itemTotal: number;
};

export type OrderItem = {
  name: string;
  price: number;
  qty: number;
  lineTotal: number;
};
export type Order = {
  id: number;
  userId: number;
  restaurantId: number;
  status: string;
  itemTotal: number;
  deliveryFee: number;
  payableTotal: number;
  createdAt: string;
  items: OrderItem[];
};

export type Address = {
  id: number;
  userId: number;
  line1: string;
  city: string;
  pincode: string;
  phone: string;
};

export interface OwnerOrder {
  id: number;
  status: string;
  payableTotal: number;
}

export interface OwnerRestaurant {
  id: number;
  name: string;
  city: string;
  cuisineType: string;
}

export type AuthRole = 'CUSTOMER' | 'OWNER' | 'DELIVERY_PARTNER' | 'ADMIN';

export type AuthUserProfile = {
  id: number;
  name: string;
  email: string;
  role: AuthRole;
};

export type TokenPairResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUserProfile;
};

export type AuthErrorEnvelope = {
  message: string;
  validationErrors: Record<string, string>;
};

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type LogoutRequest = {
  refreshToken: string;
};
