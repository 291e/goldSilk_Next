"use client";

import React from "react";
import Image from "next/image";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

interface ImageSliderProps {
  currentImage: string;
}

export const ImageSlider = ({ currentImage }: ImageSliderProps) => {
  const imageUrl = currentImage.startsWith("data:image")
    ? currentImage
    : `https://goldsilk.net/images/${currentImage}`;

  return (
    <div className="relative w-full max-w-xs aspect-[2/3] overflow-hidden rounded-md shadow-md">
      {/* 기본 이미지 */}
      <Image
        src={imageUrl}
        alt="Main Product"
        fill // 부모 요소를 꽉 채우도록 설정
        className="object-cover"
        priority
      />

      {/* 확대 기능 */}
      <div className="absolute inset-0 z-10">
        <InnerImageZoom
          src={imageUrl}
          zoomSrc={imageUrl}
          zoomType="hover"
          zoomScale={1} // 확대 배율
          moveType="pan"
          zoomPreload={true}
          className="w-full h-full opacity-0" // 기본 이미지를 가리지 않도록 투명도 설정
        />
      </div>
    </div>
  );
};
