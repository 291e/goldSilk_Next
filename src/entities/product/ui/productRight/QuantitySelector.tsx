"use client";

import React, { useState } from "react";
import { Input } from "@/shared/ui";

interface QuantitySelectorProps {
  onChange: (quantity: number) => void;
}

export const QuantitySelector = ({ onChange }: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      onChange(value);
    }
  };

  return (
    <div className="flex gap-2 max-w-12 max-h-6">
      {/* 수량 입력 필드 */}
      <Input
        id="quantity"
        type="number"
        value={quantity}
        onChange={handleInputChange}
        className="text-center w-full p-0 px-1 h-6 text-xs"
        min={1}
      />
    </div>
  );
};
