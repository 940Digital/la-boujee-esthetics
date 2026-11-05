/* Art Deco line-work primitives. All decorative, so all aria-hidden. */

type Tone = "silver" | "silver-ink" | "pearl" | "ink";

const toneColor: Record<Tone, string> = {
  silver: "#C4BFC6",
  "silver-ink": "#9A939D",
  pearl: "#F9F6F7",
  ink: "#121212",
};

/**
 * Thin stepped-corner frame. Corners are fixed-size SVG so the steps never
 * stretch; straight edges are hairline divs that flex with the box.
 */
export function StepFrame({
  tone = "silver",
  inset = 10,
  step = 14,
  opacity = 0.7,
  className = "",
}: {
  tone?: Tone;
  inset?: number;
  step?: number;
  opacity?: number;
  className?: string;
}) {
  const c = toneColor[tone];
  const s = step * 2;
  const corner = (rot: number, pos: React.CSSProperties) => (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      style={{ position: "absolute", transform: `rotate(${rot}deg)`, ...pos }}
    >
      <path
        d={`M0.5 ${s} V${step + 0.5} H${step + 0.5} V0.5 H${s}`}
        fill="none"
        stroke={c}
        strokeWidth="1"
      />
    </svg>
  );
  const edge = (style: React.CSSProperties) => (
    <span style={{ position: "absolute", background: c, ...style }} />
  );
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ inset, opacity }}
    >
      {corner(0, { top: 0, left: 0 })}
      {corner(90, { top: 0, right: 0 })}
      {corner(180, { bottom: 0, right: 0 })}
      {corner(270, { bottom: 0, left: 0 })}
      {edge({ top: 0, left: s, right: s, height: 1 })}
      {edge({ bottom: 0, left: s, right: s, height: 1 })}
      {edge({ left: 0, top: s, bottom: s, width: 1 })}
      {edge({ right: 0, top: s, bottom: s, width: 1 })}
    </span>
  );
}

/** The brand fan: a half sunburst with ribs, used as the logo mark. */
export function FanMark({ size = 28, tone = "silver", className = "" }: { size?: number; tone?: Tone; className?: string }) {
  const c = toneColor[tone];
  const rays = 9;
  const lines = Array.from({ length: rays }, (_, i) => {
    const a = Math.PI + (Math.PI * i) / (rays - 1);
    return { x: 20 + Math.cos(a) * 17, y: 20 + Math.sin(a) * 17 };
  });
  return (
    <svg aria-hidden width={size} height={size * 0.6} viewBox="0 0 40 24" className={className}>
      <path d="M3 20 A17 17 0 0 1 37 20" fill="none" stroke={c} strokeWidth="1" />
      <path d="M10 20 A10 10 0 0 1 30 20" fill="none" stroke={c} strokeWidth="1" />
      {lines.map((p, i) => (
        <line key={i} x1="20" y1="20" x2={p.x.toFixed(2)} y2={p.y.toFixed(2)} stroke={c} strokeWidth="0.8" />
      ))}
      <line x1="1" y1="20.5" x2="39" y2="20.5" stroke={c} strokeWidth="1" />
      <path d="M17 20.5 L20 23.5 L23 20.5" fill="none" stroke={c} strokeWidth="0.8" />
    </svg>
  );
}

/** Centered ornament: rule, diamond, fan, diamond, rule. */
export function Ornament({ tone = "silver", className = "", width = 220 }: { tone?: Tone; className?: string; width?: number }) {
  const c = toneColor[tone];
  return (
    <svg aria-hidden width={width} height="22" viewBox="0 0 220 22" className={className}>
      <line x1="0" y1="14" x2="82" y2="14" stroke={c} strokeWidth="1" />
      <line x1="138" y1="14" x2="220" y2="14" stroke={c} strokeWidth="1" />
      <path d="M86 14 L90 10 L94 14 L90 18 Z" fill="none" stroke={c} strokeWidth="1" />
      <path d="M126 14 L130 10 L134 14 L130 18 Z" fill="none" stroke={c} strokeWidth="1" />
      <path d="M98 14 A12 12 0 0 1 122 14" fill="none" stroke={c} strokeWidth="1" />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = Math.PI + (Math.PI * (i + 1)) / 6;
        return (
          <line
            key={i}
            x1="110"
            y1="14"
            x2={(110 + Math.cos(a) * 12).toFixed(2)}
            y2={(14 + Math.sin(a) * 12).toFixed(2)}
            stroke={c}
            strokeWidth="0.8"
          />
        );
      })}
    </svg>
  );
}

/** Sunburst medallion with an Art Deco numeral in the centre. */
export function NumeralMedallion({ numeral, tone = "silver" }: { numeral: string; tone?: Tone }) {
  const c = toneColor[tone];
  const rays = 32;
  return (
    <svg aria-hidden width="132" height="132" viewBox="0 0 132 132">
      {Array.from({ length: rays }, (_, i) => {
        const a = (Math.PI * 2 * i) / rays;
        const long = i % 2 === 0;
        const r1 = 40;
        const r2 = long ? 64 : 54;
        return (
          <line
            key={i}
            x1={(66 + Math.cos(a) * r1).toFixed(2)}
            y1={(66 + Math.sin(a) * r1).toFixed(2)}
            x2={(66 + Math.cos(a) * r2).toFixed(2)}
            y2={(66 + Math.sin(a) * r2).toFixed(2)}
            stroke={c}
            strokeWidth="0.8"
            opacity={long ? 0.9 : 0.5}
          />
        );
      })}
      <circle cx="66" cy="66" r="36" fill="none" stroke={c} strokeWidth="1" />
      <circle cx="66" cy="66" r="32" fill="none" stroke={c} strokeWidth="0.6" opacity="0.6" />
      <text
        x="66"
        y="67"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={c}
        style={{ fontFamily: "var(--font-poiret)", fontSize: 30, letterSpacing: "0.05em" }}
      >
        {numeral}
      </text>
    </svg>
  );
}

