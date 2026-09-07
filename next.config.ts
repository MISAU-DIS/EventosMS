import { randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const revision =
  spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout.trim() ||
  randomUUID();

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
  async redirects() {
    return [
      {
        source: "/programa",
        destination: "/agenda",
        permanent: false,
      },
    ];
  },
};

export default withSerwist(nextConfig);
