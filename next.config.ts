import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.226.11.160"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stitchesafricamedia.blob.core.windows.net",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://20.237.62.221:8080/:path*",
      },
    ];
  },
};

export default nextConfig;