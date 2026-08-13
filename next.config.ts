import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
