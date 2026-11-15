import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // News Lens (a static page in public/news) answers at /news and /news/
  async rewrites() {
    return [
      { source: "/news", destination: "/news/index.html" },
      { source: "/news/", destination: "/news/index.html" },
    ];
  },
};

export default nextConfig;