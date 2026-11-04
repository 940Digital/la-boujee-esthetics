import type { Metadata } from "next";
import Link from "next/link";
import { business, policies, services } from "@/site.config";
import { PageHero } from "@/components/PageHero";
import { ContactMethods } from "@/components/ContactMethods";
import { FaqSection } from "@/components/FaqSection";
import { DoorIcon, StudioIcon, StepFrame } from "@/components/deco";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { isPlaceholder } from "@/lib/site";
import { bookingFaq, prepFaq, whichAtHomeFaq } from "@/lib/faq";

export const metadata: Metadata = {
  title: `Book an Esthetics Appointment in ${business.CITY} | La' Boujee Esthetics`,
  description: `Book a custom facial, waxing, tinting, eyelash lift or chemical peel with La' Boujee Esthetics in ${business.CITY}. Choose a home visit or the studio.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  const online = !isPlaceholder(business.BOOKING_URL);
  return (
    <>
      <PageHero
        label="Reservations"
        title={`Book Your Esthetics Appointment in ${business.CITY}`}
        intro="Three quick choices: your treatment, your setting, and your time."
        crumbs={[{ href: "/book", name: "Book" }]}
      />

      <section aria-labelledby="choose" className="bg-pearl py-24 md:py-28">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          <h2 id="choose" className="sr-only">
            How to book
          </h2>

          {/* I. Treatment */}
          <Reveal>
            <div className="grid gap-6 border-t border-ink/15 py-10 md:grid-cols-[120px_1fr]">
              <span className="font-deco text-[2.4rem] leading-none text-rose-ink">I</span>
              <div>
                <h3 className="font-serif text-[1.9rem] font-medium leading-tight text-ink">Choose your treatment</h3>
                <p className="mt-2 text-graphite">Not sure? Read about each one first.</p>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/${s.slug}`}
                        className="inline-flex min-h-11 items-center border border-ink/25 px-4 text-[0.92rem] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-pearl"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* II. Setting */}
          <Reveal>
            <div className="grid gap-6 border-t border-ink/15 py-10 md:grid-cols-[120px_1fr]">
              <span className="font-deco text-[2.4rem] leading-none text-rose-ink">II</span>
              <div>
                <h3 className="font-serif text-[1.9rem] font-medium leading-tight text-ink">Choose your setting</h3>
                <p className="mt-2 text-graphite">Depending on the treatment, she comes to you or you visit the studio.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Link href="/mobile-service" className="group relative flex items-center gap-5 bg-ink p-6 text-pearl">
                    <StepFrame inset={6} step={10} opacity={0.6} />
                    <DoorIcon size={52} />
                    <span>
                      <span className="block font-serif text-[1.45rem]">Come to You</span>
                      <span className="text-[0.9rem] text-mist group-hover:text-pearl">How home visits work</span>
                    </span>
                  </Link>
                  <Link href="/contact" className="group relative flex items-center gap-5 bg-pearl-2 p-6 text-ink">
                    <StepFrame tone="brass-ink" inset={6} step={10} opacity={0.6} />
                    <StudioIcon tone="brass-ink" size={52} />
                    <span>
                      <span className="block font-serif text-[1.45rem]">Visit the Studio</span>
                      <span className="text-[0.9rem] text-graphite group-hover:text-ink">Ask about the studio</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* III. Time */}
          <Reveal>
            <div className="grid gap-6 border-y border-ink/15 py-10 md:grid-cols-[120px_1fr]">
              <span className="font-deco text-[2.4rem] leading-none text-rose-ink">III</span>
              <div>
                <h3 className="font-serif text-[1.9rem] font-medium leading-tight text-ink">Pick your time</h3>
                {online ? (
                  <>
                    <p className="mt-2 text-graphite">See open times and reserve online.</p>
                    <a href={business.BOOKING_URL} rel="noopener" className="btn btn-rose mt-6">
                      Book Your Appointment
                    </a>
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-graphite">
                      Reach out by phone, text, email or Instagram to find a time. Online booking: {business.BOOKING_URL}
                    </p>
                    <div className="mt-6">
                      <ContactMethods />
                    </div>
                  </>
                )}
              </div>
            </div>
          </Reveal>

          <Stagger className="mt-12 space-y-2 text-[0.95rem] text-graphite">
            <StaggerItem>
              <h3 className="label text-rose-ink">Good to know</h3>
            </StaggerItem>
            <StaggerItem>
              <p>{policies.DEPOSIT}</p>
            </StaggerItem>
            <StaggerItem>
              <p>{policies.CANCELLATION}</p>
            </StaggerItem>
            <StaggerItem>
              <p>{policies.PAYMENT_METHODS}</p>
            </StaggerItem>
            <StaggerItem>
              <p>{policies.MINIMUM_AGE}</p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <FaqSection faqs={[whichAtHomeFaq, prepFaq, bookingFaq]} title="Before You Book" id="book-faq" subtitle="Settings, prep and scheduling." />
    </>
  );
}
