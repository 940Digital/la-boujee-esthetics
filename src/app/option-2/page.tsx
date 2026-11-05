import type { Metadata } from "next";
import { business } from "@/site.config";
import { CoverV2 } from "@/components/v2/CoverV2";
import { ActsV2, CloseUpV2, LookbookV2, PlaceOrMineV2, ProfileV2, QandAV2 } from "@/components/v2/SpreadsV2";
import { ContactSheetV2 } from "@/components/v2/ContactSheetV2";
import { homeFaqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: `Option 2 | Custom Facials, Waxing and Lash Lifts in ${business.CITY} | Lá Boujee Esthetics`,
  description: `Design option 2 for Lá Boujee Esthetics: a licensed mobile esthetician in ${business.CITY}.`,
  alternates: { canonical: "/" },
};

/*
  Option 2: Hollywood editorial. Same facts, palette and logo as Option 1,
  laid out like a 1940s and 50s fashion magazine: cover, profile, spreads,
  a lookbook, a contact sheet and an interview-style Q&A.
*/
export default function OptionTwoPage() {
  return (
    <>
      <CoverV2 />
      <ProfileV2 />
      <PlaceOrMineV2 />
      <LookbookV2 />
      <ActsV2 />
      <ContactSheetV2 />
      <QandAV2 faqs={homeFaqs} />
      <CloseUpV2 />
    </>
  );
}
