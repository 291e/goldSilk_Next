export interface Order {
  order_id: number;
  user_id: number;
  total_amount: number;
  shipping_address: string;
  recipient_name: string;
  phone_number: string;
  message?: string;
  order_status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderDetail extends Order {
  order_items: OrderItem[];
}

export interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  options?: Record<string, any>;
  etc?: Record<string, any>;
  products: {
    product_id: number;
    name: string;
    price: number;
    images: string[];
  };
}

export interface CreateOrderRequest {
  user_id: number;
  total_amount: number;
  shipping_address: string;
  recipient_name: string;
  phone_number: string;
  message?: string;
  cart_items: {
    product_id: number;
    quantity: number;
    price: number;
    options?: Record<string, any>;
    etc?: Record<string, any>;
  }[];
  valid_order_id: string;
}

export interface UpdateOrderStatusRequest {
  order_id: number;
  order_status: string;
}
