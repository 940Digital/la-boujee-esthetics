import Image from "next/image";
import Link from "next/link";
import logo from "../../public/brand/logo-pink.png";

/**
 * Her real logo, cut out of the business card as a transparent PNG
 * (public/brand/logo-pink.png, 573x416). Replace with a vector file if she has one.
 */
const heights = { sm: 48, md: 92, lg: 132 } as const;

export function Wordmark({ size = "md" }: { size?: keyof typeof heights; stacked?: boolean }) {
  const h = heights[size];
  const w = Math.round((h * logo.width) / logo.height);
  return (
    <Link href="/" aria-label="La' Boujee Esthetics, home" className="inline-flex min-h-11 items-center">
      <Image
        src={logo}
        alt="La' Boujee Esthetics"
        width={w}
        height={h}
        priority={size !== "lg"}
        className="h-auto transition-opacity duration-500 hover:opacity-85"
        style={{ width: w }}
      />
    </Link>
  );
}
