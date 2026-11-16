"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { bookingHref } from "./site";

/**
 * Tracks whether a page's own "Book Your Appointment" button is on screen, so
 * the sticky bar and the compact header can hide theirs and never show a
 * second button in the same viewport. Also reports when the visitor is already
 * on the page the button points to (then there is nothing to show at all).
 */
export function useInPageCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-book-cta="page"]'));
    if (els.length === 0) {
      // Nothing to watch on this page. (The observer below reports its first state on its own.)
      const frame = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(frame);
    }
    const onScreen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target);
        else onScreen.delete(e.target);
      }
      setVisible(onScreen.size > 0);
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return { pageCtaVisible: visible, onBookingPage: pathname === bookingHref() };
}
