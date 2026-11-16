import { showPrices, type PriceGroup } from "@/site.config";
import { formatPrice, settingLabel } from "@/lib/site";

/** "At home or studio" / "Studio only", set as a small ruled tag. */
export function SettingTag({ setting, tone = "pearl" }: { setting: PriceGroup["setting"]; tone?: "pearl" | "ink" }) {
  return (
    <span
      className={`kicker inline-flex items-center border px-2.5 pb-1 pt-1.5 !text-[0.72rem] !tracking-[0.18em] ${
        tone === "ink" ? "border-silver/50 text-rose-soft" : "border-ink/25 text-rose-ink"
      }`}
    >
      {settingLabel[setting]}
    </span>
  );
}

/**
 * Price groups from priceMenu, set like a magazine price box. Every price on
 * the site is rendered by this component, from site.config.ts only.
 */
export function PriceGroups({ groups }: { groups: PriceGroup[] }) {
  if (!showPrices || groups.length === 0) return null;
  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <div key={`${g.service}-${g.title}`}>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b-2 border-ink pb-3">
            <h3 className="display text-[1.6rem] leading-tight md:text-[1.8rem]">{g.title}</h3>
            <SettingTag setting={g.setting} />
          </div>
          <dl>
            {g.items.map((m) => (
              <div key={m.name} className="flex items-baseline gap-3 border-b border-ink/12 py-3.5">
                <dt className="text-[1.0625rem] leading-snug text-ink">
                  {m.name}
                  {m.note ? <span className="mt-1 block text-[0.95rem] text-graphite">{m.note}</span> : null}
                </dt>
                <span aria-hidden className="mb-[0.35em] min-w-4 flex-1 border-b border-dotted border-ink/35" />
                <dd
                  className={
                    m.price === null
                      ? "shrink-0 text-right text-[0.95rem] italic text-graphite"
                      : "display shrink-0 text-right text-[1.35rem] text-rose-ink"
                  }
                >
                  {formatPrice(m)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
