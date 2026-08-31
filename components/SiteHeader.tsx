"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, FIRM } from "@/lib/content";
import { Logo } from "@/components/Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3">
          <Logo className="h-8 w-8 shrink-0 text-ink" />
          <span className="flex items-baseline gap-2">
            <span className="font-display text-lg tracking-tight">{FIRM.name}</span>
            <span className="readout text-ink-faint transition-colors group-hover:text-signal">
              QA/ML
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((l) => {
            const active = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`measure-link text-sm ${
                  active ? "text-signal" : "text-ink-soft hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="border border-ink bg-ink px-4 py-2 text-xs font-medium tracking-wide text-paper transition-colors duration-300 hover:border-signal hover:bg-signal"
          >
            Start a Project
          </Link>
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-px w-6 bg-ink" />
          <span className="block h-px w-6 bg-ink" />
        </button>
      </div>

      {open && (
        <div className="border-t border-rule px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-ink-soft"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 border border-ink bg-ink px-4 py-2.5 text-center text-xs tracking-wide text-paper"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
