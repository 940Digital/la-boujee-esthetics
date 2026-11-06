import { business } from "@/site.config";
import { isPlaceholder, mailHref, telHref } from "@/lib/site";
import { Stagger, StaggerItem } from "./motion";

/** Ways to reach her, set like a magazine's contact column. Placeholders render as plain text. */
export function ContactMethods({ tone = "pearl", stacked = false }: { tone?: "pearl" | "ink"; stacked?: boolean }) {
  const dark = tone === "ink";
  const items = [
    { title: "Call or text", value: business.PHONE, href: telHref() },
    { title: "Email", value: business.EMAIL, href: mailHref() },
    // Instagram appears once her handle and link are filled in.
    ...(isPlaceholder(business.INSTAGRAM_URL) || isPlaceholder(business.INSTAGRAM_HANDLE)
      ? []
      : [{ title: "Instagram", value: business.INSTAGRAM_HANDLE, href: business.INSTAGRAM_URL as string | null }]),
  ];
  const value = "display mt-2 inline-flex min-h-11 items-center text-[1.35rem] sm:text-[1.5rem] lg:text-[1.35rem] [overflow-wrap:anywhere]";
  return (
    <Stagger className={`grid gap-x-10 ${stacked ? "" : items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
      {items.map((m) => (
        <StaggerItem key={m.title} className={`border-t-2 py-5 ${dark ? "border-silver/50 text-pearl" : "border-ink text-ink"}`}>
          <h3 className={`kicker ${dark ? "text-rose-soft" : "text-rose-ink"}`}>{m.title}</h3>
          {m.href ? (
            <a href={m.href} rel="noopener" className={`deco-link ${value}`}>
              {m.value}
            </a>
          ) : (
            <p className={value}>{m.value}</p>
          )}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
