import type { Faq } from "@/lib/faq";
import { JsonLd } from "./JsonLd";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { Ornament } from "./deco";

export function FaqSection({
  faqs,
  title = "Questions, Answered",
  id = "faq",
  subtitle = "Hygiene, prep, mobile visits and aftercare.",
}: {
  faqs: Faq[];
  title?: string;
  id?: string;
  subtitle?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: [...f.a, ...(f.policy ?? [])].join(" ") },
    })),
  };

  return (
    <section aria-labelledby={`${id}-title`} className="relative bg-ink py-24 text-pearl md:py-32">
      <JsonLd data={schema} />
      <div className="mx-auto max-w-[860px] px-6 md:px-10">
        <Reveal className="text-center">
          <Ornament className="mx-auto" />
          <h2 id={`${id}-title`} className="h2 mt-6">
            {title}
          </h2>
          <p className="mt-4 text-mist">{subtitle}</p>
        </Reveal>

        <Stagger className="faq mt-12 border-t border-silver/30">
          {faqs.map((f) => (
            <StaggerItem key={f.q} className="border-b border-silver/30">
              <details className="group">
                <summary className="flex min-h-16 items-center justify-between gap-6 py-5">
                  <h3 className="font-serif text-[1.35rem] font-medium leading-snug text-pearl md:text-[1.55rem]">{f.q}</h3>
                  <span
                    aria-hidden
                    className="faq-icon relative h-4 w-4 shrink-0 transition-transform duration-500 ease-[var(--ease-deco)]"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-4 bg-silver" />
                    <span className="absolute left-1/2 top-0 h-4 w-px bg-silver" />
                  </span>
                </summary>
                <div className="space-y-3 pb-7 pr-10 text-mist">
                  {f.a.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {f.policy?.map((p) => (
                    <p key={p} className="text-pearl/80">
                      {p}
                    </p>
                  ))}
                </div>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
