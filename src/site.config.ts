/**
 * Lá Boujee Esthetics: the single source of truth for every business detail.
 *
 * Anything wrapped in [SQUARE_BRACKETS] is a placeholder that has not been
 * verified with the owner yet. Placeholders never render: any line or section
 * whose value is still in brackets is hidden (see isPlaceholder in
 * src/lib/site.ts). Replace it with the real value and the whole site updates.
 * See PLACEHOLDERS.md for the full checklist.
 *
 * Verified facts (from the owner, safe to show):
 *   - Owner: Laurel Porter, licensed esthetician in the State of Texas, insured, solo practice
 *   - Studio: 1100 Dallas Dr, Denton, TX 76205, inside Burgess Chiropractic Office
 *   - Available Monday through Saturday (times not given yet)
 *   - Home visits to 15 towns, no travel fee
 *   - Where each treatment happens (see services[].offerings)
 *   - The price menu (priceMenu below)
 *   - 24-hour cancellation; cash, Venmo, Zelle, Visa and Mastercard through Square
 */

export type ImageSlot = {
  /** Path under /public. */
  src: string;
  /** Describes what the photo actually shows. Stock photos are never described as Laurel or her work. */
  alt: string;
  width: number;
  height: number;
  /** CSS aspect-ratio, kept in sync with width/height. */
  aspect: string;
};

export type ServiceSlug = "facials" | "waxing" | "brows-and-lashes";

/** Where a treatment happens. */
export type ServiceSetting = "mobile" | "studio" | "both";

export type MenuItem = {
  name: string;
  /** Price in US dollars. null = not on the menu yet, shown as "Ask for pricing". */
  price: number | null;
  note?: string;
};

export type PriceGroup = {
  title: string;
  /** The detail page this group belongs to. */
  service: ServiceSlug;
  setting: ServiceSetting;
  items: MenuItem[];
};

export type Review = { quote: string; name: string; service?: string };

/* ------------------------------------------------------------------ */
/* Display flags                                                       */
/* ------------------------------------------------------------------ */

/** Real prices are in priceMenu. */
export const showPrices = true;

/** Turn on once real, permission-granted reviews are in `reviews`. */
export const showReviews = false;

/** Turn on once the owner confirms each line in `hygienePractices`. */
export const showHygieneDetails = false;

/** Link to the treatment pages (/facials, /waxing, /brows-and-lashes). */
export const linkServicePages = true;

/** false = the full multi-page site. true would collapse every link to homepage sections. */
export const onePage = false;

