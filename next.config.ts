import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: isDev ? "" : "/test", // ✅ dev에서는 루트, prod에서는 /test
  assetPrefix: isDev ? "" : "/test/", // ✅ 정적 파일 경로 설정
  images: {
    domains: ["goldsilk.net"], // ✅ 이미지 도메인 설정
  },
  env: {
    CUSTOM_API_URL: isDev
      ? "http://localhost:3000/api" // ✅ 개발용 API 주소
      : "https://goldsilk.net/api", // ✅ 프로덕션용 API 주소
  },
};

export default nextConfig;
