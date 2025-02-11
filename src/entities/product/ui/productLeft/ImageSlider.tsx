"use client";

import React from "react";
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
