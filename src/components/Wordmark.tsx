import Link from "next/link";
import { FanMark } from "./deco";

/** Typeset logo. Swap for a real logo file in PLACEHOLDERS.md if she has one. */
export function Wordmark({ size = "md", stacked = true }: { size?: "sm" | "md" | "lg"; stacked?: boolean }) {
  const name = size === "lg" ? "text-[2.6rem]" : size === "md" ? "text-[1.85rem]" : "text-[1.45rem]";
  return (
    <Link
      href="/"
      aria-label="La' Boujee Esthetics, home"
      className={`group inline-flex min-h-11 items-center text-pearl ${stacked ? "flex-col gap-1" : "flex-row gap-3"}`}
    >
      <FanMark size={size === "sm" ? 26 : 34} className="transition-transform duration-700 group-hover:-translate-y-0.5" />
      <span className={`flex flex-col ${stacked ? "items-center" : "items-start"} leading-none`}>
        <span className={`font-serif ${name} font-medium tracking-[0.02em]`}>La&rsquo; Boujee</span>
        <span className="mt-1 font-deco text-[0.7rem] tracking-[0.5em] text-brass">ESTHETICS</span>
      </span>
    </Link>
  );
}
