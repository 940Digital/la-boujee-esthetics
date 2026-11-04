import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Josefin_Sans, Poiret_One } from "next/font/google";
import "./globals.css";
import { business, services } from "@/site.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBookBar } from "@/components/MobileBookBar";
import { MotionProvider } from "@/components/motion";
import { JsonLd } from "@/components/JsonLd";
import { bookingHref, isPlaceholder } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-josefin",
  display: "swap",
});

const poiret = Poiret_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poiret",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.SITE_URL),
  title: {
    default: `Custom Facials, Waxing and Lash Lifts in ${business.CITY} | La' Boujee Esthetics`,
    template: "%s",
  },
  description: `La' Boujee Esthetics: a licensed, mobile esthetician in ${business.CITY} offering custom facials, waxing, tinting, eyelash lifts and chemical peels at your home or in the studio.`,
  applicationName: business.name,
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "La' Boujee Esthetics, licensed esthetician" }],
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
    <html lang="en" className={`${cormorant.variable} ${josefin.variable} ${poiret.variable}`}>
      <body>
        <JsonLd data={businessSchema()} />
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileBookBar />
        </MotionProvider>
      </body>
    </html>
  );
}
