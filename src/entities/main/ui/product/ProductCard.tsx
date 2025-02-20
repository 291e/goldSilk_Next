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
        <Skeleton className="w-full h-48 sm:h-64 rounded-md mb-4" />
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
    <Link href={`/product/${product.product_id}`} className="block">
      <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full justify-between max-w-[289.7px]">
        <div className="w-full h-48 sm:h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            sizes="100vw"
            width={300}
            height={400}
            quality={100}
            className="object-cover w-full h-full hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow border rounded-b-lg border-t-0">
          <div className="flex flex-col">
            <span className="text-xs font-semibold line-clamp-1">
              {product.name}
            </span>
            <span className="text-primary text-sm">
              {Number(product.price).toLocaleString()}원
            </span>
            {product.tags?.length && (
              <div className="flex gap-1 flex-wrap pt-2">
                {product.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} className="text-[8px] px-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
