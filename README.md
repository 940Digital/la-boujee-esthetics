# La' Boujee Esthetics

Website for La' Boujee Esthetics, a licensed solo esthetician offering custom facials, waxing, tinting, eyelash lifts and chemical peels, at clients' homes or in her studio.

Next.js (App Router) + Tailwind 4 + Framer Motion, fully static, ready for Vercel.

## Run it

```bash
npm install
npm run dev
```

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

- Palette: near-black `#121212`, pearl `#F8F6F2`, champagne brass `#C9A66B` (accent), deep emerald `#0F3B33`. `brass-ink #7A5C28` is the same brass darkened for small text on pearl (WCAG AA)
- Type: Cormorant Garamond (headings), Josefin Sans (body/UI), Poiret One (small labels only)
