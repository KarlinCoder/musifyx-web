import type { NextConfig } from "next";

const API_URL = "https://musify.api.karlincoder.com";

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
  async rewrites() {
    return [
      {
        source: "/api/musify/:path*",
        destination: `${API_URL}/search/:path*`,
      },
    ];
  },
};

export default nextConfig;
