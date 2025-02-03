import axiosInstance from "./axiosInstance";
import { CartItem } from "@/shared/types/cart";

/** 장바구니 조회 */
export async function fetchCartItems(): Promise<CartItem[]> {
  const { data } = await axiosInstance.get("/cart");
  return data;
}

/** 장바구니에 상품 추가 */
export async function addToCart(
  productId: number,
  quantity: number,
  options?: Record<string, any>
) {
  const { data } = await axiosInstance.post("/cart", {
    product_id: productId,
    quantity,
    options,
  });
  return data;
}

/** 장바구니 상품 수량/옵션 변경 */
export async function updateCartItem(
  cartId: number,
  quantity: number,
  options?: Record<string, any>
) {
  const { data } = await axiosInstance.put(`/cart/${cartId}`, {
    quantity,
    options,
  });
  return data;
}

/** 장바구니 항목 삭제 */
export async function removeCartItem(cartId: number) {
  const { data } = await axiosInstance.delete(`/cart/${cartId}`);
  return data;
}

/** 장바구니 비우기 */
export async function clearCart() {
  const { data } = await axiosInstance.delete("/cart");
  return data;
}
