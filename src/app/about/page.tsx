import type { Metadata } from "next";
import Link from "next/link";
import { business, images, services } from "@/site.config";
import { PageHero } from "@/components/PageHero";
import { ImageSlot } from "@/components/ImageSlot";
import { CtaBand } from "@/components/CtaBand";
import { Reviews } from "@/components/Reviews";
import { ArchCrown, Ornament, StepFrame } from "@/components/deco";
import { Curtain, Reveal, Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: `About ${business.OWNER_NAME}, Licensed Esthetician | La' Boujee Esthetics`,
  description: `Meet ${business.OWNER_NAME}, the licensed esthetician behind La' Boujee Esthetics in ${business.CITY}, offering mobile and studio facials, waxing, tinting, lash lifts and peels.`,
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    title: "Licensed",
    body: "A licensed esthetician, professionally trained in skin care, hair removal, and brow and lash services.",
  },
  {
    title: "Personal",
    body: "A solo practice, so every appointment is one-on-one with the person whose name is on the door.",
  },
  {
    title: "Convenient",
    body: "Mobile when the treatment allows, studio when it calls for it. Either way, built around your schedule.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title={`Meet ${business.OWNER_NAME}, Licensed Esthetician in ${business.CITY}`}
        crumbs={[{ href: "/about", name: "About" }]}
      />

      <section aria-labelledby="story" className="bg-pearl py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-start gap-14 px-6 md:grid-cols-[0.85fr_1fr] md:gap-20 md:px-10">
          <div className="mx-auto w-full max-w-[420px] md:sticky md:top-28">
            <ArchCrown tone="brass-ink" className="mx-auto mb-[-2px] w-[44%]" />
            <Curtain>
              <div className="rounded-t-[999px] border border-brass-ink/60 p-2.5">
                <ImageSlot slot={images.ownerPortrait} sizes="(min-width: 768px) 420px, 90vw" className="rounded-t-[999px]" priority />
              </div>
            </Curtain>
            <p className="label mt-5 text-center text-rose-ink">{business.credential}</p>
          </div>
          <div>
            <Reveal>
              <h2 id="story" className="h2 text-ink">
                The woman behind La&apos;&nbsp;Boujee
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="prose-measure mt-6 space-y-5 text-graphite">
                {business.OWNER_BIO.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="text-ink">
                  Today she offers custom facials, waxing, brow and lash tinting, eyelash lifts and chemical peels in{" "}
                  {business.CITY}, traveling to clients&apos; homes or welcoming them to her studio depending on the
                  treatment.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 border-t border-ink/15 pt-8">
                <h3 className="label text-rose-ink">Treatments</h3>
                <ul className="mt-3">
                  {services.map((s) => (
                    <li key={s.slug} className="border-b border-ink/10 last:border-b-0">
                      <Link
                        href={`/${s.slug}`}
                        className="group flex min-h-12 flex-col py-3 font-serif text-[1.4rem] leading-tight text-ink"
                      >
                        <span className="transition-colors group-hover:text-rose-ink">{s.name}</span>
                        <span className="mt-1 font-sans text-[0.95rem] leading-normal text-graphite">{s.benefit}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="why" className="fan-texture relative overflow-hidden bg-ink py-24 text-pearl md:py-28">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <Reveal className="text-center">
            <Ornament className="mx-auto" />
            <h2 id="why" className="h2 mt-6">
              Why Clients Choose La&apos;&nbsp;Boujee
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <StaggerItem key={p.title} className="relative bg-ink-2 px-8 py-12 text-center">
                <StepFrame inset={8} step={12} opacity={0.55} />
                <h3 className="display text-[2rem]">{p.title}</h3>
                <p className="mt-3 text-mist">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-12 text-center">
            <Link
              href="/mobile-service"
              className="deco-link inline-flex min-h-11 items-center text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-rose"
            >
              How mobile appointments work
            </Link>
          </Reveal>
        </div>
      </section>

      <Reviews tone="pearl" />
      <CtaBand title={`Book with ${business.OWNER_FIRST_NAME}`} />
    </>
  );
}
