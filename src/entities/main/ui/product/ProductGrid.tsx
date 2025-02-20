"use client";

import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { fetchAllProducts } from "@/shared/api/products";
import { Product } from "@/shared/types/products";

interface ProductGridProps {
  type: "NEW" | "BEST";
}

export const ProductGrid = ({ type }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        const filteredProducts = data
          .filter((product: Product) => product.tags?.includes(type))
          .sort(
            (a: any, b: any) => Number(b.product_id) - Number(a.product_id)
          );

        setProducts(filteredProducts.slice(0, 8));
      } catch (error) {
        console.error("상품 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [type]);

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <ProductCard
              key={index}
              product={{ product_id: "", name: "", price: "", images: [] }}
              isLoading
            />
          ))
        : products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
    </section>
  );
};
