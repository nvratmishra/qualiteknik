import Link from "next/link";
import { ControlChart } from "@/components/ControlChart";
import { PotholeFeature } from "@/components/PotholeFeature";
import { ClosingCta, Eyebrow, GhostLink, PrimaryLink } from "@/components/Bits";
import { DIFFERENTIATORS, HERO, SECTORS, SERVICES, WORK } from "@/lib/content";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero — the control chart is the argument, so it gets the fold. */}
      <section className="relative overflow-hidden border-b border-rule">
        <div className="pointer-events-none absolute inset-0 grid-paper" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pt-24">
          <Eyebrow>{HERO.eyebrow}</Eyebrow>

          <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.98]">
            AI systems built with{" "}
            <span className="italic text-signal">engineering rigor</span>, not just
            prototypes.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">{HERO.lede}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryLink href="/contact">Start a Project</PrimaryLink>
            <GhostLink href="/work">See Our Work</GhostLink>
          </div>
        </div>

        {/* the live chart, full bleed under the copy */}
        <div className="relative border-t border-rule">
          <div className="mx-auto max-w-6xl px-6">
            <ControlChart />
          </div>
          <div className="border-t border-rule">
            <p className="mx-auto max-w-6xl px-6 py-3 text-center text-xs text-ink-faint">
              A monitored signal inside its control limits. Drift is flagged and corrected
              before it reaches production — which is the entire job.
            </p>
          </div>
        </div>
      </section>

      <PotholeFeature />

      {/* Three pillars, as an instrument panel */}
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-6xl gap-px bg-rule sm:grid-cols-3">
          {HERO.pillars.map((p) => (
            <div key={p.label} className="bg-paper px-6 py-10">
              <p className="readout text-signal">{p.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="border-b border-rule">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-8">
          <span className="readout text-ink-faint">Recent engagements across</span>
          {SECTORS.map((s) => (
            <span key={s} className="text-sm text-ink-soft">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.05]">
            AI/ML engineering, end to end
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">
            We work as an embedded technical partner — from the first model prototype through
            to a system your team can operate, trust, and scale.
          </p>

          <ul className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <li key={s.slug} className="border-t border-rule pt-6">
                <h3 className="text-xl leading-snug">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.short}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Link href="/services" className="measure-link text-sm text-signal">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why — on the raised ground so the page has a change of gear */}
      <section className="border-b border-rule bg-paper-raised">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Eyebrow>Why Qualiteknik</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.05]">
            Quality is the engineering discipline, not an afterthought.
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">
            Our name is literally &ldquo;quality&rdquo; plus &ldquo;technical.&rdquo; That&rsquo;s
            not branding — it&rsquo;s how we build. Every model ships with the evaluation,
            monitoring, and documentation it needs to be trusted, maintained, and handed off.
          </p>

          <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-3">
            {DIFFERENTIATORS.map((d) => (
              <li key={d.title} className="border-t border-rule pt-6">
                <h3 className="text-lg leading-snug">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{d.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Selected work — two, with the full set a click away */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Eyebrow>Selected Engagements</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.05]">Recent work</h2>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            {WORK.slice(0, 2).map((w) => (
              <article key={w.title} className="border-t border-rule pt-6">
                <p className="readout text-ink-faint">{w.sector}</p>
                <h3 className="mt-4 text-xl leading-snug">{w.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{w.body}</p>

                <dl className="mt-6 space-y-2 border-t border-rule pt-5 text-sm">
                  {[
                    ["Focus", w.focus],
                    ["Engagement", w.engagement],
                    ["Outcome", w.outcome],
                  ].map(([k, v]) => (
                    <div key={k} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
                      <dt className="readout pt-0.5 text-ink-faint">{k}</dt>
                      <dd className="text-ink-soft">{v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/work" className="measure-link text-sm text-signal">
              View All Work
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="Let's Talk"
        title="Have an AI system that needs to actually work?"
        note="Tell us what you're building or where it's breaking down. We'll tell you honestly whether we're the right fit."
        primary={{ href: "/contact", label: "Start a Project" }}
        secondary={{ href: "/services", label: "Explore Services" }}
      />
    </main>
  );
}
