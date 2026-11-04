import type { Metadata } from "next";
import { business } from "@/site.config";
import { HomeHero } from "@/components/home/HomeHero";
import { AboutCondensed } from "@/components/home/AboutCondensed";
import { PlaceOrMine } from "@/components/home/PlaceOrMine";
import { TreatmentMenu } from "@/components/home/TreatmentMenu";
import { Ritual } from "@/components/home/Ritual";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Reviews } from "@/components/Reviews";
import { FaqSection } from "@/components/FaqSection";
import { CtaBand } from "@/components/CtaBand";
import { homeFaqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: `Custom Facials, Waxing and Lash Lifts in ${business.CITY} | La' Boujee Esthetics`,
  description: `Licensed mobile esthetician in ${business.CITY}. Custom facials, waxing, brow and lash tinting, eyelash lifts and chemical peels at your home or in the studio.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutCondensed />
      <PlaceOrMine />
      <TreatmentMenu />
      <Ritual />
      <Reviews tone="wine" />
      <GalleryPreview />
      <FaqSection faqs={homeFaqs} />
      <CtaBand />
    </>
  );
}
