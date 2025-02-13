import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "@/shared/ui/globals.css";
import Providers from "@/shared/lib/providers";
import { Header, Footer, Remote } from "@/widgets/layOut";
import { DefaultSeo } from "next-seo";
import seoConfig from "@/shared/config/seoConfig";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "황금단 - 전통과 현대의 조화를 이루는 한복 전문 쇼핑몰",
  description:
    "칠순잔치, 돌잔치, 결혼행사, 전통한복, 퓨전한복, 맞춤한복, 돌복대여, 한복대여 등 국내직영 자체디자인 생산, 도매업체 전문상담. 황금단, 황금단본사, 칠순잔치, 돌잔치, 결혼행사, 전통한복, 퓨전한복, 맞춤한복, 돌복대여, 한복대여, 한복, 돌복, 돌한복",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://goldsilk.net",
    siteName: "황금단",
    images: [
      {
        url: "https://goldsilk.net/images/logo.jpg",
        width: 800,
        height: 600,
        alt: "황금단 대표 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* <head>
        <DefaultSeo {...seoConfig} />
      </head> */}
      <body>
        <Providers>
          <Header />
          <Remote />
          <main className="min-h-screen py-20 md:py-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
