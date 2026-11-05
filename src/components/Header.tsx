"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { primaryNav, telHref } from "@/lib/site";
import { business, services } from "@/site.config";
import { BookButton } from "./BookButton";
import { Wordmark } from "./Wordmark";
import { FanMark } from "./deco";

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
      <span className="label hidden text-[0.7rem] text-pearl sm:inline">{open ? "Close" : "Menu"}</span>
      <span className="relative block h-3 w-7">
        <span
          className={`absolute left-0 top-0 h-px w-7 bg-silver transition-transform duration-500 ${open ? "translate-y-1.5 rotate-45" : ""}`}
        />
        <span
          className={`absolute bottom-0 left-0 h-px w-7 bg-silver transition-transform duration-500 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
        />
      </span>
    </button>
  );
}

function HeaderPhone() {
  const tel = telHref();
  const cls = "hidden text-[0.78rem] uppercase tracking-[0.2em] text-pearl/80 md:inline-flex md:min-h-11 md:items-center";
  return tel ? (
    <a href={tel} className={`${cls} hover:text-rose`}>
      <span className="mr-2 text-rose">Call or text</span> {business.PHONE}
    </a>
  ) : (
    <p className={cls}>
      <span className="mr-2 text-rose">Call or text</span> {business.PHONE}
    </p>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 520);
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

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-pearl focus:px-4 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>

      {/* Full header, sits over each page's dark opening band */}
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 pt-5 md:grid md:grid-cols-[1fr_auto_1fr] md:px-10 md:pt-7">
          <HeaderPhone />
          <div className="md:hidden">
            <Wordmark size="sm" stacked={false} />
          </div>
          <div className="hidden md:block">
            <Wordmark size="md" />
          </div>
          <div className="flex items-center justify-end gap-4">
            <BookButton variant="outline-light" className="!hidden !min-h-11 !px-5 !text-[0.72rem] lg:!inline-flex" />
            <div className="lg:hidden">
              <MenuButton open={open} onClick={() => setOpen((v) => !v)} />
            </div>
          </div>
        </div>

        <nav aria-label="Primary" className="mx-auto mt-6 hidden max-w-[1100px] px-10 lg:block">
          <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent" />
          <ul className="flex items-center justify-center gap-x-1 py-1">
            {primaryNav.map((item, i) => (
              <li key={item.href} className="flex items-center">
                {i === services.length && <span aria-hidden className="mx-3 h-4 w-px bg-silver/50" />}
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center whitespace-nowrap px-3 text-[0.74rem] font-normal uppercase tracking-[0.22em] transition-colors ${
                    isActive(item.href) ? "text-rose" : "text-pearl/85 hover:text-rose"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-px bg-gradient-to-r from-transparent via-silver/50 to-transparent" />
        </nav>
      </header>

      {/* Compact bar, slides in once the visitor scrolls past the opening band */}
      <AnimatePresence>
        {compact && !open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-40 border-b border-silver/40 bg-ink/95 backdrop-blur-sm"
          >
            <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 md:px-10">
              <Wordmark size="sm" stacked={false} />
              <div className="flex items-center gap-3">
                <BookButton variant="rose" className="!hidden !min-h-11 !px-5 !py-2 !text-[0.7rem] md:!inline-flex" />
                <MenuButton open={open} onClick={() => setOpen(true)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen menu */}
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
            className="fan-texture fixed inset-0 z-50 overflow-y-auto bg-ink"
          >
            <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 md:px-10">
              <Wordmark size="sm" stacked={false} />
              <MenuButton open onClick={() => setOpen(false)} />
            </div>
            <div className="mx-auto flex max-w-md flex-col items-center px-6 pb-16 pt-8 text-center">
              <FanMark size={44} />
              <p className="label mt-5 text-rose">Treatments</p>
              <ul className="mt-3 space-y-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${s.slug}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(`/${s.slug}`) ? "page" : undefined}
                      className="inline-flex min-h-12 items-center font-serif text-[2rem] leading-tight text-pearl transition-colors hover:text-rose aria-[current=page]:text-rose"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <span aria-hidden className="my-6 h-px w-24 bg-silver/60" />
              <ul className="space-y-1">
                {primaryNav.slice(services.length).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="inline-flex min-h-11 items-center text-[0.85rem] uppercase tracking-[0.24em] text-pearl/85 transition-colors hover:text-rose aria-[current=page]:text-rose"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-11 items-center text-[0.85rem] uppercase tracking-[0.24em] text-pearl/85 transition-colors hover:text-rose"
                  >
                    Home
                  </Link>
                </li>
              </ul>
              <div className="mt-8">
                <BookButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
