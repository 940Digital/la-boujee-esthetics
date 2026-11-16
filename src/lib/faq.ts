import { business, policies } from "@/site.config";
import { fullAddress } from "./site";

export type Faq = {
  q: string;
  /** General answer, safe to publish. */
  a: string[];
  /** Policy-dependent details from site.config.ts. Hidden while still a [PLACEHOLDER]. */
  policy?: string[];
};

const joinList = (items: string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export const hygieneFaq: Faq = {
  q: "Is it hygienic to have a treatment at home?",
  a: ["Yes. As a licensed esthetician, I'm trained in sanitation and infection control, and those standards come with me to every home visit."],
};

export const privacyFaq: Faq = {
  q: "Who comes to my home?",
  a: ["Me. It's a solo practice, so the person you book is the person who arrives. It's your space, and you choose the room."],
  policy: [policies.PETS_AND_KIDS],
};

export const whichAtHomeFaq: Faq = {
  q: "Which treatments can be done at home?",
  a: [
    "Custom facials, chemical peels, acne treatments, skin care consultations and makeup can all be done at your home.",
    "Waxing, lash lifts, lash and brow tinting and brow lamination are done in my studio.",
  ],
};

export const travelFaq: Faq = {
  q: "Is there a travel fee for home visits?",
  a: [
    `No. I travel to ${business.SERVICE_AREA.length} towns, including ${joinList(
      business.SERVICE_AREA.filter((t) => ["Denton", "Corinth", "Lewisville", "Flower Mound"].includes(t)),
    )}.`,
  ],
};

export const studioFaq: Faq = {
  q: "Where is your studio?",
  a: [`${business.LOCATION_NOTE}, at ${fullAddress()}.`],
};

export const prepFaq: Faq = {
  q: "How should I prepare?",
  a: [
    "Come with clean skin if you can, skip eye makeup before lash and tint appointments, and mention any prescription skincare, retinoids, allergies or recent sun exposure.",
  ],
};

export const bookingFaq: Faq = {
  q: "What if I need to cancel or reschedule?",
  a: ["Call or text me as early as you can, and I'll help you find a new time."],
  policy: [policies.CANCELLATION, policies.DEPOSIT],
};

/** Homepage: the three things a first-time client asks first. */
export const homeFaqs: Faq[] = [whichAtHomeFaq, travelFaq, studioFaq];

/** Book and Contact page. */
export const bookFaqs: Faq[] = [prepFaq, bookingFaq, whichAtHomeFaq, hygieneFaq, privacyFaq];
