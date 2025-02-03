import { BannerSlide } from "@/entities/main";
import {
  main_banner01,
  main_banner02,
  main_banner03,
} from "@/shared/assets/mainPage";

const banners = [
  {
    id: "1",
    image: { src: main_banner01, alt: "배너 1 이미지" },
    title: "배너 1",
    link: "https://goldsilk.net/event1",
  },
  {
    id: "2",
    image: { src: main_banner02, alt: "배너 2 이미지" },
    title: "배너 2",
    link: "https://goldsilk.net/event2",
  },
  {
    id: "3",
    image: { src: main_banner03, alt: "배너 3 이미지" },
    title: "배너 3",
    link: "https://goldsilk.net/event3",
  },
];

export const BannerCarousel = () => {
  return (
    <div className="">
      <BannerSlide banners={banners} />
    </div>
  );
};
