# Lá Boujee Esthetics

Website for Lá Boujee Esthetics, a licensed solo esthetician offering custom facials, waxing, tinting, eyelash lifts and chemical peels, at clients' homes or in her studio.

Next.js (App Router) + Tailwind 4 + Framer Motion, fully static, ready for Vercel.

## Run it

```bash
npm install
npm run dev
```

## Design

Hollywood editorial: a 1940s and 50s fashion magazine. Black-and-white photography with film grain, Bodoni Moda headlines, Josefin Sans small caps, her pink logo as the masthead, and her pink as the only colour. Signature piece: the contact-sheet gallery with a pink grease-pencil pick.

An earlier Art Deco direction (Option 1) is archived locally, not in this repo's live code: `~/Downloads/940D Websites/la-boujee-esthetics-option-1-art-deco` and the local git tag `option-1-art-deco`.

## Before launch

All business details live in `src/site.config.ts`. See **PLACEHOLDERS.md** for the full checklist.

## Structure

- `src/site.config.ts`: business facts, policies, services, image slots, display flags
- `src/app/`: one folder per page (`/facials`, `/waxing`, `/tinting`, `/eyelash-lifts`, `/chemical-peels`, `/mobile-service`, `/about`, `/book`, `/contact`)
- `src/components/editorial/`: the cover, spreads, contact sheet, page opener, header, footer, and the shared service-page template (`ServicePage.tsx`)
- `src/components/motion.tsx`: scroll reveals. All use `viewport={{ once: false }}` so they reverse on scroll up, and honor reduced motion
- `scripts/make-placeholders.mjs`: regenerates the owner-portrait placeholder
- `scripts/prepare-photos.mjs`: run after adding or replacing a photo. Converts it to black and white once and regenerates the blurred loading previews in `src/lib/photo-blur.ts`

## Design system

- Palette (from her business card): near-black `#121212`, her brand pink `#D4508C` (text accents, buttons, logo), platinum silver `#C4BFC6` for hairlines (`silver-ink #9A939D` on light backgrounds), a soft pink key light behind dark sections, pink-white pearl `#F9F6F7`, black-cherry `#2A1420` for depth. `rose-ink #A8336A` and `rose-soft #E7A9C4` are the pink adjusted for small text on pearl and on black-cherry (WCAG AA).
- Type: Bodoni Moda (headlines), Josefin Sans (body and small-caps kickers)
