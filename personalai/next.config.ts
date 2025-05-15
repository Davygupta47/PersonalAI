import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.0.105/dashboard",
  ],
};

export default nextConfig;
