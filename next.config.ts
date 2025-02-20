import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["goldsilk.net"],
  },
  basePath: "", // ✅ basePath를 비워둠 (불필요한 `/` 제거)
  trailingSlash: false, // ✅ 자동으로 경로 끝에 `/` 붙지 않게 설정
};

export default nextConfig;
