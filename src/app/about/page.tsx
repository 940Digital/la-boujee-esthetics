import type { Metadata } from "next";
import Link from "next/link";
import { business, images, services } from "@/site.config";
import { ImageSlot } from "@/components/ImageSlot";
import { Reviews } from "@/components/Reviews";
import { Curtain, Reveal, RuleDraw, Stagger, StaggerItem } from "@/components/motion";
import { Opener } from "@/components/editorial/Opener";
import { isPlaceholder } from "@/lib/site";
import { CloseUp } from "@/components/editorial/Spreads";

export const metadata: Metadata = {
  title: `About ${business.OWNER_NAME}, Licensed Esthetician | Lá Boujee Esthetics`,
  description: `Meet ${business.OWNER_NAME}, the licensed esthetician behind Lá Boujee Esthetics in ${business.CITY}, offering mobile and studio facials, waxing, tinting, lash lifts and peels.`,
  alternates: { canonical: "/about" },
};

const pillars = [
  { title: "Licensed", body: "Professionally trained in skin care, hair removal, brows and lashes." },
  { title: "Personal", body: "It's just me, so every appointment is one-on-one." },
  { title: "Convenient", body: "Mobile when the treatment allows, studio when it calls for it." },
];

export default function AboutPage() {
  return (
    <>
      <Opener
        kicker="The profile"
        title={`Meet ${business.OWNER_NAME}, Licensed Esthetician in ${business.CITY}`}
        crumbs={[{ href: "/about", name: "About" }]}
      />

      <section aria-labelledby="story" className="bg-pearl py-24 text-ink md:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Curtain>
            <figure className="lg:sticky lg:top-28">
              <div className="border border-silver-ink/50 p-2">
                <ImageSlot slot={images.ownerPortrait} sizes="(min-width: 1024px) 420px, 90vw" priority />
              </div>
            </figure>
          </Curtain>

          <div>
            <Reveal>
              <h2 id="story" className="display text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
                Behind Lá&nbsp;Boujee
              </h2>
              <RuleDraw className="mt-7 w-24 bg-rose" />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-9 max-w-[62ch] space-y-5 text-[1.05rem] text-graphite">
                {business.OWNER_BIO.map((p, i) => (
                  <p key={p} className={i === 0 && !isPlaceholder(p) ? "dropcap" : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-12 border-t-2 border-ink pt-4">
                <h3 className="kicker text-ink">My treatments</h3>
                <ul className="mt-2">
                  {services.map((s) => (
                    <li key={s.slug} className="border-b border-ink/12">
                      <Link href={`/${s.slug}`} className="group flex min-h-12 flex-col py-3">
                        <span className="display text-[1.5rem] leading-tight transition-colors group-hover:text-rose-ink">{s.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="why" className="relative overflow-hidden bg-ink py-24 text-pearl md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,80,140,0.2), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal className="text-center">
            <h2 id="why" className="display text-[clamp(2.4rem,1.6rem+3vw,4.4rem)] italic">
              Why clients choose Lá&nbsp;Boujee
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid md:grid-cols-3">
            {pillars.map((p, i) => (
              <StaggerItem
                key={p.title}
                className={`px-2 py-8 text-center md:px-8 md:py-4 ${i > 0 ? "border-t border-silver/25 md:border-l md:border-t-0" : ""}`}
              >
                <h3 className="display text-[2.2rem]">{p.title}</h3>
                <p className="mx-auto mt-3 max-w-[32ch] text-mist">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-12 text-center">
            <Link href="/mobile-service" className="kicker deco-link inline-flex min-h-11 items-center text-rose">
              How home visits work
            </Link>
          </Reveal>
        </div>
      </section>

      <Reviews tone="pearl" />
      <CloseUp title={`Book with ${business.OWNER_FIRST_NAME}`} kicker="Ready for your close-up?" />
    </>
  );
}
