"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import logo from "../../../public/brand/logo-pink.png";
import { business, images } from "@/site.config";
import { BookButton } from "../BookButton";

const ease = [0.22, 1, 0.36, 1] as const;

/** Cover lines. Each one is a verified fact, set like the teasers on a 1950s fashion cover. */
const coverLines = [
  { kicker: "Your home or my studio", line: "I come to your home, or you visit my studio, depending on the treatment." },
  { kicker: "Brows and lashes", line: "Tinting and eyelash lifts for a finished look without the mascara." },
  { kicker: "Skin", line: "Custom facials and chemical peels, chosen for your skin." },
];

/*
  Option 2's one moment of flair: the portrait settles in from a slow
  push, like a studio camera finding its mark, while the cover lines
  set one by one. Everything else on the page stays quiet.
*/
export function Cover() {
  const reduce = useReducedMotion();
  const t = (delay: number, duration = 1) => ({ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease });

  return (
    <section aria-labelledby="cover-title" className="relative overflow-hidden bg-ink text-pearl">
      {/* soft pink key light from below, shared with Option 1 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 55% at 30% 105%, rgba(212,80,140,0.32), transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-[1400px] lg:static lg:min-h-[max(100svh,820px)] lg:grid-cols-[1fr_0.95fr]">
        {/* phones: the masthead sits on black above the portrait, like a printed cover */}
        <motion.div
          className="order-0 flex justify-center px-6 pb-4 pt-20 lg:hidden"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.2)}
        >
          <Image src={logo} alt="Lá Boujee Esthetics" width={260} height={189} priority className="h-auto w-[44vw] max-w-[220px]" />
        </motion.div>

        {/* the portrait: full height on desktop, a tall frame on phones */}
        <div className="relative order-1 h-[44svh] min-h-[330px] lg:absolute lg:inset-y-0 lg:right-0 lg:order-2 lg:h-auto lg:w-[48%]">
          <motion.div
            className="bw grain absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={t(0, 1.4)}
          >
            <motion.div className="absolute inset-0" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={t(0, 2.6)}>
              <Image
                src={images.cover.src}
                alt={images.cover.alt}
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover object-[50%_22%]"
              />
            </motion.div>
          </motion.div>
          {/* fade the photo into the page so the cover reads as one piece */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40 lg:bg-gradient-to-r lg:from-ink lg:via-ink/5 lg:to-transparent" />
          {/* keeps the running header legible where it crosses the photo */}
          <div aria-hidden className="absolute inset-x-0 top-0 hidden h-44 bg-gradient-to-b from-ink/85 to-transparent lg:block" />

        </div>

        {/* the cover text */}
        <div className="relative z-10 order-2 flex flex-col justify-end px-6 pb-16 pt-2 lg:order-1 lg:justify-center lg:px-12 lg:pb-16 lg:pt-32 xl:pl-16 xl:pt-40">
          <motion.div
            className="mb-8 hidden lg:block"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.2)}
          >
            <Image src={logo} alt="Lá Boujee Esthetics" width={330} height={240} priority className="h-auto w-[220px] xl:w-[250px]" />
          </motion.div>

          <motion.p className="kicker text-rose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.45)}>
            {business.credential}
          </motion.p>
          <motion.h1
            id="cover-title"
            className="display mt-4 max-w-[14ch] text-[clamp(2.5rem,1.3rem+3.1vw,4.3rem)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.55, 1.1)}
          >
            Custom Facials, Waxing and Lash Lifts in {business.CITY}
          </motion.h1>

          <ul className="mt-8 max-w-[46ch] border-t border-silver/30">
            {coverLines.map((c, i) => (
              <motion.li
                key={c.kicker}
                className="border-b border-silver/30 py-3"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={t(0.85 + i * 0.15)}
              >
                <span className="kicker block text-silver">{c.kicker}</span>
                <span className="display mt-1 block text-[1.2rem] italic leading-snug text-pearl/90">{c.line}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(1.35)}>
            <BookButton />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
