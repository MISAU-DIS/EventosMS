import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/css",

  // assetPrefix: './', // ⛔ REMOVER ESTA LINHA

  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  poweredByHeader: false,
  compress: true,
  /* config options here */
  // basePath: '/app',
  // output: 'export',
  // assetPrefix: './',
  // trailingSlash: true,
  // basePath: '/css',
};

export default nextConfig;
