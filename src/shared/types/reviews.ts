export interface Review {
  content: string;
  review_id: string;
  product_id: string;
  user_id: number;
  author: string;
  rating: number;
  title: string;
  comment: string;
  image_url: string;
  created_at: string;
}

export interface CreateReviewRequest {
  product_id: string;
  rating: number;
  title: string;
  comment: string;
  review_images?: File[];
}

export interface UpdateReviewRequest {
  review_id: number;
  title?: string;
  comment?: string;
  rating?: number;
  review_images?: File[];
}
