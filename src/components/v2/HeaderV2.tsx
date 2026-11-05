"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { business } from "@/site.config";
import { telHref } from "@/lib/site";
import { BookButton } from "../BookButton";
import { Wordmark } from "../Wordmark";

/** Option 2 is a single editorial page, so the nav jumps between its spreads. */
export const v2Nav = [
  { href: "#treatments", label: "The Treatments" },
  { href: "#place", label: "Your Place or Mine" },
  { href: "#profile", label: "Meet Laurel" },
  { href: "#questions", label: "Q&A" },
  { href: "#book", label: "Book" },
];

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="v2-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className="inline-flex h-12 min-w-12 items-center justify-center gap-3 px-2 text-pearl"
    >
      <span className="kicker hidden text-pearl sm:inline">{open ? "Close" : "Menu"}</span>
      <span className="relative block h-3 w-7">
        <span className={`absolute left-0 top-0 h-px w-7 bg-rose transition-transform duration-500 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
        <span className={`absolute bottom-0 left-0 h-px w-7 bg-rose transition-transform duration-500 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
      </span>
    </button>
  );
}

export function HeaderV2() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const tel = telHref();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-12 focus:z-[100] focus:bg-pearl focus:px-4 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>

      {/* Thin running header over the cover, like the top margin of a magazine page */}
      <header className="absolute inset-x-0 top-9 z-40">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 md:px-10">
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {v2Nav.slice(0, 4).map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="kicker inline-flex min-h-11 items-center text-pearl/80 transition-colors hover:text-rose">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* phones: the cover's masthead is the logo here; the compact bar brings it back on scroll */}
          <span aria-hidden className="lg:hidden" />
          <div className="flex items-center gap-5">
            {tel ? (
              <a href={tel} className="kicker hidden min-h-11 items-center text-pearl/80 hover:text-rose md:inline-flex">
                {business.PHONE}
              </a>
            ) : null}
            <BookButton variant="outline-light" className="!hidden !min-h-11 !px-5 !text-[0.7rem] lg:!inline-flex" />
            <div className="lg:hidden">
              <MenuButton open={open} onClick={() => setOpen((v) => !v)} />
            </div>
          </div>
        </div>
        <div className="mx-5 h-px bg-silver/30 md:mx-10" />
      </header>

      <AnimatePresence>
        {compact && !open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-9 z-40 border-b border-silver/30 bg-ink/95 backdrop-blur-sm"
          >
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
              <Wordmark size="sm" />
              <nav aria-label="Sections" className="hidden xl:block">
                <ul className="flex gap-7">
                  {v2Nav.slice(0, 4).map((n) => (
                    <li key={n.href}>
                      <a href={n.href} className="kicker inline-flex min-h-11 items-center text-pearl/75 hover:text-rose">
                        {n.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex items-center gap-3">
                <BookButton className="!hidden !min-h-11 !px-5 !py-2 !text-[0.7rem] md:!inline-flex" />
                <div className="xl:hidden">
                  <MenuButton open={open} onClick={() => setOpen(true)} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            id="v2-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-x-0 bottom-0 top-9 z-50 overflow-y-auto bg-ink"
          >
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
              <Wordmark size="sm" />
              <MenuButton open onClick={() => setOpen(false)} />
            </div>
            <ul className="mx-auto max-w-md px-6 pb-16 pt-10">
              {v2Nav.map((n) => (
                <li key={n.href} className="border-b border-silver/20">
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="v2-display flex min-h-16 items-center text-[2.1rem] italic text-pearl transition-colors hover:text-rose"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li className="pt-6">
                <Link href="/" onClick={() => setOpen(false)} className="kicker inline-flex min-h-11 items-center text-mist hover:text-pearl">
                  See Option 1
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
