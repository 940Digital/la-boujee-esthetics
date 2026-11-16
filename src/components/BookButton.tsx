import Link from "next/link";
import { bookingHref, isExternal } from "@/lib/site";

type Props = {
  className?: string;
  /** Part of the site chrome (header, sticky bar) rather than the page itself. */
  chrome?: boolean;
};

/**
 * The single site-wide call to action: one style, always the same words.
 * Page buttons are marked so the sticky bar and the header can step aside
 * while one is on screen (see useInPageCta), keeping one CTA per viewport.
 */
export function BookButton({ className = "", chrome = false }: Props) {
  const href = bookingHref();
  const props = { className: `btn btn-rose ${className}`, "data-book-cta": chrome ? "chrome" : "page" };
  if (isExternal(href)) {
    return (
      <a href={href} rel="noopener" {...props}>
        Book Your Appointment
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      Book Your Appointment
    </Link>
  );
}
