import Link from "next/link";
import type { ReactNode } from "react";

/** Section eyebrow: a mono readout against a short rule, like a field label. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-7 bg-signal" aria-hidden />
      <span className="readout text-signal">{children}</span>
    </div>
  );
}

/** Page masthead, shared by every inner page. */
export function PageHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div className="pointer-events-none absolute inset-0 grid-paper" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02]">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{lede}</p>
        )}
      </div>
    </section>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-paper transition-colors duration-300 hover:border-signal hover:bg-signal"
    >
      {children}
    </Link>
  );
}

export function GhostLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block border border-rule px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-signal hover:text-signal"
    >
      {children}
    </Link>
  );
}

/** Closing call to action, repeated at the foot of every page with its own words. */
export function ClosingCta({
  eyebrow,
  title,
  note,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  note: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <section className="border-t border-rule bg-paper-raised">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] leading-[1.05]">{title}</h2>
        <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">{note}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <PrimaryLink href={primary.href}>{primary.label}</PrimaryLink>
          <GhostLink href={secondary.href}>{secondary.label}</GhostLink>
        </div>
      </div>
    </section>
  );
}
