"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import {
  ReviewCard,
  ReviewCardProps,
} from "@/entities/main/ui/review/ReviewCard";
import { fetchAllReviews } from "@/shared/api/reviews"; // API 불러오기
import { Skeleton } from "@/shared/ui";

export const ReviewSlider = () => {
  const [reviews, setReviews] = useState<ReviewCardProps["review"][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllReviews();
      setReviews(data);
    } catch (error) {
      console.error("리뷰 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div className="my-8">
      <div className="flex flex-col items-center mb-6">
        <span className="text-2xl font-bold">고객후기</span>
        <span className="text-slate-300">
          상품을 이용하신 고객님들의 리얼 후기입니다!
        </span>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton className="w-full h-40 rounded-md mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2" />
              </SwiperSlide>
            ))
          : reviews.map((review) => (
              <SwiperSlide key={review.review_id}>
                <ReviewCard onReviewUpdate={loadReviews} review={review} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};
