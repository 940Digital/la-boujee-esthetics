"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookButton } from "./BookButton";
import { useInPageCta } from "@/lib/useInPageCta";

/**
 * Sticky booking bar on phones. It steps aside whenever the page's own button
 * is on screen, so there is only ever one "Book Your Appointment" in view, and
 * it never shows on the page the button points to.
 */
export function MobileBookBar() {
  const { pageCtaVisible, onBookingPage } = useInPageCta();
  const show = !pageCtaVisible && !onBookingPage;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-silver/50 bg-ink/95 px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-sm md:hidden"
        >
          <BookButton chrome className="w-full !min-h-[50px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
