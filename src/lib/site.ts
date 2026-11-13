import {
  business,
  images,
  linkServicePages,
  onePage,
  priceMenu,
  services,
  type MenuItem,
  type Service,
  type ServiceSetting,
  type ServiceSlug,
} from "@/site.config";

/** True when a config value is still an unfilled [PLACEHOLDER] (or empty). */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return /\[[^\]]+\]/.test(value);
}

/** Only the values that are ready to show. Use for any list of config values. */
export function shown<T extends string>(values: readonly T[]): T[] {
  return values.filter((v) => !isPlaceholder(v));
}

/** "Inside Burgess Chiropractic Office" -> "inside Burgess Chiropractic Office", for mid-sentence use. */
export function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

/** True while the owner portrait slot still holds the placeholder (rendered as a brand panel). */
export function portraitIsPlaceholder(): boolean {
  return images.ownerPortrait.src.startsWith("/placeholders/");
}

/** Replace {CITY} tokens in copy with the configured city. */
export function fill(text: string): string {
  return text.replaceAll("{CITY}", business.CITY);
}

/** Where every "Book Your Appointment" button goes. */
export function bookingHref(): string {
  if (!isPlaceholder(business.BOOKING_URL)) return business.BOOKING_URL;
  // No online booking yet: send people to the Book and Contact page.
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

/** "1100 Dallas Dr, Denton, TX 76205" (street line left off while it's a placeholder). */
export function fullAddress(): string {
  const street = isPlaceholder(business.STUDIO_ADDRESS) ? "" : `${business.STUDIO_ADDRESS}, `;
  return `${street}${business.CITY}, ${business.STATE} ${business.POSTAL_CODE}`;
}

/** Plain Google Maps search for the studio address. No embed, no API key. */
export function directionsHref(): string | null {
  if (isPlaceholder(business.STUDIO_ADDRESS)) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`;
}

/** "Monday through Saturday, by appointment", with times added once they're known. */
export function availability(): string {
  const times = isPlaceholder(business.HOURS_TIMES) ? "" : `, ${business.HOURS_TIMES}`;
  return `${business.DAYS}${times}, by appointment`;
}

export function getService(slug: ServiceSlug): Service {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service ${slug}`);
  return s;
}

export function servicePath(slug: ServiceSlug): string {
  return `/${slug}`;
}

/** "$75", or "Ask for pricing" for treatments that aren't on the menu yet. */
export function formatPrice(item: MenuItem): string {
  return item.price === null ? "Ask for pricing" : `$${item.price}`;
}

export function priceGroupsFor(slug: ServiceSlug) {
  return priceMenu.filter((g) => g.service === slug);
}

/** "$15-$340", worked out from the menu. */
export function priceRange(): string {
  const prices = priceMenu.flatMap((g) => g.items.map((i) => i.price)).filter((p): p is number => p !== null);
  return `$${Math.min(...prices)}-$${Math.max(...prices)}`;
}

/** Short marker for price groups and treatment lists. */
export const settingLabel: Record<ServiceSetting, string> = {
  mobile: "Home visits only",
  studio: "Studio only",
  both: "At home or studio",
};

/** One line, in her voice, for where a treatment happens. */
export const settingCopy: Record<ServiceSetting, string> = {
  mobile: "At your home.",
  studio: `In my ${business.CITY} studio only.`,
  both: `At your home or in my ${business.CITY} studio, whichever you prefer.`,
};

const sentenceCase = (t: string) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();

/** Every treatment, split by where it can happen (for the Mobile Service page). */
export function offeringsBySetting() {
  const all = services.flatMap((s) => s.offerings.map((o) => ({ ...o, label: sentenceCase(o.listName ?? o.name), service: s.slug })));
  return {
    atHome: all.filter((o) => o.setting !== "studio"),
    studioOnly: all.filter((o) => o.setting === "studio"),
  };
}

/** The seven pages, in the header, the mobile menu and the footer. */
export const primaryNav: { href: string; label: string }[] = [
  { href: "/services", label: "Services and Prices" },
  ...(linkServicePages ? services.map((s) => ({ href: servicePath(s.slug), label: s.navName })) : []),
  { href: "/mobile-service", label: "Mobile Service" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book and Contact" },
];
