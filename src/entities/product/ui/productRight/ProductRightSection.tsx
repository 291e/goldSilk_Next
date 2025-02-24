"use client";

import React, { useState } from "react";
import { PriceSelector } from "./ProductInfo";
import { QuantitySelector } from "./QuantitySelector";
import { ActionButtons } from "./ActionButtons";
import { Product } from "@/shared/types/products";
import { useCartStore } from "@/shared/store/useCartStore";

interface ProductRightSectionProps {
  product: Product;
}

export default function ProductRightSection({
  product,
}: ProductRightSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(Number(product.price)); // 기본값: 세트 가격
  const { addItem, loading, statusMessage, getCartItem } = useCartStore();

  const totalPrice = selectedPrice * quantity;
  const cartItem = getCartItem(Number(product.product_id));

  const handleBuy = () => {
    console.log("✅ 구매하기:", {
      product_id: product.product_id,
      quantity,
      totalPrice,
    });
  };

  const handleAddToCart = async () => {
    await addItem(Number(product.product_id), quantity);
  };

  const handleAddToWishlist = () => {
    console.log("❤️ 찜하기:", { product_id: product.product_id });
  };

  return (
    <div className="flex flex-col gap-2 p-6 border rounded-lg bg-white shadow-md max-w-sm">
      {/* 가격 선택 컴포넌트 */}
      <PriceSelector
        name={product.name}
        price={product.price}
        price_top={product.price_top}
        price_bottom={product.price_bottom}
        selectedPrice={selectedPrice}
        onPriceSelect={setSelectedPrice}
      />

      <div className="h-[1px] w-full bg-gray-200" />

      <div className="flex justify-between items-center">
        <span className="text-xs text-red-500">
          최소 주문 수량은 1개 이상입니다.
        </span>
        <QuantitySelector onChange={setQuantity} />
      </div>

      <div className="h-[1px] w-full bg-gray-200" />

      <div className="text-sm flex gap-2 justify-end items-end">
        <div>
          <span>총 상품금액</span>
          <span className="text-xs text-gray-700">(수량) :</span>
        </div>
        <div>
          <span className="text-base font-semibold">
            {totalPrice.toLocaleString()}원
          </span>
          <span className="text-xs text-gray-700">({quantity}개)</span>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-200" />

      <ActionButtons
        is_sold_out={product.is_sold_out}
        onBuy={handleBuy}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        cartItem={cartItem}
        loading={loading}
        statusMessage={statusMessage}
        selectedPrice={selectedPrice}
        product_id={product.product_id}
      />
    </div>
  );
}
