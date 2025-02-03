export interface CartItem {
  cart_id: number;
  user_id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  options?: Record<string, any>;
  updated_at: string;
}
