"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { business, services } from "@/site.config";
import { primaryNav, telHref } from "@/lib/site";
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

function NavLinks({ pathname, className = "" }: { pathname: string; className?: string }) {
  return (
    <ul className={`flex items-center gap-x-5 2xl:gap-x-7 ${className}`}>
      {primaryNav.map((n, i) => (
        <li key={n.href} className="flex items-center">
          {i === services.length ? <span aria-hidden className="mr-5 h-4 w-px bg-silver/40 2xl:mr-7" /> : null}
          <Link
            href={n.href}
            aria-current={pathname === n.href ? "page" : undefined}
            className={`kicker inline-flex min-h-11 items-center whitespace-nowrap !tracking-[0.2em] transition-colors ${
              pathname === n.href ? "text-rose" : "text-pearl/80 hover:text-rose"
            }`}
          >
            {n.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Running header, like the top margin of a magazine page. On the homepage the
 * cover's masthead is the logo, so the header logo waits for the compact bar.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-pearl focus:px-4 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>

      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 md:px-10">
          {isHome ? (
            tel ? (
              <a href={tel} className="kicker hidden min-h-11 items-center text-pearl/80 hover:text-rose md:inline-flex">
                Call or text {business.PHONE}
              </a>
            ) : (
              <span />
            )
          ) : (
            <Wordmark size="sm" />
          )}
          {isHome ? <span aria-hidden className="md:hidden" /> : null}

          <div className="flex items-center gap-4">
            <BookButton variant="outline-light" className="!hidden !min-h-11 !px-5 !text-[0.7rem] lg:!inline-flex" />
            <div className="xl:hidden">
              <MenuButton open={open} onClick={() => setOpen((v) => !v)} />
            </div>
          </div>
        </div>
        <div className="mx-5 h-px bg-silver/30 md:mx-10" />
        {/* section index, set under the rule like a magazine's running head */}
        <nav aria-label="Primary" className="mx-auto hidden max-w-[1400px] justify-center px-10 xl:flex">
          <NavLinks pathname={pathname} />
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
              <nav aria-label="Sections" className="hidden 2xl:block">
                <NavLinks pathname={pathname} />
              </nav>
              <div className="flex items-center gap-3">
                <BookButton className="!hidden !min-h-11 !px-5 !py-2 !text-[0.7rem] md:!inline-flex" />
                <div className="2xl:hidden">
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
            <div className="mx-auto max-w-md px-6 pb-16 pt-8">
              <p className="kicker text-rose">The treatments</p>
              <ul className="mt-2">
                {services.map((s) => (
                  <li key={s.slug} className="border-b border-silver/20">
                    <Link
                      href={`/${s.slug}`}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === `/${s.slug}` ? "page" : undefined}
                      className="display flex min-h-14 items-center text-[2rem] italic text-pearl transition-colors hover:text-rose aria-[current=page]:text-rose"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-8 space-y-1">
                {[{ href: "/", label: "Home" }, ...primaryNav.slice(services.length)].map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === n.href ? "page" : undefined}
                      className="kicker inline-flex min-h-11 items-center text-pearl/85 transition-colors hover:text-rose aria-[current=page]:text-rose"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <BookButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
