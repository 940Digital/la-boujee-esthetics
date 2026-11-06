import { business, linkServicePages, onePage, services, type Service, type ServiceSlug } from "@/site.config";

/** True when a config value is still an unfilled [PLACEHOLDER]. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return /\[[^\]]+\]/.test(value);
}

/** Replace {CITY} tokens in copy with the configured city. */
export function fill(text: string): string {
  return text.replaceAll("{CITY}", business.CITY);
}

/** Where every "Book Your Appointment" button goes. */
export function bookingHref(): string {
  if (!isPlaceholder(business.BOOKING_URL)) return business.BOOKING_URL;
  // No online booking yet: send people to the ways to reach her.
  return onePage ? "/#book" : "/book";
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function telHref(): string | null {
  if (isPlaceholder(business.PHONE)) return null;
  const digits = business.PHONE.replace(/\D/g, "");
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`;
}

export function mailHref(): string | null {
  if (isPlaceholder(business.EMAIL)) return null;
  return `mailto:${business.EMAIL}`;
}

export function getService(slug: ServiceSlug): Service {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service ${slug}`);
  return s;
}

export function servicePath(slug: ServiceSlug): string {
  return `/${slug}`;
}

export const settingCopy: Record<Service["setting"], string> = {
  unconfirmed:
    "Your home or my studio. Ask which when you book.",
  mobile: "At your home.",
  studio: "In my studio, where the full setup lives.",
  both: "Your home or my studio, whichever you prefer.",
};

/** Treatment links in the nav: one per page, or a single jump to the homepage lookbook. */
const treatmentNav = linkServicePages
  ? services.map((s) => ({ href: servicePath(s.slug), label: s.navName }))
  : [{ href: "/#treatments", label: "Treatments" }];

/** Where the header draws its divider (after the treatment links); -1 for none. */
export const treatmentNavCount = onePage ? -1 : treatmentNav.length;

/** Homepage sections in page order, for the one-page demo. */
export const sectionNav = [
  { href: "/#profile", label: "Meet Laurel" },
  { href: "/#place", label: "Home or Studio" },
  { href: "/#treatments", label: "Treatments" },
  { href: "/#questions", label: "Q&A" },
  { href: "/#book", label: "Contact" },
];

export const primaryNav = onePage
  ? sectionNav
  : [
      ...treatmentNav,
      { href: "/mobile-service", label: "Mobile Service" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ];

/** Menu links under the treatment list (the list itself covers treatments). */
export const menuNav = [
  { href: "/", label: "Home" },
  ...primaryNav.filter((n) => n.href !== "/#treatments" && !services.some((s) => n.href === servicePath(s.slug))),
];
