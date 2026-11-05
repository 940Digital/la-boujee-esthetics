# Lá Boujee Esthetics

Website for Lá Boujee Esthetics, a licensed solo esthetician offering custom facials, waxing, tinting, eyelash lifts and chemical peels, at clients' homes or in her studio.

Next.js (App Router) + Tailwind 4 + Framer Motion, fully static, ready for Vercel.

## Run it

```bash
npm install
npm run dev
```

## Design options (demo)

Two directions share the same config, copy facts, logo and palette. A tab bar at the top flips between them.

- **Option 1, Art Deco** (`/` and every inner page): `src/app/(v1)`, components in `src/components`.
- **Option 2, Hollywood Editorial** (`/option-2`, noindex): a one-page 1940s and 50s fashion-magazine layout with a black-and-white cover, lookbook, a contact-sheet gallery and an interview-style Q&A. Components in `src/components/v2`, styles in the `.v2` block at the end of `globals.css`, Bodoni Moda loaded in `src/app/option-2/layout.tsx`.

When she picks one, delete the other's route and components, `src/components/OptionSwitcher.tsx`, and the `top-9` offsets in the headers.

## Before launch

All business details live in `src/site.config.ts`. See **PLACEHOLDERS.md** for the full checklist.

## Structure

- `src/site.config.ts`: business facts, policies, services, image slots, display flags
- `src/app/`: one folder per page (`/facials`, `/waxing`, `/tinting`, `/eyelash-lifts`, `/chemical-peels`, `/mobile-service`, `/about`, `/book`, `/contact`)
- `src/components/ServicePage.tsx`: shared template for the five service pages
- `src/components/HeroArt.tsx`: the animated sunburst hero (the one section with extra motion)
- `src/components/deco.tsx`: Art Deco line-work (frames, fans, medallions, ornaments)
- `src/components/motion.tsx`: scroll reveals. All use `viewport={{ once: false }}` so they reverse on scroll up, and honor reduced motion
- `scripts/make-placeholders.mjs`: regenerates the placeholder art panels

## Design system

- Palette (from her business card): near-black `#121212`, her brand pink `#D4508C` (text accents, buttons, logo), platinum silver `#C4BFC6` for thin Deco line-work (`silver-ink #9A939D` on light backgrounds), a pink radial glow behind the hero fan and dark sections, pink-white pearl `#F9F6F7`, black-cherry `#2A1420` for depth. `rose-ink #A8336A` and `rose-soft #E7A9C4` are the pink adjusted for small text on pearl and on black-cherry (WCAG AA). Gold and blush line-work were tried and dropped.
- Type: Cormorant Garamond (headings), Josefin Sans (body/UI), Poiret One (small labels only)
