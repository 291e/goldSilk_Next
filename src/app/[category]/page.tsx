"use client";

import Breadcrumbs from "@/entities/category/ui/Breadcrumbs";
import { ProductList } from "@/entities/category/ui/ProductList";
import { getCategoryName } from "@/shared/lib/categoryUtils";
import { useParams } from "next/navigation";
export default function ProductCategoryPage() {
  const params = useParams();
  const categorySlug = params?.category as string;
  const category = getCategoryName(categorySlug);

  return (
    <div className="container mx-auto px-6 pt-4">
      <Breadcrumbs category={category} />
      <div className="text-2xl font-bold text-center">{category}</div>
      <ProductList category={category} />
    </div>
  );
}
