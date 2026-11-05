import { business } from "@/site.config";
import { HeroArt } from "../HeroArt";
import { BookButton } from "../BookButton";
import { Reveal } from "../motion";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[max(100svh,640px)] items-start overflow-hidden bg-ink text-pearl md:min-h-[max(100svh,780px)]"
    >
      <HeroArt />
      <div className="relative mx-auto w-full max-w-[1100px] px-6 pb-[42svh] pt-36 text-center md:pb-[36vh] md:pt-[15.5rem]">
        <Reveal y={10}>
          <p className="label flex items-center justify-center gap-4 text-rose">
            <span aria-hidden className="h-px w-8 bg-blush/70" />
            {business.credential}
            <span aria-hidden className="h-px w-8 bg-blush/70" />
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h1
            id="hero-title"
            className="display mx-auto mt-6 max-w-[17ch] text-[clamp(2.6rem,1.6rem+4.4vw,5.4rem)] text-pearl"
          >
            Custom Facials, Waxing and Lash Lifts in {business.CITY}
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="lede mx-auto mt-6 max-w-[46ch] text-mist">
            A licensed mobile esthetician. She comes to your home, or you visit her studio, depending on the treatment.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-9">
            <BookButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
