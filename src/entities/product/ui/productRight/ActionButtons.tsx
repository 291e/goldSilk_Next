"use client";

import React from "react";
import { Button } from "@/shared/ui";
import { Heart } from "lucide-react";
import { Product } from "@/shared/types/products";

interface ActionButtonsProps extends Pick<Product, "is_sold_out"> {
  onBuy: () => void;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

export const ActionButtons = ({
  is_sold_out,
  onBuy,
  onAddToCart,
  onAddToWishlist,
}: ActionButtonsProps) => {
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

      {/* 장바구니 담기 버튼 */}
      <Button
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold py-3"
        onClick={onAddToCart}
      >
        장바구니
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
