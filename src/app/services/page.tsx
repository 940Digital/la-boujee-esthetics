import Link from "next/link";
import { business, policies, services } from "@/site.config";
import { BookButton } from "@/components/BookButton";
import { JsonLd } from "@/components/JsonLd";
import { PriceGroups } from "@/components/PriceList";
import { Reveal } from "@/components/motion";
import { Opener } from "@/components/editorial/Opener";
import { CloseUp } from "@/components/editorial/Spreads";
import { isPlaceholder, priceGroupsFor, servicePath } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Esthetics Services and Prices in Denton | Lá Boujee",
  description:
    "Full price list for facials, chemical peels, waxing, tinting, lash lifts and makeup in Denton, TX, with what's offered at home and what's studio only.",
  path: "/services",
});

export default function ServicesPage() {
  const notes = [
    { title: "Payment", body: policies.PAYMENT_METHODS },
    { title: "Cancellations", body: policies.CANCELLATION },
    { title: "Travel", body: policies.TRAVEL_FEE },
  ].filter((n) => !isPlaceholder(n.body));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${business.SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Services and Prices", item: `${business.SITE_URL}/services` },
          ],
        }}
      />
      <Opener
        kicker="The menu"
        title={`Services and Prices in ${business.CITY}`}
        standfirst="Everything I offer, with prices. Each section shows whether it can come to your home or happens in my studio."
        crumbs={[{ href: "/services", name: "Services and Prices" }]}
      >
        <BookButton />
      </Opener>

      <section aria-label="Price list" className="bg-pearl py-16 text-ink md:py-24">
        <div className="mx-auto max-w-[760px] px-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} className={i > 0 ? "mt-16 md:mt-20" : undefined}>
              <article aria-labelledby={`menu-${s.slug}`}>
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
                  <h2 id={`menu-${s.slug}`} className="display text-[clamp(2.1rem,1.5rem+2.4vw,3.2rem)]">
                    {s.name}
                  </h2>
                  <Link href={servicePath(s.slug)} className="kicker deco-link inline-flex min-h-11 items-center text-rose-ink">
                    About these treatments
                  </Link>
                </div>
                <div className="mt-6">
                  <PriceGroups groups={priceGroupsFor(s.slug)} />
                </div>
              </article>
            </Reveal>
          ))}

          {notes.length ? (
            <Reveal className="mt-16 md:mt-20">
              <div className="bg-pearl-2 px-6 py-6 md:px-8">
                <h2 className="kicker text-rose-ink">Good to know</h2>
                <dl className="mt-3">
                  {notes.map((n) => (
                    <div key={n.title} className="grid gap-1 border-b border-ink/12 py-3 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-4">
                      <dt className="font-semibold text-ink">{n.title}</dt>
                      <dd className="text-graphite">{n.body}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-graphite">
                  Questions about a treatment?{" "}
                  <Link href="/book" className="text-rose-ink underline decoration-rose-ink/40 underline-offset-4">
                    Call, text or email me
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <CloseUp title="Ready for your close-up?" showContact={false} />
    </>
  );
}
