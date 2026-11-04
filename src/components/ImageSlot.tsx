import Image from "next/image";
import type { ImageSlot as Slot } from "@/site.config";

/**
 * Every image on the site goes through here. The box reserves the slot's
 * aspect ratio, so swapping a placeholder SVG for a real photo never shifts layout.
 */
export function ImageSlot({
  slot,
  sizes,
  priority = false,
  className = "",
}: {
  slot: Slot;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-wine-deep ${className}`} style={{ aspectRatio: slot.aspect }}>
      <Image
        src={slot.src}
        alt={slot.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
