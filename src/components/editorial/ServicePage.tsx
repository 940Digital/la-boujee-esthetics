import Link from "next/link";
import type { Metadata } from "next";
import { business, type ServiceSlug } from "@/site.config";
import { fill, getService, settingCopy } from "@/lib/site";
import { BookButton } from "../BookButton";
import { ImageSlot } from "../ImageSlot";
import { PriceList } from "../PriceList";
import { JsonLd } from "../JsonLd";
import { Fade, Reveal, RuleDraw, Stagger, StaggerItem } from "../motion";
import { Opener } from "./Opener";
import { CloseUp } from "./Spreads";

/** Section headings that read naturally for each treatment. */
const copy: Record<ServiceSlug, { about: string; goodFor: string; cta: string }> = {
  facials: { about: "What makes a facial custom", goodFor: "What a custom facial can do for you", cta: "Book a custom facial" },
  waxing: { about: "Waxing, done with care", goodFor: "What waxing can do for you", cta: "Book a waxing appointment" },
  tinting: { about: "Why tint your brows and lashes", goodFor: "What tinting can do for you", cta: "Book brow and lash tinting" },
  "eyelash-lifts": { about: "How an eyelash lift works", goodFor: "What a lash lift can do for you", cta: "Book an eyelash lift" },
  "chemical-peels": { about: "What a chemical peel does", goodFor: "What a chemical peel can do for you", cta: "Book a chemical peel" },
};

const acts = ["Act I", "Act II", "Act III"];

export function serviceMetadata(slug: ServiceSlug): Metadata {
  const s = getService(slug);
  return {
    title: fill(s.metaTitle),
    description: fill(s.metaDescription),
    alternates: { canonical: `/${s.slug}` },
    openGraph: { title: fill(s.metaTitle), description: fill(s.metaDescription), url: `/${s.slug}`, images: ["/og.png"] },
  };
}

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const s = getService(slug);
  const related = s.related.map(getService);
  const url = business.SITE_URL;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      serviceType: s.name,
      description: fill(s.metaDescription),
      url: `${url}/${s.slug}`,
      provider: { "@id": `${url}/#business` },
      areaServed: business.SERVICE_AREA,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${url}/` },
        { "@type": "ListItem", position: 2, name: s.name, item: `${url}/${s.slug}` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Opener
        kicker="The treatments"
        title={fill(s.h1)}
        standfirst={s.benefit}
        crumbs={[{ href: `/${s.slug}`, name: s.name }]}
        photo={s.image}
      >
        <BookButton />
      </Opener>

      {/* The feature: what it is, with an at-a-glance sidebar */}
      <section aria-labelledby="about-service" className="bg-pearl py-24 text-ink md:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 md:px-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="kicker text-rose-ink">The feature</p>
              <h2 id="about-service" className="display mt-4 max-w-[18ch] text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
                {copy[s.slug].about}
              </h2>
              <RuleDraw className="mt-7 w-24 bg-rose" />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-9 max-w-[62ch] space-y-5 text-[1.05rem] text-graphite">
                <p className="dropcap">{s.intro[0]}</p>
                {s.intro.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="text-ink">{fill(s.entitySentence)}</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <aside aria-label="At a glance" className="border-t-2 border-ink pt-4 lg:mt-24">
              <h3 className="kicker text-ink">At a glance</h3>
              <dl className="mt-3">
                <div className="border-b border-ink/12 py-3">
                  <dt className="kicker !text-[0.66rem] text-rose-ink">Where it happens</dt>
                  <dd className="mt-1 text-[0.95rem] leading-snug">{settingCopy[s.setting]}</dd>
                </div>
                <div className="border-b border-ink/12 py-3">
                  <dt className="kicker !text-[0.66rem] text-rose-ink">Who you&apos;ll see</dt>
                  <dd className="mt-1 text-[0.95rem] leading-snug">
                    {business.OWNER_NAME}, {business.credential.toLowerCase()}
                  </dd>
                </div>
              </dl>
              <Link href="/mobile-service" className="kicker deco-link mt-3 inline-flex min-h-11 items-center text-rose-ink">
                How home visits work
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* What it can do: a ruled two-column list */}
      <section aria-labelledby="good-for" className="relative overflow-hidden bg-ink py-24 text-pearl md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal>
            <h2 id="good-for" className="display max-w-[20ch] text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)] italic">
              {copy[s.slug].goodFor}
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-x-14 md:grid-cols-2">
            {s.goodFor.map((g) => (
              <StaggerItem key={g.title} className="border-t border-silver/30 py-7">
                <h3 className="display text-[1.6rem]">{g.title}</h3>
                <p className="mt-2 text-mist">{g.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The appointment, in three acts */}
      <section aria-labelledby="expect" className="relative overflow-hidden bg-wine py-24 text-pearl md:py-28">
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
          <Stagger as="li" className="mt-14 grid md:grid-cols-3">
            {s.expect.map((e, i) => (
              <StaggerItem
                as="li"
                key={e.title}
                className={`px-2 py-8 text-center md:px-8 md:py-4 ${i > 0 ? "border-t border-silver/25 md:border-l md:border-t-0" : ""}`}
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
      <section aria-labelledby="care" className="bg-pearl-2 py-24 text-ink md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <h2 id="care" className="display text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
              Before and After
            </h2>
            <p className="max-w-[40ch] text-graphite">General guidance. You&apos;ll get notes specific to your appointment.</p>
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            {[
              { title: "Before your appointment", items: s.before },
              { title: "Aftercare", items: s.after },
            ].map((col, ci) => (
              <Reveal key={col.title} delay={ci * 0.1}>
                <div className="border-t-2 border-ink pt-5">
                  <h3 className="kicker text-rose-ink">{col.title}</h3>
                  <ul className="mt-4">
                    {col.items.map((t) => (
                      <li key={t} className="border-b border-ink/12 py-4 text-graphite">
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

      <PriceList service={s} />

      {/* Pairs well with: three small lookbook plates */}
      <section aria-labelledby="related" className="bg-pearl py-24 md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="kicker text-rose-ink">Pairs well with</p>
              <h2 id="related" className="display mt-4 text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)] text-ink">
                More from the lookbook
              </h2>
            </div>
            <Link href="/#treatments" className="kicker deco-link inline-flex min-h-11 items-center text-ink">
              All treatments
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {related.map((r, i) => (
              <Fade key={r.slug} delay={0.08 * i}>
                <Link href={`/${r.slug}`} className="group relative block overflow-hidden bg-ink">
                  <div className="bw grain">
                    <ImageSlot
                      slot={{ ...r.image, aspect: "4 / 5" }}
                      sizes="(min-width: 768px) 33vw, 92vw"
                      className="transition-transform duration-[1.4s] ease-[var(--ease-deco)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h3 className="display text-[1.7rem] text-pearl">{r.name}</h3>
                    <p className="mt-1 text-[0.95rem] text-pearl/80">{r.benefit}</p>
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
