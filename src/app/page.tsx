import { Cover } from "@/components/editorial/Cover";
import { Acts, CloseUp, Lookbook, HomeOrStudio, Profile, QandA } from "@/components/editorial/Spreads";
import { ContactSheet } from "@/components/editorial/ContactSheet";
import { homeFaqs } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";
import { showGallery } from "@/site.config";

export const metadata = pageMetadata({
  title: "Esthetician in Denton, TX | Lá Boujee Esthetics",
  description:
    "Licensed esthetician in Denton, TX. Facials, peels, waxing, lash lifts and makeup in a Denton studio or at your home across Denton County, no travel fee.",
  path: "/",
});

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
      {showGallery ? <ContactSheet /> : null}
      <QandA faqs={homeFaqs} />
      <CloseUp />
    </>
  );
}
