"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Demo-only tab bar for showing the client two design directions.
 * To retire Option 2: delete this component, src/app/option-2, src/components/v2,
 * and drop the `top-9` offsets in Header.tsx and v2/HeaderV2.tsx.
 */
const options = [
  { href: "/", label: "Option 1", note: "Art Deco" },
  { href: "/option-2", label: "Option 2", note: "Hollywood Editorial" },
];

export function OptionSwitcher() {
  const pathname = usePathname();
  const active = pathname.startsWith("/option-2") ? "/option-2" : "/";
  return (
    <nav
      aria-label="Design options"
      className="fixed inset-x-0 top-0 z-[60] flex h-9 items-center justify-center gap-1 border-b border-silver/25 bg-[#0b0b0b] text-[0.7rem] uppercase tracking-[0.2em]"
    >
      {options.map((o) => {
        const on = active === o.href;
        return (
          <Link
            key={o.href}
            href={o.href}
            aria-current={on ? "page" : undefined}
            className={`flex h-9 items-center gap-2 px-4 transition-colors ${
              on ? "bg-rose text-ink" : "text-mist hover:text-pearl"
            }`}
          >
            <span className="font-semibold">{o.label}</span>
            <span className={`hidden normal-case tracking-normal sm:inline ${on ? "text-ink/75" : "text-mist/70"}`}>{o.note}</span>
          </Link>
        );
      })}
    </nav>
  );
}
