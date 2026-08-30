"use client";

import { useState } from "react";
import { PROJECT_STAGES } from "@/lib/content";

const field =
  "w-full border border-rule bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint focus:border-signal";

/**
 * No backend is wired up yet, so the form is honest about that rather than
 * pretending to send. Swapping in a real endpoint is a one-line change in
 * onSubmit — don't leave a fake success state in the meantime.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
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
          This form isn&rsquo;t connected to a mail service yet, so nothing was sent. Email the
          team directly in the meantime.
        </p>
      )}
    </form>
  );
}
