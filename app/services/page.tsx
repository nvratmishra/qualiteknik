import type { Metadata } from "next";
import { ClosingCta, Eyebrow, PageHead } from "@/components/Bits";
import { PROCESS, SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four ways Qualiteknik gets involved: AI/ML product development, MLOps & deployment, model quality & evaluation, and applied AI strategy.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <PageHead
        eyebrow="Services"
        title="Four ways we get involved"
        lede="Some engagements are a single evaluation sprint. Others are a full build. Here's the shape of the work we do, and how we scope it."
      />

      {/* The four services. No numbering — they are alternatives, not steps. */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6">
          <ul>
            {SERVICES.map((s) => (
              <li key={s.slug} className="border-b border-rule py-14 last:border-b-0">
                <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
                  <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] leading-tight">{s.title}</h2>
                  <div>
                    <p className="max-w-2xl text-base leading-relaxed text-ink-soft">{s.long}</p>
                    <div className="mt-7 border-t border-rule pt-5">
                      <p className="readout text-ink-faint">Typical work</p>
                      <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                        {s.typical}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The process genuinely is a sequence, so it is the one list that gets numbered. */}
      <section className="border-b border-rule bg-paper-raised">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Eyebrow>How We Work</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.05]">
            A process built to avoid surprises
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">
            The same four steps whether the engagement is two weeks or six months.
          </p>

          <ol className="mt-14 space-y-10">
            {PROCESS.map((p, i) => (
              <li
                key={p.title}
                className="grid gap-x-8 gap-y-3 border-t border-rule pt-6 sm:grid-cols-[4rem_1fr]"
              >
                <span className="tabular text-sm text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl leading-snug">{p.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{p.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingCta
        eyebrow="Not Sure Where You Fit?"
        title="Tell us the problem, not the solution."
        note="Most engagements start with a short technical conversation about what you're trying to solve — before we talk about which service it maps to."
        primary={{ href: "/contact", label: "Start a Project" }}
        secondary={{ href: "/work", label: "See Our Work" }}
      />
    </main>
  );
}
