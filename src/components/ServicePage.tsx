import Link from "next/link";
import type { Metadata } from "next";
import { business, type ServiceSlug } from "@/site.config";
import { fill, getService, settingCopy } from "@/lib/site";
import { PageHero } from "./PageHero";
import { BookButton } from "./BookButton";
import { ImageSlot } from "./ImageSlot";
import { CtaBand } from "./CtaBand";
import { PriceList } from "./PriceList";
import { JsonLd } from "./JsonLd";
import { DoorIcon, Ornament, SteppedArch } from "./deco";
import { Curtain, Reveal, RuleDraw, Stagger, StaggerItem } from "./motion";

const numerals = ["I", "II", "III", "IV"];

/** Section headings that read naturally for each treatment. */
const copy: Record<ServiceSlug, { about: string; goodFor: string; cta: string }> = {
  facials: { about: "What makes a facial custom", goodFor: "What a custom facial can do for you", cta: "Book a Custom Facial" },
  waxing: { about: "Waxing, done with care", goodFor: "What waxing can do for you", cta: "Book a Waxing Appointment" },
  tinting: { about: "Why tint your brows and lashes", goodFor: "What tinting can do for you", cta: "Book Brow and Lash Tinting" },
  "eyelash-lifts": { about: "How an eyelash lift works", goodFor: "What a lash lift can do for you", cta: "Book an Eyelash Lift" },
  "chemical-peels": { about: "What a chemical peel does", goodFor: "What a chemical peel can do for you", cta: "Book a Chemical Peel" },
};

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
      <PageHero
        label={business.credential}
        title={fill(s.h1)}
        intro={s.benefit}
        crumbs={[{ href: `/${s.slug}`, name: s.name }]}
      >
        <BookButton />
      </PageHero>

      {/* What it is */}
      <section aria-labelledby="about-service" className="bg-pearl py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 md:grid-cols-[1fr_0.85fr] md:gap-20 md:px-10">
          <div className="order-2 md:order-1">
            <Reveal>
              <h2 id="about-service" className="h2 max-w-[20ch] text-ink">
                {copy[s.slug].about}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="prose-measure mt-6 space-y-4 text-graphite">
                {s.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="text-ink">{fill(s.entitySentence)}</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex gap-5 border-t border-ink/15 pt-8">
                <div className="shrink-0">
                  <DoorIcon tone="blush-ink" size={56} />
                </div>
                <div>
                  <h3 className="font-serif text-[1.4rem] font-medium text-ink">Where it happens</h3>
                  <p className="mt-1 text-graphite">{settingCopy[s.setting]}</p>
                  <Link
                    href="/mobile-service"
                    className="deco-link mt-2 inline-flex min-h-11 items-center text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-rose-ink"
                  >
                    How mobile service works
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="order-1 mx-auto w-full max-w-[440px] md:order-2">
            <SteppedArch tone="blush-ink" className="mx-auto mb-[-1px] w-[70%]" />
            <Curtain>
              <div className="border border-blush-ink/60 p-2.5">
                <ImageSlot slot={s.image} sizes="(min-width: 768px) 440px, 90vw" />
              </div>
            </Curtain>
          </div>
        </div>
      </section>

      {/* Good for */}
      <section aria-labelledby="good-for" className="fan-texture bg-wine py-24 text-pearl md:py-28">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <Reveal className="text-center">
            <Ornament className="mx-auto" />
            <h2 id="good-for" className="h2 mt-6">
              {copy[s.slug].goodFor}
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-x-14 md:grid-cols-2">
            {s.goodFor.map((g) => (
              <StaggerItem key={g.title} className="flex gap-5 border-t border-blush/30 py-7">
                <span aria-hidden className="mt-3 h-2 w-2 shrink-0 rotate-45 border border-blush" />
                <div>
                  <h3 className="font-serif text-[1.5rem] font-medium leading-tight">{g.title}</h3>
                  <p className="mt-2 text-mauve">{g.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* What to expect: a real sequence, so it gets numerals */}
      <section aria-labelledby="expect" className="bg-pearl py-24 md:py-28">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal className="text-center">
            <p className="label text-rose-ink">Your appointment</p>
            <h2 id="expect" className="h2 mt-4 text-ink">
              What to Expect
            </h2>
          </Reveal>
          <div className="relative mt-14">
            <RuleDraw className="absolute left-[16%] right-[16%] top-[30px] hidden bg-blush-ink/40 md:block" />
            <Stagger as="li" className="relative grid gap-12 md:grid-cols-3 md:gap-10">
              {s.expect.map((e, i) => (
                <StaggerItem as="li" key={e.title} className="flex flex-col items-center text-center">
                  <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-blush-ink bg-pearl font-deco text-[1.4rem] text-rose-ink">
                    {numerals[i]}
                  </span>
                  <h3 className="mt-5 font-serif text-[1.6rem] font-medium leading-tight text-ink">{e.title}</h3>
                  <p className="mt-2 max-w-[32ch] text-graphite">{e.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Prep and aftercare */}
      <section aria-labelledby="care" className="bg-ink py-24 text-pearl md:py-28">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <Reveal className="text-center">
            <h2 id="care" className="h2">
              Before and After
            </h2>
            <p className="mt-4 text-mist">General guidance. You&apos;ll get notes specific to your appointment.</p>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
            {[
              { title: "Before your appointment", items: s.before },
              { title: "Aftercare", items: s.after },
            ].map((col, ci) => (
              <Reveal key={col.title} delay={ci * 0.1}>
                <div className="h-full border-t border-blush/50 pt-7">
                  <h3 className="label text-rose">{col.title}</h3>
                  <ul className="mt-5 space-y-4">
                    {col.items.map((t) => (
                      <li key={t} className="flex gap-4 text-pearl/90">
                        <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rotate-45 border border-blush" />
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

      {/* Related treatments */}
      <section aria-labelledby="related" className="bg-pearl py-24 md:py-28">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal className="text-center">
            <h2 id="related" className="h2 text-ink">
              Pairs Well With
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug}>
                <Link href={`/${r.slug}`} className="group block h-full bg-pearl-2 p-3 transition-colors hover:bg-ink">
                  <div className="overflow-hidden">
                    <ImageSlot
                      slot={{ ...r.image, aspect: "3 / 2" }}
                      sizes="(min-width: 768px) 360px, 92vw"
                      className="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="px-3 pb-5 pt-6 text-center">
                    <h3 className="font-serif text-[1.6rem] font-medium leading-tight text-ink transition-colors group-hover:text-pearl">
                      {r.name}
                    </h3>
                    <p className="mt-2 text-[0.95rem] text-graphite transition-colors group-hover:text-mist">{r.benefit}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10 text-center">
            <Link
              href="/#menu-title"
              className="deco-link inline-flex min-h-11 items-center text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-ink"
            >
              See the full treatment menu
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand title={copy[s.slug].cta} />
    </>
  );
}
