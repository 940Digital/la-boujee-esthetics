import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { MobileBookBar } from "@/components/MobileBookBar";

/* Bodoni: the high-contrast Didone of 1940s and 50s fashion magazines. Option 2 only. */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  // Design option for review, so keep it out of search results.
  robots: { index: false, follow: true },
};

export default function OptionTwoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`v2 ${bodoni.variable}`}>
      <HeaderV2 />
      <main id="main">{children}</main>
      <FooterV2 />
      {/* the cover button sits below the fold on phones, so the bar shows from the start */}
      <MobileBookBar showAfter={0} />
    </div>
  );
}
