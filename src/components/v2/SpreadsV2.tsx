import Link from "next/link";
import { business, images, services } from "@/site.config";
import type { Faq } from "@/lib/faq";
import { ImageSlot } from "../ImageSlot";
import { BookButton } from "../BookButton";
import { ContactMethods } from "../ContactMethods";
import { Curtain, Fade, Reveal, RuleDraw, Stagger, StaggerItem } from "../motion";

/* ------------------------------------------------------------------ */
/* The profile: a magazine feature on Laurel, built only from facts    */
/* ------------------------------------------------------------------ */

const atAGlance = [
  { k: "Credential", v: "Licensed esthetician" },
  { k: "Where", v: "Your home or her studio, depending on the treatment" },
  { k: "Who you'll see", v: "Laurel, every time. It's a solo practice" },
  { k: "Treatments", v: "Facials, waxing, tinting, eyelash lifts, chemical peels" },
];

export function ProfileV2() {
  return (
    <section id="profile" aria-labelledby="profile-title" className="bg-pearl py-24 text-ink md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Curtain>
          <figure>
            <div className="border border-silver-ink/50 p-2">
              <ImageSlot slot={images.ownerPortrait} sizes="(min-width: 1024px) 420px, 90vw" />
            </div>
            <figcaption className="kicker mt-4 text-graphite">{business.OWNER_NAME}, licensed esthetician</figcaption>
          </figure>
        </Curtain>

        <div>
          <Reveal>
            <p className="kicker text-rose-ink">The profile</p>
            <h2 id="profile-title" className="v2-display mt-5 text-[clamp(2.4rem,1.6rem+3vw,4.4rem)]">
              Meet {business.OWNER_NAME}
            </h2>
            <RuleDraw className="mt-7 w-24 bg-rose" />
          </Reveal>

          <div className="mt-9 grid gap-10 md:grid-cols-[1.25fr_0.75fr]">
            <Reveal delay={0.1}>
              <div className="space-y-5 text-[1.05rem] text-graphite">
                <p className="dropcap">
                  {business.OWNER_NAME} is the licensed esthetician behind Lá Boujee Esthetics. She offers custom facials,
                  waxing, brow and lash tinting, eyelash lifts and chemical peels in {business.CITY}.
                </p>
                <p>
                  Depending on the treatment, she brings the appointment to your home or welcomes you to her studio. Either
                  way, it&apos;s one-on-one.
                </p>
                <p className="v2-display border-l-2 border-rose py-1 pl-5 text-[1.55rem] italic leading-snug text-ink">
                  The person you book is the person who takes care of you.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <aside aria-label="At a glance" className="border-t-2 border-ink pt-4">
                <h3 className="kicker text-ink">At a glance</h3>
                <dl className="mt-3">
                  {atAGlance.map((a) => (
                    <div key={a.k} className="border-b border-ink/12 py-3">
                      <dt className="kicker text-[0.66rem] text-rose-ink">{a.k}</dt>
                      <dd className="mt-1 text-[0.95rem] leading-snug text-ink">{a.v}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Your place or mine: a two-page spread                              */
/* ------------------------------------------------------------------ */

export function PlaceOrMineV2() {
  const halves = [
    {
      id: "yours",
      big: "Your Place",
      img: images.comeToYou,
      title: "Come to You",
      body: "She brings the appointment to your home. No drive, no parking, no waiting room, and you stay comfortable afterward.",
      link: { href: "/mobile-service", label: "How home visits work" },
    },
    {
      id: "mine",
      big: "or Mine",
      img: images.studio,
      title: "Visit the Studio",
      body: "Some treatments are best with the full studio setup. Step out of the house and let the time be all about you.",
      link: { href: "/contact", label: "Ask about the studio" },
    },
  ];
  return (
    <section id="place" aria-labelledby="place-title" className="relative overflow-hidden bg-ink py-24 text-pearl md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,80,140,0.22), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="flex flex-col items-center text-center">
          <p className="kicker text-rose">The signature</p>
          <h2 id="place-title" className="sr-only">
            Your Place or Mine
          </h2>
          <p className="mt-4 max-w-[52ch] text-mist">Where your appointment happens depends on the treatment. Either way, it&apos;s the same licensed care.</p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-6">
          {halves.map((h, i) => (
            <article key={h.id} aria-labelledby={`${h.id}-title`} className="flex flex-col">
              <Reveal delay={i * 0.12}>
                <p aria-hidden className={`v2-display text-[clamp(3rem,1.6rem+5.4vw,7rem)] italic leading-none ${i === 1 ? "text-rose md:text-right" : "text-pearl"}`}>
                  {h.big}
                </p>
              </Reveal>
              <Curtain className="mt-6" delay={0.1 + i * 0.12}>
                <div className="bw grain">
                  <ImageSlot slot={h.img} sizes="(min-width: 768px) 50vw, 92vw" />
                </div>
              </Curtain>
              <Reveal delay={0.2 + i * 0.12} className="mt-6 grid gap-2 md:grid-cols-[0.8fr_1.2fr] md:gap-6">
                <h3 id={`${h.id}-title`} className="v2-display text-[1.9rem]">
                  {h.title}
                </h3>
                <div>
                  <p className="text-mist">{h.body}</p>
                  <Link href={h.link.href} className="kicker deco-link mt-3 inline-flex min-h-11 items-center text-rose">
                    {h.link.label}
                  </Link>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The treatments: a lookbook. One feature plate, four smaller plates. */
/* ------------------------------------------------------------------ */

function Plate({ s, big = false }: { s: (typeof services)[number]; big?: boolean }) {
  return (
    <Link href={`/${s.slug}`} className="group relative block h-full overflow-hidden bg-ink">
      <div className="bw grain h-full">
        <ImageSlot
          slot={s.image}
          sizes={big ? "(min-width: 768px) 50vw, 92vw" : "(min-width: 768px) 25vw, 46vw"}
          className="h-full transition-transform duration-[1.4s] ease-[var(--ease-deco)] group-hover:scale-[1.04]"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <h3 className={`v2-display text-pearl ${big ? "text-[clamp(2rem,1.4rem+2vw,3.2rem)]" : "text-[1.35rem] md:text-[1.6rem]"}`}>{s.name}</h3>
        {big ? <p className="mt-2 max-w-[36ch] text-pearl/85">{s.benefit}</p> : null}
        <span className={`kicker mt-3 text-rose transition-colors group-hover:text-rose-light ${big ? "inline-block" : "hidden md:inline-block"}`}>
          See the treatment
        </span>
      </div>
    </Link>
  );
}

export function LookbookV2() {
  const [feature, ...rest] = services;
  return (
    <section id="treatments" aria-labelledby="treatments-title" className="bg-pearl py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="kicker text-rose-ink">The lookbook</p>
            <h2 id="treatments-title" className="v2-display mt-4 text-[clamp(2.6rem,1.6rem+3.6vw,5rem)] text-ink">
              The Treatments
            </h2>
          </div>
          <p className="max-w-[38ch] text-graphite">Five treatments, each with its own page for what it&apos;s for, what to expect, and how to prepare.</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2 md:gap-4">
          <Fade className="col-span-2 aspect-[4/5] md:col-span-1 md:row-span-2 md:aspect-auto">
            <Plate s={feature} big />
          </Fade>
          {rest.map((s, i) => (
            <Fade key={s.slug} delay={0.08 * (i + 1)} className="aspect-[4/5]">
              <Plate s={s} />
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* In three acts: the appointment as a picture in three acts           */
/* ------------------------------------------------------------------ */

const acts = [
  { act: "Act I", title: "Book", body: "Choose your treatment and a time, and whether she comes to you or you visit the studio." },
  { act: "Act II", title: "Relax", body: "Settle in at home or in the studio. Mention anything about your skin, then let her take it from there." },
  { act: "Act III", title: "Glow", body: "Leave with skin, brows or lashes that feel cared for, and simple aftercare to keep it going." },
];

export function ActsV2() {
  return (
    <section aria-labelledby="acts-title" className="relative overflow-hidden bg-wine py-24 text-pearl md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 60% at 50% 0%, rgba(212,80,140,0.2), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal className="text-center">
          <p className="kicker text-rose-soft">How it works</p>
          <h2 id="acts-title" className="v2-display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4.2rem)] italic">
            In Three Acts
          </h2>
        </Reveal>
        <Stagger as="li" className="mt-14 grid md:grid-cols-3">
          {acts.map((a, i) => (
            <StaggerItem
              as="li"
              key={a.act}
              className={`px-2 py-8 text-center md:px-8 md:py-4 ${i > 0 ? "border-t border-silver/25 md:border-l md:border-t-0" : ""}`}
            >
              <p className="kicker text-silver">{a.act}</p>
              <h3 className="v2-display mt-3 text-[2.6rem]">{a.title}</h3>
              <p className="mx-auto mt-3 max-w-[30ch] text-mauve">{a.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Q&A: set like a magazine interview, every answer visible            */
/* ------------------------------------------------------------------ */

export function QandAV2({ faqs }: { faqs: Faq[] }) {
  return (
    <section id="questions" aria-labelledby="qa-title" className="bg-ink py-24 text-pearl md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="kicker text-rose">Hygiene, prep, home visits and aftercare</p>
            <h2 id="qa-title" className="v2-display mt-4 text-[clamp(2.6rem,1.6rem+3.6vw,5rem)]">
              Questions &amp; Answers
            </h2>
          </div>
        </Reveal>
        <RuleDraw className="mt-10 bg-silver/40" />
        <div className="mt-10 gap-14 md:columns-2">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 2) * 0.08} className="mb-10 break-inside-avoid">
              <h3 className="v2-display text-[1.45rem] leading-snug">
                <span aria-hidden className="mr-2 italic text-rose">Q.</span>
                {f.q}
              </h3>
              <div className="mt-3 space-y-2 border-l border-silver/30 pl-5 text-mist">
                {f.a.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {f.policy?.map((p) => (
                  <p key={p} className="text-pearl/75">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The close-up: final call to book, with the ways to reach her        */
/* ------------------------------------------------------------------ */

export function CloseUpV2() {
  return (
    <section id="book" aria-labelledby="book-title" className="relative overflow-hidden bg-wine py-24 text-pearl md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 65% 70% at 50% 110%, rgba(212,80,140,0.34), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1100px] px-6 text-center md:px-10">
        <Reveal>
          <p className="kicker text-rose-soft">Book your appointment</p>
          <h2 id="book-title" className="v2-display mt-5 text-[clamp(3rem,1.8rem+5vw,6.4rem)] italic">
            Ready for your close-up?
          </h2>
          <p className="mx-auto mt-6 max-w-[46ch] text-mauve">
            At your home or in the studio, with a licensed esthetician in {business.CITY}.
          </p>
          <div className="mt-10">
            <BookButton />
          </div>
        </Reveal>
        <div className="mt-16 text-left">
          <ContactMethods tone="ink" />
        </div>
      </div>
    </section>
  );
}
