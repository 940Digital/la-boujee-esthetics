# Lá Boujee Esthetics: what's done, and what's still needed

Every business detail lives in one file: `src/site.config.ts`. Anything in `[SQUARE_BRACKETS]` is a placeholder. Placeholders never show on the site: any line or section whose value is still in brackets is hidden automatically (`isPlaceholder` and `shown` in `src/lib/site.ts`). Replace the value in site.config.ts and it appears everywhere it belongs (pages, footer, structured data).

Nothing on the site was invented. Everything shown comes from Laurel, or is general esthetics knowledge (what a facial or peel is, prep and aftercare).

## Done (from Laurel)

| Item | Value | Where it shows |
| --- | --- | --- |
| Owner | Laurel Porter, licensed esthetician in the State of Texas, insured, solo practice | Home, About, schema `founder` |
| Phone, email | 214.893.4272, LaBoujeeEsthetics@gmail.com | Header, footer, Book and Contact, home close-up, schema |
| Studio address | `STUDIO_ADDRESS` 1100 Dallas Dr, `CITY` Denton, `STATE` TX, `POSTAL_CODE` 76205 | Footer, Book and Contact (with a Google Maps "Get directions" link), About, schema |
| Location note | `LOCATION_NOTE` "Inside Burgess Chiropractic Office" | Cover, home, footer, Book and Contact, Waxing |
| Days | `DAYS` Monday through Saturday, shown as "Monday through Saturday, by appointment" | Footer, Book and Contact, schema `openingHours: "Mo-Sa"` |
| Service area | `SERVICE_AREA`: the 15 towns, in her order. Replaces the old travel radius | Mobile Service (one list), footer and Book and Contact (summary), schema `areaServed` |
| Travel fee | `policies.TRAVEL_FEE` "No travel fee for home visits." | Mobile Service, Services and Prices, Book and Contact, cover |
| Cancellation | `policies.CANCELLATION` 24 hours | Services and Prices, Book and Contact |
| Payment | `policies.PAYMENT_METHODS` cash, Venmo, Zelle, Visa and Mastercard through Square | Services and Prices, Book and Contact, schema `paymentAccepted` |
| Where each treatment happens | `services[].offerings[].setting` and `priceMenu[].setting` (`both` or `studio`) | Tags on every price group and treatment, Mobile Service lists, FAQ |
| Prices | `priceMenu`: Spa Treatments, Enhancements, Waxing, Tinting, Lash Lift, Makeup Application. Every price on the site renders from here | Services and Prices, each treatment page, schema `OfferCatalog` and `priceRange` |

## Still needed from Laurel

| Key | What goes there | What happens when it's filled |
| --- | --- | --- |
| `BOOKING_URL` | Link to her online booking page (Square, Vagaro, GlossGenius, etc.) | Every "Book Your Appointment" button goes there. Until then they go to /book, which lists call, text and email |
| `INSTAGRAM_URL`, `INSTAGRAM_HANDLE` | Her Instagram profile link and handle | Appears in the footer, contact details and schema `sameAs` |
| `HOURS_TIMES` | Opening and closing times, e.g. "9am to 6pm" | Added to "Monday through Saturday, ..." everywhere. In `src/app/layout.tsx`, switch `openingHours` to `openingHoursSpecification` with `opens` and `closes` (see the code comment) |
| `OWNER_BIO` | Two short paragraphs in her own words (first person) | Appear on the About page under the facts already there |
| `images.ownerPortrait` | A portrait of Laurel (4:5). Stock can't stand in for her | Replaces the brand panel (her monogram on wine) on Home and About. The panel is hidden on phones while it's a placeholder |
| Her own photos | Studio, home setup, treatment and results photos | Replace the stock photos (see Photos below) |
| Prices not on the menu | Acne treatments, skin care consultations and evaluations, brow lamination | Shown as "Ask for pricing" until a price is added in `priceMenu` (set `price` to a number) |
| `policies.DEPOSIT` | Is a deposit required to book | Appears in Book and Contact "Good to know" and the cancel FAQ |
| `policies.PETS_AND_KIDS` | Guidance for pets and children during home visits | Appears in the "Who comes to my home?" FAQ and on Mobile Service |
| `policies.MINIMUM_AGE` | Minimum age, and whether minors need a guardian | Appears in Book and Contact "Good to know" |
| `policies.SPACE_NEEDED` | Space and setup she needs at a client's home | Appears under "Getting your space ready" on Mobile Service |
| `hygienePractices` | Four draft lines marked `[CONFIRM: ...]`. Keep only what she does, remove the brackets, then set `showHygieneDetails = true` | Shows on Mobile Service |
| `reviews` | Real client words, with permission. Then set `showReviews = true` | Shows on About |
| `SITE_URL` | Final domain, e.g. `https://www.laboujeeesthetics.com` | Canonical URLs, sitemap, robots, Open Graph and schema. Currently `https://la-boujee-esthetics.vercel.app` |
| `CONTACT_FORM_ENDPOINT` | Optional Formspree or Basin endpoint | Adds a message form to Book and Contact. Empty hides it |

