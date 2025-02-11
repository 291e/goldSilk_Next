"use client";

import React, { useRef } from "react";
import { ProductDetailSection } from "./ProductDetailSection";
import { ShippingInfoSection } from "./ShippingInfoSection";
import { ReviewSection } from "./ReviewSection";
import { ProductInquirySection } from "./ProductInquirySection";
import { NavTabs } from "@/widgets/ProductDetail/NavTabs";
import { Product } from "@/shared/types/products";

interface ProductBottomSectionProps {
  product: Product;
}

const sections = [
  { id: "detail", label: "제품 상세", Component: ProductDetailSection },
  { id: "shipping", label: "배송 정보", Component: ShippingInfoSection },
  { id: "reviews", label: "리뷰", Component: ReviewSection },
  { id: "inquiry", label: "상품 문의", Component: ProductInquirySection },
] as const; // 💡 as const를 사용하여 sections 배열의 타입을 정확하게 지정

export default function ProductBottomSection({
  product,
}: ProductBottomSectionProps) {
  // ✅ sectionRefs의 타입을 명확하게 지정
  type SectionRefs = Record<
    "detail" | "shipping" | "reviews" | "inquiry",
    React.RefObject<HTMLDivElement | null>
  >;
  const sectionRefs: SectionRefs = {
    detail: useRef<HTMLDivElement>(null),
    shipping: useRef<HTMLDivElement>(null),
    reviews: useRef<HTMLDivElement>(null),
    inquiry: useRef<HTMLDivElement>(null),
  };

  // ✅ 특정 섹션으로 이동하는 함수 (타입 명확화)
  const scrollToSection = (id: keyof typeof sectionRefs) => {
    sectionRefs[id]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative mt-8 w-full max-w-5xl">
      {sections.map(({ id, Component }) => (
        <div key={id} ref={sectionRefs[id]} className="pt-16">
          <NavTabs activeSection={id} scrollToSection={scrollToSection} />
          <Component productId={product.product_id} />
        </div>
      ))}
    </div>
  );
}
