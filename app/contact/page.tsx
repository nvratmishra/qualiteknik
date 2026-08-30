import type { Metadata } from "next";
import { PageHead, Eyebrow } from "@/components/Bits";
import { ContactForm } from "@/components/ContactForm";
import { FIRM } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Qualiteknik what you're building — the problem, the data you have, and what “working” would look like. Based in Toronto, working across North America.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <PageHead
        eyebrow="Contact"
        title="Tell us what you're building"
        lede="Give us enough detail to have a real conversation — the problem, the data you have, and what “working” would look like. We reply to every serious inquiry."
      />

      <section>
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-[1.4fr_1fr] sm:py-24">
          <ContactForm />

          <aside className="space-y-10">
            <div className="border-t border-rule pt-6">
              <Eyebrow>Response Time</Eyebrow>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{FIRM.replyTime}</p>
            </div>

            <div className="border-t border-rule pt-6">
              <Eyebrow>Prefer Email?</Eyebrow>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Reach out directly and include a short description of the project — we read every
                message ourselves.
              </p>
            </div>

            <div className="border-t border-rule pt-6">
              <Eyebrow>Where We Are</Eyebrow>
              <p className="mt-4 text-sm text-ink">{FIRM.city}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{FIRM.reach}</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
