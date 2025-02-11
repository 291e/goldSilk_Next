import axiosInstance from "@/shared/api/axiosInstance";
import {
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
} from "@/shared/types/reviews";

/** 특정 상품의 리뷰 조회 */
export async function fetchReviewsByProduct(
  productId: number
): Promise<Review[]> {
  const { data } = await axiosInstance.get(`/reviews/${productId}`);
  return data;
}

/** 리뷰 작성 (이미지 포함) */
export async function createReview(formData: FormData) {
  const { data } = await axiosInstance.post("/reviews", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

/** 리뷰 수정 */
export async function updateReview(reviewId: number, formData: FormData) {
  const { data } = await axiosInstance.put(`/reviews/${reviewId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

/** 리뷰 삭제 */
export async function deleteReview(reviewId: number) {
  const { data } = await axiosInstance.delete(`/reviews/${reviewId}`);
  return data;
}
