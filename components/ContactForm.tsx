"use client";

import { useState } from "react";
import { FIRM, PROJECT_STAGES } from "@/lib/content";

const field =
  "w-full border border-rule bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint focus:border-signal";

/**
 * The form composes the enquiry and hands it to the sender's own mail client.
 *
 * There is no server here — the site is fully static — and a static site cannot
 * send mail without either a third-party form service or SMTP credentials. This
 * route delivers a real, complete message to FIRM.email with no backend and no
 * secrets, and it never claims to have sent something it hasn't.
 *
 * To move to server-side submission later, POST these fields to a route handler
 * or a form service instead; the field names below are already the payload.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();

    const subject = `Project enquiry — ${get("name") || "new enquiry"}`;
    const body = [
      `Name:    ${get("name")}`,
      `Email:   ${get("email")}`,
      `Company: ${get("company") || "—"}`,
      `Stage:   ${get("stage") || "—"}`,
      "",
      "What they're building:",
      get("detail") || "—",
    ].join("\n");

    window.location.href = `mailto:${FIRM.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className="max-w-xl" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="readout text-ink-faint">Name</span>
          <input name="name" required autoComplete="name" className={`${field} mt-2`} />
        </label>

        <label className="block">
          <span className="readout text-ink-faint">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${field} mt-2`}
          />
        </label>

        <label className="block">
          <span className="readout text-ink-faint">Company</span>
          <input name="company" autoComplete="organization" className={`${field} mt-2`} />
        </label>

        <label className="block">
          <span className="readout text-ink-faint">Project stage</span>
          <select name="stage" defaultValue="" className={`${field} mt-2`}>
            <option value="" disabled>
              Select one
            </option>
            {PROJECT_STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="readout text-ink-faint">What are you building?</span>
        <textarea name="detail" rows={6} className={`${field} mt-2 resize-y`} />
      </label>

      <button
        type="submit"
        className="mt-7 border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-paper transition-colors duration-300 hover:border-signal hover:bg-signal"
      >
        Send Message
      </button>

      {sent && (
        <p className="mt-5 border-l-2 border-signal py-1 pl-4 text-sm leading-relaxed text-ink-soft">
          Your email client should have opened with the enquiry ready to send. If it
          didn&rsquo;t, write to{" "}
          <a href={`mailto:${FIRM.email}`} className="measure-link text-signal">
            {FIRM.email}
          </a>{" "}
          directly.
        </p>
      )}
    </form>
  );
}
