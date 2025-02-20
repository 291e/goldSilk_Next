"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/shared/ui";
import { Check, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/shared/types/products";

interface ActionButtonsProps extends Pick<Product, "is_sold_out"> {
  onBuy: () => void;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  cartItem?: any;
  loading: boolean;
  statusMessage: string | null;
  selectedPrice: number; // ✅ 선택된 옵션(가격)
}

export const ActionButtons = ({
  is_sold_out,
  onBuy,
  onAddToCart,
  onAddToWishlist,
  cartItem,
  loading,
  statusMessage,
  selectedPrice, // ✅ 옵션 가격
}: ActionButtonsProps) => {
  const [added, setAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /** ✅ 추가 후 2초 뒤 원래대로 변경 */
  useEffect(() => {
    if (added) {
      const timer = setTimeout(() => setAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [added]);

  /** ✅ 장바구니 추가 버튼 클릭 */
  const handleAddToCart = () => {
    // 장바구니에 동일한 옵션이 있는지 확인
    const isDuplicate =
      cartItem &&
      cartItem.some((item: any) => item.selectedPrice === selectedPrice);

    if (isDuplicate) {
      setErrorMessage("이미 추가된 상품입니다.");
      return;
    }

    setErrorMessage(null);
    onAddToCart();
    setAdded(true);
  };

  return (
    <div className="flex gap-2 my-2">
      {/* 구매 버튼 */}
      <Button
        className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold py-3"
        disabled={is_sold_out}
        onClick={onBuy}
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
        onClick={onAddToWishlist}
      >
        <Heart className="w-5 h-5 text-red-500" />
        찜하기
      </Button>
    </div>
  );
};
