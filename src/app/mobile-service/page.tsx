import Link from "next/link";
import { business, hygienePractices, images, policies, showHygieneDetails } from "@/site.config";
import { BookButton } from "@/components/BookButton";
import { JsonLd } from "@/components/JsonLd";
import { Reveal, RuleDraw, Stagger, StaggerItem } from "@/components/motion";
import { Opener } from "@/components/editorial/Opener";
import { CloseUp } from "@/components/editorial/Spreads";
import { isPlaceholder, offeringsBySetting, servicePath, shown } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mobile Esthetician in Denton County | Lá Boujee",
  description:
    "Facials, peels, acne treatments, consultations and makeup at your home in Denton, Lewisville, Flower Mound, Corinth and 11 more towns. No travel fee.",
  path: "/mobile-service",
});

const steps = [
  { act: "Act I", title: "Book a home visit", body: "Call, text or email with your treatment and a day, and ask for a home visit." },
  { act: "Act II", title: "Share the details", body: "Your address, plus parking, gate codes, or which room you'd like." },
  { act: "Act III", title: "I arrive and set up", body: "I bring everything the treatment needs." },
  { act: "Act IV", title: "Relax, then carry on", body: "I pack everything away when we're done. No drive home." },
];

const trust = [
  { title: "Licensed and insured", body: "I'm licensed in Texas and trained in sanitation, and that comes with me to every visit." },
  { title: "One person, every time", body: "It's a solo practice. The person you book is the person at your door." },
  { title: "Your space, your comfort", body: "You choose the room, and you stay comfortable afterward." },
];

const ready = [
  "Pick a comfortable room with a little open floor space.",
  "Good light helps, especially for makeup.",
  "Come as you are. Clean skin is a bonus, not a requirement.",
];

export default function MobileServicePage() {
  const { atHome, studioOnly } = offeringsBySetting();
  const homeNotes = shown([policies.SPACE_NEEDED, policies.PETS_AND_KIDS]);
  const columns = [
    { id: "at-home", title: "At your home", list: atHome, note: isPlaceholder(policies.TRAVEL_FEE) ? "" : policies.TRAVEL_FEE },
    { id: "studio-only", title: "In my studio only", list: studioOnly, note: `${business.LOCATION_NOTE}, ${business.CITY}.` },
  ];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Mobile esthetician services",
            serviceType: "Mobile esthetics",
            provider: { "@id": `${business.SITE_URL}/#business` },
            areaServed: business.SERVICE_AREA.map((t) => ({ "@type": "City", name: `${t}, ${business.STATE}` })),
            url: `${business.SITE_URL}/mobile-service`,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${business.SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Mobile Service", item: `${business.SITE_URL}/mobile-service` },
            ],
          },
        ]}
      />
      <Opener
        kicker="At your home"
        title="Mobile Esthetician in Denton County"
        standfirst="I come to you, with no travel fee. Here's how a home visit works, and where I travel."
        crumbs={[{ href: "/mobile-service", name: "Mobile Service" }]}
        photo={images.comeToYou}
      >
        <BookButton />
      </Opener>

      {/* What can and can't be done at home */}
      <section aria-labelledby="what" className="bg-pearl py-20 text-ink md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal>
            <h2 id="what" className="display max-w-[20ch] text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
              What I can do at your home
            </h2>
            <RuleDraw className="mt-6 w-24 bg-rose" />
          </Reveal>
          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
            {columns.map((c, ci) => (
              <Reveal key={c.id} delay={ci * 0.1}>
                <div className="border-t-2 border-ink pt-4">
                  <h3 className="kicker text-rose-ink">{c.title}</h3>
                  <ul className="mt-2">
                    {c.list.map((o) => (
                      <li key={o.name} className="border-b border-ink/12">
                        <Link href={servicePath(o.service)} className="flex min-h-12 items-center py-2 text-ink transition-colors hover:text-rose-ink">
                          {o.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {c.note ? <p className="mt-4 text-graphite">{c.note}</p> : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works, in four acts. Two columns on tablets, four on desktop, never a stray tile. */}
      <section aria-labelledby="how" className="bg-pearl-2 py-20 text-ink md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal>
            <p className="kicker text-rose-ink">Step by step</p>
            <h2 id="how" className="display mt-4 text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
              A home visit, in four acts
            </h2>
          </Reveal>
          <RuleDraw className="mt-8 bg-ink/25" />
          <Stagger as="ol" className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <StaggerItem as="li" key={s.act} className="border-b border-ink/12 py-6 lg:border-b-0">
                <p className="kicker text-rose-ink">{s.act}</p>
                <h3 className="display mt-3 text-[1.7rem] leading-tight">{s.title}</h3>
                <p className="mt-2 text-graphite">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <h3 className="display text-[1.9rem] leading-tight">Getting your space ready</h3>
            <div>
              <ul className="border-t-2 border-ink">
                {ready.map((r) => (
                  <li key={r} className="border-b border-ink/12 py-3.5 text-ink">
                    {r}
                  </li>
                ))}
              </ul>
              {homeNotes.length ? (
                <div className="mt-6 space-y-2 text-graphite">
                  {homeNotes.map((n) => (
                    <p key={n}>{n}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Safe, professional, private */}
      <section aria-labelledby="trust" className="relative overflow-hidden bg-ink py-20 text-pearl md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,80,140,0.2), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal className="text-center">
            <p className="kicker text-rose">Letting someone into your home is a big deal</p>
            <h2 id="trust" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4.4rem)] italic">
              Safe, Professional, Private
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid md:grid-cols-3">
            {trust.map((t, i) => (
              <StaggerItem
                key={t.title}
                className={`px-2 py-7 text-center md:px-8 md:py-4 ${i > 0 ? "border-t border-silver/25 md:border-l md:border-t-0" : ""}`}
              >
                <h3 className="display text-[1.8rem] leading-tight">{t.title}</h3>
                <p className="mx-auto mt-3 max-w-[32ch] text-mist">{t.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          {showHygieneDetails ? (
            <Reveal className="mx-auto mt-14 max-w-[680px]">
              <h3 className="kicker text-center text-rose">Hygiene at every appointment</h3>
              <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {shown(hygienePractices).map((h) => (
                  <li key={h} className="border-b border-silver/20 py-3 text-pearl/90">
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Where I travel: the towns, as one list */}
      <section aria-labelledby="area" className="bg-pearl py-20 text-ink md:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:px-10">
          <Reveal>
            <p className="kicker text-rose-ink">Service area</p>
            <h2 id="area" className="display mt-4 text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
              Where I travel
            </h2>
            <p className="mt-5 max-w-[38ch] text-graphite">
              Home visits in these {business.SERVICE_AREA.length} towns, with no travel fee.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-2 gap-x-6 border-t-2 border-ink sm:grid-cols-3">
              {business.SERVICE_AREA.map((a) => (
                <li key={a} className="display border-b border-ink/15 py-3 text-[1.35rem] italic leading-tight md:text-[1.6rem]">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CloseUp title="Bring the appointment home" kicker="Ready for your close-up?" showContact={false} />
    </>
  );
}