/** The "Old Hollywood Look" contact sheet on the homepage, labelled as inspiration. */
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

  CITY: "Denton",
  STATE: "TX",
  /** Street line of the studio. */
  STUDIO_ADDRESS: "1100 Dallas Dr",
  POSTAL_CODE: "76205",
  /** Where the studio is inside the building. */
  LOCATION_NOTE: "Inside Burgess Chiropractic Office",
  /** Towns she travels to for home visits, in her order. Shown as one list. */
  SERVICE_AREA: [
    "Lake Dallas",
    "Corinth",
    "Denton",
    "Lewisville",
    "Hickory Creek",
    "Krum",
    "Sanger",
    "Lantana",
    "Flower Mound",
    "Highland Village",
    "Bartonville",
    "Copper Canyon",
    "Aubrey",
    "Pilot Point",
    "Grapevine",
  ],

  PHONE: "214.893.4272",
  EMAIL: "LaBoujeeEsthetics@gmail.com",
  BOOKING_URL: "[BOOKING_URL]",
  INSTAGRAM_URL: "[INSTAGRAM_URL]",
  INSTAGRAM_HANDLE: "[INSTAGRAM_HANDLE]",
  /** Production domain, used for canonical URLs, sitemap, and schema. */
  SITE_URL: "https://la-boujee-esthetics.vercel.app",
  /** Optional form endpoint (Formspree, Basin, etc). Empty hides the form. */
  CONTACT_FORM_ENDPOINT: "",

  /** Days she is available. Shown as "Monday through Saturday, by appointment". */
  DAYS: "Monday through Saturday",
  /** Opening and closing times. Hidden until filled in. */
  HOURS_TIMES: "[HOURS: opening and closing times, e.g. 9am to 6pm]",

  /** Bio paragraphs in her own words. Hidden until filled in. */
  OWNER_BIO: [
    "[OWNER_BIO_PARAGRAPH_1: how I got into esthetics, in my own words]",
    "[OWNER_BIO_PARAGRAPH_2: what I love about the work and how I treat clients]",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Policies                                                            */
/* ------------------------------------------------------------------ */

export const policies = {
  TRAVEL_FEE: "No travel fee for home visits.",
  CANCELLATION: "Please cancel at least 24 hours before your appointment.",
  PAYMENT_METHODS: "Cash, Venmo, Zelle, and card through Square (Visa and Mastercard).",
  DEPOSIT: "[POLICY: whether a deposit is required to book]",
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
/* Price menu: every price on the site comes from here                 */
/* ------------------------------------------------------------------ */

export const priceMenu: PriceGroup[] = [
  {
    title: "Spa Treatments",
    service: "facials",
    setting: "both",
    items: [
      { name: "Essential Facial", price: 75 },
      { name: "Custom Chemical Peel", price: 135 },
      { name: "Custom Chemical Peel (Package of 3)", price: 340 },
    ],
  },
  {
    title: "Enhancements",
    service: "facials",
    setting: "both",
    items: [
      { name: "Enzymatic Treatment", price: 25 },
      { name: "Neck and Décolleté", price: 40 },
      { name: "Treatment Booster", price: 20 },
    ],
  },
  {
    title: "Price on Request",
    service: "facials",
    setting: "both",
    items: [
      { name: "Acne Treatments", price: null },
      { name: "Skin Care Consultations and Evaluations", price: null },
    ],
  },
  {
    title: "Waxing",
    service: "waxing",
    setting: "studio",
    items: [
      { name: "Brow Shaping", price: 20 },
      { name: "Lip or Chin", price: 15 },
      { name: "Underarms", price: 40 },
      { name: "Bikini", price: 45 },
    ],
  },
  {
    title: "Tinting",
    service: "brows-and-lashes",
    setting: "studio",
    items: [
      { name: "Eyelashes", price: 20 },
      { name: "Brow", price: 20 },
    ],
  },
  {
    title: "Lash Lift",
    service: "brows-and-lashes",
    setting: "studio",
    items: [{ name: "Lash Lift", price: 65 }],
  },
  {
    title: "Price on Request",
    service: "brows-and-lashes",
    setting: "studio",
    items: [{ name: "Brow Lamination", price: null }],
  },
  {
    title: "Makeup Application",
    service: "brows-and-lashes",
    setting: "both",
    items: [{ name: "Makeup Application", price: 55 }],
  },
];

/* ------------------------------------------------------------------ */
/* Services (one detail page each)                                     */
/* ------------------------------------------------------------------ */

export type Offering = {
  name: string;
  /** Name used in cross-page lists (e.g. "Bikini wax"); defaults to name. */
  listName?: string;
  setting: ServiceSetting;
  body: string;
};

export type Service = {
  slug: ServiceSlug;
  /** Full page name (nav, headings). */
  name: string;
  /** Short name for tight spaces (lookbook plates, chips). */
  navName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** One-line benefit, used on the homepage lookbook and the page opener. */
  benefit: string;
  /** Plain-language "where" line shown near the top of the page. */
  where: string;
  /** The natural sentence that names service, area and setting. */
  entitySentence: string;
  intro: string[];
  offerings: Offering[];
  expect: { title: string; body: string }[];
  before: string[];
  after: string[];
  related: ServiceSlug[];
  image: ImageSlot;
};

export const services: Service[] = [
  {
    slug: "facials",
    name: "Facials and Peels",
    navName: "Facials and Peels",
    h1: "Facials and Chemical Peels in Denton",
    metaTitle: "Facials and Chemical Peels in Denton | Lá Boujee",
    metaDescription:
      "Custom facials, chemical peels, acne treatments and skin consultations from a licensed esthetician in Denton, at your home or in the studio.",
    benefit: "Built around your skin as it is today, never a one-size routine.",
    where: "At your home or in my Denton studio",
    entitySentence:
      "I offer custom facials and chemical peels in Denton, at my studio or at your home anywhere in my service area.",
    intro: [
      "Every skin treatment starts with your skin, not a script. Cleansing, exfoliation, extractions, masks and massage are chosen for what your skin needs on the day you book.",
    ],
    offerings: [
      {
        name: "Custom Facials",
        setting: "both",
        body: "A facial layered for your skin that day: a deep cleanse, gentle exfoliation, extractions where needed, a mask and time to actually relax.",
      },
      {
        name: "Chemical Peels",
        setting: "both",
        body: "A carefully applied exfoliating solution lifts away dull surface cells to refresh tone and texture. Book a single peel or a package of three.",
      },
      {
        name: "Acne Treatments",
        setting: "both",
        body: "Treatments for breakout-prone skin, with deep cleansing, careful extractions and simple home care guidance.",
      },
      {
        name: "Skin Care Consultations and Evaluations",
        listName: "Skin care consultations",
        setting: "both",
        body: "Not sure where to start? We look at your skin, your routine and your goals together, and you leave with a plan.",
      },
      {
        name: "Enhancements",
        listName: "Facial enhancements",
        setting: "both",
        body: "Add an enzymatic treatment, neck and décolleté, or a treatment booster to your facial. Ask which suits your skin.",
      },
    ],
    expect: [
      { title: "A quick skin conversation", body: "Your concerns, your routine, and anything you use that could make skin sensitive." },
      { title: "The treatment", body: "Layered steps chosen for your skin, with peels applied and watched closely." },
      { title: "Home care notes", body: "Simple guidance on what to use, and what to skip, for the next few days." },
    ],
    before: [
      "Come with a clean face if you can, though makeup can be removed at the start.",
      "Mention any prescription skincare, retinoids, allergies or recent sun exposure.",
      "Before a peel, pause retinoids and strong exfoliants for several days, or as advised.",
    ],
    after: [
      "Skip heavy makeup for the rest of the day so skin can breathe.",
      "Wear sunscreen daily, and go easy on strong actives for a few days.",
      "After a peel, let any flaking happen on its own. Don't pick or scrub.",
    ],
    related: ["brows-and-lashes", "waxing"],
    image: {
      src: "/photos/facials-cream-mask.jpg",
      alt: "Black and white photo of a woman resting with eyes closed as a cream mask is brushed onto her face",
      width: 1200,
      height: 1500,
      aspect: "4 / 5",
    },
  },
  {
    slug: "waxing",
    name: "Waxing",
    navName: "Waxing",
    h1: "Facial, Underarm and Bikini Waxing in Denton",
    metaTitle: "Facial, Underarm and Bikini Waxing in Denton | Lá Boujee",
    metaDescription:
      "Brow shaping, lip or chin, underarm and bikini waxing from a licensed esthetician in her Denton studio inside Burgess Chiropractic Office.",
    benefit: "Clean, smooth results with a calm, private appointment.",
    where: "Studio only, in Denton",
    entitySentence: "I offer waxing in my Denton studio, inside Burgess Chiropractic Office.",
    intro: [
      "Waxing is done in my studio only, not at home visits. Wax removes hair from the root, so skin stays smooth longer than with shaving, and careful, quick work keeps it comfortable.",
    ],
    offerings: [
      {
        name: "Brow Shaping",
        listName: "Brow shaping wax",
        setting: "studio",
        body: "Clean lines that frame your face without over-thinning.",
      },
      {
        name: "Lip or Chin",
        listName: "Lip or chin wax",
        setting: "studio",
        body: "A quick tidy for the upper lip or chin.",
      },
      {
        name: "Underarms",
        listName: "Underarm wax",
        setting: "studio",
        body: "Smooth underarms that stay that way longer than shaving.",
      },
      {
        name: "Bikini",
        listName: "Bikini wax",
        setting: "studio",
        body: "I offer bikini waxing only.",
      },
    ],
    expect: [
      { title: "Skin prep", body: "The area is cleansed so wax grips hair, not skin." },
      { title: "Quick, careful work", body: "Small sections, steady hands, and skin held taut to keep it comfortable." },
      { title: "Soothing finish", body: "A calming product to settle skin, and notes on preventing ingrown hairs." },
    ],
    before: [
      "Let hair grow to roughly a quarter inch, about two to three weeks after shaving.",
      "Skip exfoliating and retinoids on the area for a few days beforehand.",
    ],
    after: [
      "Avoid hot baths, saunas and workouts for about a day.",
      "Start gentle exfoliation after a couple of days to help prevent ingrown hairs.",
    ],
    related: ["brows-and-lashes", "facials"],
    image: {
      src: "/photos/waxing-warm-wax.jpg",
      alt: "Black and white close-up of a ribbon of warm wax falling from an applicator",
      width: 1200,
      height: 1500,
      aspect: "4 / 5",
    },
  },
  {
    slug: "brows-and-lashes",
    name: "Brows, Lashes and Makeup",
    navName: "Brows and Lashes",
    h1: "Lash Lifts, Tinting and Makeup in Denton",
    metaTitle: "Lash Lift, Brow Tint and Makeup in Denton | Lá Boujee",
    metaDescription:
      "Lash lifts, lash and brow tinting and brow lamination in a Denton studio, plus makeup application and lessons at your home or in the studio.",
    benefit: "Defined brows and lashes that look finished without the mascara.",
    where: "Brows and lashes in the studio, makeup at home too",
    entitySentence:
      "I offer lash lifts, tinting and brow lamination in my Denton studio, and makeup application and lessons at your home or in the studio.",
    intro: [
      "Lash and brow treatments are done in my studio only. Makeup application and lessons can happen at your home or in the studio.",
    ],
    offerings: [
      {
        name: "Lash Lift",
        setting: "studio",
        body: "Curls your natural lashes from the base, so they look longer and more open without extensions, glue or fills.",
      },
      {
        name: "Lash Tint",
        setting: "studio",
        body: "Semi-permanent color that makes fine or light lashes show up. A classic pairing with a lift.",
      },
      {
        name: "Brow Tint",
        setting: "studio",
        body: "Color matched to your hair and skin tone, so brows look defined before any pencil.",
      },
      {
        name: "Brow Lamination",
        setting: "studio",
        body: "Sets brow hairs in a brushed-up, fuller-looking shape.",
      },
      {
        name: "Makeup Application and Lessons",
        listName: "Makeup application and lessons",
        setting: "both",
        body: "Makeup done for you, or a lesson so you can recreate the look yourself.",
      },
    ],
    expect: [
      { title: "Settle in", body: "You'll rest with eyes closed for most of a lash or brow appointment." },
      { title: "Shape and color", body: "Lashes are lifted over a soft shield, and tint is matched and timed with skin protected." },
      { title: "A clean finish", body: "Excess tint removed, a conditioning step, and care notes for the next day." },
    ],
    before: [
      "Remove contact lenses and come without eye makeup for lash work.",
      "Skip the lash curler and waterproof mascara the day before a lift.",
      "Let me know about any sensitivity to hair dye. A patch test may be recommended.",
    ],
    after: [
      "Keep lashes and brows dry, and avoid steam, for about a day.",
      "Skip oil-based products around the eyes while a lift or tint settles.",
    ],
    related: ["facials", "waxing"],
    image: {
      src: "/photos/lash-lift-curled-lashes.jpg",
      alt: "Black and white close-up of long, curled natural lashes framing an eye",
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
  /** Homepage cover. Full 4:5 frame of the finger-waves portrait (stock). */
  cover: {
    src: "/photos/cover-finger-waves.jpg",
    alt: "Black and white portrait of a woman with sculpted vintage finger waves, soft matte lips and a tulle collar",
    width: 1600,
    height: 2000,
    aspect: "4 / 5",
  },
  /** Still the placeholder: renders as a brand panel (her monogram on wine) until a real portrait replaces it. */
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
    alt: "A rolled towel, a plain pump bottle, a lit tea light and tulips on a white table",
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
      src: "/photos/gallery-luminous-profile.jpg",
      alt: "Soft-lit black and white profile of a woman with luminous skin and loose curls",
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
