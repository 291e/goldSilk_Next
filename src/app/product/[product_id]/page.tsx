// src/pages/products/[product_id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductById } from "@/shared/api/products";
import { Product } from "@/shared/types/products";
import ProductLeftSection from "@/entities/product/ui/ProductLeftSection";
export default function ProductDetailPage() {
  const params = useParams();
  const product_id = params?.product_id as string | undefined;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetchProductById(product_id as string);
      setProduct(data);
    };

    fetchProduct();
  }, [product_id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <ProductLeftSection product={product} />
    </div>
  );
}
