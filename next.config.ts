import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";
import { getBuildRevision } from "@/lib/build-revision";

const revision = getBuildRevision();

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: false,
  disable: process.env.NODE_ENV === "development",
  additionalPrecacheEntries: [{ url: "/~offline", revision }],
  globPublicPatterns: [
    "icons/*.{png,svg}",
    "Emblem_of_Mozambique.svg",
    "favicon.ico",
  ],
});

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    proxyClientMaxBodySize: "100mb",
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default withSerwist(nextConfig);
