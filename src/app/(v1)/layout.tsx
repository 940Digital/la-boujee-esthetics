import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBookBar } from "@/components/MobileBookBar";

/** Option 1: Art Deco. Every page except /option-2 lives in this group. */
export default function OptionOneLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileBookBar />
    </>
  );
}
