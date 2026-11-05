import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/site.config";
import { ContactMethods } from "@/components/ContactMethods";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import { Opener } from "@/components/editorial/Opener";
import { CloseUp } from "@/components/editorial/Spreads";

export const metadata: Metadata = {
  title: `Contact Lá Boujee Esthetics | Licensed Esthetician in ${business.CITY}`,
  description: `Questions about a treatment, home visits, or the studio? Contact Lá Boujee Esthetics in ${business.CITY} by phone, text, email or Instagram.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const hasForm = business.CONTACT_FORM_ENDPOINT.length > 0;
  return (
    <>
      <Opener
        kicker={business.credential}
        title={`Contact ${business.name.replace(" ", " ")}`}
        standfirst="Questions about a treatment, a home visit, or the studio? Reach out any way you like."
        crumbs={[{ href: "/contact", name: "Contact" }]}
      />

      <section aria-labelledby="reach" className="bg-pearl py-24 text-ink md:py-28">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal>
            <h2 id="reach" className="display text-[clamp(2.2rem,1.5rem+2.6vw,3.8rem)]">
              Get in touch
            </h2>
          </Reveal>
          <div className="mt-10">
            <ContactMethods />
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <Reveal>
              <div className="border-t-2 border-ink pt-4">
                <h3 className="kicker text-rose-ink">Hours</h3>
                <dl className="mt-3">
                  {business.HOURS.map((h, i) => (
                    <div key={i} className="flex justify-between gap-6 border-b border-ink/12 py-3">
                      <dt>{h.days}</dt>
                      <dd className="text-graphite">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="border-t-2 border-ink pt-4">
                <h3 className="kicker text-rose-ink">Studio</h3>
                <p className="mt-3">{business.STUDIO_ADDRESS}</p>
                <p className="mt-1 text-graphite">
                  {business.CITY}, {business.STATE}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="border-t-2 border-ink pt-4">
                <h3 className="kicker text-rose-ink">Mobile service area</h3>
                <p className="mt-3">{business.SERVICE_AREA.join(", ")}</p>
                <Link href="/mobile-service" className="kicker deco-link mt-2 inline-flex min-h-11 items-center text-rose-ink">
                  How home visits work
                </Link>
              </div>
            </Reveal>
          </div>

          {hasForm ? (
            <Reveal className="mx-auto mt-20 max-w-[720px]">
              <h2 className="display text-center text-[clamp(2rem,1.5rem+2vw,3.2rem)]">Send a message</h2>
              <div className="mt-10">
                <ContactForm endpoint={business.CONTACT_FORM_ENDPOINT} />
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <CloseUp showContact={false} />
    </>
  );
}
