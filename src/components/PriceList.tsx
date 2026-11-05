import { showPrices, type Service } from "@/site.config";
import { StepFrame } from "./deco";
import { Reveal } from "./motion";

/**
 * Per-service price list in the theatre-program style. Fully built, but renders
 * nothing until showPrices is true and real prices are in site.config.ts.
 */
export function PriceList({ service }: { service: Service }) {
  if (!showPrices || service.menu.length === 0) return null;
  return (
    <section aria-labelledby="prices-title" className="bg-pearl py-20 md:py-24">
      <div className="mx-auto max-w-[720px] px-6">
        <Reveal>
          <div className="relative px-6 py-12 ring-1 ring-ink/10 md:px-14">
            <StepFrame tone="silver-ink" inset={10} step={14} />
            <h2 id="prices-title" className="h2 text-center text-ink">
              {service.name} Prices
            </h2>
            <dl className="mt-8">
              {service.menu.map((m) => (
                <div key={m.name} className="flex items-baseline gap-4 border-b border-ink/10 py-4 last:border-b-0">
                  <dt className="font-serif text-[1.35rem] text-ink">
                    {m.name}
                    {m.note ? <span className="mt-1 block font-sans text-sm text-graphite">{m.note}</span> : null}
                  </dt>
                  <span aria-hidden className="mb-[0.3em] flex-1 border-b border-dotted border-ink/35" />
                  <dd className="font-serif text-[1.35rem] text-rose-ink">{m.price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
