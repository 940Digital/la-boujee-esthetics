import { business, services, type Service, type ServiceSlug } from "@/site.config";

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
  return isPlaceholder(business.BOOKING_URL) ? "/book" : business.BOOKING_URL;
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function telHref(): string | null {
  if (isPlaceholder(business.PHONE)) return null;
  return `tel:${business.PHONE.replace(/[^\d+]/g, "")}`;
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
    "At your home or in the studio, depending on the treatment. Ask which applies to your treatment when you book.",
  mobile: "Offered as a mobile appointment at your home.",
  studio: "Offered in the studio, where the full setup lives.",
  both: "Offered at your home or in the studio, whichever you prefer.",
};

export const primaryNav = [
  ...services.map((s) => ({ href: servicePath(s.slug), label: s.navName })),
  { href: "/mobile-service", label: "Mobile Service" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
