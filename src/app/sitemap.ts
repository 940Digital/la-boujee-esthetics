import type { MetadataRoute } from "next";
import { business, linkServicePages, onePage, services } from "@/site.config";
import { servicePath } from "@/lib/site";

/** The eight pages. Redirected routes (/chemical-peels, /tinting, /eyelash-lifts, /contact) are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.SITE_URL;
  const servicePaths = linkServicePages ? services.map((s) => servicePath(s.slug)) : [];
  const paths = onePage ? [""] : ["", "/services", ...servicePaths, "/mobile-service", "/about", "/book"];
  return paths.map((p) => ({
    url: `${base}${p || "/"}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p === "/services" || servicePaths.includes(p) ? 0.9 : 0.7,
  }));
}
