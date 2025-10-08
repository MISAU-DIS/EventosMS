import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // basePath: '/app',
  output: 'export',
  assetPrefix: '/css/',
  trailingSlash: true,
  basePath: '/css',
};

export default nextConfig;
