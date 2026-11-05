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
  a: [
    "Yes. As a licensed esthetician, I'm trained in sanitation and infection control, and those standards travel with me. The same care goes into a home visit as a studio appointment.",
    "If you have a question about how a specific treatment is handled, ask before you book.",
  ],
};

export const mobileFaq: Faq = {
  q: "How do mobile appointments work?",
  a: [
    "You book your treatment and share your address. I arrive at your appointment time with what the treatment needs, set up in the room you choose, and pack everything away when we're done.",
  ],
  policy: [policies.SPACE_NEEDED, policies.TRAVEL_FEE],
};

export const whichAtHomeFaq: Faq = {
  q: "Which treatments can be done at home?",
  a: [
    "It depends on the treatment. Some travel well, and some are best with the studio setup. Ask when you book and I'll point you to the right setting.",
  ],
};

export const prepFaq: Faq = {
  q: "How should I prepare?",
  a: [
    "Come with clean skin if you can, skip eye makeup before lash and tint appointments, and mention any prescription skincare, retinoids, allergies or recent sun exposure.",
    "Each treatment page has its own prep notes.",
  ],
};

export const expectFaq: Faq = {
  q: "What should I expect at my first appointment?",
  a: [
    "A short conversation about your skin, your goals, and anything that could affect the treatment. Then the treatment itself, and aftercare notes before you go.",
  ],
};

export const aftercareFaq: Faq = {
  q: "What about aftercare?",
  a: [
    "Aftercare depends on the treatment, and you'll get notes for yours. In general: wear sunscreen, go easy on strong actives for a day or two, and keep freshly lifted or tinted lashes dry for about a day.",
  ],
};

export const privacyFaq: Faq = {
  q: "Who comes to my home?",
  a: [
    "Me. Lá Boujee Esthetics is a solo practice, so the licensed esthetician you book is the one who arrives. It's your space, and you choose the room.",
  ],
  policy: [policies.PETS_AND_KIDS],
};

export const bookingFaq: Faq = {
  q: "What if I need to cancel or reschedule?",
  a: ["Life happens. Reach out as early as you can and I'll help you find a new time."],
  policy: [policies.CANCELLATION, policies.DEPOSIT, policies.PAYMENT_METHODS],
};

export const homeFaqs: Faq[] = [
  hygieneFaq,
  mobileFaq,
  whichAtHomeFaq,
  prepFaq,
  expectFaq,
  aftercareFaq,
  privacyFaq,
  bookingFaq,
];

export const mobileFaqs: Faq[] = [mobileFaq, whichAtHomeFaq, hygieneFaq, privacyFaq, bookingFaq];
