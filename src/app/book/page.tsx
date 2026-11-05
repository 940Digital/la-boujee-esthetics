import type { Metadata } from "next";
import Link from "next/link";
import { business, policies, services } from "@/site.config";
import { ContactMethods } from "@/components/ContactMethods";
import { Reveal } from "@/components/motion";
import { Opener } from "@/components/editorial/Opener";
import { QandA } from "@/components/editorial/Spreads";
import { isPlaceholder } from "@/lib/site";
import { bookingFaq, prepFaq, whichAtHomeFaq } from "@/lib/faq";

export const metadata: Metadata = {
  title: `Book an Esthetics Appointment in ${business.CITY} | Lá Boujee Esthetics`,
  description: `Book a custom facial, waxing, tinting, eyelash lift or chemical peel with Lá Boujee Esthetics in ${business.CITY}. Choose a home visit or the studio.`,
  alternates: { canonical: "/book" },
};

function Step({ act, title, children }: { act: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="grid gap-4 border-t border-ink/15 py-10 md:grid-cols-[160px_1fr]">
        <p className="kicker pt-2 text-rose-ink">{act}</p>
        <div>
          <h3 className="display text-[clamp(1.9rem,1.5rem+1.4vw,2.6rem)] leading-tight">{title}</h3>
          {children}
        </div>
      </div>
    </Reveal>
  );
}

export default function BookPage() {
  const online = !isPlaceholder(business.BOOKING_URL);
  const chip =
    "inline-flex min-h-11 items-center border border-ink/25 px-4 text-[1rem] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-pearl";
  return (
    <>
      <Opener
        kicker="Reservations"
        title={`Book Your Esthetics Appointment in ${business.CITY}`}
        standfirst="Three quick choices: your treatment, your setting, and your time."
        crumbs={[{ href: "/book", name: "Book" }]}
      />

      <section aria-labelledby="choose" className="bg-pearl py-24 text-ink md:py-28">
        <div className="mx-auto max-w-[1040px] px-6 md:px-10">
          <h2 id="choose" className="sr-only">
            How to book
          </h2>

          <Step act="Act I" title="Choose your treatment">
            <p className="mt-2 text-graphite">Not sure? Read about each one first.</p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className={chip}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Step>

          <Step act="Act II" title="Choose your setting">
            <p className="mt-2 text-graphite">Depending on the treatment, I come to you or you visit my studio.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link href="/mobile-service" className="group block bg-ink p-6 text-pearl">
                <span className="display block text-[1.7rem] italic">Your home</span>
                <span className="kicker mt-2 block text-rose group-hover:text-rose-light">How home visits work</span>
              </Link>
              <Link href="/contact" className="group block border border-ink p-6 text-ink">
                <span className="display block text-[1.7rem] italic">My studio</span>
                <span className="kicker mt-2 block text-rose-ink">Ask about my studio</span>
              </Link>
            </div>
          </Step>

          <Step act="Act III" title="Pick your time">
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
                  <ContactMethods stacked />
                </div>
              </>
            )}
          </Step>

          <Reveal>
            <div className="border-t-2 border-ink pt-4">
              <h3 className="kicker text-ink">Good to know</h3>
              <ul className="mt-2 text-[1.0625rem] md:text-[0.98rem] text-graphite">
                {[policies.DEPOSIT, policies.CANCELLATION, policies.PAYMENT_METHODS, policies.MINIMUM_AGE].map((p) => (
                  <li key={p} className="border-b border-ink/12 py-3">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <QandA faqs={[whichAtHomeFaq, prepFaq, bookingFaq]} title="Before you book" kicker="Settings, prep and scheduling" id="book-qa" />
    </>
  );
}
