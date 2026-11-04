import type { MetadataRoute } from "next";
import { business, services } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.SITE_URL;
  const paths = ["", ...services.map((s) => `/${s.slug}`), "/mobile-service", "/about", "/book", "/contact"];
  return paths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : services.some((s) => `/${s.slug}` === p) ? 0.9 : 0.7,
  }));
}
