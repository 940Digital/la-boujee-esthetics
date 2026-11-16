import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { business, linkServicePages, priceMenu } from "@/site.config";
import { MotionProvider } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";
import { bookingHref, isPlaceholder, priceRange } from "@/lib/site";
import { SiteHeader } from "@/components/editorial/SiteHeader";
import { SiteFooter } from "@/components/editorial/SiteFooter";
import { MobileBookBar } from "@/components/MobileBookBar";

/* Bodoni: the high-contrast Didone of 1940s and 50s fashion magazines. */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.SITE_URL),
  title: {
    default: `Esthetician in ${business.CITY}, ${business.STATE} | ${business.name}`,
    template: "%s",
  },
  description: `${business.name}: a licensed esthetician in ${business.CITY}, TX, with a studio and home visits across Denton County.`,
  applicationName: business.name,
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Lá Boujee Esthetics logo" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

/** Site-wide business schema. Every value comes from site.config.ts; placeholders are left out. */
function businessSchema() {
  const url = business.SITE_URL;
  const digits = business.PHONE.replace(/\D/g, "");
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${url}/#business`,
    name: business.name,
    url,
    image: `${url}/og.png`,
    description: `Licensed esthetician in ${business.CITY}, TX offering facials, chemical peels, waxing, lash lifts, tinting and makeup, in the studio or at clients' homes.`,
    telephone: `+1-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`,
    email: business.EMAIL,
    address: {
      "@type": "PostalAddress",
      ...(isPlaceholder(business.STUDIO_ADDRESS) ? {} : { streetAddress: business.STUDIO_ADDRESS }),
      addressLocality: business.CITY,
      addressRegion: business.STATE,
      postalCode: business.POSTAL_CODE,
      addressCountry: "US",
    },
    areaServed: business.SERVICE_AREA.map((name) => ({ "@type": "City", name: `${name}, ${business.STATE}` })),
    // Days only for now. Once her times are known, switch to
    // openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: [...], opens: "09:00", closes: "17:00" }.
    openingHours: "Mo-Sa",
    paymentAccepted: "Cash, Venmo, Zelle, Visa, Mastercard",
    priceRange: priceRange(),
    founder: { "@type": "Person", name: business.OWNER_NAME, jobTitle: "Licensed Esthetician" },
    ...(isPlaceholder(business.INSTAGRAM_URL) ? {} : { sameAs: [business.INSTAGRAM_URL] }),
    potentialAction: {
      "@type": "ReserveAction",
      target: isPlaceholder(business.BOOKING_URL) ? `${url}${bookingHref()}` : business.BOOKING_URL,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services and prices",
      itemListElement: priceMenu.map((g) => ({
        "@type": "OfferCatalog",
        name: g.title,
        itemListElement: g.items.map((i) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: i.name,
            ...(linkServicePages ? { url: `${url}/${g.service}` } : {}),
          },
          ...(i.price === null ? {} : { price: String(i.price), priceCurrency: "USD" }),
        })),
      })),
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${josefin.variable}`}>
      <body>
        <JsonLd data={businessSchema()} />
        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <MobileBookBar />
        </MotionProvider>
      </body>
    </html>
  );
}
