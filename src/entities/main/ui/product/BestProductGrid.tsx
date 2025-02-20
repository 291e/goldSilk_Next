"use client";

import React from "react";
import { ProductGrid } from "./ProductGrid";

export const BestProductGrid = () => {
  return (
    <section className="flex flex-col items-center gap-6 my-6">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">베스트셀러</span>
        <span className="text-slate-300">황금단에서 인기있는 상품</span>
      </div>
      <ProductGrid type="BEST" />
    </section>
  );
};
