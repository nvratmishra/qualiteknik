import Link from "next/link";
import { RoadSensing } from "@/components/RoadSensing";
import { Eyebrow } from "@/components/Bits";

/**
 * The flagship deep-learning project, given the top of the homepage.
 *
 * Same signal-capture animation as the case study on /work — deliberately, not
 * by accident. It is the clearest single image of what the firm does, so it
 * earns the repetition: here it introduces the project, there it explains it.
 */
export function PotholeFeature() {
  return (
    <section className="relative overflow-hidden border-b border-rule bg-paper-raised">
      <div className="pointer-events-none absolute inset-0 grid-paper opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Deep Learning Project</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.05]">
              Teaching a phone to tell a pothole
              <br className="hidden sm:block" /> from a speed bump.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="readout rounded-full border border-rule px-3 py-1.5 text-ink-faint">
              Proof of Concept
            </span>
            <span className="readout rounded-full border border-rule px-3 py-1.5 text-ink-faint">
              MVP
            </span>
            <span className="readout rounded-full border border-signal/40 px-3 py-1.5 text-signal">
              PWA · Live
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-x-12 gap-y-4 lg:grid-cols-[1fr_1fr]">
          <p className="text-base leading-relaxed text-ink-soft">
            A crowdsensing pipeline that reads a smartphone&rsquo;s accelerometer, GPS and camera
            as a vehicle drives, classifies the surface beneath it, and separates genuine road
            defects from speed bumps, street gutters and the driver simply picking up the phone.
          </p>
          <p className="text-base leading-relaxed text-ink-soft">
            CNN, LSTM and reservoir-computing models evaluated head to head against three
            non-neural baselines. Detecting a pothole is the easy half; not calling a speed bump
            one is what decides whether a road authority can act on the data.
          </p>
        </div>

        {/* the signal, as the vehicle actually feels it */}
        <div className="mt-10">
          <RoadSensing />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule pt-7">
          <a
            href="https://machinelearnspothole.site"
            target="_blank"
            rel="noopener noreferrer"
            className="measure-link text-sm text-signal"
          >
            machinelearnspothole.site ↗
          </a>
          <Link href="/work" className="measure-link text-sm text-ink-soft hover:text-ink">
            Read the full case study
          </Link>
          <span className="tabular ml-auto text-sm text-ink-faint">
            93% classification accuracy
          </span>
        </div>
      </div>
    </section>
  );
}
