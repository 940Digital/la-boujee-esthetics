import Image from "next/image";
import Link from "next/link";
import { business, images, policies, services } from "@/site.config";
import { BookButton } from "@/components/BookButton";
import { JsonLd } from "@/components/JsonLd";
import { PriceGroups } from "@/components/PriceList";
import { Reveal } from "@/components/motion";
import { Opener } from "@/components/editorial/Opener";
import { CloseUp } from "@/components/editorial/Spreads";
import { isPlaceholder, priceGroupsFor, servicePath } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { blurProps } from "@/lib/blur";

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
        photo={images.servicesCover}
      >
        <BookButton />
      </Opener>

      <section aria-label="Price list" className="bg-pearl py-16 text-ink md:py-24">
        <div className="mx-auto max-w-[1160px] px-6 md:px-10">
          {services.map((s, i) => (
            <Reveal key={s.slug} className={i > 0 ? "mt-16 border-t border-ink/12 pt-16 md:mt-24 md:pt-24" : undefined}>
              <article
                aria-labelledby={`menu-${s.slug}`}
                className="grid gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-14"
              >
                {/* One photo per section, so the menu reads as three chapters, not one long list */}
                <figure className="md:sticky md:top-28 md:self-start">
                  <div className="bw grain relative aspect-[3/2] overflow-hidden bg-wine-deep md:aspect-[4/5]">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(min-width: 1160px) 400px, (min-width: 768px) 34vw, 92vw"
                      loading="lazy"
                      {...blurProps(s.image.src)}
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="kicker mt-3 text-graphite">{s.where}</figcaption>
                </figure>
                <div>
                  <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
                    <h2 id={`menu-${s.slug}`} className="display text-[clamp(2.1rem,1.5rem+2.4vw,3.2rem)]">
                      {s.name}
                    </h2>
                    <Link href={servicePath(s.slug)} className="kicker deco-link inline-flex min-h-11 items-center text-rose-ink">
                      About these treatments
                    </Link>
                  </div>
                  <p className="mt-3 max-w-[48ch] italic text-graphite">{s.benefit}</p>
                  <div className="mt-6">
                    <PriceGroups groups={priceGroupsFor(s.slug)} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          {notes.length ? (
            <Reveal className="mx-auto mt-16 max-w-[760px] md:mt-24">
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
