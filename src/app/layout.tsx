import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { business, services } from "@/site.config";
import { MotionProvider } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";
import { bookingHref, isPlaceholder } from "@/lib/site";
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
  weight: ["300", "400", "600"],
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.SITE_URL),
  title: {
    default: `Custom Facials, Waxing and Lash Lifts in ${business.CITY} | Lá Boujee Esthetics`,
    template: "%s",
  },
  description: `Lá Boujee Esthetics: a licensed, mobile esthetician in ${business.CITY} offering custom facials, waxing, tinting, eyelash lifts and chemical peels at your home or in the studio.`,
  applicationName: business.name,
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Lá Boujee Esthetics, licensed esthetician" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

function businessSchema() {
  const url = business.SITE_URL;
  const has = (v: string) => !isPlaceholder(v);
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${url}/#business`,
    name: business.name,
    url,
    image: `${url}/og.png`,
    description: `Licensed esthetician offering custom facials, waxing, tinting, eyelash lifts and chemical peels, at clients' homes or in the studio depending on the treatment.`,
    telephone: business.PHONE,
    email: business.EMAIL,
    founder: { "@type": "Person", name: business.OWNER_NAME, jobTitle: "Licensed Esthetician" },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.STUDIO_ADDRESS,
      addressLocality: business.CITY,
      addressRegion: business.STATE,
      addressCountry: "US",
    },
    areaServed: business.SERVICE_AREA.map((name) => ({ "@type": "City", name })),
    sameAs: [business.INSTAGRAM_URL],
    potentialAction: {
      "@type": "ReserveAction",
      target: has(business.BOOKING_URL) ? business.BOOKING_URL : `${url}${bookingHref()}`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Esthetics treatments",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${url}/${s.slug}`,
          areaServed: business.SERVICE_AREA,
        },
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
