import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageSlot } from "@/site.config";
import { Reveal } from "../motion";

/**
 * Inner-page opener: a smaller cousin of the homepage cover. Black page,
 * pink key light, Bodoni headline, and (when given) a black-and-white
 * photo bleeding off the right edge.
 */
export function Opener({
  kicker,
  title,
  standfirst,
  crumbs,
  photo,
  children,
}: {
  kicker: string;
  title: string;
  standfirst?: string;
  crumbs: { href: string; name: string }[];
  photo?: ImageSlot;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-pearl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 25% 110%, rgba(212,80,140,0.3), transparent 70%)" }}
      />

      {photo ? (
        <div className="relative h-[42svh] min-h-[300px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[44%]">
          <div className="bw grain absolute inset-0 overflow-hidden">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/50 lg:bg-gradient-to-r lg:from-ink lg:via-ink/5 lg:to-transparent" />
          <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/85 to-transparent" />
        </div>
      ) : null}

      <div className={`relative z-10 mx-auto max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20 ${photo ? "pt-6 lg:pt-44 xl:pt-52" : "pt-32 lg:pt-44 xl:pt-52"} lg:min-h-[560px]`}>
        <div className={photo ? "lg:max-w-[54%]" : "max-w-[900px]"}>
          <nav aria-label="Breadcrumb">
            <ol className="kicker flex flex-wrap items-center gap-3 !text-[0.78rem] md:!text-[0.7rem] text-mist">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center hover:text-rose">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-3">
                  <span aria-hidden className="h-px w-4 bg-silver/50" />
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-pearl/85">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.href} className="inline-flex min-h-11 items-center hover:text-rose">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Reveal y={10}>
            <p className="kicker mt-6 text-rose">{kicker}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.6rem,1.4rem+3.6vw,4.8rem)]">{title}</h1>
          </Reveal>
          {standfirst ? (
            <Reveal delay={0.2}>
              <p className="display mt-6 max-w-[40ch] text-[1.35rem] italic leading-snug text-pearl/85">{standfirst}</p>
            </Reveal>
          ) : null}
          {children ? (
            <Reveal delay={0.3}>
              <div className="mt-9">{children}</div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
