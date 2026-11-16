import Link from "next/link";
import { business, policies, services } from "@/site.config";
import { BookButton } from "@/components/BookButton";
import { ContactForm } from "@/components/ContactForm";
import { ContactMethods } from "@/components/ContactMethods";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion";
import { Opener } from "@/components/editorial/Opener";
import { QandA } from "@/components/editorial/Spreads";
import { availability, directionsHref, fullAddress, isPlaceholder, servicePath } from "@/lib/site";
import { bookFaqs } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book an Esthetician in Denton, TX | Lá Boujee",
  description:
    "Book a facial, peel, wax, lash lift or makeup with Lá Boujee Esthetics. Call, text or email. Studio at 1100 Dallas Dr, Denton, or a home visit.",
  path: "/book",
});

function Step({ act, title, children }: { act: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="grid gap-3 border-t border-ink/15 py-8 md:grid-cols-[160px_1fr] md:gap-4 md:py-10">
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
  const directions = directionsHref();
  const hasForm = business.CONTACT_FORM_ENDPOINT.length > 0;
  const chip =
    "inline-flex min-h-11 items-center border border-ink/25 px-4 text-[1rem] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-pearl";
  const rules = [
    { title: "Cancellations", body: policies.CANCELLATION },
    { title: "Payment", body: policies.PAYMENT_METHODS },
    { title: "Travel", body: policies.TRAVEL_FEE },
    { title: "Deposit", body: policies.DEPOSIT },
    { title: "Age", body: policies.MINIMUM_AGE },
  ].filter((r) => !isPlaceholder(r.body));
  const box = "border-t-2 border-ink pt-4";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${business.SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Book and Contact", item: `${business.SITE_URL}/book` },
          ],
        }}
      />
      <Opener
        kicker="Book and contact"
        title={`Book Your Appointment in ${business.CITY}`}
        standfirst={
          online
            ? "Reserve online, or call, text or email me."
            : "Call, text or email me to book. I'll confirm your treatment, day and place."
        }
        crumbs={[{ href: "/book", name: "Book and Contact" }]}
      >
        {/* The button would point at this page until online booking exists. */}
        {online ? <BookButton /> : null}
      </Opener>

      <section aria-labelledby="how-to-book" className="bg-pearl py-20 text-ink md:py-28">
        <div className="mx-auto max-w-[1040px] px-6 md:px-10">
          <h2 id="how-to-book" className="display text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
            How to book
          </h2>

          <div className="mt-8">
            <Step act="Act I" title="Get in touch">
              <p className="mt-2 text-graphite">
                {online ? "Reserve online, or reach me directly." : "Call, text or email. Tell me the treatment you'd like and a day that suits you."}
              </p>
              <div className="mt-5">
                <ContactMethods stacked />
              </div>
            </Step>

            <Step act="Act II" title="Choose your treatment">
              <p className="mt-2 text-graphite">
                Not sure which?{" "}
                <Link href="/services" className="text-rose-ink underline decoration-rose-ink/40 underline-offset-4">
                  See every service and price
                </Link>
                , or ask me.
              </p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={servicePath(s.slug)} className={chip}>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Step>

            <Step act="Act III" title="Your home or my studio">
              <p className="mt-2 text-graphite">
                Ask for a home visit, or come to my studio in {business.CITY}. Some treatments are studio only: see the questions
                below.
              </p>
            </Step>
          </div>
        </div>
      </section>

      {/* Studio, availability, home visits, policies */}
      <section aria-labelledby="details" className="bg-pearl-2 py-20 text-ink md:py-28">
        <div className="mx-auto max-w-[1040px] px-6 md:px-10">
          <h2 id="details" className="display text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
            Where and when
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-x-14 md:gap-y-12">
            <Reveal>
              <div id="studio" className={`${box} scroll-mt-24`}>
                <h3 className="kicker text-rose-ink">The studio</h3>
                <p className="mt-3 text-ink">{business.LOCATION_NOTE}</p>
                <p className="text-ink">{fullAddress()}</p>
                {directions ? (
                  <a href={directions} rel="noopener" className="kicker deco-link mt-2 inline-flex min-h-11 items-center text-rose-ink">
                    Get directions
                  </a>
                ) : null}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className={box}>
                <h3 className="kicker text-rose-ink">Available</h3>
                <p className="mt-3 text-ink">{availability()}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className={box}>
                <h3 className="kicker text-rose-ink">Home visits</h3>
                <p className="mt-3 text-ink">
                  {business.SERVICE_AREA.length} towns across Denton County and nearby, including{" "}
                  {business.SERVICE_AREA.slice(0, 4).join(", ")} and more.
                </p>
                <Link href="/mobile-service" className="kicker deco-link mt-2 inline-flex min-h-11 items-center text-rose-ink">
                  See every town
                </Link>
              </div>
            </Reveal>
            {rules.length ? (
              <Reveal delay={0.08}>
                <div className={box}>
                  <h3 className="kicker text-rose-ink">Good to know</h3>
                  <dl className="mt-1">
                    {rules.map((r) => (
                      <div key={r.title} className="border-b border-ink/12 py-3 last:border-b-0">
                        <dt className="font-semibold text-ink">{r.title}</dt>
                        <dd className="text-graphite">{r.body}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ) : null}
          </div>

          {hasForm ? (
            <Reveal className="mx-auto mt-16 max-w-[720px]">
              <h2 className="display text-center text-[clamp(2rem,1.5rem+2vw,3.2rem)]">Send a message</h2>
              <div className="mt-10">
                <ContactForm endpoint={business.CONTACT_FORM_ENDPOINT} />
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <QandA faqs={bookFaqs} title="Before you book" kicker="Questions and answers" id="book-qa" />
    </>
  );
}
