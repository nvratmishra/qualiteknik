import type { Metadata } from "next";
import { Eyebrow, PageHead } from "@/components/Bits";

export const metadata: Metadata = {
  title: "Reflow - Privacy Policy",
  description:
    "Privacy policy for Reflow, the Android app that converts PDFs into reflowable EPUBs entirely on the device. No data is collected and the app declares no network permission.",
};

/** One clause of the policy: a heading and its paragraphs, at reading width. */
function Clause({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-rule pt-6">
      <h2 className="text-lg leading-snug">{heading}</h2>
      <div className="mt-3 space-y-4 leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

export default function ReflowPrivacyPage() {
  return (
    <main className="flex-1">
      <PageHead
        eyebrow="Reflow for Android"
        title="Privacy policy"
        lede="Reflow converts a PDF on your device into an EPUB on your device. It collects nothing, sends nothing, and cannot reach the network at all."
      />

      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Eyebrow>Last updated 27 September 2026</Eyebrow>

          <div className="mt-12 grid max-w-3xl gap-10">
            <Clause heading="What the app collects">
              <p>
                Nothing. There are no accounts, no analytics, no advertising identifiers, no
                crash reporting, and no usage tracking of any kind.
              </p>
            </Clause>

            <Clause heading="Where your files go">
              <p>
                The PDF you choose is read into memory, converted, and written back to your
                device&rsquo;s Downloads folder as an EPUB. Neither file is copied anywhere
                else, and neither leaves the device. Reflow has no server component.
              </p>
            </Clause>

            <Clause heading="Network access">
              <p>
                Reflow does not request the Android INTERNET permission. It is therefore
                incapable of making a network connection. You do not have to take our word for
                it: the app&rsquo;s permission list on your phone shows no network access, and
                the same is visible in its manifest.
              </p>
            </Clause>

            <Clause heading="Permissions the app uses">
              <p>
                None at runtime. Reflow reads the single PDF you pick through
                Android&rsquo;s own document picker, and writes its output through the system
                Downloads collection. It has no access to the rest of your storage.
              </p>
            </Clause>

            <Clause heading="Third-party software">
              <p>
                Reflow includes two open-source libraries, pdf.js (Apache License 2.0) and
                JSZip (MIT License). Both run entirely on your device. Their licence notices
                are reachable from the link at the foot of the app.
              </p>
            </Clause>

            <Clause heading="Children">
              <p>The app collects no data from anyone, including children under 13.</p>
            </Clause>

            <Clause heading="Changes to this policy">
              <p>
                If this policy changes, the revised version will be posted at this address
                with a new date above.
              </p>
            </Clause>

            <Clause heading="Contact">
              <p>
                Questions about this policy:{" "}
                <a
                  href="mailto:anuvrat.mishra@qualiteknik.online"
                  className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-signal"
                >
                  anuvrat.mishra@qualiteknik.online
                </a>
              </p>
              <p className="text-sm">
                Reflow is published by 13097331 Canada Inc., trading as Qualiteknik.
              </p>
            </Clause>
          </div>
        </div>
      </section>
    </main>
  );
}
