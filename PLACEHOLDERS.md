# La' Boujee Esthetics: what to replace before launch

Every unknown lives in one file: `src/site.config.ts`. Anything in `[SQUARE_BRACKETS]` is a placeholder. Replace it there and the whole site updates (pages, footer, meta titles, structured data, sitemap).

Nothing on this list was invented. Each item still needs a real answer from the owner.

## 1. Business details (`business` in site.config.ts)

| Key | What goes there | Where it shows |
| --- | --- | --- |
| `OWNER_NAME` | Her full name, as she wants it shown | About page H1, homepage About section, portrait caption, schema |
| `OWNER_FIRST_NAME` | First name only | "More about ...", "Book with ..." |
| `CITY` | Main city she serves | Homepage H1, every service page H1, meta titles, schema |
| `STATE` | Two-letter state, e.g. `TX` | Footer, contact page, schema |
| `SERVICE_AREA` | List of cities/neighborhoods she travels to (any length) | Mobile Service page, footer, contact page, schema `areaServed` |
| `TRAVEL_RADIUS` | How far she travels, e.g. `15 miles` | Mobile Service page diagram, footer |
| `PHONE` | Phone number for calls and texts | Header, footer, contact, book page. Becomes a tap-to-call link once filled |
| `EMAIL` | Booking/contact email | Footer, contact, book page |
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

Every image slot is listed in site.config.ts with its aspect ratio and the alt text describing the photo that belongs there. To swap one in, drop the photo in `/public/photos/` and change `src`. Keep the same aspect ratio, or update `width`, `height` and `aspect` to match the new photo.

| Slot | Aspect | Photo wanted |
| --- | --- | --- |
| `images.ownerPortrait` | 4:5 | Portrait of her (arch-framed on homepage and About) |
| `images.comeToYou` | 3:2 | Her portable setup in a client's home |
| `images.studio` | 3:2 | Her studio treatment room |
| `images.gallery[0]` | 1:1 | Featured result (large tile) |
| `images.gallery[1-4]` | 1:1 | Lashes, treatment tray, brows, mobile setup |
| `services[facials].image` | 4:5 | Facial in progress |
| `services[waxing].image` | 4:5 | Waxing station |
| `services[tinting].image` | 4:5 | Tinted brows close-up |
| `services[eyelash-lifts].image` | 4:5 | Lifted lashes in profile |
| `services[chemical-peels].image` | 4:5 | Peel being applied |

Update each `alt` to describe the real photo once it's in. Placeholder panels can be regenerated with `node scripts/make-placeholders.mjs`.

## 6. Optional

- **Logo**: the header uses a typeset wordmark (Cormorant + Poiret One with a fan mark). If she has a logo file, swap it into `src/components/Wordmark.tsx`.
- **Share image**: `public/og.png` (1200x630) uses the wordmark only, so it's safe to keep. Replace with a branded photo later if she likes.

## 7. Draft copy to review with her

These lines are general esthetics knowledge or describe how mobile service works in principle. Nothing claims a fact about her that wasn't given, but she should read them once:

- Service page intros, "good for", "what to expect", prep and aftercare notes (`services` in site.config.ts)
- FAQ answers (`src/lib/faq.ts`)
- Mobile Service steps and "Getting your space ready" (`src/app/mobile-service/page.tsx`)
- "Your Place or Mine" bullet points (`src/components/home/PlaceOrMine.tsx`)
