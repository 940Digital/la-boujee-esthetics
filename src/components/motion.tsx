"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/*
  Scroll motion rules for the whole site:
  - every reveal uses viewport once:false so it reverses when scrolled back up
  - small distances, slow ease, nothing bounces
  - MotionConfig reducedMotion="user" drops transforms for reduced-motion users
*/

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: false, amount: 0.25 } as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
};

/** Fade and a short rise. The default for content blocks. */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: RevealProps) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  );
}

/** Fade only, for large surfaces where movement would feel heavy. */
export function Fade({ children, className, delay = 0 }: Omit<RevealProps, "y" | "as">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws outward from its centre. */
export function RuleDraw({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={`block h-px origin-center ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewport}
      transition={{ duration: 1.3, ease, delay }}
    />
  );
}

/**
 * Opens like a curtain: a clip from the centre outward. The in-view trigger
 * sits on an unclipped wrapper, because a fully clipped element never
 * registers as visible.
 */
export function Curtain({ children, className, delay = 0 }: Omit<RevealProps, "y" | "as">) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={viewport}>
      <motion.div
        className="h-full"
        variants={{
          hidden: { clipPath: "inset(0% 50% 0% 50%)", opacity: 0.4 },
          show: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, transition: { duration: 0.9, ease, delay } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/** Parent for a list whose children reveal one after another. */
export function Stagger({ children, className, as = "div" }: Omit<RevealProps, "delay" | "y">) {
  const M = motion[as === "li" ? "ul" : as];
  return (
    <M className={className} variants={staggerParent} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </M>
  );
}

export function StaggerItem({ children, className, as = "div" }: Omit<RevealProps, "delay" | "y">) {
  const M = motion[as];
  return (
    <M className={className} variants={staggerChild}>
      {children}
    </M>
  );
}
