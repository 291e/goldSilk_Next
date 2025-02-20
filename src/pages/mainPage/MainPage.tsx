"use client";

import {
  BestProductGrid,
  NewProductGrid,
  BannerCarousel,
} from "@/features/main";
import {
  main_longbanner01,
  main_longbanner02,
  main_longbanner03,
} from "@/shared/assets/mainPage";
import {
  InfoCardSection,
  RecommendedProductSlider,
  ReviewSlider,
  ShortsSlider,
  YouTubeSection,
} from "@/widgets/mainPage";
import InstagramFeed from "@/widgets/mainPage/InstaFeed/InstaFeed";

import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function MainPage() {
  return (
    <main>
      <BannerCarousel />
      <div className="container mx-auto px-4">
        <InfoCardSection />
        <YouTubeSection />
        <RecommendedProductSlider />
      </div>
      <Link href="/info/custom">
        <Image
          src={main_longbanner01}
          alt="메인 페이지 배너"
          width={0}
          height={0}
          className="w-full"
        />
      </Link>
      <div className="container mx-auto px-4">
        <NewProductGrid />
      </div>
      <Link href="/info/wear">
        <Image
          src={main_longbanner02}
          alt="메인 페이지 배너"
          width={0}
          height={0}
          className="w-full"
        />
      </Link>
      <div className="container mx-auto px-4">
        <BestProductGrid />
      </div>
      <Link href="/info/measure">
        <Image
          src={main_longbanner03}
          alt="메인 페이지 배너"
          width={0}
          height={0}
          className="w-full"
        />
      </Link>
      <div className="container mx-auto px-4">
        <ReviewSlider />
        <InstagramFeed
          accessToken="IGAAb9PgLOI0BBZAE9xcTdET1ZA0ckVoVEFkQm9STjl2RU84Q3BQVVB1M01XamV5T3JhMGVIZAmNCRlVUZAjllbTI2cG56OXpLWk9UZAXlXa00zSkx5NjRfX05ZAbHdGRWtMbGRVNndqc2xfaG1FMUdTNDUyNFpWb19FNlNDTGQ5NGRWRQZDZD"
          userId="17841460182943697"
          limit={12}
        />
      </div>
    </main>
  );
}
