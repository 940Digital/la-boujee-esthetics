import { reviews, showReviews } from "@/site.config";
import { StepFrame } from "./deco";
import { Reveal, Stagger, StaggerItem } from "./motion";

/**
 * Client reviews. Fully built, but renders nothing until showReviews is true
 * in site.config.ts and real, permission-granted reviews replace the placeholders.
 */
export function Reviews({ tone = "pearl" }: { tone?: "pearl" | "ink" | "emerald" }) {
  if (!showReviews || reviews.length === 0) return null;
  const dark = tone !== "pearl";
  const bg = tone === "emerald" ? "bg-emerald text-pearl" : tone === "ink" ? "bg-ink text-pearl" : "bg-pearl text-ink";
  const card = tone === "emerald" ? "bg-emerald-deep" : dark ? "bg-ink-2" : "bg-pearl-2";
  return (
    <section aria-labelledby="reviews-title" className={`${bg} py-24 md:py-28`}>
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <Reveal className="text-center">
          <p className={`label ${dark ? "text-brass" : "text-brass-ink"}`}>Kind words</p>
          <h2 id="reviews-title" className="h2 mt-4">
            What Clients Say
          </h2>
        </Reveal>
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <StaggerItem key={i}>
              <figure className={`relative h-full px-8 py-12 text-center ${card}`}>
                <StepFrame tone={dark ? "brass" : "brass-ink"} inset={8} step={12} opacity={0.6} />
                <span aria-hidden className={`font-serif text-6xl leading-none ${dark ? "text-brass" : "text-brass-ink"}`}>
                  &ldquo;
                </span>
                <blockquote className="mt-2 font-serif text-[1.35rem] leading-snug">{r.quote}</blockquote>
                <figcaption className={`label mt-6 ${dark ? "text-brass" : "text-brass-ink"}`}>
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
