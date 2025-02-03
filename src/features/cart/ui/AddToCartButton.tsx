"use client";

import React from "react";

interface AddToCartButtonProps {
  productId: string;
  quantity: number;
  onAddToCart: (productId: string, quantity: number) => void;
}

export const AddToCartButton = ({
  productId,
  quantity,
  onAddToCart,
}: AddToCartButtonProps) => {
  const handleAddToCart = () => {
    onAddToCart(productId, quantity);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
    >
      장바구니 담기
    </button>
  );
};