## Display flags (top of site.config.ts)

| Flag | Now | Notes |
| --- | --- | --- |
| `onePage` | `false` | The 8-page site |
| `linkServicePages` | `true` | Facials and Peels, Waxing, Brows and Lashes are linked everywhere and in the sitemap |
| `showPrices` | `true` | Prices come from `priceMenu` |
| `showGallery` | `true` | "The Old Hollywood Look" contact sheet on the homepage, labelled as inspiration. If her own client photos replace these, retitle it in `src/components/editorial/ContactSheet.tsx` |
| `showReviews` | `false` | See `reviews` above |
| `showHygieneDetails` | `false` | See `hygienePractices` above |

## Pages and redirects

Pages: `/` Home, `/services` Services and Prices, `/facials` Facials and Peels, `/waxing` Waxing, `/brows-and-lashes` Brows, Lashes and Makeup, `/mobile-service` Mobile Service, `/about` About, `/book` Book and Contact.

Permanent redirects (308) in `next.config.ts`:

- `/option-2` to `/`
- `/chemical-peels` to `/facials`
- `/tinting` to `/brows-and-lashes`
- `/eyelash-lifts` to `/brows-and-lashes`
- `/contact` to `/book`

## Photos

The site uses licensed Unsplash stock photos chosen for the old Hollywood look (sources in `public/photos/SOURCES.md`). Their alt text describes what each photo shows; none is presented as Laurel or her work. Swap any of them by adding her photo to `/public/photos/`, pointing `src` at it in site.config.ts, and rewriting `alt`. Run `node scripts/prepare-photos.mjs` afterwards.

**Use a new file name for every replacement photo.** Optimized images are cached for a year (`images.minimumCacheTTL` in `next.config.ts`), so overwriting a file under the same name can keep serving the old picture.

| Slot | Aspect | Now | Replace with |
| --- | --- | --- | --- |
| `images.ownerPortrait` | 4:5 | Brand panel (placeholder file) | **Needed.** A portrait of Laurel |
| `images.cover` | 4:5 | Stock: finger-waves portrait | A black-and-white portrait of Laurel would make the strongest cover |
| `images.comeToYou` | 3:2 | Stock: vintage dressing table | Her mobile setup in a client's home |
| `images.studio` | 3:2 | Stock: towel, bottle and tulips still life | Her studio |
| `images.gallery[0-4]` | 1:1 | Stock: inspiration portraits | Her client results (then retitle the section) |
| `services[*].image` | 4:5 | Stock per page | Her own treatment photos |

## Copy to review with her

Body copy is in Laurel's first-person voice; titles, descriptions and schema are neutral. These lines are general esthetics knowledge, not claims about her, but she should read them once:

- Treatment descriptions, "what to expect", prep and aftercare (`services` in site.config.ts)
- FAQ answers (`src/lib/faq.ts`)
- Mobile Service steps and "Getting your space ready" (`src/app/mobile-service/page.tsx`)
- About page pillars (`src/app/about/page.tsx`)
