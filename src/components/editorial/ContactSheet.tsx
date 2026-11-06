"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { images } from "@/site.config";
import { blurProps } from "@/lib/blur";
import { Reveal } from "../motion";

/** A row of sprocket holes along the film edge. */
function Sprockets() {
  return (
    <div aria-hidden className="flex h-5 items-center justify-between gap-2 px-2">
      {Array.from({ length: 30 }, (_, i) => (
        <span key={i} className="h-2.5 w-3.5 shrink-0 rounded-[2px] bg-pearl-2/90" />
      ))}
    </div>
  );
}

/* One sprocket hole as a tile. background-repeat "round" stretches the spacing
   so the column always ends on a whole hole, however tall the strip is. */
const hole =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='24'%3E%3Crect x='5' y='5' width='10' height='14' rx='2' fill='%23f2eaed' fill-opacity='0.9'/%3E%3C/svg%3E\")";

/** Sprocket holes down the edge of the strip when it runs vertically on phones. */
function SprocketColumn() {
  return <div aria-hidden className="w-5 shrink-0 md:hidden" style={{ backgroundImage: hole, backgroundRepeat: "no-repeat round", backgroundSize: "20px 24px" }} />;
}

/*
  The signature for Option 2: a photographer's contact sheet. The pick is
  circled in her pink like a grease pencil, and the loop redraws each time
  the sheet scrolls into view.
*/
export function ContactSheet() {
  const reduce = useReducedMotion();
  const frames = images.gallery;
  return (
    <section aria-labelledby="sheet-title" className="bg-pearl-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="kicker text-rose-ink">The inspiration</p>
            <h2 id="sheet-title" className="display mt-4 text-[clamp(2.6rem,1.6rem+3.6vw,5rem)] text-ink">
              The Old Hollywood Look
            </h2>
          </div>
          <p className="max-w-[40ch] text-graphite">
            Opera gloves, a wide-brim hat, pinned curls and a soft glow. The golden-age glamour behind Lá Boujee.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          {/* phones: the strip runs top to bottom with holes down both edges.
              md and up: it lies across the page with holes along the top and bottom. */}
          <div className="mx-auto max-w-[420px] bg-[#0d0d0d] shadow-[0_24px_60px_-30px_rgba(18,18,18,0.6)] md:max-w-none md:py-1">
            <div className="hidden md:block">
              <Sprockets />
            </div>
            <div className="flex md:block">
              <SprocketColumn />
              <ul className="grid flex-1 gap-4 py-3 md:grid-cols-5 md:gap-2 md:px-2 md:py-0">
                {frames.map((f, i) => (
                  <li key={f.src} className="relative">
                    <p aria-hidden className="mb-1 font-sans text-[0.7rem] font-semibold tracking-[0.2em] text-silver">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <div className="bw grain relative aspect-square overflow-hidden">
                      <Image src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 20vw, 380px" {...blurProps(f.src)} className="object-cover" />
                    </div>
                    {i === 0 ? (
                      <svg
                        aria-hidden
                        viewBox="0 0 200 200"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute -inset-x-[9%] -bottom-[10%] -top-[4%] h-[114%] w-[118%] overflow-visible"
                      >
                        <motion.path
                          d="M18 96 C 10 40, 70 8, 112 10 C 162 12, 196 48, 190 104 C 184 160, 140 192, 92 188 C 40 184, 4 150, 12 96 C 16 66, 40 40, 78 28"
                          fill="none"
                          stroke="#D4508C"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: false, amount: 0.6 }}
                          transition={{ duration: reduce ? 0 : 1.3, delay: reduce ? 0 : 0.4, ease: [0.65, 0, 0.35, 1] }}
                        />
                      </svg>
                    ) : null}
                  </li>
                ))}
              </ul>
              <SprocketColumn />
            </div>
            <div className="hidden md:block">
              <Sprockets />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
