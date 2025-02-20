import { create } from "zustand";
import {
  fetchReviewsByProduct,
  createReview,
  deleteReview,
} from "@/shared/api/reviews";
import { Review } from "@/shared/types/reviews";

interface ReviewStore {
  reviews: Review[];
  fetchReviews: (productId: string) => Promise<void>;
  addReview: (review: Review) => void;
  removeReview: (reviewId: string) => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  reviews: [],

  fetchReviews: async (productId) => {
    const reviews = await fetchReviewsByProduct(Number(productId));
    set({ reviews });
  },

  addReview: (review) =>
    set((state) => ({ reviews: [...state.reviews, review] })),

  removeReview: (reviewId) =>
    set((state) => ({
      reviews: state.reviews.filter((r) => r.review_id !== reviewId),
    })),
}));
