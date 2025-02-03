"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { ShortsCard } from "@/entities/main/ui/shorts/ShortsCard";

// 슬라이드에 들어갈 데이터
const shortsData = [
  { id: "__NlyNLMwsU" },
  { id: "DtSQmTOIeic" },
  { id: "B3hD-encxrA" },
];

export const ShortsSlider = () => {
  return (
    <div className="my-6">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {shortsData.map((short) => (
          <SwiperSlide key={short.id}>
            <ShortsCard id={short.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
