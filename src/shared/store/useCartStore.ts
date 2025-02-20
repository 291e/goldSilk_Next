import { create } from "zustand";
import { CartItem } from "@/shared/types/cart";
import {
  fetchCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "@/shared/api/cart";

interface CartState {
  cart: CartItem[];
  cartCount: number;
  loading: boolean;
  statusMessage: string | null;
  loadCart: () => Promise<void>;
  addItem: (
    productId: number,
    quantity: number,
    options?: Record<string, any>
  ) => Promise<void>;
  updateItem: (
    cartId: number,
    quantity: number,
    options?: Record<string, any>
  ) => Promise<void>;
  removeItem: (cartId: number) => Promise<void>;
  clear: () => Promise<void>;
  getCartItem: (productId: number) => CartItem | undefined;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  cartCount: 0,
  loading: false,
  statusMessage: null,

  /** ✅ 장바구니 불러오기 */
  loadCart: async () => {
    set({ loading: true, statusMessage: null });
    try {
      const cartData = await fetchCartItems();
      set({ cart: cartData, cartCount: cartData.length });
    } catch (error) {
      console.error("🚨 장바구니 불러오기 실패:", error);
      set({ statusMessage: "장바구니를 불러오는 중 오류가 발생했습니다." });
    } finally {
      set({ loading: false });
    }
  },

  /** ✅ 장바구니에 상품 추가 */
  addItem: async (productId, quantity, options) => {
    set({ loading: true, statusMessage: null });
    try {
      const selectedPrice = 0; // Replace with actual logic to determine selectedPrice
      await addToCart(productId, quantity, selectedPrice, options);
      await get().loadCart(); // 최신 장바구니 데이터 반영
      set({ statusMessage: "✅ 장바구니에 추가되었습니다!" });
    } catch (error) {
      console.error("🚨 장바구니 추가 실패:", error);
      set({ statusMessage: "상품을 장바구니에 추가하는 데 실패했습니다." });
    } finally {
      set({ loading: false });
    }
  },

  /** ✅ 장바구니 상품 업데이트 (수량/옵션 변경) */
  updateItem: async (cartId, quantity, options) => {
    set({ loading: true, statusMessage: null });
    try {
      await updateCartItem(cartId, quantity, options);
      await get().loadCart();
      set({ statusMessage: "✅ 장바구니가 업데이트되었습니다!" });
    } catch (error) {
      console.error("🚨 장바구니 업데이트 실패:", error);
      set({ statusMessage: "장바구니 업데이트에 실패했습니다." });
    } finally {
      set({ loading: false });
    }
  },

  /** ✅ 장바구니 아이템 삭제 */
  removeItem: async (cartId) => {
    set({ loading: true, statusMessage: null });
    try {
      await removeCartItem(cartId);
      await get().loadCart();
      set({ statusMessage: "🗑 장바구니에서 삭제되었습니다!" });
    } catch (error) {
      console.error("🚨 장바구니 삭제 실패:", error);
      set({ statusMessage: "장바구니 삭제에 실패했습니다." });
    } finally {
      set({ loading: false });
    }
  },

  /** ✅ 장바구니 비우기 */
  clear: async () => {
    set({ loading: true, statusMessage: null });
    try {
      await clearCart();
      set({
        cart: [],
        cartCount: 0,
        statusMessage: "🛒 장바구니가 비워졌습니다!",
      });
    } catch (error) {
      console.error("🚨 장바구니 비우기 실패:", error);
      set({ statusMessage: "장바구니 비우기에 실패했습니다." });
    } finally {
      set({ loading: false });
    }
  },

  /** ✅ 특정 상품이 장바구니에 있는지 찾기 */
  getCartItem: (productId) => {
    return get().cart.find((item) => item.product_id === productId);
  },
}));
