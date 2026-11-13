import Link from "next/link";
import { business, images } from "@/site.config";
import { BookButton } from "@/components/BookButton";
import { ImageSlot } from "@/components/ImageSlot";
import { JsonLd } from "@/components/JsonLd";
import { Reviews } from "@/components/Reviews";
import { Curtain, Reveal, RuleDraw, Stagger, StaggerItem } from "@/components/motion";
import { Opener } from "@/components/editorial/Opener";
import { CloseUp } from "@/components/editorial/Spreads";
import { lowerFirst, portraitIsPlaceholder, shown } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Laurel Porter, Denton Esthetician | Lá Boujee",
  description:
    "Meet Laurel Porter, a licensed and insured Texas esthetician with a studio in Denton and home visits across Denton County. A solo practice.",
  path: "/about",
});

const pillars = [
  { title: "Licensed and insured", body: "A licensed esthetician in the State of Texas, and insured." },
  { title: "Personal", body: "It's just me, so every appointment is one-on-one." },
  { title: "Convenient", body: "A studio in Denton, and home visits across the area with no travel fee." },
];

export default function AboutPage() {
  const bio = shown(business.OWNER_BIO);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${business.SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "About", item: `${business.SITE_URL}/about` },
          ],
        }}
      />
      <Opener
        kicker="The profile"
        title={`Meet ${business.OWNER_NAME}, Licensed Esthetician in ${business.CITY}`}
        crumbs={[{ href: "/about", name: "About" }]}
      >
        <BookButton />
      </Opener>

      <section aria-labelledby="story" className="bg-pearl py-20 text-ink md:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Curtain className={portraitIsPlaceholder() ? "hidden lg:block" : undefined}>
            {/* While the portrait is still the brand panel, phones skip it rather than scroll past an empty frame. */}
            <figure className="mx-auto max-w-[360px] lg:sticky lg:top-28 lg:max-w-none">
              <div className="border border-silver-ink/50 p-2">
                <ImageSlot slot={images.ownerPortrait} sizes="(min-width: 1024px) 420px, 360px" eager />
              </div>
            </figure>
          </Curtain>

          <div>
            <Reveal>
              <h2 id="story" className="display text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
                Behind Lá&nbsp;Boujee
              </h2>
              <RuleDraw className="mt-6 w-24 bg-rose" />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 max-w-[62ch] space-y-5 text-graphite">
                <p>
                  <span className="dropcap-letter">I</span>&apos;m {business.OWNER_NAME}, a licensed esthetician in the State of Texas,
                  and I&apos;m insured. Lá Boujee Esthetics is a solo practice, so the person you book is the person who takes care of
                  you, every time.
                </p>
                <p>
                  My studio is at {business.STUDIO_ADDRESS} in {business.CITY}, {lowerFirst(business.LOCATION_NOTE)}. I also travel to
                  clients&apos; homes across Denton County and nearby, with no travel fee.
                </p>
                {bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-[62ch] text-ink">
                See{" "}
                <Link href="/services" className="text-rose-ink underline decoration-rose-ink/40 underline-offset-4">
                  my services and prices
                </Link>
                , or how{" "}
                <Link href="/mobile-service" className="text-rose-ink underline decoration-rose-ink/40 underline-offset-4">
                  home visits work
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="why" className="relative overflow-hidden bg-ink py-20 text-pearl md:py-28">
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
          <Stagger className="mt-12 grid md:grid-cols-3">
            {pillars.map((p, i) => (
              <StaggerItem
                key={p.title}
                className={`px-2 py-7 text-center md:px-8 md:py-4 ${i > 0 ? "border-t border-silver/25 md:border-l md:border-t-0" : ""}`}
              >
                <h3 className="display text-[2rem] leading-tight">{p.title}</h3>
                <p className="mx-auto mt-3 max-w-[32ch] text-mist">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Reviews tone="pearl" />
      <CloseUp title={`Book with ${business.OWNER_FIRST_NAME}`} kicker="Ready for your close-up?" showContact={false} />
    </>
  );
}
