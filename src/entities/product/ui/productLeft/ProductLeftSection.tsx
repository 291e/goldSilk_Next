"use client";

import { useState } from "react";
import { AIFaceSynthesis } from "./AIFaceSynthesis";
import { Product } from "@/shared/types/products";
import { ImageSlider } from "./ImageSlider";
import { ThumbnailGallery } from "./ThumbnailList";

export default function ProductLeftSection({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [thumbnails, setThumbnails] = useState<string[]>(product.images);

  // AI 합성 이미지 추가
  const handleImageUpdate = (newImage: string) => {
    setThumbnails((prev) => [newImage, ...prev]); // 새로운 이미지 맨 앞에 추가
    setSelectedImage(newImage); // 새 이미지 선택
  };

  return (
    <div className="w-full max-w-xs">
      <ImageSlider currentImage={selectedImage} />

      <AIFaceSynthesis
        selectedImage={selectedImage}
        onImageUpdate={handleImageUpdate} // 수정된 부분
      />

      <ThumbnailGallery
        images={thumbnails} // 썸네일 목록 업데이트
        onThumbnailClick={setSelectedImage}
      />
    </div>
  );
}
