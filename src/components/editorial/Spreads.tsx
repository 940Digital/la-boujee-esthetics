import Link from "next/link";
import { business, images, linkServicePages, onePage, services } from "@/site.config";
import type { Faq } from "@/lib/faq";
import { ImageSlot } from "../ImageSlot";
import { BookButton } from "../BookButton";
import { ContactMethods } from "../ContactMethods";
import { JsonLd } from "../JsonLd";
import { bookingHref } from "@/lib/site";
import { Curtain, Fade, Reveal, RuleDraw, Stagger, StaggerItem } from "../motion";

/* ------------------------------------------------------------------ */
/* The profile: a magazine feature on Laurel, built only from facts    */
/* ------------------------------------------------------------------ */

export function Profile() {
  return (
    <section id="profile" aria-labelledby="profile-title" className="bg-pearl py-24 text-ink md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
        <Curtain>
          <figure>
            <div className="border border-silver-ink/50 p-2">
              <ImageSlot slot={images.ownerPortrait} sizes="(min-width: 1024px) 420px, 90vw" eager />
            </div>
          </figure>
        </Curtain>

        <div>
          <Reveal>
            <h2 id="profile-title" className="display text-[clamp(2.4rem,1.6rem+3vw,4.4rem)]">
              Meet {business.OWNER_NAME}
            </h2>
            <RuleDraw className="mt-7 w-24 bg-rose" />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 max-w-[52ch] space-y-6 text-graphite">
              <p>
                <span className="dropcap-letter">I</span>&apos;m {business.OWNER_NAME}, the licensed esthetician behind Lá Boujee
                Esthetics in {business.CITY}.
              </p>
              <p className="display border-l-2 border-rose py-1 pl-5 text-[clamp(1.6rem,1.2rem+1.4vw,2.5rem)] italic leading-snug text-ink">
                The person you book is the person who takes care of you.
              </p>
              {onePage ? null : (
                <Link href="/about" className="kicker deco-link inline-flex min-h-11 items-center text-rose-ink">
                  More about {business.OWNER_FIRST_NAME}
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Your home or my studio: a two-page spread, in her voice            */
/* ------------------------------------------------------------------ */

export function HomeOrStudio() {
  const halves = [
    {
      id: "home",
      big: "Your Home",
      img: images.comeToYou,
      body: "No drive, no parking, no waiting room. You stay comfortable afterward.",
      link: onePage ? { href: "/#questions", label: "Home visit questions" } : { href: "/mobile-service", label: "How home visits work" },
    },
    {
      id: "studio",
      big: "or My Studio",
      img: images.studio,
      body: "For treatments that need the full setup, and a little time out of the house.",
      link: onePage ? { href: "/#book", label: "Ask about my studio" } : { href: "/contact", label: "Ask about my studio" },
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
        <h2 id="place-title" className="sr-only">
          Your home or my studio
        </h2>

        <div className="grid gap-10 md:grid-cols-2 md:gap-6">
          {halves.map((h, i) => (
            <article key={h.id} aria-labelledby={`${h.id}-title`} className="flex flex-col">
              <Reveal delay={i * 0.12}>
                <h3 id={`${h.id}-title`} className={`display text-[clamp(2.8rem,1.4rem+4.6vw,6.2rem)] italic leading-none ${i === 1 ? "text-rose md:text-right" : "text-pearl"}`}>
                  {h.big}
                </h3>
              </Reveal>
              <Curtain className="mt-6" delay={0.1 + i * 0.12}>
                <div className="bw grain">
                  <ImageSlot slot={h.img} sizes="(min-width: 768px) 50vw, 92vw" eager />
                </div>
              </Curtain>
              <Reveal delay={0.2 + i * 0.12} className="mt-6 grid gap-2">
                <div className="md:col-span-2">
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
  const inner = (
    <>
      <div className="bw grain h-full">
        <ImageSlot
          slot={s.image}
          sizes={big ? "(min-width: 768px) 50vw, 92vw" : "(min-width: 768px) 25vw, 46vw"}
          className="h-full transition-transform duration-[1.4s] ease-[var(--ease-deco)] group-hover:scale-[1.04]"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <h3 className={`display text-pearl ${big ? "text-[clamp(2rem,1.4rem+2vw,3.2rem)]" : "text-[1.35rem] md:text-[1.6rem]"}`}>{s.name}</h3>
        {big ? <p className="mt-2 max-w-[36ch] text-pearl/85">{s.benefit}</p> : null}
        {big && linkServicePages ? (
          <span className="kicker mt-3 inline-block text-rose transition-colors group-hover:text-rose-light">See the treatment</span>
        ) : null}
      </div>
    </>
  );
  const cls = "group relative block h-full overflow-hidden bg-ink";
  return linkServicePages ? (
    <Link href={`/${s.slug}`} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function Lookbook() {
  const [feature, ...rest] = services;
  return (
    <section id="treatments" aria-labelledby="treatments-title" className="bg-pearl py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div>
            <p className="kicker text-rose-ink">The lookbook</p>
            <h2 id="treatments-title" className="display mt-4 text-[clamp(2.6rem,1.6rem+3.6vw,5rem)] text-ink">
              The Treatments
            </h2>
          </div>
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
  { act: "Act I", title: "Book", body: "Pick a treatment, a time, and your home or my studio." },
  { act: "Act II", title: "Relax", body: "Tell me about your skin, then let me take it from there." },
  { act: "Act III", title: "Glow", body: "Leave looking finished, with simple aftercare to keep it going." },
];

export function Acts() {
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
          <h2 id="acts-title" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4.2rem)] italic">
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
              <h3 className="display mt-3 text-[2.6rem]">{a.title}</h3>
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

export function QandA({
  faqs,
  title = "Questions & Answers",
  kicker = "Good to know",
  id = "questions",
}: {
  faqs: Faq[];
  title?: string;
  kicker?: string;
  id?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: [...f.a, ...(f.policy ?? [])].join(" ") },
    })),
  };
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-ink py-24 text-pearl md:py-32">
      <JsonLd data={schema} />
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="kicker text-rose">{kicker}</p>
            <h2 id={`${id}-title`} className="display mt-4 text-[clamp(2.6rem,1.6rem+3.6vw,5rem)]">
              {title}
            </h2>
          </div>
        </Reveal>
        <RuleDraw className="mt-10 bg-silver/40" />
        <div className="mt-10 gap-14 md:columns-2">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 2) * 0.08} className="mb-10 break-inside-avoid">
              <h3 className="display text-[1.45rem] leading-snug">
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

export function CloseUp({
  title = "Ready for your close-up?",
  kicker = "",
  showContact = true,
}: {
  title?: string;
  kicker?: string;
  showContact?: boolean;
}) {
  return (
    <section id="book" aria-labelledby="book-title" className="relative overflow-hidden bg-wine py-24 text-pearl md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 65% 70% at 50% 110%, rgba(212,80,140,0.34), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1100px] px-6 text-center md:px-10">
        <Reveal>
          {kicker ? <p className="kicker mb-5 text-rose-soft">{kicker}</p> : null}
          <h2 id="book-title" className="display text-[clamp(3rem,1.8rem+5vw,6.4rem)] italic">
            {title}
          </h2>
          {/* With no online booking yet, the button would point at this very section; the contact details below are the way to book. */}
          {bookingHref() === "/#book" ? null : (
            <div className="mt-10">
              <BookButton />
            </div>
          )}
        </Reveal>
        {showContact ? (
          <div className="mt-16 text-left">
            <ContactMethods tone="ink" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
