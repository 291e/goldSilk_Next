"use client";

import React from "react";

interface ThumbnailGalleryProps {
  images: string[];
  onThumbnailClick: (img: string) => void;
}

export const ThumbnailGallery = ({
  images,
  onThumbnailClick,
}: ThumbnailGalleryProps) => {
  return (
    <div className="flex gap-2 mt-4 justify-start">
      {images.map((img, index) => (
        <img
          key={index}
          src={
            img.startsWith("data:image")
              ? img
              : `https://goldsilk.net/images/${img}`
          }
          alt={`Thumbnail ${index + 1}`}
          className="cursor-pointer object-cover rounded-md border w-20 h-20"
          onClick={() => onThumbnailClick(img)}
        />
      ))}
    </div>
  );
};
