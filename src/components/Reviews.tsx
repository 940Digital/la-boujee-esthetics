import { reviews, showReviews } from "@/site.config";
import { Reveal, Stagger, StaggerItem } from "./motion";

/**
 * Client reviews, set as magazine pull quotes. Fully built, but renders nothing
 * until showReviews is true in site.config.ts and real, permission-granted
 * reviews replace the placeholders.
 */
export function Reviews({ tone = "pearl" }: { tone?: "pearl" | "ink" | "wine" }) {
  if (!showReviews || reviews.length === 0) return null;
  const dark = tone !== "pearl";
  const bg = tone === "wine" ? "bg-wine text-pearl" : tone === "ink" ? "bg-ink text-pearl" : "bg-pearl text-ink";
  const accent = dark ? "text-rose-soft" : "text-rose-ink";
  return (
    <section aria-labelledby="reviews-title" className={`${bg} py-24 md:py-28`}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal>
          <p className={`kicker ${accent}`}>Kind words</p>
          <h2 id="reviews-title" className="display mt-4 text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
            What clients say
          </h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-x-10 md:grid-cols-3">
          {reviews.map((r, i) => (
            <StaggerItem key={i}>
              <figure className={`h-full border-t-2 py-6 ${dark ? "border-silver/50" : "border-ink"}`}>
                <blockquote className="display text-[1.5rem] italic leading-snug">
                  <span aria-hidden className={accent}>&ldquo;</span>
                  {r.quote}
                  <span aria-hidden className={accent}>&rdquo;</span>
                </blockquote>
                <figcaption className={`kicker mt-5 ${accent}`}>
                  {r.name}
                  {r.service ? <span className={`mt-1 block normal-case tracking-normal ${dark ? "text-mist" : "text-graphite"}`}>{r.service}</span> : null}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
