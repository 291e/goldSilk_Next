import axiosInstance from "./axiosInstance";

/** ✅ 좋아요 추가 */
export async function addToWishlist(productId: string, userId: number) {
  const { data } = await axiosInstance.post("/wishlist/add", {
    product_id: productId,
    user_id: userId,
  });
  return data;
}

/** ✅ 좋아요 삭제 */
export async function removeFromWishlist(product_id: string, userId: number) {
  const { data } = await axiosInstance.delete(`/wishlist/${product_id}`, {
    params: {
      user_id: userId,
    },
  });
  return data;
}

/** ✅ 사용자의 좋아요 목록 조회 */
export async function fetchWishlist() {
  const { data } = await axiosInstance.get("/wishlist");
  return data;
}
