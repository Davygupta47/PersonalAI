
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.0.105/dashboard",
  ],
  images:{
    domains: ["images.amazon.com"],
  },
};

export default nextConfig;
