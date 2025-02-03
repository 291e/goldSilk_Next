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
  title: "Create Next App",
  description: "Generated by create next app",
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
          <main className="min-h-screen py-20">{children}</main>
          <Footer />
        </Providers>{" "}
        {/* Redux Provider 적용 */}
      </body>
    </html>
  );
}
