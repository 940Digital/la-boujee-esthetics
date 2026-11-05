/**
 * Lá Boujee Esthetics: the single source of truth for every business detail.
 *
 * Anything wrapped in [SQUARE_BRACKETS] is a placeholder that has not been
 * verified with the owner yet. Replace it with the real value and the whole
 * site updates. See PLACEHOLDERS.md for the full checklist.
 *
 * Verified facts (safe to show today):
 *   - Business name: Lá Boujee Esthetics
 *   - Owner is a licensed esthetician (no license number is shown)
 *   - Services: custom facials, waxing, tinting, eyelash lifts, chemical peels
 *   - Mobile service: depending on the treatment, she travels to the client's
 *     home or the client visits her place of business
 */

export type ImageSlot = {
  /** Path under /public. Swap the placeholder SVG for a real photo here. */
  src: string;
  /** Describes the real photo that belongs in this slot. */
  alt: string;
  width: number;
  height: number;
  /** CSS aspect-ratio, kept in sync with width/height. */
  aspect: string;
};

export type ServiceSlug =
  | "facials"
  | "waxing"
  | "tinting"
  | "eyelash-lifts"
  | "chemical-peels";

/** Where a treatment happens. "unconfirmed" until the owner confirms. */
export type ServiceSetting = "unconfirmed" | "mobile" | "studio" | "both";

export type MenuItem = { name: string; price: string; note?: string };

export type Review = { quote: string; name: string; service?: string };

/* ------------------------------------------------------------------ */
/* Display flags                                                       */
/* ------------------------------------------------------------------ */

/** Turn on once real prices are filled into services[].menu. */
export const showPrices = false;

/** Turn on once real, permission-granted reviews are in `reviews`. */
export const showReviews = false;

/** Turn on once the owner confirms each line in `hygienePractices`. */
export const showHygieneDetails = false;

/** Turn on once real photos replace the gallery placeholders. */
export const showGallery = true;

/* ------------------------------------------------------------------ */
/* Business details                                                    */
/* ------------------------------------------------------------------ */

