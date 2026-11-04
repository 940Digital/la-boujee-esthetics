// Generates the on-brand Art Deco placeholder panels in /public/placeholders.
// Each one holds an image slot until a real photo replaces it in site.config.ts.
// Run: node scripts/make-placeholders.mjs
import { writeFileSync, mkdirSync } from "node:fs";

const INK = "#121212", EM = "#2A1420", EMD = "#1F0E17", BRASS = "#C9A66B";
const f = (n) => Number(n.toFixed(2));

function frame(w, h, inset = 28, step = 22) {
  const i = inset, s = step;
  return `<path d="M${i + s} ${i} H${w - i - s} V${i + s} H${w - i} V${h - i - s} H${w - i - s} V${h - i} H${i + s} V${h - i - s} H${i} V${i + s} H${i + s} Z" fill="none" stroke="${BRASS}" stroke-width="1.2" opacity="0.7"/>`;
}

function sunburst(cx, cy, r1, r2, n, from = 0, to = Math.PI * 2, op = 0.35) {
  let out = "";
  for (let k = 0; k < n; k++) {
    const a = from + ((to - from) * (k + 0.5)) / n;
    const rr = k % 2 ? r2 * 0.8 : r2;
    out += `<line x1="${f(cx + Math.cos(a) * r1)}" y1="${f(cy + Math.sin(a) * r1)}" x2="${f(cx + Math.cos(a) * rr)}" y2="${f(cy + Math.sin(a) * rr)}" stroke="${BRASS}" stroke-width="1" opacity="${op}"/>`;
  }
  return out;
}

function arches(w, h, n, op = 0.5) {
  let out = "";
  const cx = w / 2;
  for (let k = 0; k < n; k++) {
    const rw = w * 0.36 - k * (w * 0.05);
    const top = h * 0.2 + k * h * 0.05;
    out += `<path d="M${f(cx - rw)} ${h} V${f(top + rw)} A${f(rw)} ${f(rw)} 0 0 1 ${f(cx + rw)} ${f(top + rw)} V${h}" fill="none" stroke="${BRASS}" stroke-width="1" opacity="${op - k * 0.07}"/>`;
  }
  return out;
}

function chevrons(w, h, op = 0.22) {
  let out = "";
  const gap = 46;
  for (let y = -gap; y < h + gap; y += gap) {
    out += `<path d="M0 ${y} L${w / 2} ${y + gap * 1.2} L${w} ${y}" fill="none" stroke="${BRASS}" stroke-width="1" opacity="${op}"/>`;
  }
  return out;
}

function ziggurat(w, h, steps = 6, op = 0.5) {
  let out = "";
  const cx = w / 2;
  for (let k = 0; k < steps; k++) {
    const half = w * 0.42 - k * (w * 0.06);
    const y = h * 0.86 - k * h * 0.08;
    out += `<path d="M${f(cx - half)} ${f(y + h * 0.08)} V${f(y)} H${f(cx + half)} V${f(y + h * 0.08)}" fill="none" stroke="${BRASS}" stroke-width="1" opacity="${f(op + k * 0.06)}"/>`;
  }
  return out + sunburst(cx, h * 0.86 - steps * h * 0.08, 20, w * 0.5, 24, Math.PI, Math.PI * 2, 0.25);
}

function fanRow(w, h, op = 0.45) {
  let out = "";
  const r = w / 8;
  for (let row = 0; row < Math.ceil(h / r) + 1; row++) {
    for (let col = -1; col < 9; col++) {
      const cx = col * r * 2 + (row % 2 ? r : 0);
      const cy = row * r;
      out += `<path d="M${f(cx - r)} ${f(cy)} A${f(r)} ${f(r)} 0 0 1 ${f(cx + r)} ${f(cy)}" fill="none" stroke="${BRASS}" stroke-width="1" opacity="${op}"/>`;
      out += `<path d="M${f(cx - r * 0.6)} ${f(cy)} A${f(r * 0.6)} ${f(r * 0.6)} 0 0 1 ${f(cx + r * 0.6)} ${f(cy)}" fill="none" stroke="${BRASS}" stroke-width="0.8" opacity="${op * 0.6}"/>`;
    }
  }
  return out;
}

