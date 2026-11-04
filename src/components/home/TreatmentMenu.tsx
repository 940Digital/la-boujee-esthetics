import Link from "next/link";
import { services, showPrices } from "@/site.config";
import { FanMark, StepFrame } from "../deco";
import { Reveal, RuleDraw, Stagger, StaggerItem } from "../motion";

/** A row of marquee bulbs, drawn with a repeating radial gradient. */
function Bulbs() {
  return (
    <div
      aria-hidden
      className="h-2 w-full"
      style={{
        backgroundImage: "radial-gradient(circle, #7A5C28 1.6px, transparent 2.2px)",
        backgroundSize: "18px 8px",
        backgroundPosition: "center",
      }}
    />
  );
}

/** Lowest price shown on a service, for the menu's right-hand column. */
function fromPrice(slug: string) {
  const s = services.find((x) => x.slug === slug);
  return s?.menu[0]?.price ?? "";
}

export function TreatmentMenu() {
  return (
    <section aria-labelledby="menu-title" className="bg-pearl py-24 md:py-32">
      <div className="mx-auto max-w-[880px] px-5 md:px-10">
        <Reveal y={24}>
          <div className="relative bg-pearl px-6 py-14 shadow-[0_30px_80px_-40px_rgba(18,18,18,0.35)] ring-1 ring-ink/10 md:px-16 md:py-20">
            <StepFrame tone="brass-ink" inset={12} step={16} opacity={0.8} />
            <div className="mx-auto max-w-[520px]">
              <Bulbs />
            </div>

            <header className="mt-8 text-center">
              <FanMark size={46} tone="brass-ink" className="mx-auto" />
              <p className="label mt-4 text-rose-ink">La&apos; Boujee Esthetics presents</p>
              <h2 id="menu-title" className="display mt-3 text-[clamp(2.5rem,1.9rem+2.6vw,4rem)] text-ink">
                The Treatment Menu
              </h2>
              <RuleDraw className="mx-auto mt-6 w-40 bg-brass-ink" />
            </header>

            <Stagger className="mt-10" as="li">
              {services.map((s) => (
                <StaggerItem key={s.slug} as="li" className="border-b border-ink/12 last:border-b-0">
                  <Link href={`/${s.slug}`} className="group block py-6 md:py-7">
                    <div className="flex items-baseline gap-4">
                      <h3 className="font-serif text-[1.7rem] font-medium leading-tight text-ink transition-colors group-hover:text-rose-ink md:text-[2rem]">
                        {s.name}
                      </h3>
                      <span aria-hidden className="mb-[0.35em] hidden flex-1 border-b border-dotted border-ink/35 sm:block" />
                      <span className="label ml-auto shrink-0 text-[0.7rem] text-rose-ink sm:ml-0">
                        {showPrices ? `From ${fromPrice(s.slug)}` : "Details"}
                      </span>
                    </div>
                    <p className="mt-2 max-w-[52ch] text-[0.98rem] text-graphite">{s.benefit}</p>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mx-auto mt-10 max-w-[520px]">
              <Bulbs />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
