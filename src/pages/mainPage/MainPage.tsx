"use client";

import {
  BestProductGrid,
  NewProductGrid,
  BannerCarousel,
} from "@/features/main";
import {
  InfoCardSection,
  RecommendedProductSlider,
  ReviewSlider,
  ShortsSlider,
  YouTubeSection,
} from "@/widgets/mainPage";
import React from "react";

export default function MainPage() {
  return (
    <main>
      <BannerCarousel />
      <div className="container mx-auto px-4">
        <InfoCardSection />
        <YouTubeSection />
        <RecommendedProductSlider />

        <NewProductGrid />
        <BestProductGrid />
        <ReviewSlider />
        <ShortsSlider />
      </div>
    </main>
  );
}
