import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: isDev ? "" : "/test", // ✅ 배포 환경에서 /test로 설정
  assetPrefix: isDev ? "" : "/test/", // ✅ 슬래시 중복 방지
  images: {
    domains: ["goldsilk.net"],
    path: isDev ? "/_next/image" : "/test/_next/image", // ✅ 이미지 경로 수정
  },
};

export default nextConfig;
