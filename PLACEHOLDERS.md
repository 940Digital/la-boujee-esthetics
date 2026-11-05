# Lá Boujee Esthetics: what to replace before launch

Every unknown lives in one file: `src/site.config.ts`. Anything in `[SQUARE_BRACKETS]` is a placeholder. Replace it there and the whole site updates (pages, footer, meta titles, structured data, sitemap).

Nothing on this list was invented. Each item still needs a real answer from the owner.

## 1. Business details (`business` in site.config.ts)

| Key | What goes there | Where it shows |
| --- | --- | --- |
| `OWNER_NAME` | Done: Laurel Porter | About page H1, homepage About section, portrait caption, schema |
| `OWNER_FIRST_NAME` | Done: Laurel | "More about ...", "Book with ..." |
| `CITY` | Main city she serves | Homepage H1, every service page H1, meta titles, schema |
| `STATE` | Two-letter state, e.g. `TX` | Footer, contact page, schema |
| `SERVICE_AREA` | List of cities/neighborhoods she travels to (any length) | Mobile Service page, footer, contact page, schema `areaServed` |
| `TRAVEL_RADIUS` | How far she travels, e.g. `15 miles` | Mobile Service page diagram, footer |
| `PHONE` | Done: 214.893.4272 (from her business card) | Header, footer, contact, book page. Becomes a tap-to-call link once filled |
| `EMAIL` | Done: LaBoujeeEsthetics@gmail.com (from her business card) | Footer, contact, book page |
| `BOOKING_URL` | Full link to her online booking page (Square, Vagaro, GlossGenius, etc.) | Every "Book Your Appointment" button. Until it's set, buttons go to /book, which shows contact options |
| `INSTAGRAM_URL` | Full Instagram profile link | Footer, contact, gallery, schema |
| `INSTAGRAM_HANDLE` | e.g. `@laboujeeesthetics` | Same places as above |
| `STUDIO_ADDRESS` | Street address of her place of business. If she only shares it after booking, write that instead | Contact page, schema |
| `SITE_URL` | Final domain, e.g. `https://www.laboujeeesthetics.com` | Canonical URLs, sitemap, robots, schema. Currently `https://www.example.com` |
| `CONTACT_FORM_ENDPOINT` | Optional. A Formspree/Basin endpoint URL. Leave empty to hide the form | Contact page form |
| `HOURS` | Days and hours, as many rows as needed | Footer, contact page |
| `OWNER_BIO` | Two short paragraphs in her own words | About page |

## 2. Policies (`policies` in site.config.ts)

These answer FAQ and booking questions. They show on the site as bracketed text until replaced.

- `TRAVEL_FEE`: is there a travel fee, and how is it calculated
- `CANCELLATION`: cancellation and late-arrival terms
- `DEPOSIT`: is a deposit required to book
- `PAYMENT_METHODS`: what payment she accepts
- `PETS_AND_KIDS`: guidance for pets and children during home visits
- `MINIMUM_AGE`: minimum age, and whether minors need a guardian
- `SPACE_NEEDED`: what space/setup she needs at a client's home

## 3. Hidden sections (built, switched off)

Flip the flag to `true` at the top of site.config.ts once real data is in.

| Flag | Fill in first |
| --- | --- |
| `showPrices` | `services[].menu`: each service has three `[OPTION]` / `[PRICE]` rows. Add or remove rows freely. Turning this on adds a price list to each service page and "From $X" to the homepage menu |
| `showReviews` | `reviews`: real client words, with the client's permission. Shows on the homepage and About page |
| `showHygieneDetails` | `hygienePractices`: four draft lines marked `[CONFIRM: ...]`. Keep only what she actually does, then remove the brackets. Shows on the Mobile Service page |
| `showGallery` | Already on, showing Art Deco placeholder panels. Turn off if she'd rather launch without a gallery until photos exist |

## 4. Where each treatment happens

Each service has `setting: "unconfirmed"`. Change it to `"mobile"`, `"studio"` or `"both"` per service once she confirms. The "Where it happens" line on each service page updates automatically.

## 5. Photos (13 slots)

12 slots now hold licensed Unsplash stock photos chosen for the old Hollywood look (sources in `public/photos/SOURCES.md`). One slot is still a placeholder. Swap any of them by dropping her photo in `/public/photos/` and changing `src` in site.config.ts. Keep the aspect ratio, or update `width`, `height` and `aspect`, and rewrite `alt` to describe the new photo.

| Slot | Aspect | Now | Replace with her own when possible |
| --- | --- | --- | --- |
| `images.ownerPortrait` | 4:5 | Placeholder panel | **Needed.** A portrait of Laurel. Stock can't stand in for her |
| `images.cover` | 4:5 | Stock: finger-waves portrait (homepage cover) | A black-and-white glamour portrait of Laurel would make the strongest cover |
| `images.comeToYou` | 3:2 | Stock: vintage dressing table | Her mobile setup in a client's home |
| `images.studio` | 3:2 | Stock: towel, bottle and tulips still life (a detail, so it can't be mistaken for her room) | Her actual studio when she has a photo |
| `images.gallery[0-4]` | 1:1 | Stock: opera gloves, wide-brim hat, polka-dot pin-up, off-shoulder gown, winged-liner profile | Her client results. When swapped, retitle the contact-sheet section from "The Old Hollywood Look" to "Recent Work" in `src/components/editorial/ContactSheet.tsx` |
| `services[*].image` | 4:5 | Stock per treatment | Her own treatment photos |

## 6. Optional

- **Logo**: the cover masthead, header, footer and share image use her real logo, cut out of her business card photo (`public/brand/logo-pink.png`, 573x416). If she has the original vector or a higher-resolution file, drop it in for sharper edges.
- **Name spelling**: the site uses "Lá Boujee" with the accent, matching her logo and business card.
- **Share image**: `public/og.png` (1200x630) uses the wordmark only, so it's safe to keep. Replace with a branded photo later if she likes.

## 7. Draft copy to review with her

The site speaks in Laurel's own first-person voice ("I come to your home, or you visit my studio"). Search titles, descriptions and schema stay neutral, which is normal. Her bio paragraphs should be written in first person too.


These lines are general esthetics knowledge or describe how mobile service works in principle. Nothing claims a fact about her that wasn't given, but she should read them once:

- Service page intros, "good for", "what to expect", prep and aftercare notes (`services` in site.config.ts)
- FAQ answers (`src/lib/faq.ts`)
- Mobile Service steps and "Getting your space ready" (`src/app/mobile-service/page.tsx`)
- "Your Place or Mine" bullet points (`src/components/home/PlaceOrMine.tsx`)
