"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/shared/ui";
import { Check, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/shared/types/products";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/shared/store/useWishlistStore";

interface ActionButtonsProps
  extends Pick<Product, "is_sold_out" | "product_id"> {
  onBuy: () => void;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  cartItem?: any | any[];
  loading: boolean;
  statusMessage: string | null;
  selectedPrice: number; // ✅ 선택된 옵션(가격)
}

export const ActionButtons = ({
  is_sold_out,
  product_id,
  onAddToCart,
  onAddToWishlist,
  cartItem = [],
  loading,
  statusMessage,
  selectedPrice, // ✅ 옵션 가격
}: ActionButtonsProps) => {
  const [added, setAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isLiked = isInWishlist(product_id);
  const router = useRouter();

  /** ✅ 추가 후 2초 뒤 원래대로 변경 */
  useEffect(() => {
    if (added) {
      const timer = setTimeout(() => setAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [added]);

  /** ✅ 장바구니 중복 확인 */
  const isDuplicateInCart = () => {
    if (!cartItem) return false;

    // cartItem이 객체인 경우 → 단일 상품 비교
    if (!Array.isArray(cartItem)) {
      return cartItem.selectedPrice === selectedPrice;
    }

    // cartItem이 배열인 경우 → 기존 방식대로 비교
    return cartItem.some((item) => item.selectedPrice === selectedPrice);
  };

  /** ✅ 장바구니 추가 버튼 클릭 */
  const handleAddToCart = () => {
    if (isDuplicateInCart()) {
      setErrorMessage("이미 추가된 상품입니다.");
      return;
    }

    setErrorMessage(null);
    onAddToCart();
    setAdded(true);
  };

  /** ✅ 구매 버튼 클릭 (장바구니 추가 후 즉시 이동) */
  const handleBuyNow = () => {
    if (!isDuplicateInCart()) {
      onAddToCart();
    }

    router.push("/Carts"); // ✅ 장바구니 페이지로 이동
  };

  return (
    <div className="flex gap-2 my-2">
      {/* 구매 버튼 */}
      <Button
        className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold py-3"
        disabled={is_sold_out}
        onClick={handleBuyNow}
      >
        {is_sold_out ? "품절된 상품입니다" : "구매하기"}
      </Button>

      {/* 장바구니 버튼 */}
      <Button
        className={`w-full text-sm font-semibold py-3 flex items-center justify-center transition-colors ${
          added
            ? "bg-green-500 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
        }`}
        onClick={handleAddToCart}
        disabled={loading || added}
      >
        {loading ? (
          "추가 중..."
        ) : added ? (
          <>
            <Check className="w-5 h-5 mr-2" />
            추가됨
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5 mr-2" />
            장바구니
          </>
        )}
      </Button>

      {/* 찜 버튼 */}

      <Button
        className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3"
        onClick={() =>
          toggleWishlist({
            product_id,
            name: "",
            price: "",
            price_top: "",
            price_bottom: "",
            description: "",
            images: [],
            detail_images: [],
            category: "",
            is_displayed: false,
            is_sold_out: false,
          })
        }
      >
        <Heart
          className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`}
        />
        {isLiked ? "찜 취소" : "찜하기"}
      </Button>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
};
