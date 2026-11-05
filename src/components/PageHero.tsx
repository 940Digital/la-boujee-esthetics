import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./motion";
import { RayField } from "./deco";

/**
 * Opening band for inner pages: near-black with a quiet fan texture, so the
 * header always sits on the same ground. Includes a breadcrumb back home.
 */
export function PageHero({
  label,
  title,
  intro,
  crumbs,
  children,
}: {
  label: string;
  title: string;
  intro?: string;
  crumbs: { href: string; name: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="fan-texture relative overflow-hidden bg-ink text-pearl">
      <RayField opacity={0.1} />
      <div className="relative mx-auto max-w-[1000px] px-6 pb-20 pt-32 text-center md:pb-24 md:pt-[15rem]">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center justify-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-mist">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-rose">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rotate-45 border border-blush" />
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-pearl/90">
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
          <p className="label mt-6 text-rose">{label}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display mx-auto mt-4 max-w-[18ch] text-[clamp(2.5rem,1.7rem+3.6vw,4.8rem)]">{title}</h1>
        </Reveal>
        {intro ? (
          <Reveal delay={0.2}>
            <p className="lede mx-auto mt-6 max-w-[52ch] text-mist">{intro}</p>
          </Reveal>
        ) : null}
        {children ? (
          <Reveal delay={0.3}>
            <div className="mt-9">{children}</div>
          </Reveal>
        ) : null}
      </div>
      <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-blush/70 to-transparent" />
    </section>
  );
}
