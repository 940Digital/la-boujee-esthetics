import type { Metadata } from "next";
import Link from "next/link";
import { business, hygienePractices, policies, showHygieneDetails } from "@/site.config";
import { PageHero } from "@/components/PageHero";
import { BookButton } from "@/components/BookButton";
import { FaqSection } from "@/components/FaqSection";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Ornament, StepFrame } from "@/components/deco";
import { Reveal, RuleDraw, Stagger, StaggerItem } from "@/components/motion";
import { mobileFaqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: `Mobile Esthetician in ${business.CITY} | Lá Boujee Esthetics`,
  description: `How mobile esthetics appointments work with Lá Boujee Esthetics: a licensed esthetician who travels to your home in ${business.CITY} and nearby areas, depending on the treatment.`,
  alternates: { canonical: "/mobile-service" },
};

const steps = [
  {
    n: "I",
    title: "Book your treatment",
    body: "Choose the service and a time, and note that you'd like a home appointment.",
  },
  {
    n: "II",
    title: "Share the details",
    body: "Your address, plus anything useful to know: parking, gate codes, stairs, or which room you'd like to use.",
  },
  {
    n: "III",
    title: "She arrives and sets up",
    body: "She brings what the treatment needs and sets up in the space you've chosen.",
  },
  {
    n: "IV",
    title: "Relax, then carry on",
    body: "Your treatment happens at home, and she packs everything away when you're done. No drive home.",
  },
];

const ready = [
  "Pick a comfortable room with a little open floor space.",
  "Good light helps, especially for brow and lash work.",
  "Mention parking, gate codes or stairs ahead of time.",
  "Come as you are. Clean skin is a bonus, not a requirement.",
];

const trust = [
  {
    title: "Licensed and trained",
    body: "Licensed estheticians are trained in sanitation and safe technique. That training comes along to every home visit.",
  },
  {
    title: "One person, every time",
    body: "A solo practice. The licensed esthetician you book is the one who arrives at your door.",
  },
  {
    title: "Your space, your comfort",
    body: "You choose the room and the setting. Private treatments stay private, in your own home.",
  },
];

