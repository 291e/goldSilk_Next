"use client";

import { useEffect, useState } from "react";
import { fetchRecommendedProducts } from "@/shared/api/products";
import { Product } from "@/shared/types/products";

export const useRecommendedProducts = (productId: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchRecommendedProducts(productId);
      setProducts(data);
      setLoading(false);
    };

    getProducts();
  }, [productId]);

  return { products, loading };
};
