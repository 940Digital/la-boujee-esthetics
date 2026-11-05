import { showPrices, type Service } from "@/site.config";
import { Reveal } from "./motion";

/**
 * Per-service price list, set like a magazine's price box. Fully built, but
 * renders nothing until showPrices is true and real prices are in site.config.ts.
 */
export function PriceList({ service }: { service: Service }) {
  if (!showPrices || service.menu.length === 0) return null;
  return (
    <section aria-labelledby="prices-title" className="bg-pearl py-20 text-ink md:py-24">
      <div className="mx-auto max-w-[760px] px-6">
        <Reveal>
          <div className="border-y-2 border-ink py-8">
            <p className="kicker text-rose-ink">The price list</p>
            <h2 id="prices-title" className="display mt-3 text-[clamp(2rem,1.5rem+2vw,3rem)]">
              {service.name}
            </h2>
            <dl className="mt-6">
              {service.menu.map((m) => (
                <div key={m.name} className="flex items-baseline gap-4 border-b border-ink/12 py-4 last:border-b-0">
                  <dt className="display text-[1.35rem]">
                    {m.name}
                    {m.note ? <span className="mt-1 block font-sans text-sm text-graphite">{m.note}</span> : null}
                  </dt>
                  <span aria-hidden className="mb-[0.3em] flex-1 border-b border-dotted border-ink/35" />
                  <dd className="display text-[1.35rem] text-rose-ink">{m.price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
