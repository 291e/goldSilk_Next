"use client";

import { useEffect } from "react";
import { useWishlistStore } from "@/shared/store/useWishlistStore";
import { ProductCard } from "@/entities/main";

export default function WishlistPage() {
  const { wishlist, loadWishlist } = useWishlistStore();

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">찜한 상품</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">찜한 상품이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
