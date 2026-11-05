import type { Metadata } from "next";
import { business } from "@/site.config";
import { Cover } from "@/components/editorial/Cover";
import { Acts, CloseUp, Lookbook, HomeOrStudio, Profile, QandA } from "@/components/editorial/Spreads";
import { ContactSheet } from "@/components/editorial/ContactSheet";
import { homeFaqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: `Custom Facials, Waxing and Lash Lifts in ${business.CITY} | Lá Boujee Esthetics`,
  description: `Licensed mobile esthetician in ${business.CITY}. Custom facials, waxing, brow and lash tinting, eyelash lifts and chemical peels at your home or in the studio.`,
  alternates: { canonical: "/" },
};

/*
  Homepage, laid out like a 1940s and 50s Hollywood fashion magazine:
  cover, profile, spreads, a lookbook, a contact sheet and an interview-style Q&A.
*/
export default function HomePage() {
  return (
    <>
      <Cover />
      <Profile />
      <HomeOrStudio />
      <Lookbook />
      <Acts />
      <ContactSheet />
      <QandA faqs={homeFaqs} />
      <CloseUp />
    </>
  );
}
