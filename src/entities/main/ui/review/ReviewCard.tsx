"use client";

import React from "react";
import Logo from "@/shared/assets/logo.jpg";
import Image, { StaticImageData } from "next/image";

export interface ReviewCardProps {
  review: {
    review_id: string;
    title: string;
    comment: string;
    rating: number;
    author: string;
    image_url: string | StaticImageData;
  };
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const imageUrl = review.image_url
    ? `https://goldsilk.net/images/review/${review.image_url}`
    : Logo; // 로고 이미지로 대체

  return (
    <div className="p-4 border flex flex-col items-center gap-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white h-80">
      <div className="overflow-hidden relative min-h-[140px] size-[140px] rounded-full">
        <Image
          src={imageUrl}
          width={0} // 원하는 가로 크기
          height={0} // 원하는 세로 크기
          alt="Review"
          className="w-full h-full object-cover absolute"
          unoptimized // 외부 이미지 최적화 방지 (필요 시 추가)
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold line-clamp-1">{review.title}</span>
        <span className="text-gray-600 line-clamp-2">{review.comment}</span>
        <span className="text-yellow-500 text-sm">⭐ {review.rating} / 5</span>
        <span className="text-sm text-gray-400">- {review.author}</span>
      </div>
    </div>
  );
};
