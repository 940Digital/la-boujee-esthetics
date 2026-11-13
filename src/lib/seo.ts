import type { Metadata } from "next";
import { business } from "@/site.config";

const ogImage = { url: "/og.png", width: 1200, height: 630, alt: "Lá Boujee Esthetics logo" };

/**
 * Full metadata for one page. Next merges metadata shallowly, so a page's
 * openGraph replaces the layout's: every page gets the complete set here.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: business.name,
      locale: "en_US",
      title,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}
