import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
