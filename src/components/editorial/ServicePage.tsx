import Link from "next/link";
import { business, type ServiceSlug } from "@/site.config";
import { fill, getService, priceGroupsFor, servicePath } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { BookButton } from "../BookButton";
import { ImageSlot } from "../ImageSlot";
import { PriceGroups, SettingTag } from "../PriceList";
import { JsonLd } from "../JsonLd";
import { Fade, Reveal, RuleDraw, Stagger, StaggerItem } from "../motion";
import { Opener } from "./Opener";
import { CloseUp } from "./Spreads";

/** Section headings that read naturally for each page. */
const copy: Record<ServiceSlug, { about: string; cta: string }> = {
  facials: { about: "Skin treatments, chosen for you", cta: "Book a facial or peel" },
  waxing: { about: "Waxing, done with care", cta: "Book a waxing appointment" },
  "brows-and-lashes": { about: "Brows, lashes and makeup", cta: "Book brows, lashes or makeup" },
};

const acts = ["Act I", "Act II", "Act III"];

export function serviceMetadata(slug: ServiceSlug) {
  const s = getService(slug);
  return pageMetadata({ title: fill(s.metaTitle), description: fill(s.metaDescription), path: servicePath(s.slug) });
}

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const s = getService(slug);
  const related = s.related.map(getService);
  const groups = priceGroupsFor(slug);
  // Tag each treatment only when the page mixes settings; otherwise the opener already says where.
  const mixed = s.offerings.some((o) => o.setting !== s.offerings[0].setting);
  const url = business.SITE_URL;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      serviceType: s.offerings.map((o) => o.name),
      description: fill(s.metaDescription),
      url: `${url}${servicePath(s.slug)}`,
      provider: { "@id": `${url}/#business` },
      areaServed: { "@type": "City", name: `${business.CITY}, ${business.STATE}` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${url}/` },
        { "@type": "ListItem", position: 2, name: "Services and Prices", item: `${url}/services` },
        { "@type": "ListItem", position: 3, name: s.name, item: `${url}${servicePath(s.slug)}` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Opener
        kicker={s.where}
        title={fill(s.h1)}
        standfirst={s.benefit}
        crumbs={[
          { href: "/services", name: "Services and Prices" },
          { href: servicePath(s.slug), name: s.name },
        ]}
        photo={s.image}
      >
        <BookButton />
      </Opener>

      {/* What I offer here, with where each one happens */}
      <section aria-labelledby="about-service" className="bg-pearl py-20 text-ink md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal>
            <h2 id="about-service" className="display max-w-[20ch] text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
              {copy[s.slug].about}
            </h2>
            <RuleDraw className="mt-6 w-24 bg-rose" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-[62ch] space-y-4 text-graphite">
              {s.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Stagger as="ul" className="mt-10 grid gap-x-14 border-t-2 border-ink md:grid-cols-2">
            {s.offerings.map((o) => (
              <StaggerItem as="li" key={o.name} className="border-b border-ink/12 py-6 md:[&:last-child:nth-child(odd)]:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <h3 className="display text-[1.6rem] leading-tight">{o.name}</h3>
                  {mixed ? <SettingTag setting={o.setting} /> : null}
                </div>
                <p className="mt-2 text-graphite">{o.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 max-w-[62ch] text-ink">
            {fill(s.entitySentence)}{" "}
            <Link href="/mobile-service" className="deco-link text-rose-ink underline decoration-rose-ink/40 underline-offset-4">
              How home visits work
            </Link>
          </p>
        </div>
      </section>

      {/* Prices for this page, straight from priceMenu */}
      <section aria-labelledby="prices-title" className="bg-pearl-2 py-20 text-ink md:py-28">
        <div className="mx-auto max-w-[760px] px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <h2 id="prices-title" className="display text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
              Prices
            </h2>
            <Link href="/services" className="kicker deco-link inline-flex min-h-11 items-center text-rose-ink">
              Full price list
            </Link>
          </Reveal>
          <div className="mt-8">
            <PriceGroups groups={groups} />
          </div>
        </div>
      </section>

      {/* The appointment, in three acts */}
      <section aria-labelledby="expect" className="relative overflow-hidden bg-wine py-20 text-pearl md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 55% 60% at 50% 0%, rgba(212,80,140,0.2), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal className="text-center">
            <p className="kicker text-rose-soft">What to expect</p>
            <h2 id="expect" className="display mt-4 text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)] italic">
              The appointment, in three acts
            </h2>
          </Reveal>
          <Stagger as="ol" className="mt-12 grid md:grid-cols-3">
            {s.expect.map((e, i) => (
              <StaggerItem
                as="li"
                key={e.title}
                className={`px-2 py-7 text-center md:px-8 md:py-4 ${i > 0 ? "border-t border-silver/25 md:border-l md:border-t-0" : ""}`}
              >
                <p className="kicker text-silver">{acts[i]}</p>
                <h3 className="display mt-3 text-[1.9rem] leading-tight">{e.title}</h3>
                <p className="mx-auto mt-3 max-w-[30ch] text-mauve">{e.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Before and after */}
      <section aria-labelledby="care" className="bg-pearl py-20 text-ink md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal>
            <h2 id="care" className="display text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
              Before and After
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            {[
              { title: "Before your appointment", items: s.before },
              { title: "Aftercare", items: s.after },
            ].map((col, ci) => (
              <Reveal key={col.title} delay={ci * 0.1}>
                <div className="border-t-2 border-ink pt-4">
                  <h3 className="kicker text-rose-ink">{col.title}</h3>
                  <ul className="mt-3">
                    {col.items.map((t) => (
                      <li key={t} className="border-b border-ink/12 py-3.5 text-graphite">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The other two treatment pages */}
      <section aria-labelledby="related" className="bg-pearl-2 py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal>
            <h2 id="related" className="display text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)] text-ink">
              Also on the menu
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 md:gap-4">
            {related.map((r, i) => (
              <Fade key={r.slug} delay={0.08 * i}>
                <Link href={servicePath(r.slug)} className="group relative block overflow-hidden bg-ink">
                  <div className="bw grain">
                    <ImageSlot
                      slot={{ ...r.image, aspect: "4 / 5" }}
                      sizes="(min-width: 768px) 45vw, 46vw"
                      className="transition-transform duration-[1.4s] ease-[var(--ease-deco)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                    <h3 className="display text-[1.35rem] leading-tight text-pearl md:text-[2rem]">{r.navName}</h3>
                  </div>
                </Link>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <CloseUp title={copy[s.slug].cta} kicker="Ready for your close-up?" showContact={false} />
    </>
  );
}
