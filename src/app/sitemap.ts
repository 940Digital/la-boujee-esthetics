import type { MetadataRoute } from "next";
import { business, linkServicePages, services } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.SITE_URL;
  const servicePaths = linkServicePages ? services.map((s) => `/${s.slug}`) : [];
  const paths = ["", ...servicePaths, "/mobile-service", "/about", "/book", "/contact"];
  return paths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : services.some((s) => `/${s.slug}` === p) ? 0.9 : 0.7,
  }));
}
