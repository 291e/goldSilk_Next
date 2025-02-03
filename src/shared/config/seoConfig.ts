import { DefaultSeoProps } from "next-seo";

const seoConfig: DefaultSeoProps = {
  title: "황금단 - 전통과 현대의 조화를 이루는 한복 전문 쇼핑몰",
  description:
    "칠순잔치, 돌잔치, 결혼행사, 전통한복, 퓨전한복, 맞춤한복, 돌복대여, 한복대여 등 국내직영 자체디자인 생산, 도매업체 전문상담. 황금단, 황금단본사, 칠순잔치, 돌잔치, 결혼행사, 전통한복, 퓨전한복, 맞춤한복, 돌복대여, 한복대여, 한복, 돌복, 돌한복",
  canonical: "https://goldsilk.net",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://goldsilk.net",
    site_name: "황금단",
    images: [
      {
        url: "https://goldsilk.net/images/og-image.jpg",
        width: 800,
        height: 600,
        alt: "황금단 대표 이미지",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default seoConfig;