function eye(w, h) {
  const cx = w / 2, cy = h * 0.55, rx = w * 0.3;
  let out = `<path d="M${f(cx - rx)} ${f(cy)} Q${f(cx)} ${f(cy + rx * 0.55)} ${f(cx + rx)} ${f(cy)}" fill="none" stroke="${BRASS}" stroke-width="1.2" opacity="0.8"/>`;
  for (let k = 0; k < 15; k++) {
    const t = (k + 1) / 16;
    const x = cx - rx + 2 * rx * t;
    const y = cy + Math.sin(Math.PI * t) * rx * 0.27;
    const ang = -Math.PI / 2 + (t - 0.5) * 1.6;
    const len = rx * (0.32 + Math.sin(Math.PI * t) * 0.3);
    out += `<path d="M${f(x)} ${f(y)} q${f(Math.cos(ang) * len * 0.2)} ${f(-len * 0.6)} ${f(Math.cos(ang) * len)} ${f(Math.sin(ang) * len)}" fill="none" stroke="${BRASS}" stroke-width="1" opacity="0.55"/>`;
  }
  return out + sunburst(cx, cy, rx * 1.1, rx * 1.9, 36, Math.PI, Math.PI * 2, 0.18);
}

function panel(name, w, h, bg, body, glowY = 1) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs><radialGradient id="g" cx="50%" cy="${glowY * 100}%" r="75%"><stop offset="0" stop-color="${BRASS}" stop-opacity="0.22"/><stop offset="0.6" stop-color="${BRASS}" stop-opacity="0.04"/><stop offset="1" stop-color="${BRASS}" stop-opacity="0"/></radialGradient></defs>
<rect width="${w}" height="${h}" fill="${bg}"/><rect width="${w}" height="${h}" fill="url(#g)"/>
${body}
${frame(w, h)}
</svg>`;
  writeFileSync(`public/placeholders/${name}.svg`, svg);
}

mkdirSync("public/placeholders", { recursive: true });
const P = [1200, 1500], S = [1200, 1200], L = [1500, 1000];

panel("facials", ...P, EM, arches(...P, 5) + sunburst(600, 1500, 40, 900, 40, Math.PI, Math.PI * 2, 0.16));
panel("waxing", ...P, INK, chevrons(...P) + arches(...P, 2, 0.45));
panel("tinting", ...P, EMD, fanRow(...P, 0.3), 0.5);
panel("eyelash-lifts", ...P, INK, eye(...P), 0.55);
panel("chemical-peels", ...P, EM, ziggurat(...P));
panel("owner-portrait", ...P, INK, arches(...P, 3, 0.6) + sunburst(600, 600, 120, 520, 48, 0, Math.PI * 2, 0.14), 0.4);
panel("come-to-you", ...L, EM, arches(...L, 3, 0.55) + sunburst(750, 1000, 60, 900, 36, Math.PI, Math.PI * 2, 0.15));
panel("studio", ...L, INK, ziggurat(...L, 5, 0.45));
panel("gallery-1", ...S, EM, sunburst(600, 1200, 60, 1300, 56, Math.PI, Math.PI * 2, 0.3) + arches(...S, 2, 0.5));
panel("gallery-2", ...S, INK, eye(...S), 0.55);
panel("gallery-3", ...S, EMD, fanRow(...S, 0.3), 0.3);
panel("gallery-4", ...S, INK, chevrons(...S, 0.2) + sunburst(600, 600, 80, 420, 32, 0, Math.PI * 2, 0.25), 0.5);
panel("gallery-5", ...S, EM, ziggurat(...S, 5, 0.45));
console.log("placeholders written");
