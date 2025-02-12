"use client";

import React from "react";
import Image from "next/image";
import Logo from "@/shared/assets/logo.jpg";
import { Button, Skeleton } from "@/shared/ui";
import Link from "next/link";
import { Badge } from "@/shared/ui/shadCn/badge";

export interface ProductCardProps {
  product: {
    product_id: string;
    name: string;
    price: string;
    images: string[] | string; // 문자열 또는 배열 둘 다 처리 가능하도록 설정
    tags?: string[];
  };
  isLoading?: boolean;
}

export const ProductCard = ({
  product,
  isLoading = false,
}: ProductCardProps) => {
  if (isLoading) {
    return (
      <div className="border rounded-lg overflow-hidden shadow-sm p-4">
        <Skeleton className="w-full h-64 rounded-md mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    );
  }

  let imageArray: string[] = [];

  // images가 배열인지 확인하고 처리
  if (Array.isArray(product.images)) {
    imageArray = product.images;
  } else if (typeof product.images === "string") {
    try {
      imageArray = JSON.parse(product.images.replace(/'/g, '"'));
    } catch (error) {
      console.warn("이미지 파싱 오류:", error);
    }
  }

  const imageUrl = imageArray[0]
    ? `https://goldsilk.net/images/${imageArray[0]}`
    : Logo;

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full justify-between">
      <div className="w-full h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover w-full h-64 hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4 flex flex-col h-[200px] justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">{product.name}</span>
          <span className="text-primary text-sm">
            {Number(product.price).toLocaleString()}원
          </span>
          <div className="flex gap-2">
            <Badge>{product.tags?.[0]}</Badge>
          </div>
        </div>
        <Link href={`/product/${product.product_id}`}>
          <Button className="w-full mt-2">자세히 보기</Button>
        </Link>
      </div>
    </div>
  );
};
