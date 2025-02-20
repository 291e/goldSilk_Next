import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["goldsilk.net"],
  },
};

export default nextConfig;
