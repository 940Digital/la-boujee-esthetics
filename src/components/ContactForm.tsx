"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/site.config";

/**
 * Posts to a form service (Formspree, Basin, etc). Only rendered when
 * CONTACT_FORM_ENDPOINT is set in site.config.ts.
 */
export function ContactForm({ endpoint }: { endpoint: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <p role="status" className="display text-[1.6rem] text-ink">
        Message sent. I&apos;ll be in touch soon.
      </p>
    );
  }

  const field =
    "mt-2 block w-full border-0 border-b border-ink/40 bg-transparent px-0 py-3 text-ink placeholder:text-graphite/70 focus:border-ink focus:outline-none focus:ring-0";

  return (
    <form onSubmit={onSubmit} className="grid gap-7 sm:grid-cols-2">
      <label className="block text-[0.85rem] uppercase tracking-[0.18em] text-graphite">
        Name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block text-[0.85rem] uppercase tracking-[0.18em] text-graphite">
        Phone or email
        <input name="contact" required autoComplete="email" className={field} />
      </label>
      <label className="block text-[0.85rem] uppercase tracking-[0.18em] text-graphite sm:col-span-2">
        Treatment
        <select name="treatment" className={field} defaultValue="">
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.slug}>{s.name}</option>
          ))}
        </select>
      </label>
      <label className="block text-[0.85rem] uppercase tracking-[0.18em] text-graphite sm:col-span-2">
        Message
        <textarea name="message" rows={4} className={field} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className="btn btn-outline-dark">
          {state === "sending" ? "Sending" : "Send Message"}
        </button>
        {state === "error" ? (
          <p role="alert" className="mt-4 text-[0.95rem] text-ink">
            The message didn&apos;t go through. Check your connection and try again, or reach out by phone or email.
          </p>
        ) : null}
      </div>
    </form>
  );
}
