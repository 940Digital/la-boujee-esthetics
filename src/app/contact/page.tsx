import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/site.config";
import { PageHero } from "@/components/PageHero";
import { ContactMethods } from "@/components/ContactMethods";
import { ContactForm } from "@/components/ContactForm";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: `Contact La' Boujee Esthetics | Licensed Esthetician in ${business.CITY}`,
  description: `Questions about a treatment, home visits, or the studio? Contact La' Boujee Esthetics in ${business.CITY} by phone, text, email or Instagram.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const hasForm = business.CONTACT_FORM_ENDPOINT.length > 0;
  return (
    <>
      <PageHero
        label={business.credential}
        title={`Contact ${business.name.replace(" ", "\u00A0")}`}
        intro="Questions about a treatment, a home visit, or the studio? Reach out any way you like."
        crumbs={[{ href: "/contact", name: "Contact" }]}
      />

      <section aria-labelledby="reach" className="bg-pearl py-24 md:py-28">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <Reveal className="text-center">
            <h2 id="reach" className="h2 text-ink">
              Get in Touch
            </h2>
          </Reveal>
          <div className="mt-12">
            <ContactMethods />
          </div>

          <div className="mt-16 grid gap-12 border-t border-ink/15 pt-12 md:grid-cols-3">
            <Reveal>
              <h3 className="label text-brass-ink">Hours</h3>
              <dl className="mt-4 space-y-2">
                {business.HOURS.map((h, i) => (
                  <div key={i} className="flex justify-between gap-6 border-b border-ink/10 pb-2">
                    <dt className="text-ink">{h.days}</dt>
                    <dd className="text-graphite">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="label text-brass-ink">Studio</h3>
              <p className="mt-4 text-ink">{business.STUDIO_ADDRESS}</p>
              <p className="mt-1 text-graphite">
                {business.CITY}, {business.STATE}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <h3 className="label text-brass-ink">Mobile service area</h3>
              <p className="mt-4 text-ink">{business.SERVICE_AREA.join(", ")}</p>
              <Link
                href="/mobile-service"
                className="deco-link mt-2 inline-flex min-h-11 items-center text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-brass-ink"
              >
                How mobile service works
              </Link>
            </Reveal>
          </div>

          {hasForm ? (
            <Reveal className="mx-auto mt-20 max-w-[720px]">
              <h2 className="h2 text-center text-ink">Send a Message</h2>
              <div className="mt-10">
                <ContactForm endpoint={business.CONTACT_FORM_ENDPOINT} />
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
