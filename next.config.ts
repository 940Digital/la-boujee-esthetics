import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    // AVIF is roughly 20-30% smaller than WebP for these photos; WebP stays as fallback.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    // Photos only change when the file name changes, so cache optimized copies for a year.
    minimumCacheTTL: 31536000,
  },
  // The editorial design was previewed at /option-2 before it became the site.
  async redirects() {
    return [{ source: "/option-2", destination: "/", permanent: true }];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
