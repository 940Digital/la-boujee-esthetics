import type { MetadataRoute } from "next";
import { business } from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${business.SITE_URL}/sitemap.xml`,
  };
}
