// src/pages/products/[product_id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductById } from "@/shared/api/products";
import { Product } from "@/shared/types/products";
import {
  ProductBottomSection,
  ProductLeftSection,
  ProductRightSection,
} from "@/entities/product";
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
    <div className="container mx-auto p-4 flex flex-col items-center gap-0 md:gap-20 md:my-4">
      <div className="flex flex-col gap-4 justify-center sm:flex-row md:gap-20">
        <ProductLeftSection product={product} />
        <ProductRightSection product={product} />
      </div>
      <ProductBottomSection product={product} />
    </div>
  );
}