export const business = {
  name: "Lá Boujee Esthetics",
  shortName: "Lá Boujee",
  credential: "Licensed Esthetician",

  OWNER_NAME: "Laurel Porter",
  /** Owner's first name, used in friendly copy ("Book with ..."). */
  OWNER_FIRST_NAME: "Laurel",

  CITY: "[CITY]",
  STATE: "[STATE]",
  /** Areas she travels to for mobile appointments. */
  SERVICE_AREA: ["[SERVICE_AREA_1]", "[SERVICE_AREA_2]", "[SERVICE_AREA_3]"],
  /** How far she travels, e.g. "15 miles". */
  TRAVEL_RADIUS: "[TRAVEL_RADIUS]",

  PHONE: "214.893.4272",
  EMAIL: "LaBoujeeEsthetics@gmail.com",
  BOOKING_URL: "[BOOKING_URL]",
  INSTAGRAM_URL: "[INSTAGRAM_URL]",
  INSTAGRAM_HANDLE: "[INSTAGRAM_HANDLE]",
  /** Leave as a placeholder if the studio address is shared only after booking. */
  STUDIO_ADDRESS: "[STUDIO_ADDRESS]",
  /** Production domain, used for canonical URLs, sitemap, and schema. */
  SITE_URL: "https://www.example.com",
  /** Optional form endpoint (Formspree, Basin, etc). Empty hides the form. */
  CONTACT_FORM_ENDPOINT: "",

  HOURS: [
    { days: "[DAYS]", time: "[HOURS]" },
    { days: "[DAYS]", time: "[HOURS]" },
  ],

  OWNER_BIO: [
    "[OWNER_BIO_PARAGRAPH_1: how I got into esthetics, in my own words]",
    "[OWNER_BIO_PARAGRAPH_2: what I love about the work and how I treat clients]",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Policies (FAQ answers that depend on her rules)                     */
/* ------------------------------------------------------------------ */

export const policies = {
  TRAVEL_FEE: "[POLICY: travel fee, if any, and how it's calculated]",
  CANCELLATION: "[POLICY: cancellation and late-arrival terms]",
  DEPOSIT: "[POLICY: whether a deposit is required to book]",
  PAYMENT_METHODS: "[POLICY: accepted payment methods]",
  PETS_AND_KIDS: "[POLICY: guidance for pets and children during home visits]",
  MINIMUM_AGE: "[POLICY: minimum age, and whether minors need a guardian present]",
  SPACE_NEEDED: "[POLICY: space and setup I need at your home, e.g. floor area, outlet, lighting]",
} as const;

/** Specific hygiene practices. Hidden until showHygieneDetails is true. */
export const hygienePractices: string[] = [
  "[CONFIRM: fresh linens for every client]",
  "[CONFIRM: single-use applicators and spatulas]",
  "[CONFIRM: tools cleaned and disinfected between every appointment]",
  "[CONFIRM: hands washed and gloves used where the treatment calls for it]",
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Short name for tight spaces (nav, chips). */
  navName: string;
  /** Plain-language H1 for the service page. {CITY} is replaced. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** One-line benefit used on the homepage treatment menu. */
  benefit: string;
  /** The natural sentence that names service, area and offering. */
  entitySentence: string;
  intro: string[];
  goodFor: { title: string; body: string }[];
  expect: { title: string; body: string }[];
  before: string[];
  after: string[];
  related: ServiceSlug[];
  setting: ServiceSetting;
  /** Price list. Hidden until showPrices is true. */
  menu: MenuItem[];
  image: ImageSlot;
};

const priceRows = (label: string): MenuItem[] => [
  { name: `[${label} OPTION 1]`, price: "[PRICE]" },
  { name: `[${label} OPTION 2]`, price: "[PRICE]" },
  { name: `[${label} OPTION 3]`, price: "[PRICE]" },
];

export const services: Service[] = [
  {
    slug: "facials",
    name: "Custom Facials",
    navName: "Facials",
    h1: "Custom Facials in {CITY}",
    metaTitle: "Custom Facials in {CITY} | Lá Boujee Esthetics",
    metaDescription:
      "Custom facials from a licensed esthetician in {CITY}, built around your skin that day. Mobile appointments at home or visits to the studio.",
    benefit: "Built around your skin as it is today, never a one-size routine.",
    entitySentence:
      "I offer custom facials in {CITY}, at your home or in my studio.",
    intro: [
      "A custom facial starts with your skin, not a script. Cleansing, exfoliation, extractions, masks and massage are chosen for what your skin needs on the day you book.",
      "It's a treatment many people keep on a regular rhythm, because skin changes with seasons, stress and sleep.",
    ],
    goodFor: [
      { title: "Dull or tired skin", body: "A deep cleanse and gentle exfoliation help skin look brighter and feel smoother." },
      { title: "Congestion and clogged pores", body: "Targeted cleansing and careful extractions where your skin calls for them." },
      { title: "Dryness and tightness", body: "Hydrating layers and massage to leave skin soft and comfortable." },
      { title: "Upkeep between bigger treatments", body: "A steady routine that keeps skin on track between peels or special events." },
    ],
    expect: [
      { title: "A quick skin conversation", body: "Your concerns, your current routine, anything you're using that could make skin sensitive." },
      { title: "The treatment", body: "Layered steps chosen for your skin, with time to actually relax." },
      { title: "Home care notes", body: "Simple guidance on what to use, and what to skip, for the next few days." },
    ],
    before: [
      "Come with a clean face if you can, though makeup can be removed at the start.",
      "Mention any prescription skincare, retinoids, or recent sun exposure.",
    ],
    after: [
      "Skip heavy makeup for the rest of the day so skin can breathe.",
      "Wear sunscreen, and go easy on strong actives for a day or two.",
    ],
    related: ["chemical-peels", "tinting", "eyelash-lifts"],
    setting: "unconfirmed",
    menu: priceRows("FACIAL"),
    image: {
      src: "/photos/facials-cream-mask.jpg",
      alt: "Client resting with eyes closed as a cream mask is brushed on during a facial",
      width: 1200,
      height: 1500,
      aspect: "4 / 5",
    },
  },
  {
    slug: "waxing",
    name: "Waxing",
    navName: "Waxing",
    h1: "Waxing in {CITY}",
    metaTitle: "Waxing in {CITY} | Lá Boujee Esthetics",
    metaDescription:
      "Professional waxing in {CITY} from a licensed esthetician. Smooth results with a private, unhurried appointment at home or in the studio.",
    benefit: "Clean, smooth results with a calm, private appointment.",
    entitySentence:
      "I offer professional waxing in {CITY}, including home visits for clients who would rather stay in.",
    intro: [
      "Waxing removes hair from the root, so skin stays smooth longer than with shaving. A licensed esthetician works quickly and cleanly, which makes it far more comfortable.",
      "With a mobile esthetician, it can also be one of the most private appointments you book.",
    ],
    goodFor: [
      { title: "Longer-lasting smoothness", body: "Hair removed at the root grows back slower than shaved hair." },
      { title: "Shaped brows", body: "Clean lines that frame your face without over-thinning." },
      { title: "Finer regrowth over time", body: "Many people notice softer, sparser regrowth with regular waxing." },
      { title: "A private setting", body: "Book at home if you'd feel more comfortable in your own space." },
    ],
    expect: [
      { title: "Skin prep", body: "The area is cleansed so wax grips hair, not skin." },
      { title: "Quick, careful work", body: "Small sections, steady hands, and skin held taut to keep it comfortable." },
      { title: "Soothing finish", body: "A calming product to settle skin, and notes on ingrown prevention." },
    ],
    before: [
      "Let hair grow to roughly a quarter inch, about two to three weeks after shaving.",
      "Skip exfoliating and retinoids on the area for a few days beforehand.",
    ],
    after: [
      "Avoid hot baths, saunas and workouts for about a day.",
      "Start gentle exfoliation after a couple of days to help prevent ingrown hairs.",
    ],
    related: ["tinting", "facials", "eyelash-lifts"],
    setting: "unconfirmed",
    menu: priceRows("WAXING"),
    image: {
      src: "/photos/waxing-warm-wax.jpg",
      alt: "A ribbon of warm wax falling from an applicator",
      width: 1200,
      height: 1500,
      aspect: "4 / 5",
    },
  },
  {
    slug: "tinting",
    name: "Tinting",
    navName: "Tinting",
    h1: "Brow and Lash Tinting in {CITY}",
    metaTitle: "Brow and Lash Tinting in {CITY} | Lá Boujee Esthetics",
    metaDescription:
      "Brow and lash tinting in {CITY} from a licensed esthetician. Defined, polished color so you can skip the pencil and mascara.",
    benefit: "Defined brows and lashes that look finished without makeup.",
    entitySentence:
      "I offer brow and lash tinting in {CITY}.",
    intro: [
      "Tinting adds semi-permanent color to brows or lashes, so fine or light hairs show up and your face looks put together before any makeup.",
      "It's quick, and it's the easiest add-on to pair with a lash lift or a brow wax.",
    ],
    goodFor: [
      { title: "Light or fine hairs", body: "Color makes every hair visible, so brows and lashes read fuller." },
      { title: "Busy mornings", body: "Less pencil, less mascara, less time in the mirror." },
      { title: "Vacations and events", body: "Polished in photos, at the pool, and through a long day." },
      { title: "Pairing with a lift", body: "Lifted and tinted lashes are a classic combination." },
    ],
    expect: [
      { title: "Shade matching", body: "A color chosen to suit your hair and skin tone." },
      { title: "Careful application", body: "Skin is protected around the area while the tint develops." },
      { title: "A clean finish", body: "Excess tint removed so the result looks natural and even." },
    ],
    before: [
      "Come without eye makeup if you're having lashes tinted.",
      "Let me know about any sensitivity to hair dye. A patch test may be recommended.",
    ],
    after: [
      "Keep the area dry and avoid oil-based cleansers for about a day.",
      "Expect color to soften gradually over the following weeks.",
    ],
    related: ["eyelash-lifts", "waxing", "facials"],
    setting: "unconfirmed",
    menu: priceRows("TINTING"),
    image: {
      src: "/photos/tinting-brow-close-up.jpg",
      alt: "Black and white close-up of a woman with defined brows, full lashes and dark lips",
      width: 1200,
      height: 1500,
      aspect: "4 / 5",
    },
  },
  {
    slug: "eyelash-lifts",
    name: "Eyelash Lifts",
    navName: "Eyelash Lifts",
    h1: "Eyelash Lifts in {CITY}",
    metaTitle: "Eyelash Lifts in {CITY} | Lá Boujee Esthetics",
    metaDescription:
      "Eyelash lifts in {CITY} from a licensed esthetician. A lasting curl from your own natural lashes, with mobile or studio appointments.",
    benefit: "A lasting curl from your own lashes, no extensions to maintain.",
    entitySentence:
      "I offer eyelash lifts in {CITY}, at your home or in my studio.",
    intro: [
      "A lash lift curls your natural lashes from the base, so they look longer and more open without extensions, glue or fills.",
      "Most clients pair it with a lash tint for even more definition.",
    ],
    goodFor: [
      { title: "Straight or downward lashes", body: "Lifts lashes up and away from the eye." },
      { title: "Low-maintenance beauty", body: "No curler in the morning and no extension fills." },
      { title: "A natural look", body: "Your own lashes, just lifted and opened." },
      { title: "Pairing with a tint", body: "Lift and tint together for definition that lasts." },
    ],
    expect: [
      { title: "Settle in", body: "You'll rest with eyes closed for most of the appointment." },
      { title: "Lift and set", body: "Lashes are shaped over a soft shield and set in place." },
      { title: "Nourish", body: "A conditioning step to finish, with care notes for the next day or two." },
    ],
    before: [
      "Remove contact lenses and come without eye makeup.",
      "Skip the lash curler and waterproof mascara the day before.",
    ],
    after: [
      "Keep lashes dry and avoid steam for about a day.",
      "Skip oil-based products around the eyes while the lift settles.",
    ],
    related: ["tinting", "facials", "waxing"],
    setting: "unconfirmed",
    menu: priceRows("LASH LIFT"),
    image: {
      src: "/photos/lash-lift-curled-lashes.jpg",
      alt: "Close-up of long, curled natural lashes framing a hazel eye",
      width: 1200,
      height: 1500,
      aspect: "4 / 5",
    },
  },
  {
    slug: "chemical-peels",
    name: "Chemical Peels",
    navName: "Chemical Peels",
    h1: "Chemical Peels in {CITY}",
    metaTitle: "Chemical Peels in {CITY} | Lá Boujee Esthetics",
    metaDescription:
      "Chemical peels in {CITY} from a licensed esthetician. Refresh tone and texture with a peel chosen for your skin and your schedule.",
    benefit: "Fresher tone and smoother texture, chosen for your skin.",
    entitySentence:
      "I offer chemical peels in {CITY}, each one chosen to suit your skin and your schedule.",
    intro: [
      "A chemical peel uses a carefully applied exfoliating solution to lift away dull surface cells, so newer skin shows through.",
      "Esthetician-level peels are designed for refreshing tone and texture, with little to no downtime for most people.",
    ],
    goodFor: [
      { title: "Uneven tone", body: "Helps soften the look of dull or uneven areas over a series." },
      { title: "Rough texture", body: "Leaves skin feeling smoother and more even." },
      { title: "Congestion", body: "Can help keep pores clearer as part of a routine." },
      { title: "A glow before an event", body: "Planned with enough lead time for skin to settle." },
    ],
    expect: [
      { title: "A careful skin review", body: "Your history, sensitivities and any current treatments come first." },
      { title: "Timed application", body: "The peel is applied and watched closely, then neutralized or removed." },
      { title: "Aftercare plan", body: "Clear instructions for the days after, because that's where results show up." },
    ],
    before: [
      "Pause retinoids and strong exfoliants for several days, or as advised.",
      "Avoid significant sun exposure, and mention any recent waxing near the face.",
    ],
    after: [
      "Daily sunscreen is essential while skin renews.",
      "Let any flaking happen on its own. Don't pick or scrub.",
    ],
    related: ["facials", "waxing", "tinting"],
    setting: "unconfirmed",
    menu: priceRows("PEEL"),
    image: {
      src: "/photos/chemical-peel-skincare-ritual.jpg",
      alt: "Hand reaching for an open jar of cream beside a small serum bottle, leaves casting soft shadows",
      width: 1200,
      height: 1500,
      aspect: "4 / 5",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Images (every non-service image slot lives here)                    */
/* ------------------------------------------------------------------ */

export const images = {
  /** Option 2 cover. Full 4:5 frame of the finger-waves portrait. */
  cover: {
    src: "/photos/cover-finger-waves.jpg",
    alt: "Woman with sculpted vintage finger waves, soft matte lips and a tulle collar",
    width: 1600,
    height: 2000,
    aspect: "4 / 5",
  },
  ownerPortrait: {
    src: "/placeholders/owner-portrait.svg",
    alt: "Portrait of Laurel Porter, licensed esthetician and owner of Lá Boujee Esthetics",
    width: 1200,
    height: 1500,
    aspect: "4 / 5",
  },
  comeToYou: {
    src: "/photos/come-to-you-vanity.jpg",
    alt: "A vintage dressing table with a tilting mirror, a folding fan and a sconce in a papered bedroom",
    width: 1500,
    height: 1000,
    aspect: "3 / 2",
  },
  studio: {
    src: "/photos/studio-still-life.jpg",
    alt: "A rolled towel, a plain pump bottle, a lit tea light and pink tulips on a white table",
    width: 1500,
    height: 1000,
    aspect: "3 / 2",
  },
  gallery: [
    {
      src: "/photos/gallery-opera-gloves.jpg",
      alt: "Woman in long black opera gloves and a satin gown, framing her face with her hands",
      width: 1400,
      height: 1400,
      aspect: "1 / 1",
    },
    {
      src: "/photos/gallery-wide-brim-hat.jpg",
      alt: "Bare-shouldered woman in a wide-brim black hat against a black backdrop",
      width: 1000,
      height: 1000,
      aspect: "1 / 1",
    },
    {
      src: "/photos/gallery-polka-dot.jpg",
      alt: "Woman in a polka-dot dress with pinned vintage curls, seated on a classic car",
      width: 1000,
      height: 1000,
      aspect: "1 / 1",
    },
    {
      src: "/photos/gallery-off-shoulder-gown.jpg",
      alt: "Woman in an off-shoulder gown against a dark studio backdrop, hand resting at her shoulder",
      width: 1000,
      height: 1000,
      aspect: "1 / 1",
    },
    {
      src: "/photos/gallery-winged-profile.jpg",
      alt: "Profile of a woman with a sleek updo, a classic winged liner and a bare shoulder",
      width: 1000,
      height: 1000,
      aspect: "1 / 1",
    },
  ],
} satisfies Record<string, ImageSlot | ImageSlot[]>;

/* ------------------------------------------------------------------ */
/* Reviews (hidden until showReviews is true)                          */
/* ------------------------------------------------------------------ */

export const reviews: Review[] = [
  { quote: "[REVIEW_TEXT_1: real client words, with permission]", name: "[CLIENT_NAME_1]", service: "[SERVICE]" },
  { quote: "[REVIEW_TEXT_2: real client words, with permission]", name: "[CLIENT_NAME_2]", service: "[SERVICE]" },
  { quote: "[REVIEW_TEXT_3: real client words, with permission]", name: "[CLIENT_NAME_3]", service: "[SERVICE]" },
];
