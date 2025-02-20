import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: isDev ? "" : "/", // ✅ 배포 환경에서 /test로 설정
  images: {
    domains: ["goldsilk.net"],
  },
};

export default nextConfig;
