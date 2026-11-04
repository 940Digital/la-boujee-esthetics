import { NumeralMedallion, RayField } from "../deco";
import { Reveal, RuleDraw, Stagger, StaggerItem } from "../motion";

const steps = [
  {
    numeral: "I",
    title: "Book",
    body: "Choose your treatment and a time. Tell her whether you'd like her to come to you or to visit the studio.",
  },
  {
    numeral: "II",
    title: "Relax",
    body: "Settle in at home or in the studio. Mention anything about your skin, then let her take it from there.",
  },
  {
    numeral: "III",
    title: "Glow",
    body: "Leave with skin, brows or lashes that feel cared for, and simple aftercare to keep the results going.",
  },
];

export function Ritual() {
  return (
    <section aria-labelledby="ritual-title" className="fan-texture relative overflow-hidden bg-ink py-24 text-pearl md:py-32">
      <RayField origin="top" opacity={0.08} />
      <div className="relative mx-auto max-w-[1180px] px-6 md:px-10">
        <Reveal className="text-center">
          <p className="label text-brass">How it works</p>
          <h2 id="ritual-title" className="display mt-4 text-[clamp(2.5rem,1.9rem+2.6vw,4rem)]">
            The Ritual
          </h2>
        </Reveal>

        <Stagger as="li" className="relative mt-14 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-10">
          {steps.map((s, i) => (
            <StaggerItem key={s.title} as="li" className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute top-[66px] hidden md:block"
                  style={{ left: "calc(50% + 74px)", width: "calc(100% + 2.5rem - 148px)" }}
                >
                  <RuleDraw className="bg-brass/45" delay={0.4} />
                </span>
              ) : null}
              <NumeralMedallion numeral={s.numeral} />
              <h3 className="display mt-5 text-[2.2rem] text-pearl">
                <span className="sr-only">Step {s.numeral}: </span>
                {s.title}
              </h3>
              <p className="mt-3 max-w-[32ch] text-mist">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
