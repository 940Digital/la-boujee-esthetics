import Image from "next/image";
import type { ImageSlot as Slot } from "@/site.config";
import { blurProps } from "@/lib/blur";
import monogram from "../../public/brand/monogram-b.png";

/**
 * Every image on the site goes through here. The box reserves the slot's
 * aspect ratio, so swapping a placeholder SVG for a real photo never shifts layout.
 */
export function ImageSlot({
  slot,
  sizes,
  priority = false,
  eager = false,
  className = "",
}: {
  slot: Slot;
  sizes: string;
  priority?: boolean;
  /** Load right away. Use inside Curtain reveals: a fully clipped image never
      counts as on screen, so lazy loading would hold it until the curtain opens. */
  eager?: boolean;
  className?: string;
}) {
  // Placeholder art never shows: until a real photo replaces it, the slot is a
  // brand panel (her monogram on wine), described as what it is.
  if (slot.src.startsWith("/placeholders/")) {
    return (
      <div
        role="img"
        aria-label="Lá Boujee Esthetics monogram"
        className={`relative flex items-center justify-center overflow-hidden bg-wine ${className}`}
        style={{ aspectRatio: slot.aspect }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(212,80,140,0.32), transparent 70%)" }}
        />
        <Image src={monogram} alt="" className="relative h-auto w-[42%] max-w-[200px]" sizes="200px" />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-wine-deep ${className}`} style={{ aspectRatio: slot.aspect }}>
      <Image
        src={slot.src}
        alt={slot.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : eager ? "eager" : "lazy"}
        {...blurProps(slot.src)}
        className="object-cover"
      />
    </div>
  );
}
