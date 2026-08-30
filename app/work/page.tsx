import type { Metadata } from "next";
import { ClosingCta, PageHead } from "@/components/Bits";
import { NDA_NOTE, WORK } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected Qualiteknik engagements across manufacturing, financial services, logistics and software — computer vision, evaluation harnesses, forecasting pipelines and AI feasibility audits.",
};

export default function WorkPage() {
  return (
    <main className="flex-1">
      <PageHead eyebrow="Work" title="Selected engagements" />

      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* The NDA note is a credibility signal, so it is stated plainly up front. */}
          <p className="max-w-3xl border-l-2 border-signal py-1 pl-5 text-sm leading-relaxed text-ink-soft">
            {NDA_NOTE}
          </p>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6">
          <ul>
            {WORK.map((w) => (
              <li key={w.title} className="border-b border-rule py-14 last:border-b-0">
                <article className="grid gap-8 lg:grid-cols-[22rem_1fr]">
                  <div>
                    <p className="readout text-signal">{w.sector}</p>
                    <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.1rem)] leading-tight">
                      {w.title}
                    </h2>
                  </div>

                  <div>
                    <p className="max-w-2xl text-base leading-relaxed text-ink-soft">{w.body}</p>

                    {/* Where a method comes from published research, credit it —
                        implying someone else's paper is ours would be exactly
                        the kind of unearned claim this firm sells against. */}
                    {"credit" in w && w.credit && (
                      <p className="mt-5 max-w-2xl border-l border-rule pl-4 text-xs leading-relaxed text-ink-faint">
                        {w.credit}
                      </p>
                    )}

                    <dl className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-3">
                      {[
                        ["Focus", w.focus],
                        ["Engagement", w.engagement],
                        ["Outcome", w.outcome],
                      ].map(([k, v]) => (
                        <div key={k} className="bg-paper p-5">
                          <dt className="readout text-ink-faint">{k}</dt>
                          <dd className="mt-2.5 text-sm leading-relaxed text-ink-soft">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta
        eyebrow="Have Something Similar?"
        title="Let's talk about what you're building."
        note="We'll ask direct questions about your data and constraints before we tell you what's possible."
        primary={{ href: "/contact", label: "Start a Project" }}
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </main>
  );
}
