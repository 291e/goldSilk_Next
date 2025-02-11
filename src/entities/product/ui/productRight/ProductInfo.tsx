"use client";

import { Product } from "@/shared/types/products";
import { RadioGroup, RadioGroupItem } from "@/shared/ui";
import React, { useState, useEffect } from "react";

interface PriceSelectorProps
  extends Pick<Product, "name" | "price" | "price_top" | "price_bottom"> {
  selectedPrice: number;
  onPriceSelect: (price: number) => void;
}

export const PriceSelector = ({
  name,
  price,
  price_top,
  price_bottom,
  selectedPrice,
  onPriceSelect,
}: PriceSelectorProps) => {
  const [isSetDisabled, setIsSetDisabled] = useState(false);
  const [isTopDisabled, setIsTopDisabled] = useState(false);
  const [isBottomDisabled, setIsBottomDisabled] = useState(false);

  useEffect(() => {
    setIsSetDisabled(!price || price === "0");
    setIsTopDisabled(!price_top || price_top === "0");
    setIsBottomDisabled(!price_bottom || price_bottom === "0");
  }, [price, price_top, price_bottom]);

  return (
    <div className="flex flex-col">
      <div>
        <span className="font-semibold text-gray-700">{name}</span>
      </div>

      <div className="h-[1px] w-full bg-gray-200 my-2" />

      <label className="font-bold text-sm text-sky-600">판매가</label>
      <RadioGroup
        value={selectedPrice.toString()}
        onValueChange={(value) => onPriceSelect(Number(value))}
        className="flex flex-col gap-1"
      >
        {/* 세트 가격 */}
        <div className="flex items-center gap-2">
          <RadioGroupItem
            id="set-price"
            value={price?.toString() || ""}
            disabled={isSetDisabled}
          />
          <label
            htmlFor="set-price"
            className={`cursor-pointer text-sm ${
              isSetDisabled ? "text-gray-400 cursor-not-allowed" : ""
            }`}
          >
            세트 : {Number(price || 0).toLocaleString()}원
          </label>
        </div>

        {/* 상의 가격 */}
        <div className="flex items-center gap-2">
          <RadioGroupItem
            id="top-price"
            value={price_top?.toString() || ""}
            disabled={isTopDisabled}
          />
          <label
            htmlFor="top-price"
            className={`cursor-pointer text-sm ${
              isTopDisabled ? "text-gray-400 cursor-not-allowed" : ""
            }`}
          >
            상의 : {Number(price_top || 0).toLocaleString()}원
          </label>
        </div>

        {/* 하의 가격 */}
        <div className="flex items-center gap-2">
          <RadioGroupItem
            id="bottom-price"
            value={price_bottom?.toString() || ""}
            disabled={isBottomDisabled}
          />
          <label
            htmlFor="bottom-price"
            className={`cursor-pointer text-sm ${
              isBottomDisabled ? "text-gray-400 cursor-not-allowed" : ""
            }`}
          >
            하의 : {Number(price_bottom || 0).toLocaleString()}원
          </label>
        </div>
      </RadioGroup>
    </div>
  );
};
