import Link from "next/link";
import { images } from "@/site.config";
import { ImageSlot } from "../ImageSlot";
import { DoorIcon, Ornament, RayField, StepFrame, StudioIcon } from "../deco";
import { Reveal } from "../motion";

const comeToYou = [
  "No drive, no parking, no waiting room",
  "Book around meetings, naps and school runs",
  "Stay comfortable at home afterward",
];

const studio = [
  "A dedicated space set up for your treatment",
  "Step out of the house and into a reset",
  "Best for treatments that need the full setup",
];

function Medallion() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-brass bg-wine text-rose shadow-[0_0_0_6px_var(--color-wine),0_0_0_7px_rgba(201,166,107,0.45)]">
      <span className="font-serif text-[1.9rem] italic leading-none">or</span>
    </div>
  );
}

export function PlaceOrMine() {
  return (
    <section aria-labelledby="place-title" className="fan-texture relative overflow-hidden bg-wine py-24 text-pearl md:py-32">
      <RayField opacity={0.12} />
      <div className="relative mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal className="text-center">
          <Ornament className="mx-auto" />
          <h2 id="place-title" className="display mt-6 text-[clamp(2.6rem,1.8rem+3.6vw,4.8rem)] text-pearl">
            Your Place or Mine
          </h2>
          <p className="lede mx-auto mt-5 max-w-[50ch] text-mauve">
            The same licensed care, in the setting that suits your day. Where your appointment happens depends on the
            treatment.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-10">
          {/* Come to You */}
          <Reveal className="relative" y={26}>
            <article aria-labelledby="ctu-title" className="relative h-full bg-ink p-3 md:p-4">
              <StepFrame inset={8} />
              <ImageSlot slot={images.comeToYou} sizes="(min-width: 768px) 560px, 92vw" />
              <div className="flex flex-col items-center px-5 pb-10 pt-8 text-center md:px-10">
                <DoorIcon />
                <p className="label mt-4 text-rose">Mobile</p>
                <h3 id="ctu-title" className="display mt-2 text-[2.4rem] text-pearl">
                  Come to You
                </h3>
                <p className="mt-3 max-w-[38ch] text-mist">
                  She brings the appointment to your home, so the only thing you have to do is relax.
                </p>
                <ul className="mt-6 w-full max-w-[34ch] space-y-2.5 text-left text-[0.97rem] text-pearl/90">
                  {comeToYou.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 border border-brass" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/mobile-service"
                  className="deco-link mt-8 inline-flex min-h-11 items-center text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-rose"
                >
                  How mobile appointments work
                </Link>
              </div>
            </article>
          </Reveal>

          {/* the "or" medallion sits on the seam between the cards */}
          <div className="relative z-10 -my-12 flex justify-center md:absolute md:left-1/2 md:top-1/2 md:my-0 md:-translate-x-1/2 md:-translate-y-1/2">
            <Medallion />
          </div>

          {/* Visit the Studio */}
          <Reveal className="relative" y={26} delay={0.12}>
            <article aria-labelledby="studio-title" className="relative h-full bg-pearl p-3 text-ink md:p-4">
              <StepFrame inset={8} tone="brass-ink" />
              <ImageSlot slot={images.studio} sizes="(min-width: 768px) 560px, 92vw" />
              <div className="flex flex-col items-center px-5 pb-10 pt-8 text-center md:px-10">
                <StudioIcon tone="brass-ink" />
                <p className="label mt-4 text-rose-ink">Studio</p>
                <h3 id="studio-title" className="display mt-2 text-[2.4rem] text-ink">
                  Visit the Studio
                </h3>
                <p className="mt-3 max-w-[38ch] text-graphite">
                  Some treatments are best in the studio. Settle in and let the time be all about you.
                </p>
                <ul className="mt-6 w-full max-w-[34ch] space-y-2.5 text-left text-[0.97rem] text-ink/90">
                  {studio.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 border border-brass-ink" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="deco-link mt-8 inline-flex min-h-11 items-center text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-rose-ink"
                >
                  Ask about the studio
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
