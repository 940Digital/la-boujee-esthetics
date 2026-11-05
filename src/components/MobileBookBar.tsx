"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BookButton } from "./BookButton";

/**
 * Sticky booking bar on phones. It waits until the visitor scrolls past the
 * opening band (which has its own button), so the first screen shows one CTA.
 */
export function MobileBookBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 380);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-blush/50 bg-ink/95 px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-sm md:hidden"
        >
          <BookButton className="w-full !min-h-[50px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
