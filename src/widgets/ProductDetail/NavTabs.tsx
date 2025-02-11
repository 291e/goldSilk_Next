"use client";

import { Button } from "@/shared/ui";
import React from "react";

interface NavTabsProps {
  activeSection: "detail" | "shipping" | "reviews" | "inquiry";
  scrollToSection: (id: "detail" | "shipping" | "reviews" | "inquiry") => void;
}

export const NavTabs = ({ activeSection, scrollToSection }: NavTabsProps) => {
  return (
    <nav className="flex gap-4 border-b pb-0 my-4 sticky top-0 bg-white justify-between">
      {(["detail", "shipping", "reviews", "inquiry"] as const).map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 font-semibold ${
            activeSection === tab
              ? "border-b-2 border-[#353535] text-[#353535]"
              : "text-gray-600"
          }`}
          onClick={() => scrollToSection(tab)}
        >
          {tab === "detail" && "제품 상세"}
          {tab === "shipping" && "배송 정보"}
          {tab === "reviews" && "리뷰"}
          {tab === "inquiry" && "상품 문의"}
        </button>
      ))}
    </nav>
  );
};
