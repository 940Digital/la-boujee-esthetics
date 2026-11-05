import Link from "next/link";
import { business, services } from "@/site.config";
import { isPlaceholder, mailHref, telHref } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { Ornament } from "./deco";

export function Footer() {
  const tel = telHref();
  const mail = mailHref();
  const ig = isPlaceholder(business.INSTAGRAM_URL) ? null : business.INSTAGRAM_URL;

  return (
    <footer className="relative bg-ink text-pearl">
      <div className="h-px bg-gradient-to-r from-transparent via-blush/70 to-transparent" />
      <div className="mx-auto max-w-[1240px] px-6 pb-12 pt-16 md:px-10 md:pt-20">
        <div className="flex flex-col items-center text-center">
          <Wordmark size="lg" />
          <p className="label mt-6 text-rose">{business.credential}</p>
          <p className="mt-2 max-w-md text-[0.95rem] text-mist">
            Facials, waxing, tinting, eyelash lifts and chemical peels in {business.CITY}, at your home or in the studio.
          </p>
        </div>

        <div className="mt-14 grid gap-12 border-t border-blush/25 pt-12 text-[0.95rem] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="label text-rose">Treatments</h2>
            <ul className="mt-4 space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="deco-link inline-flex min-h-11 items-center text-pearl/85 hover:text-pearl">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label text-rose">Service Area</h2>
            <p className="mt-4 text-pearl/85">
              Mobile appointments within {business.TRAVEL_RADIUS} of {business.CITY}, {business.STATE}.
            </p>
            <ul className="mt-3 space-y-1 text-mist">
              {business.SERVICE_AREA.map((a, i) => (
                <li key={`${a}-${i}`}>{a}</li>
              ))}
            </ul>
            <Link href="/mobile-service" className="deco-link mt-3 inline-flex min-h-11 items-center text-pearl/85 hover:text-pearl">
              How mobile service works
            </Link>
          </div>

          <div>
            <h2 className="label text-rose">Hours</h2>
            <dl className="mt-4 space-y-2">
              {business.HOURS.map((h, i) => (
                <div key={i} className="flex justify-between gap-6 border-b border-pearl/10 pb-2">
                  <dt className="text-pearl/85">{h.days}</dt>
                  <dd className="text-mist">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="label text-rose">Contact</h2>
            <ul className="mt-4 space-y-1">
              <li>
                {tel ? (
                  <a href={tel} className="deco-link inline-flex min-h-11 items-center text-pearl/85 hover:text-pearl">
                    {business.PHONE}
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center text-pearl/85">{business.PHONE}</span>
                )}
              </li>
              <li>
                {mail ? (
                  <a href={mail} className="deco-link inline-flex min-h-11 items-center text-pearl/85 hover:text-pearl">
                    {business.EMAIL}
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center text-pearl/85">{business.EMAIL}</span>
                )}
              </li>
              <li>
                {ig ? (
                  <a href={ig} rel="noopener" className="deco-link inline-flex min-h-11 items-center text-pearl/85 hover:text-pearl">
                    Instagram {business.INSTAGRAM_HANDLE}
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center text-pearl/85">Instagram {business.INSTAGRAM_HANDLE}</span>
                )}
              </li>
              <li>
                <Link href="/contact" className="deco-link inline-flex min-h-11 items-center text-pearl/85 hover:text-pearl">
                  Send a message
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <Ornament width={180} />
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 text-[0.78rem] uppercase tracking-[0.2em] text-mist">
            <Link href="/" className="inline-flex min-h-11 items-center hover:text-pearl">Home</Link>
            <Link href="/about" className="inline-flex min-h-11 items-center hover:text-pearl">About</Link>
            <Link href="/mobile-service" className="inline-flex min-h-11 items-center hover:text-pearl">Mobile Service</Link>
            <Link href="/book" className="inline-flex min-h-11 items-center hover:text-pearl">Book</Link>
            <Link href="/contact" className="inline-flex min-h-11 items-center hover:text-pearl">Contact</Link>
          </nav>
          <p className="text-[0.8rem] text-mist">
            &copy; {business.name}. {business.credential}, {business.CITY}, {business.STATE}.
          </p>
        </div>
      </div>
    </footer>
  );
}
