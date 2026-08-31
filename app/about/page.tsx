import type { Metadata } from "next";
import { ClosingCta, Eyebrow, PageHead } from "@/components/Bits";
import { PRINCIPLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Qualiteknik — quality plus technical. A focused team of ML and software engineers in Toronto who treat evaluation, monitoring and handoff as the actual job.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHead
        eyebrow="About"
        title="Quality is in the name for a reason"
        lede="Qualiteknik — quality plus technical. We started the firm on the belief that most AI projects don't fail at the modeling stage; they fail because no one defined what “working” meant, or built the discipline to keep it that way."
      />

      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
            <div>
              <Eyebrow>What We Believe</Eyebrow>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                A model that performs well in a notebook and a model that performs well in
                production are two different things. The gap between them is evaluation,
                monitoring, documentation, and the unglamorous engineering work most AI vendors
                skip to get to a demo faster.
              </p>
              <p className="mt-5 leading-relaxed text-ink-soft">
                We treat that gap as the actual job. It&rsquo;s why our services always include
                how a system will be tested and operated, not just how it will be built.
              </p>

              {/* The theorem is the sharpest statement of the gap this firm
                  exists to close, so it is quoted rather than alluded to. */}
              <blockquote className="mt-9 border-l-2 border-signal py-1 pl-6">
                <p className="text-lg leading-relaxed text-ink">
                  The universal approximation theorem proves that a network with a single
                  hidden layer can approximate any continuous function to arbitrary accuracy.
                </p>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  It does not say you will find that network. Or that your data supports it. Or
                  that it still holds next quarter. The distance between what is provably
                  possible and what actually ships is measured, not assumed — and that
                  measurement is the work.
                </p>
              </blockquote>
            </div>

            <div>
              <Eyebrow>How We&rsquo;re Structured</Eyebrow>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                Qualiteknik is a focused team of ML and software engineers who work directly with
                clients — no account-management layer between you and the people building your
                system.
              </p>
              <p className="mt-5 leading-relaxed text-ink-soft">
                We take on a limited number of engagements at a time so every project gets senior
                attention, and we&rsquo;re upfront when something is outside our scope rather than
                stretching to fit it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-paper-raised">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Eyebrow>Principles</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.05]">
            What guides the work
          </h2>

          <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="border-t border-rule pt-6">
                <h3 className="text-lg leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Eyebrow>The Team</Eyebrow>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">
            Qualiteknik&rsquo;s engineers bring backgrounds spanning applied machine learning,
            production software engineering, and quality/testing systems. We keep the team
            intentionally small so every engagement is staffed with senior people who write the
            code, not just manage it.
          </p>
          <p className="mt-5 max-w-3xl leading-relaxed text-ink-soft">
            Want to know who you&rsquo;d actually be working with on a specific engagement? Ask —
            we introduce the team during scoping, not after the contract is signed.
          </p>
        </div>
      </section>

      <ClosingCta
        eyebrow="Get in Touch"
        title="Curious if we're the right fit?"
        note="The first conversation is a scoping call, not a sales pitch. Bring the actual problem."
        primary={{ href: "/contact", label: "Start a Project" }}
        secondary={{ href: "/work", label: "See Our Work" }}
      />
    </main>
  );
}
