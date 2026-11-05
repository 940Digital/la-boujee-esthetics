import Link from "next/link";
import { BookButton } from "@/components/BookButton";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-ink px-6 pb-20 pt-40 text-pearl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 105%, rgba(212,80,140,0.3), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[680px] text-center">
        <p className="kicker text-rose">Page not found</p>
        <h1 className="display mt-5 text-[clamp(3rem,2rem+4vw,5.6rem)] italic">This scene was cut</h1>
        <p className="mx-auto mt-6 max-w-[42ch] text-mist">
          The page you were looking for isn&apos;t here. The treatments, and the booking, are right where you left them.
        </p>
        <div className="mt-10 flex flex-col items-center gap-5">
          <BookButton />
          <Link href="/" className="kicker deco-link inline-flex min-h-11 items-center text-pearl">
            Back to the cover
          </Link>
        </div>
      </div>
    </section>
  );
}
