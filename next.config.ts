import type { NextConfig } from "next";

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

export default nextConfig;
