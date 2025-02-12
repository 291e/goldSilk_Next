"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/shared/types/products";
import Logo from "@/app/logo.jpg";
/** 이미지 URL을 변환하는 함수 */
const getImageUrl = (imagePath?: string) =>
  imagePath && !imagePath.startsWith("data:image")
    ? `https://goldsilk.net/images/${imagePath}`
    : imagePath || Logo;

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = getImageUrl(product.images?.[0]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className=" rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden"
    >
      <Link href={`/product/${product.product_id}`} className="flex flex-col">
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover "
          />
        </div>
        <div className="pt-4 px-4 pb-4 flex flex-col border border-t-0 rounded-b-lg">
          <span className="text-sm font-semibold line-clamp-1">
            {product.name}
          </span>
          <span className="text-xs text-gray-500">{product.category}</span>
          <span className="text-sm mt-1">{product.price} 원</span>
        </div>
      </Link>
    </motion.div>
  );
};
