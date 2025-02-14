"use client";

import React from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

interface ImageSliderProps {
  currentImage?: string; // 옵셔널 처리
}

export const ImageSlider = ({ currentImage }: ImageSliderProps) => {
  // 기본 이미지 설정 (이미지가 없을 경우)
  const defaultImage = "/images/default-placeholder.png"; // 적절한 기본 이미지 경로 사용
  const validImage =
    currentImage && typeof currentImage === "string"
      ? currentImage
      : defaultImage;

  const imageUrl = validImage.startsWith("data:image")
    ? validImage
    : `https://goldsilk.net/images/${validImage}`;

  return (
    <div className="flex justify-center items-center mb-4 w-full max-w-xs relative overflow-hidden">
      <InnerImageZoom
        src={imageUrl}
        zoomSrc={imageUrl} // 확대할 이미지
        zoomType="hover" // hover 시 확대
        zoomScale={1} // 확대 배율
        className="rounded-md object-cover w-full h-full"
        zoomPreload={true} // 줌 이미지 사전 로드
        moveType="pan"
      />
    </div>
  );
};
