"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { business } from "@/site.config";
import { primaryNav, telHref } from "@/lib/site";
import { useInPageCta } from "@/lib/useInPageCta";
import { BookButton } from "../BookButton";
import { Wordmark } from "../Wordmark";

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="site-menu"
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

/**
 * Running header, like the top margin of a magazine page. On the homepage the
 * cover's masthead is the logo, so the header logo waits for the compact bar.
 * The header carries no button of its own at the top of the page: every page
 * opens with its own "Book Your Appointment", and the compact bar only offers
 * one when the page's button has scrolled away.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const tel = telHref();
  const { pageCtaVisible, onBookingPage } = useInPageCta();

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

  const linkCls = (href: string) =>
    `kicker inline-flex min-h-11 items-center whitespace-nowrap !tracking-[0.16em] transition-colors ${
      pathname === href ? "text-rose" : "text-pearl/85 hover:text-rose"
    }`;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-pearl focus:px-4 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>

      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 md:px-10">
          {isHome ? (
            tel ? (
              <a href={tel} className="kicker hidden min-h-11 items-center text-pearl/85 hover:text-rose md:inline-flex">
                Call or text {business.PHONE}
              </a>
            ) : (
              <span />
            )
          ) : (
            <Wordmark size="sm" />
          )}
          {isHome ? <span aria-hidden className="md:hidden" /> : null}
          <div className="xl:hidden">
            <MenuButton open={open} onClick={() => setOpen((v) => !v)} />
          </div>
        </div>
        <div className="mx-5 h-px bg-silver/30 md:mx-10" />
        {/* section index, set under the rule like a magazine's running head */}
        <nav aria-label="Primary" className="mx-auto hidden max-w-[1400px] justify-center px-10 xl:flex">
          <ul className="flex items-center gap-x-6 2xl:gap-x-8">
            {primaryNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={pathname === n.href ? "page" : undefined} className={linkCls(n.href)}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <AnimatePresence>
        {compact && !open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-40 border-b border-silver/30 bg-ink/95 backdrop-blur-sm"
          >
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 md:px-10">
              <Wordmark size="sm" />
              <div className="flex items-center gap-3">
                {pageCtaVisible || onBookingPage ? null : (
                  <BookButton chrome className="!hidden !min-h-11 !px-5 !py-2 !text-[0.7rem] md:!inline-flex" />
                )}
                <MenuButton open={open} onClick={() => setOpen(true)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-ink"
          >
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
              <Wordmark size="sm" />
              <MenuButton open onClick={() => setOpen(false)} />
            </div>
            <nav aria-label="Menu" className="mx-auto max-w-md px-6 pb-16 pt-6">
              <ul>
                {primaryNav.map((n) => (
                  <li key={n.href} className="border-b border-silver/20">
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === n.href ? "page" : undefined}
                      className="display flex min-h-14 items-center py-1 text-[1.75rem] italic text-pearl transition-colors hover:text-rose aria-[current=page]:text-rose"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {tel ? (
                <a href={tel} className="kicker mt-8 inline-flex min-h-11 items-center text-pearl/85 hover:text-rose">
                  Call or text {business.PHONE}
                </a>
              ) : null}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