/** Stepped ziggurat arch used to crown cards and image frames. */
export function SteppedArch({ tone = "silver", className = "" }: { tone?: Tone; className?: string }) {
  const c = toneColor[tone];
  return (
    <svg aria-hidden viewBox="0 0 300 60" preserveAspectRatio="xMidYMax meet" className={className}>
      <path
        d="M0 59.5 H70 V44.5 H100 V29.5 H125 V14.5 H140 V0.5 H160 V14.5 H175 V29.5 H200 V44.5 H230 V59.5 H300"
        fill="none"
        stroke={c}
        strokeWidth="1"
      />
      <path
        d="M90 59.5 V52.5 H112 V37.5 H133 V22.5 H145 V9 H155 V22.5 H167 V37.5 H188 V52.5 H210 V59.5"
        fill="none"
        stroke={c}
        strokeWidth="0.7"
        opacity="0.6"
      />
    </svg>
  );
}

/** Line illustration: a front door with a fanlight (for mobile, "Come to You"). */
export function DoorIcon({ tone = "silver", size = 72 }: { tone?: Tone; size?: number }) {
  const c = toneColor[tone];
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 72 72" fill="none" stroke={c} strokeWidth="1">
      <path d="M8 68 H64" />
      <path d="M18 68 V30 A18 18 0 0 1 54 30 V68" />
      <path d="M24 68 V31 H48 V68" />
      <path d="M24 30 A12 12 0 0 1 48 30" />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = Math.PI + (Math.PI * (i + 1)) / 6;
        return <line key={i} x1="36" y1="30" x2={(36 + Math.cos(a) * 12).toFixed(2)} y2={(30 + Math.sin(a) * 12).toFixed(2)} strokeWidth="0.7" />;
      })}
      <circle cx="43" cy="50" r="1.4" />
      <path d="M30 38 H42 M30 44 H42" strokeWidth="0.6" opacity="0.6" />
    </svg>
  );
}

/** Line illustration: a treatment bed under a stepped canopy (for "Visit the Studio"). */
export function StudioIcon({ tone = "silver", size = 72 }: { tone?: Tone; size?: number }) {
  const c = toneColor[tone];
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 72 72" fill="none" stroke={c} strokeWidth="1">
      <path d="M8 68 H64" />
      <path d="M12 26 H22 V18 H30 V10 H42 V18 H50 V26 H60" />
      <path d="M14 26 V68 M58 26 V68" strokeWidth="0.7" />
      <path d="M20 52 H52 V56 H20 Z" />
      <path d="M22 56 V64 M50 56 V64" />
      <path d="M22 52 C22 47 27 46 30 47" strokeWidth="0.8" />
      <circle cx="36" cy="38" r="5" strokeWidth="0.8" />
      <path d="M36 30 V33 M36 43 V46 M28 38 H31 M41 38 H44" strokeWidth="0.6" />
    </svg>
  );
}

/** Faint hairline sunburst for dark section backgrounds. Lines stay 1px at any size. */
export function RayField({ origin = "bottom", opacity = 0.14 }: { origin?: "bottom" | "top"; opacity?: number }) {
  const w = 1440;
  const h = 900;
  const cx = w / 2;
  const cy = origin === "bottom" ? h + 60 : -60;
  const n = 36;
  const reach = 1800;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio={origin === "bottom" ? "xMidYMax slice" : "xMidYMin slice"}
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 1) / (n + 1);
        const a = origin === "bottom" ? Math.PI + Math.PI * t : Math.PI * t;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={(cx + Math.cos(a) * reach).toFixed(2)}
            y2={(cy + Math.sin(a) * reach).toFixed(2)}
            stroke="#C4BFC6"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            opacity={i % 2 ? opacity * 0.55 : opacity}
          />
        );
      })}
    </svg>
  );
}

/** A half sunburst that crowns the apex of a rounded arch frame, like a keystone. */
export function ArchCrown({ tone = "silver", className = "" }: { tone?: Tone; className?: string }) {
  const c = toneColor[tone];
  const rays = 13;
  return (
    <svg aria-hidden viewBox="0 0 160 48" className={className}>
      {Array.from({ length: rays }, (_, i) => {
        const a = Math.PI + (Math.PI * (i + 1)) / (rays + 1);
        const long = i % 2 === 0;
        const r1 = 12;
        const r2 = long ? 44 : 30;
        return (
          <line
            key={i}
            x1={(80 + Math.cos(a) * r1).toFixed(2)}
            y1={(47.5 + Math.sin(a) * r1).toFixed(2)}
            x2={(80 + Math.cos(a) * r2).toFixed(2)}
            y2={(47.5 + Math.sin(a) * r2).toFixed(2)}
            stroke={c}
            strokeWidth="0.9"
            opacity={long ? 0.9 : 0.55}
          />
        );
      })}
      <path d="M71 47.5 A9 9 0 0 1 89 47.5" fill="none" stroke={c} strokeWidth="1" />
    </svg>
  );
}
