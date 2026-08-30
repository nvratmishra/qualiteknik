import Link from "next/link";
import { FIRM, NAV, SERVICES } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-rule bg-paper-raised">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.4fr_1fr]">
          <div>
            <p className="font-display text-lg">{FIRM.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">{FIRM.blurb}</p>
          </div>

          <div>
            <p className="readout text-ink-faint">Site</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li>
                <Link href="/" className="measure-link hover:text-ink">
                  Home
                </Link>
              </li>
              {NAV.filter((n) => n.href !== "/contact").map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="measure-link hover:text-ink">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="readout text-ink-faint">Services</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href="/services" className="measure-link hover:text-ink">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="readout text-ink-faint">Get in Touch</p>
            <Link
              href="/contact"
              className="measure-link mt-4 inline-block text-sm text-ink-soft hover:text-ink"
            >
              Contact Us
            </Link>
            <p className="mt-6 text-sm text-ink-faint">{FIRM.city}</p>
          </div>
        </div>

        <div className="tick-rule mt-14 w-full opacity-60" aria-hidden />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="readout text-ink-faint">
            © {new Date().getFullYear()} {FIRM.legal}
          </p>
          <p className="readout text-ink-faint">{FIRM.city}</p>
        </div>
      </div>
    </footer>
  );
}
