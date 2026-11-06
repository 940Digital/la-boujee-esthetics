import Image from "next/image";
import type { ImageSlot as Slot } from "@/site.config";
import { blurProps } from "@/lib/blur";

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
        {...blurProps(slot.src)}
        className="object-cover"
      />
      {/* Placeholder art gets a visible label so it's obvious a real photo belongs here.
          It disappears automatically once the slot points at a real photo. */}
      {slot.src.startsWith("/placeholders/") ? (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <p className="kicker border border-silver/50 bg-ink/70 px-5 py-3 text-center text-pearl backdrop-blur-[2px]">
            [Your portrait here]
          </p>
        </div>
      ) : null}
    </div>
  );
}
