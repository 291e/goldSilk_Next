"use client";

import { fetchProductById } from "@/shared/api";
import { Product } from "@/shared/types/products";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProductDetailSectionProps {
  productId: string;
}

const getFullImageUrl = (imagePath: string) => {
  const baseUrl = "https://goldsilk.net/images/";
  return imagePath.startsWith("http") ? imagePath : `${baseUrl}${imagePath}`;
};

const isHTML = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);

export const ProductDetailSection = ({
  productId,
}: ProductDetailSectionProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("🚨 제품 상세 정보를 불러오지 못했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) return <div className="p-6">⏳ 제품 정보를 불러오는 중...</div>;

  if (!product)
    return (
      <div className="p-6 text-red-500">⚠️ 제품 정보를 찾을 수 없습니다.</div>
    );

  return (
    <section className="p-6 flex flex-col items-center w-full">
      <div>
        {isHTML(product.description) ? (
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        ) : (
          <span className="text-gray-700">
            {product.description || "주문생산협의 : 010-7397-0135"}
          </span>
        )}
      </div>
      {/* 제품 상세 이미지 */}
      <div className="mt-6 w-full">
        {product.detail_images.length > 0 ? (
          <div className="flex flex-col gap-4 items-center">
            {product.detail_images.map((image, index) => (
              <Image
                key={index}
                sizes="100vw"
                quality={100}
                width={0}
                height={0}
                src={getFullImageUrl(image)}
                alt={`상세 이미지 ${index + 1}`}
                className="w-full h-auto max-w-lg"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};
