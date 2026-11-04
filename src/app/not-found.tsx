import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { FanMark } from "@/components/deco";

export default function NotFound() {
  return (
    <section className="fan-texture flex min-h-[90svh] items-center bg-ink px-6 pb-20 pt-36 text-center text-pearl md:pt-56">
      <div className="mx-auto max-w-[640px]">
        <FanMark size={64} className="mx-auto" />
        <p className="label mt-6 text-brass">Page not found</p>
        <h1 className="display mt-4 text-[clamp(2.6rem,2rem+3vw,4.4rem)]">This scene was cut</h1>
        <p className="lede mx-auto mt-5 max-w-[42ch] text-mist">
          The page you were looking for isn&apos;t here. The treatments, and the booking, are right where you left
          them.
        </p>
        <div className="mt-9 flex flex-col items-center gap-5">
          <BookButton />
          <Link href="/" className="deco-link inline-flex min-h-11 items-center text-[0.8rem] uppercase tracking-[0.22em] text-pearl">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
