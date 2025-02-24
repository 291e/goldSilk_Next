import { create } from "zustand";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "@/shared/api/wishlist";
import { Product } from "@/shared/types/products";
import { useUserStore } from "./useUserStore";

interface WishlistState {
  wishlist: Product[];
  loadWishlist: () => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],

  /** ✅ 좋아요 목록 불러오기 */
  loadWishlist: async () => {
    try {
      const wishlist = await fetchWishlist();
      set({ wishlist });
    } catch (error) {
      console.error("🚨 찜 목록 불러오기 실패:", error);
    }
  },

  /** ✅ 좋아요 추가/삭제 */
  toggleWishlist: async (product) => {
    const { wishlist } = get();
    const user = useUserStore.getState().user;
    if (!user?.user_id) {
      console.error("🚨 사용자 ID 없음: 찜하기 불가능");
      return;
    }
    const isLiked = wishlist.some(
      (item) => item.product_id === product.product_id
    );

    try {
      if (isLiked) {
        await removeFromWishlist(product.product_id, user.user_id); // ✅ user_id 추가
        set({
          wishlist: wishlist.filter(
            (item) => item.product_id !== product.product_id
          ),
        });
      } else {
        await addToWishlist(product.product_id, user.user_id); // ✅ user_id 추가
        set({ wishlist: [...wishlist, product] });
      }
    } catch (error) {
      console.error("🚨 좋아요 토글 실패:", error);
    }
  },

  /** ✅ 특정 상품이 좋아요 목록에 있는지 확인 */
  isInWishlist: (productId) => {
    return get().wishlist.some(
      (item) => Number(item.product_id) === Number(productId)
    );
  },
}));
