import { business } from "@/site.config";
import { isPlaceholder, mailHref, telHref } from "@/lib/site";
import { StepFrame } from "./deco";
import { Stagger, StaggerItem } from "./motion";

/** Three ways to reach her. Placeholders render as plain text until filled. */
export function ContactMethods({ tone = "pearl" }: { tone?: "pearl" | "ink" }) {
  const dark = tone === "ink";
  const items = [
    { title: "Call or text", value: business.PHONE, href: telHref() },
    { title: "Email", value: business.EMAIL, href: mailHref() },
    {
      title: "Instagram",
      value: business.INSTAGRAM_HANDLE,
      href: isPlaceholder(business.INSTAGRAM_URL) ? null : business.INSTAGRAM_URL,
    },
  ];
  return (
    <Stagger className="grid gap-5 md:grid-cols-3">
      {items.map((m) => (
        <StaggerItem key={m.title} className={`relative px-6 py-10 text-center ${dark ? "bg-ink-2 text-pearl" : "bg-pearl-2 text-ink"}`}>
          <StepFrame tone={dark ? "blush" : "blush-ink"} inset={7} step={10} opacity={0.6} />
          <h3 className={`label ${dark ? "text-rose" : "text-rose-ink"}`}>{m.title}</h3>
          {m.href ? (
            <a href={m.href} rel="noopener" className="deco-link mt-3 inline-flex min-h-11 items-center font-serif text-[1.45rem] [overflow-wrap:anywhere]">
              {m.value}
            </a>
          ) : (
            <p className="mt-3 inline-flex min-h-11 items-center font-serif text-[1.35rem] [overflow-wrap:anywhere]">{m.value}</p>
          )}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
