"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import {
  ProductCard,
  ProductCardProps,
} from "@/entities/main/ui/product/ProductCard";
import { fetchAllProducts } from "@/shared/api/products";
import { Skeleton } from "@/shared/ui";

export const RecommendedProductSlider = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<
    ProductCardProps["product"][]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        // BEST와 NEW 태그가 모두 포함된 상품 필터링
        const filteredProducts = data
          .filter(
            (product: ProductCardProps["product"]) =>
              product.tags?.includes("BEST") && product.tags?.includes("NEW")
          )
          .sort((a: any, b: any) => Number(b.product_id) - Number(a.product_id))
          .slice(0, 20);
        setRecommendedProducts(filteredProducts);
      } catch (error) {
        console.error("추천 상품 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="my-6">
      <div className="flex flex-col items-center my-6">
        <span className="text-2xl font-bold">추천상품</span>
        <span className="text-slate-300">황금단이 추천하는 상품</span>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton className="w-full h-64 rounded-md mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2" />
              </SwiperSlide>
            ))
          : recommendedProducts.map((product) => (
              <SwiperSlide key={product.product_id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #353535;
          transition: transform 0.2s ease-in-out;
        }

        @media (max-width: 640px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 12px !important;
            height: 12px !important;
            font-size: 8px !important;
          }

          .swiper-button-prev:after,
          .swiper-button-next:after {
            font-size: 32px !important;
          }

          .swiper-pagination-bullet-active {
            background: #353535;
          }
        }
      `}</style>
    </div>
  );
};
