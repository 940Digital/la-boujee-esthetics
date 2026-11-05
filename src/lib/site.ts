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

export const primaryNav = [
  ...services.map((s) => ({ href: servicePath(s.slug), label: s.navName })),
  { href: "/mobile-service", label: "Mobile Service" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
