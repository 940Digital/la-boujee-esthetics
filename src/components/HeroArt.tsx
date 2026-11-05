"use client";

import { motion, useReducedMotion } from "framer-motion";

/*
  The one section allowed extra flair: a blush sunburst rising from a pleated
  fan at the foot of the page. Rays draw in from the centre outward, then a
  slow glow breathes behind the fan. Two compositions (wide and tall) so the
  fan is never cropped awkwardly on a phone.
*/

const BLUSH = "#E8B7CB";
const ROSE = "#D4508C";
const f = (n: number) => Number(n.toFixed(2));

type Props = { w: number; h: number; fanR: number; rays: number; className?: string };

function Composition({ w, h, fanR, rays, className }: Props) {
  const reduce = useReducedMotion();
  const cx = w / 2;
  const cy = h;
  const reach = Math.hypot(w / 2, h) + 40;

  // Rays across the upper half-circle, skipping the flat horizon edges.
  const rayData = Array.from({ length: rays }, (_, i) => {
    const t = (i + 1) / (rays + 1);
    const a = Math.PI + Math.PI * t;
    const long = i % 2 === 0;
    const r1 = fanR + 26;
    const r2 = long ? reach : fanR + (reach - fanR) * 0.62;
    // distance from vertical decides draw order: centre first
    const order = Math.abs(t - 0.5);
    return {
      x1: f(cx + Math.cos(a) * r1),
      y1: f(cy + Math.sin(a) * r1),
      x2: f(cx + Math.cos(a) * r2),
      y2: f(cy + Math.sin(a) * r2),
      long,
      order,
    };
  });

  // Pleats of the fan and the scalloped outer edge.
  const pleats = 14;
  const pleatLines = Array.from({ length: pleats - 1 }, (_, i) => {
    const a = Math.PI + (Math.PI * (i + 1)) / pleats;
    return {
      x1: f(cx + Math.cos(a) * fanR * 0.32),
      y1: f(cy + Math.sin(a) * fanR * 0.32),
      x2: f(cx + Math.cos(a) * fanR),
      y2: f(cy + Math.sin(a) * fanR),
    };
  });
  let scallop = "";
  for (let i = 0; i < pleats; i++) {
    const a0 = Math.PI + (Math.PI * i) / pleats;
    const a1 = Math.PI + (Math.PI * (i + 1)) / pleats;
    const p0 = { x: f(cx + Math.cos(a0) * fanR), y: f(cy + Math.sin(a0) * fanR) };
    const p1 = { x: f(cx + Math.cos(a1) * fanR), y: f(cy + Math.sin(a1) * fanR) };
    const chord = Math.hypot(p1.x - p0.x, p1.y - p0.y);
    scallop += `${i === 0 ? `M${p0.x} ${p0.y}` : ""} A${f(chord / 2)} ${f(chord / 2)} 0 0 1 ${p1.x} ${p1.y} `;
  }

  const arc = (r: number) => `M${f(cx - r)} ${cy} A${r} ${r} 0 0 1 ${f(cx + r)} ${cy}`;

  // Same initial state on server and client (no hydration mismatch); reduced
  // motion simply collapses the drawing time to zero.
  const draw = (delay: number, duration = 1.6) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: reduce ? { duration: 0 } : { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
    >
      <defs>
        <radialGradient id={`glow-${w}`} cx="50%" cy="100%" r="60%" fx="50%" fy="100%">
          <stop offset="0%" stopColor={ROSE} stopOpacity="0.38" />
          <stop offset="45%" stopColor={ROSE} stopOpacity="0.1" />
          <stop offset="100%" stopColor={ROSE} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`veil-${w}`} cx="50%" cy="42%" r="42%">
          <stop offset="0%" stopColor="#121212" stopOpacity="0.92" />
          <stop offset="70%" stopColor="#121212" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#121212" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* breathing glow */}
      <motion.ellipse
        cx={cx}
        cy={cy}
        rx={w * 0.7}
        ry={h * 0.95}
        fill={`url(#glow-${w})`}
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 0.8 } : { opacity: [0, 0.9, 0.6, 0.9] }}
        transition={reduce ? undefined : { duration: 9, delay: 1.2, times: [0, 0.3, 0.65, 1], repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      {/* sunburst rays */}
      <g stroke={BLUSH} fill="none">
        {rayData.map((r, i) => (
          <motion.line
            key={i}
            x1={r.x1}
            y1={r.y1}
            x2={r.x2}
            y2={r.y2}
            strokeWidth={r.long ? 0.9 : 0.6}
            strokeOpacity={r.long ? 0.42 : 0.24}
            {...draw(0.35 + r.order * 2.2, 2.2)}
          />
        ))}
      </g>

      {/* veil keeps the headline area calm and legible */}
      <rect x="0" y="0" width={w} height={h} fill={`url(#veil-${w})`} />

      {/* concentric horizon arcs */}
      <g stroke={BLUSH} fill="none">
        <motion.path d={arc(fanR + 26)} strokeWidth="0.8" strokeOpacity="0.55" {...draw(0.2, 1.8)} />
        <motion.path d={arc(fanR + 34)} strokeWidth="0.5" strokeOpacity="0.35" {...draw(0.35, 1.8)} />
      </g>

      {/* the pleated fan */}
      <g stroke={BLUSH} fill="none">
        <motion.path d={scallop} strokeWidth="1" strokeOpacity="0.9" {...draw(0.1, 2)} />
        {pleatLines.map((p, i) => (
          <motion.line key={i} {...p} strokeWidth="0.7" strokeOpacity="0.7" {...draw(0.25 + Math.abs(i - 6) * 0.06, 1.2)} />
        ))}
        <motion.path d={arc(fanR * 0.32)} strokeWidth="1" strokeOpacity="0.9" {...draw(0.1, 1.4)} />
        <motion.path d={arc(fanR * 0.2)} strokeWidth="0.7" strokeOpacity="0.6" {...draw(0.15, 1.4)} />
      </g>

      {/* horizon line */}
      <motion.line
        x1={f(cx - w * 0.48)}
        y1={cy - 0.5}
        x2={f(cx + w * 0.48)}
        y2={cy - 0.5}
        stroke={BLUSH}
        strokeWidth="1"
        strokeOpacity="0.6"
        {...draw(0, 1.6)}
      />
    </svg>
  );
}

export function HeroArt() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Composition w={1440} h={900} fanR={215} rays={44} className="absolute inset-0 hidden h-full w-full md:block" />
      <Composition w={600} h={1000} fanR={170} rays={30} className="absolute inset-0 h-full w-full md:hidden" />
    </div>
  );
}
