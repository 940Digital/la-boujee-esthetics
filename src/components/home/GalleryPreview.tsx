import { business, images, showGallery } from "@/site.config";
import { isPlaceholder } from "@/lib/site";
import { ImageSlot } from "../ImageSlot";
import { Curtain, Reveal } from "../motion";

/**
 * One featured square plus four small squares. No breakpoint leaves a stray tile.
 * These are licensed stock photos used as mood, so the heading says "inspiration".
 * Once Laurel's own client photos replace them, retitle this section "Recent Work".
 */
export function GalleryPreview() {
  if (!showGallery) return null;
  const [feature, ...rest] = images.gallery;
  const ig = isPlaceholder(business.INSTAGRAM_URL) ? null : business.INSTAGRAM_URL;
  return (
    <section aria-labelledby="gallery-title" className="bg-pearl pb-24 pt-24 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal className="flex flex-col items-center text-center">
          <p className="label text-brass-ink">The inspiration</p>
          <h2 id="gallery-title" className="h2 mt-4 text-ink">
            The Old Hollywood Look
          </h2>
          <p className="mt-4 max-w-[46ch] text-graphite">
            Sculpted waves, a sharp wing, pearls and polish. The golden-age glamour behind La&apos; Boujee.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <Curtain className="col-span-2 md:row-span-2">
            <ImageSlot slot={feature} sizes="(min-width: 768px) 600px, 92vw" className="h-full" />
          </Curtain>
          {rest.map((img, i) => (
            <Curtain key={img.src} delay={0.08 * (i + 1)}>
              <ImageSlot slot={img} sizes="(min-width: 768px) 300px, 46vw" />
            </Curtain>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          {ig ? (
            <a
              href={ig}
              rel="noopener"
              className="deco-link inline-flex min-h-11 items-center text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-ink"
            >
              Follow {business.INSTAGRAM_HANDLE} on Instagram
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-ink">
              Follow {business.INSTAGRAM_HANDLE} on Instagram
            </span>
          )}
        </Reveal>
      </div>
    </section>
  );
}