/** Concentric-ring diagram of the service area. Labels come from the config. */
function AreaDiagram() {
  const rings = [60, 110, 160, 210];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <svg aria-hidden viewBox="0 0 440 440" className="absolute inset-0 h-full w-full">
        {Array.from({ length: 48 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 48;
          return (
            <line
              key={i}
              x1={(220 + Math.cos(a) * 64).toFixed(2)}
              y1={(220 + Math.sin(a) * 64).toFixed(2)}
              x2={(220 + Math.cos(a) * (i % 2 ? 196 : 214)).toFixed(2)}
              y2={(220 + Math.sin(a) * (i % 2 ? 196 : 214)).toFixed(2)}
              stroke="#C2809E"
              strokeWidth="0.6"
              opacity={i % 2 ? 0.25 : 0.4}
            />
          );
        })}
        {rings.map((r, i) => (
          <circle key={r} cx="220" cy="220" r={r} fill="none" stroke="#C2809E" strokeWidth={i === rings.length - 1 ? 1.2 : 0.8} opacity={0.75 - i * 0.1} strokeDasharray={i === rings.length - 1 ? "2 5" : undefined} />
        ))}
        <circle cx="220" cy="220" r="52" fill="#0F3B33" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-serif text-[1.15rem] leading-tight text-pearl">{business.CITY}</span>
      </div>
      <p className="label absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap bg-pearl px-3 text-[0.68rem] text-rose-ink">
        Within {business.TRAVEL_RADIUS}
      </p>
    </div>
  );
}

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
      <PageHero
        label="Your place or mine"
        title={`Mobile Esthetician Services in ${business.CITY}`}
        intro="Depending on the treatment, she comes to you. Here's how a home appointment works, and where she travels."
        crumbs={[{ href: "/mobile-service", name: "Mobile Service" }]}
      >
        <BookButton />
      </PageHero>

      {/* How it works */}
      <section aria-labelledby="how" className="bg-pearl py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal className="text-center">
            <p className="label text-rose-ink">Step by step</p>
            <h2 id="how" className="h2 mt-4 text-ink">
              How a Home Appointment Works
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-graphite">
              Lá Boujee Esthetics offers mobile esthetician services in {business.CITY}, bringing licensed
              esthetics treatments to your home whenever the treatment allows.
            </p>
          </Reveal>
          <div className="relative mt-16">
            <RuleDraw className="absolute left-[12%] right-[12%] top-[30px] hidden bg-blush-ink/40 lg:block" />
            <Stagger as="li" className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {steps.map((s) => (
                <StaggerItem as="li" key={s.n} className="flex flex-col items-center text-center">
                  <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-blush-ink bg-pearl font-deco text-[1.35rem] text-rose-ink">
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-serif text-[1.55rem] font-medium leading-tight text-ink">{s.title}</h3>
                  <p className="mt-2 max-w-[30ch] text-graphite">{s.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Safety and trust */}
      <section aria-labelledby="trust" className="fan-texture bg-ink py-24 text-pearl md:py-32">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal className="text-center">
            <Ornament className="mx-auto" />
            <h2 id="trust" className="h2 mt-6">
              Safe, Professional, Private
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-mist">
              Letting someone into your home is a big deal. Here&apos;s what you can count on.
            </p>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {trust.map((t) => (
              <StaggerItem key={t.title} className="relative bg-ink-2 px-8 py-12 text-center">
                <StepFrame inset={8} step={12} opacity={0.55} />
                <h3 className="font-serif text-[1.6rem] font-medium leading-tight">{t.title}</h3>
                <p className="mt-3 text-mist">{t.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          {showHygieneDetails ? (
            <Reveal className="mx-auto mt-14 max-w-[640px]">
              <h3 className="label text-center text-rose">Hygiene at every appointment</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {hygienePractices.map((h) => (
                  <li key={h} className="flex gap-3 text-pearl/90">
                    <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 border border-blush" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Getting ready */}
      <section aria-labelledby="ready" className="bg-wine py-24 text-pearl md:py-28">
        <div className="mx-auto grid max-w-[1080px] gap-12 px-6 md:grid-cols-[0.9fr_1fr] md:px-10">
          <Reveal>
            <h2 id="ready" className="h2">
              Getting your space ready
            </h2>
            <p className="mt-5 max-w-[40ch] text-mauve">
              There&apos;s very little to do. A few small things make the appointment smoother.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4 border-t border-blush/40 pt-6">
              {ready.map((r) => (
                <li key={r} className="flex gap-4 text-pearl/95">
                  <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 border border-blush" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-2 border-t border-blush/40 pt-6 text-[0.95rem] text-mauve">
              <p>{policies.SPACE_NEEDED}</p>
              <p>{policies.PETS_AND_KIDS}</p>
              <p>{policies.TRAVEL_FEE}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service area */}
      <section aria-labelledby="area" className="bg-pearl py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 md:grid-cols-2 md:px-10">
          <Reveal>
            <AreaDiagram />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label text-rose-ink">Service area</p>
            <h2 id="area" className="h2 mt-4 text-ink">
              Where She Travels
            </h2>
            <p className="mt-5 max-w-[44ch] text-graphite">
              Mobile appointments are available within {business.TRAVEL_RADIUS} of {business.CITY}, {business.STATE},
              including:
            </p>
            <ul className="mt-6 max-w-[420px]">
              {business.SERVICE_AREA.map((a, i) => (
                <li key={`${a}-${i}`} className="flex items-center gap-3 border-b border-ink/10 py-2 font-serif text-[1.3rem] text-ink">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 border border-blush-ink" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-graphite">
              Just outside the area?{" "}
              <Link href="/contact" className="deco-link font-normal text-ink">
                Send a message
              </Link>{" "}
              and ask.
            </p>
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={mobileFaqs} title="Mobile Appointment Questions" id="mobile-faq" subtitle="Home visits, safety, privacy and scheduling." />
      <CtaBand title="Bring the Appointment Home" />
    </>
  );
}
