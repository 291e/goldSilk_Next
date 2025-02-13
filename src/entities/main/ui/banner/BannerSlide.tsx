"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Banner } from "../../model/types";

interface BannerSlideProps {
  banners: Banner[];
}

export const BannerSlide = ({ banners }: BannerSlideProps) => {
  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className=" shadow-lg"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <a
              href={banner.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={banner.image.src}
                alt={banner.image.alt}
                width={1920}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #353535;
        }
        }
      `}</style>
    </div>
  );
};
