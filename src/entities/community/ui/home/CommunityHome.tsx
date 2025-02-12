"use client";

import CommunityCategoryList from "./CommunityCategoryList";
import CommunityPostList from "./CommunityPostList";
import { ReviewSlider } from "@/widgets/mainPage";

export default function CommunityHome() {
  return (
    <div className="container mx-auto px-6 py-8">
      <CommunityCategoryList />
      <CommunityPostList />
      <section className="mb-8">
        <ReviewSlider />
      </section>
    </div>
  );
}
