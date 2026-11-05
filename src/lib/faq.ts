import { policies } from "@/site.config";

export type Faq = {
  q: string;
  /** General answer, safe to publish. */
  a: string[];
  /** Policy-dependent details, filled from site.config.ts policies. */
  policy?: string[];
};

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
  a: ["Some travel well, and some are best with the studio setup. Ask when you book and I'll point you to the right one."],
};

export const prepFaq: Faq = {
  q: "How should I prepare?",
  a: [
    "Come with clean skin if you can, skip eye makeup before lash and tint appointments, and mention any prescription skincare, retinoids, allergies or recent sun exposure.",
  ],
};

export const bookingFaq: Faq = {
  q: "What if I need to cancel or reschedule?",
  a: ["Reach out as early as you can and I'll help you find a new time."],
  policy: [policies.CANCELLATION, policies.DEPOSIT, policies.PAYMENT_METHODS],
};

/** Homepage: the five questions a first-time client actually asks. */
export const homeFaqs: Faq[] = [hygieneFaq, privacyFaq, whichAtHomeFaq, prepFaq, bookingFaq];

/** Mobile page: its own spreads already cover how visits work, safety and who arrives. */
export const mobileFaqs: Faq[] = [whichAtHomeFaq, bookingFaq];
