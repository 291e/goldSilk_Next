export interface Product {
  product_id: string;
  name: string;
  price: string;
  description: string;
  images: string[]; // 이미지 URL 배열
  tags?: string[];
  options?: ProductOption[];
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
