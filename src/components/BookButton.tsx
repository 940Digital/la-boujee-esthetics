import Link from "next/link";
import { bookingHref, isExternal } from "@/lib/site";

type Props = {
  variant?: "rose" | "outline-light" | "outline-dark";
  className?: string;
  label?: string;
};

/** The single site-wide call to action. Always the same words, always the same place. */
export function BookButton({ variant = "rose", className = "", label = "Book Your Appointment" }: Props) {
  const href = bookingHref();
  const cls = `btn btn-${variant} ${className}`;
  if (isExternal(href)) {
    return (
      <a href={href} className={cls} rel="noopener">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
