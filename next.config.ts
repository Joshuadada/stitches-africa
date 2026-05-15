import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.226.11.160"],

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://4.255.4.79:8080/:path*",
      },
    ];
  },
};

export default nextConfig;
