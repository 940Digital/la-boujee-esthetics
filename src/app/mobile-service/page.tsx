import type { Metadata } from "next";
import Link from "next/link";
import { business, hygienePractices, images, policies, showHygieneDetails } from "@/site.config";
import { BookButton } from "@/components/BookButton";
import { JsonLd } from "@/components/JsonLd";
import { Reveal, RuleDraw, Stagger, StaggerItem } from "@/components/motion";
import { Opener } from "@/components/editorial/Opener";
import { CloseUp, QandA } from "@/components/editorial/Spreads";
import { mobileFaqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: `Mobile Esthetician in ${business.CITY} | Lá Boujee Esthetics`,
  description: `How mobile esthetics appointments work with Lá Boujee Esthetics: a licensed esthetician who travels to your home in ${business.CITY} and nearby areas, depending on the treatment.`,
  alternates: { canonical: "/mobile-service" },
};

const steps = [
  { act: "Act I", title: "Book your treatment", body: "Choose the service and a time, and note that you'd like a home appointment." },
  { act: "Act II", title: "Share the details", body: "Your address, plus anything useful to know: parking, gate codes, stairs, or which room you'd like to use." },
  { act: "Act III", title: "She arrives and sets up", body: "She brings what the treatment needs and sets up in the space you've chosen." },
  { act: "Act IV", title: "Relax, then carry on", body: "Your treatment happens at home, and she packs everything away when you're done. No drive home." },
];

const trust = [
  { title: "Licensed and trained", body: "Licensed estheticians are trained in sanitation and safe technique. That training comes along to every home visit." },
  { title: "One person, every time", body: "A solo practice. The licensed esthetician you book is the one who arrives at your door." },
  { title: "Your space, your comfort", body: "You choose the room and the setting. Private treatments stay private, in your own home." },
];

const ready = [
  "Pick a comfortable room with a little open floor space.",
  "Good light helps, especially for brow and lash work.",
  "Mention parking, gate codes or stairs ahead of time.",
  "Come as you are. Clean skin is a bonus, not a requirement.",
];

export default function MobileServicePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Mobile esthetician services",
          serviceType: "Mobile esthetics",
          provider: { "@id": `${business.SITE_URL}/#business` },
          areaServed: business.SERVICE_AREA,
          url: `${business.SITE_URL}/mobile-service`,
        }}
      />
      <Opener
        kicker="At your home"
        title={`Mobile Esthetician Services in ${business.CITY}`}
        standfirst="Depending on the treatment, she comes to you. Here's how a home appointment works, and where she travels."
        crumbs={[{ href: "/mobile-service", name: "Mobile Service" }]}
        photo={images.comeToYou}
      >
        <BookButton />
      </Opener>

      {/* How it works, in four acts. Two columns on tablets, four on desktop, never a stray tile. */}
      <section aria-labelledby="how" className="bg-pearl py-24 text-ink md:py-32">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="kicker text-rose-ink">Step by step</p>
              <h2 id="how" className="display mt-4 text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
                A home appointment, in four acts
              </h2>
            </div>
            <p className="max-w-[44ch] text-graphite">
              Lá Boujee Esthetics offers mobile esthetician services in {business.CITY}, bringing licensed esthetics
              treatments to your home whenever the treatment allows.
            </p>
          </Reveal>
          <RuleDraw className="mt-10 bg-ink/25" />
          <Stagger as="li" className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <StaggerItem as="li" key={s.act} className="border-b border-ink/12 py-8 lg:border-b-0">
                <p className="kicker text-rose-ink">{s.act}</p>
                <h3 className="display mt-3 text-[1.7rem] leading-tight">{s.title}</h3>
                <p className="mt-3 text-graphite">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Safe, professional, private */}
      <section aria-labelledby="trust" className="relative overflow-hidden bg-ink py-24 text-pearl md:py-32">
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
          <Stagger className="mt-14 grid md:grid-cols-3">
            {trust.map((t, i) => (
              <StaggerItem
                key={t.title}
                className={`px-2 py-8 text-center md:px-8 md:py-4 ${i > 0 ? "border-t border-silver/25 md:border-l md:border-t-0" : ""}`}
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
                {hygienePractices.map((h) => (
                  <li key={h} className="border-b border-silver/20 py-3 text-pearl/90">
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Getting your space ready */}
      <section aria-labelledby="ready" className="bg-pearl-2 py-24 text-ink md:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-10">
          <Reveal>
            <h2 id="ready" className="display text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
              Getting your space ready
            </h2>
            <p className="mt-5 max-w-[40ch] text-graphite">There&apos;s very little to do. A few small things make the appointment smoother.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="border-t-2 border-ink">
              {ready.map((r) => (
                <li key={r} className="border-b border-ink/12 py-4 text-ink">
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-2 text-[0.95rem] text-graphite">
              <p>{policies.SPACE_NEEDED}</p>
              <p>{policies.PETS_AND_KIDS}</p>
              <p>{policies.TRAVEL_FEE}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Where she travels */}
      <section aria-labelledby="area" className="bg-pearl py-24 text-ink md:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:px-10">
          <Reveal>
            <p className="kicker text-rose-ink">Service area</p>
            <h2 id="area" className="display mt-4 text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
              Where she travels
            </h2>
            <p className="mt-5 max-w-[38ch] text-graphite">
              Mobile appointments are available within {business.TRAVEL_RADIUS} of {business.CITY}, {business.STATE}.
            </p>
            <p className="mt-4 text-graphite">
              Just outside the area?{" "}
              <Link href="/contact" className="deco-link text-ink">
                Send a message
              </Link>{" "}
              and ask.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul>
              {business.SERVICE_AREA.map((a, i) => (
                <li key={`${a}-${i}`} className="display border-b border-ink/15 py-4 text-[clamp(1.8rem,1.3rem+1.8vw,2.8rem)] italic">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <QandA faqs={mobileFaqs} title="Mobile appointment Q&A" kicker="Home visits, safety, privacy and scheduling" id="mobile-qa" />
      <CloseUp title="Bring the appointment home" kicker="Ready for your close-up?" showContact={false} />
    </>
  );
}
