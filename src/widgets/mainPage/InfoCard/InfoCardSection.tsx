"use client";

import React from "react";
import { InfoCard } from "./InfoCard";
import {
  main_infoCrad01,
  main_infoCrad02,
  main_infoCrad03,
} from "@/shared/assets/mainPage";
const cardData = [
  {
    title: "이벤트&프로모션",
    image: { src: main_infoCrad01, alt: "카드 1 이미지" },
    description: "황금단 이벤트 및 프로모션 안내입니다.",
    link: "/Community/events",
  },
  {
    title: "상품 문의",
    image: { src: main_infoCrad02, alt: "카드 2 이미지" },
    description: "궁금하신 사항은 언제든지 문의해주세요.",
    link: "/Community/inquiries",
  },
  {
    title: "고객 후기",
    image: { src: main_infoCrad03, alt: "카드 3 이미지" },
    description: "고객님들의 후기 게시판입니다.",
    link: "/reviewCommunity",
  },
];

export const InfoCardSection = () => {
  return (
    <section className="grid grid-cols-3 gap-2 sm:gap-6 my-6">
      {cardData.map((card) => (
        <InfoCard
          key={card.title}
          image={card.image}
          title={card.title}
          description={card.description}
          link={card.link}
        />
      ))}
    </section>
  );
};
