// src/features/order/ui/BuyNowButton.tsx

"use client";

import React from "react";
import { Button } from "@/shared/ui/shadCn/button";
import { useRouter } from "next/navigation";

interface BuyNowButtonProps {
  productId: string;
  quantity: number;
  options?: Record<string, string>;
}

export const BuyNowButton = ({
  productId,
  quantity,
  options,
}: BuyNowButtonProps) => {
  const router = useRouter();

  const handleBuyNow = () => {
    router.push(`/checkout?productId=${productId}&quantity=${quantity}`);
  };

  return (
    <Button
      onClick={handleBuyNow}
      className="w-full bg-blue-500 hover:bg-blue-600"
    >
      바로 구매
    </Button>
  );
};
