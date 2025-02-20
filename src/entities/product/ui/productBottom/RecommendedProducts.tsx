"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useRecommendedProducts } from "@/shared/hooks/useRecommend";
import Image from "next/image";
import Link from "next/link";

interface RecommendedProductsProps {
  productId: string;
}

const getFullImageUrl = (imagePath: string) => {
  const baseUrl = "https://goldsilk.net/images/";
  return imagePath.startsWith("http") ? imagePath : `${baseUrl}${imagePath}`;
};

export default function RecommendedProductsSlider({
  productId,
}: RecommendedProductsProps) {
  const { products, loading } = useRecommendedProducts(productId);

  if (loading) return <p className="text-center">추천 상품 로딩 중...</p>;

  if (products.length === 0)
    return <p className="text-center text-gray-500">추천 상품이 없습니다.</p>;

  return (
    <div className="mb-8">
      <div className="w-full text-center font-semibold pb-6">
        함께보면 좋은 상품
      </div>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={5}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="relative"
      >
        {products.map((product) => (
          <SwiperSlide key={product.product_id}>
            <Link href={`/product/${product.product_id}`} passHref>
              <div className="relative rounded-lg aspect-[3/4] overflow-hidden max-w-32 shadow-sm hover:shadow-md transition mb-12 mx-auto group cursor-pointer">
                {/* 상품 이미지 */}
                <Image
                  src={getFullImageUrl(product.images[0])}
                  width={100}
                  height={100}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />

                {/* 호버 시 오버레이 */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex flex-col justify-center items-center gap-2 text-white text-sm opacity-0 group-hover:opacity-100">
                  <span className="text-xs text-center line-clamp-1 font-semibold">
                    {product.name}
                  </span>
                  <span className="text-xs">
                    {product.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
