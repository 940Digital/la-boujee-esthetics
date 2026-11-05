import Link from "next/link";
import { business, services } from "@/site.config";
import { isPlaceholder, mailHref, telHref } from "@/lib/site";
import { Wordmark } from "../Wordmark";

/** Option 2 footer: set like a magazine masthead page. */
export function SiteFooter() {
  const tel = telHref();
  const mail = mailHref();
  const ig = isPlaceholder(business.INSTAGRAM_URL) ? null : business.INSTAGRAM_URL;
  const col = "kicker text-rose";
  const item = "inline-flex min-h-11 items-center text-pearl/85 hover:text-pearl";
  return (
    <footer className="bg-ink text-pearl">
      <div className="mx-auto max-w-[1400px] px-6 pb-12 pt-16 md:px-10 md:pt-20">
        <div className="grid gap-12 border-b border-silver/25 pb-14 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Wordmark size="lg" />
            <p className="kicker mt-6 text-silver">{business.credential}</p>
            <p className="mt-2 max-w-[34ch] text-[0.95rem] text-mist">
              Facials, waxing, tinting, eyelash lifts and chemical peels in {business.CITY}, at your home or in the studio.
            </p>
          </div>
          <div>
            <h2 className={col}>Treatments</h2>
            <ul className="mt-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className={item}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={col}>Service area</h2>
            <p className="mt-4 text-[0.95rem] text-pearl/85">
              Within {business.TRAVEL_RADIUS} of {business.CITY}, {business.STATE}.
            </p>
            <ul className="mt-2 text-[0.95rem] text-mist">
              {business.SERVICE_AREA.map((a, i) => (
                <li key={`${a}-${i}`}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={col}>Contact</h2>
            <ul className="mt-3">
              <li>{tel ? <a href={tel} className={item}>{business.PHONE}</a> : <span className={item}>{business.PHONE}</span>}</li>
              <li>
                {mail ? (
                  <a href={mail} className={`${item} [overflow-wrap:anywhere]`}>
                    {business.EMAIL}
                  </a>
                ) : (
                  <span className={item}>{business.EMAIL}</span>
                )}
              </li>
              <li>
                {ig ? (
                  <a href={ig} rel="noopener" className={item}>
                    Instagram {business.INSTAGRAM_HANDLE}
                  </a>
                ) : (
                  <span className={item}>Instagram {business.INSTAGRAM_HANDLE}</span>
                )}
              </li>
            </ul>
          </div>
        </div>
        <nav aria-label="Footer" className="mt-8 flex flex-wrap gap-x-7">
          {[
            { href: "/", label: "Home" },
            { href: "/mobile-service", label: "Mobile Service" },
            { href: "/about", label: "About" },
            { href: "/book", label: "Book" },
            { href: "/contact", label: "Contact" },
          ].map((n) => (
            <Link key={n.href} href={n.href} className="kicker inline-flex min-h-11 items-center text-mist hover:text-pearl">
              {n.label}
            </Link>
          ))}
        </nav>
        <p className="mt-4 text-[0.8rem] text-mist">
          &copy; {business.name}. {business.credential}, {business.CITY}, {business.STATE}.
        </p>
      </div>
    </footer>
  );
}
