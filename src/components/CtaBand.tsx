import { business } from "@/site.config";
import { BookButton } from "./BookButton";
import { FanMark, RayField } from "./deco";
import { Reveal, RuleDraw } from "./motion";

export function CtaBand({
  title = "Book Your Next Appointment",
  body = `At your home or in the studio, with a licensed esthetician in ${business.CITY}.`,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="fan-texture relative overflow-hidden bg-wine py-24 text-center text-pearl md:py-28">
      <RayField opacity={0.16} />
      <div className="relative mx-auto max-w-[760px] px-6">
        <Reveal>
          <FanMark size={64} className="mx-auto" />
          <h2 id="cta-title" className="display mt-6 text-[clamp(2.3rem,1.7rem+2.6vw,3.8rem)]">
            {title}
          </h2>
          <p className="lede mx-auto mt-4 max-w-[44ch] text-mauve">{body}</p>
          <div className="mt-9">
            <BookButton />
          </div>
        </Reveal>
        <RuleDraw className="mx-auto mt-14 w-48 bg-brass/60" />
      </div>
    </section>
  );
}
