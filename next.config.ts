import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
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
