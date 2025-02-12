export interface Product {
  product_id: string;
  name: string;
  price: string;
  price_top: string;
  price_bottom: string;
  description: string;
  images: string[]; // 이미지 URL 배열
  detail_images: string[];
  tags?: string[];
  category: string;
  options?: ProductOption[];
  is_displayed: boolean;
  is_sold_out: boolean;
}

export interface ProductOption {
  option_id: string;
  value: string;
  additional_price: number;
}

export interface OptionGroup {
  group_id: number;
  name: string;
  options: ProductOption[];
}
