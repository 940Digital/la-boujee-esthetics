import Link from "next/link";
import { business } from "@/site.config";
import { availability, directionsHref, fullAddress, isPlaceholder, mailHref, primaryNav, telHref } from "@/lib/site";
import { Wordmark } from "../Wordmark";

/** Footer, set like a magazine masthead page. */
export function SiteFooter() {
  const tel = telHref();
  const mail = mailHref();
  const directions = directionsHref();
  const ig = isPlaceholder(business.INSTAGRAM_URL) || isPlaceholder(business.INSTAGRAM_HANDLE) ? null : business.INSTAGRAM_URL;
  const col = "kicker text-rose";
  const item = "inline-flex min-h-11 items-center text-pearl/85 hover:text-pearl";
  return (
    <footer className="bg-ink text-pearl">
      <div className="mx-auto max-w-[1400px] px-6 pb-12 pt-16 md:px-10 md:pt-20">
        <div className="grid gap-10 border-b border-silver/25 pb-12 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Wordmark size="lg" />
            <p className="kicker mt-6 text-silver">{business.credential}</p>
          </div>
          <div>
            <h2 className={col}>Studio</h2>
            <p className="mt-4 text-pearl/85">
              {business.LOCATION_NOTE}
              <br />
              {fullAddress()}
            </p>
            {directions ? (
              <a href={directions} rel="noopener" className="kicker deco-link mt-1 inline-flex min-h-11 items-center text-rose-soft">
                Get directions
              </a>
            ) : null}
          </div>
          <div>
            <h2 className={col}>Home visits</h2>
            <p className="mt-4 text-pearl/85">
              {business.SERVICE_AREA.length} towns across Denton County and nearby. No travel fee.
            </p>
            <h2 className={`${col} mt-6`}>Available</h2>
            <p className="mt-4 text-pearl/85">{availability()}</p>
          </div>
          <div>
            <h2 className={col}>Contact</h2>
            <ul className="mt-3">
              <li>{tel ? <a href={tel} className={item}>{business.PHONE}</a> : <span className={item}>{business.PHONE}</span>}</li>
              <li>
                {mail ? (
                  <a href={mail} className={`${item} [overflow-wrap:break-word]`}>
                    {/* If the column is too narrow, break after the @ rather than mid-word. */}
                    {business.EMAIL.split("@")[0]}@<wbr />
                    {business.EMAIL.split("@")[1]}
                  </a>
                ) : (
                  <span className={item}>{business.EMAIL}</span>
                )}
              </li>
              {ig ? (
                <li>
                  <a href={ig} rel="noopener" className={item}>
                    Instagram {business.INSTAGRAM_HANDLE}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <nav aria-label="Footer" className="mt-8">
          <ul className="flex flex-wrap gap-x-7">
            {primaryNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="kicker inline-flex min-h-11 items-center text-mist hover:text-pearl">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-4 text-[0.9rem] text-mist">
          &copy; {business.name}. {business.credential} in the State of Texas, {business.CITY}, {business.STATE}.
        </p>
      </div>
    </footer>
  );
}
