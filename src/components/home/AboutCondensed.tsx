import Link from "next/link";
import { business, images } from "@/site.config";
import { ImageSlot } from "../ImageSlot";
import { Curtain, Reveal, Stagger, StaggerItem } from "../motion";
import { ArchCrown } from "../deco";

const proof = [
  {
    title: "Licensed Esthetician",
    body: "Professionally trained and licensed for the skin, brow and lash treatments she offers.",
  },
  {
    title: "Mobile or Studio",
    body: "Your home or her studio, depending on the treatment. Less driving, more time for you.",
  },
  {
    title: "One-on-One",
    body: "A solo practice. The person you book is the person who takes care of you, every time.",
  },
];

export function AboutCondensed() {
  return (
    <section aria-labelledby="about-title" className="bg-pearl py-24 md:py-32">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 md:grid-cols-[0.85fr_1fr] md:gap-20 md:px-10">
        <div className="relative mx-auto w-full max-w-[420px]">
          <ArchCrown tone="brass-ink" className="mx-auto mb-[-2px] w-[44%]" />
          <Curtain>
            <div className="rounded-t-[999px] border border-brass-ink/60 p-2.5">
              <ImageSlot
                slot={images.ownerPortrait}
                sizes="(min-width: 768px) 420px, 90vw"
                className="rounded-t-[999px]"
              />
            </div>
          </Curtain>
          <p className="label mt-5 text-center text-rose-ink">{business.OWNER_NAME}</p>
        </div>

        <div>
          <Reveal>
            <p className="label text-rose-ink">Meet your esthetician</p>
            <h2 id="about-title" className="h2 mt-4 max-w-[18ch] text-ink">
              Professional skin care, brought to your door
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="prose-measure mt-6 space-y-4 text-graphite">
              <p>
                {business.OWNER_NAME} is the licensed esthetician behind Lá Boujee Esthetics. She offers custom
                facials, waxing, brow and lash tinting, eyelash lifts and chemical peels in {business.CITY}.
              </p>
              <p>
                Choose her for the convenience and the care. Depending on the treatment, she brings the appointment to
                your home or welcomes you to her studio.
              </p>
            </div>
          </Reveal>

          <Stagger className="mt-10 grid gap-6 border-t border-ink/15 pt-8 sm:grid-cols-3 sm:gap-8">
            {proof.map((p) => (
              <StaggerItem key={p.title}>
                <h3 className="font-serif text-[1.35rem] font-medium leading-tight text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-graphite">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <Link
              href="/about"
              className="deco-link mt-9 inline-flex min-h-11 items-center text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-ink"
            >
              More about {business.OWNER_FIRST_NAME}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
