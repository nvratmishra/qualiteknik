"use client";

import { useState } from "react";
import {
  ACCURACY,
  CONFUSION,
  F_MEASURE,
  MODELS,
  PAPER_CREDIT,
  TASKS,
  type ModelId,
  type TaskId,
} from "@/lib/paperFigures";
import { useCountUp, useReveal } from "@/components/useReveal";

/* Alpha off a theme token, so every tint follows the light/dark palette. */
const tint = (token: string, pct: number) =>
  `color-mix(in srgb, var(${token}) ${Math.round(pct * 100)}%, transparent)`;

const pct = (n: number) => `${(n * 100).toFixed(0)}%`;

/* ------------------------------------------------------------------ */
/* Panel 1 — accuracy per model, per task                              */
/* ------------------------------------------------------------------ */

function AccuracyBar({
  label,
  value,
  highlight,
  shown,
  delay,
}: {
  label: string;
  value: number;
  highlight: boolean;
  shown: boolean;
  delay: number;
}) {
  const v = useCountUp(value, shown, 900);

  return (
    <div className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-4">
      <span className={`text-sm ${highlight ? "text-signal" : "text-ink-soft"}`}>{label}</span>

      <div className="relative h-[7px] bg-[color:var(--paper-deep)]">
        {/* the 0.5 gridline — a bar chart without a reference is decoration */}
        <span
          className="absolute inset-y-[-4px] w-px"
          style={{ left: "50%", background: tint("--ink", 0.18) }}
          aria-hidden
        />
        <div
          className="h-full"
          style={{
            width: shown ? pct(value) : "0%",
            background: highlight ? "var(--signal)" : tint("--ink", 0.42),
            transition: `width 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          }}
        />
      </div>

      <span
        className={`tabular text-right text-sm ${highlight ? "text-signal" : "text-ink-soft"}`}
      >
        {v.toFixed(2)}
      </span>
    </div>
  );
}

function Scoreboard({ task }: { task: TaskId }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const scores = ACCURACY[task];
  const rows = MODELS.filter((m) => scores[m.id] !== undefined);

  return (
    <div ref={ref} className="space-y-3.5">
      {rows.map((m, i) => (
        <AccuracyBar
          key={`${task}-${m.id}`}
          label={m.label}
          value={scores[m.id]!}
          highlight={m.id === "cnn"}
          shown={shown}
          delay={i * 70}
        />
      ))}
      {rows.length === 1 && (
        <p className="pt-2 text-xs leading-relaxed text-ink-faint">
          The paper reports the binary task for the CNN only — it is the collapse of the
          six-class result, not a separate experiment.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panel 2 — confusion matrix                                          */
/* ------------------------------------------------------------------ */

function ConfusionMatrix({ task }: { task: TaskId }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const available = MODELS.filter((m) => CONFUSION[task][m.id]);
  const [model, setModel] = useState<ModelId>("cnn");
  const active: ModelId = available.some((m) => m.id === model) ? model : "cnn";

  const matrix = CONFUSION[task][active]!;
  const classes = TASKS.find((t) => t.id === task)!.classes;
  const rowTotals = matrix.map((r) => r.reduce((a, b) => a + b, 0));

  return (
    <div ref={ref}>
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="readout text-ink-faint">Model</span>
        {available.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setModel(m.id)}
            aria-pressed={m.id === active}
            className={`text-sm transition-colors duration-200 ${
              m.id === active
                ? "text-signal"
                : "text-ink-faint hover:text-ink"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[34rem]">
          <div
            className="grid gap-px"
            style={{ gridTemplateColumns: `7rem repeat(${classes.length}, minmax(4rem, 1fr))` }}
          >
            {/* header row */}
            <div />
            {classes.map((c) => (
              <div key={c} className="pb-2 text-center">
                <span className="readout block leading-tight text-ink-faint">{c}</span>
              </div>
            ))}

            {matrix.map((row, r) => (
              <div key={r} className="contents">
                <div className="flex items-center justify-end pr-3">
                  <span className="readout text-ink-faint">{classes[r]}</span>
                </div>

                {row.map((cell, c) => {
                  const share = rowTotals[r] ? cell / rowTotals[r] : 0;
                  const correct = r === c;
                  // Errors are drawn in the signal colour: on this site red
                  // means "the thing being monitored", and an off-diagonal cell
                  // is exactly that.
                  const bg = correct
                    ? tint("--ink", 0.06 + share * 0.5)
                    : tint("--signal", share * 0.85);
                  const strong = correct ? share > 0.55 : share > 0.35;

                  return (
                    <div
                      key={c}
                      title={`True ${classes[r]} → predicted ${classes[c]}: ${cell} (${pct(share)})`}
                      className="flex aspect-[4/3] items-center justify-center"
                      style={{
                        background: shown ? bg : "transparent",
                        transition: `background 700ms ease ${(r * classes.length + c) * 16}ms`,
                      }}
                    >
                      <span
                        className="tabular text-[11px]"
                        style={{
                          color: strong
                            ? "var(--paper)"
                            : correct
                              ? "var(--ink-soft)"
                              : "var(--signal)",
                          opacity: shown ? 1 : 0,
                          transition: `opacity 500ms ease ${(r * classes.length + c) * 16 + 180}ms`,
                        }}
                      >
                        {cell}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2">
            <span className="readout text-ink-faint">Rows: true · Columns: predicted</span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5"
                style={{ background: tint("--ink", 0.45) }}
                aria-hidden
              />
              <span className="readout text-ink-faint">Correct</span>
            </span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5"
                style={{ background: tint("--signal", 0.7) }}
                aria-hidden
              />
              <span className="readout text-ink-faint">Misclassified</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panel 3 — per-class F-measure. The chart that carries the argument.  */
/* ------------------------------------------------------------------ */

function ClassBreakdown() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="space-y-5">
      {F_MEASURE.map((row, i) => {
        const others = MODELS.filter((m) => m.id !== "cnn").map((m) => row.scores[m.id]);
        const worst = Math.min(...others);
        const cnn = row.scores.cnn;
        const gap = cnn - worst;

        return (
          <div
            key={row.cls}
            className="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-4"
          >
            <span className="text-sm text-ink-soft">{row.cls}</span>

            <div className="relative h-6">
              {/* axis */}
              <span
                className="absolute inset-x-0 top-1/2 h-px"
                style={{ background: tint("--ink", 0.14) }}
                aria-hidden
              />
              {/* span from worst baseline to CNN — the size of the disagreement */}
              <span
                className="absolute top-1/2 h-px -translate-y-1/2"
                style={{
                  left: pct(worst),
                  width: shown ? pct(Math.max(0, gap)) : "0%",
                  background: tint("--signal", 0.45),
                  transition: `width 800ms cubic-bezier(0.22,1,0.36,1) ${i * 80 + 200}ms`,
                }}
                aria-hidden
              />

              {MODELS.map((m) => {
                const v = row.scores[m.id];
                const isCnn = m.id === "cnn";
                return (
                  <span
                    key={m.id}
                    title={`${m.label}: F-measure ${v.toFixed(2)}`}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: pct(v),
                      width: isCnn ? 11 : 7,
                      height: isCnn ? 11 : 7,
                      background: isCnn ? "var(--signal)" : tint("--ink", 0.34),
                      opacity: shown ? 1 : 0,
                      transform: `translate(-50%,-50%) scale(${shown ? 1 : 0.4})`,
                      transition: `opacity 500ms ease ${i * 80 + (isCnn ? 320 : 120)}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${i * 80 + (isCnn ? 320 : 120)}ms`,
                    }}
                  />
                );
              })}
            </div>

            <span className="tabular text-right text-sm text-signal">{cnn.toFixed(2)}</span>
          </div>
        );
      })}

      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 pt-2">
        <span className="readout text-ink-faint">F-measure, 0 → 1</span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-signal" aria-hidden />
          <span className="readout text-ink-faint">CNN</span>
        </span>
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: tint("--ink", 0.34) }}
            aria-hidden
          />
          <span className="readout text-ink-faint">Five other models</span>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Panel({
  n,
  title,
  note,
  children,
  wide = false,
}: {
  n: string;
  title: string;
  note: string;
  children: React.ReactNode;
  /** Stack instead of splitting — for content that needs the full measure. */
  wide?: boolean;
}) {
  const head = (
    <div className={wide ? "max-w-2xl" : undefined}>
      <div className="flex items-baseline gap-3">
        <span className="tabular text-xs text-signal">{n}</span>
        <h3 className="text-lg leading-tight">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{note}</p>
    </div>
  );

  return (
    <section className="border-t border-rule pt-7">
      {wide ? (
        <>
          {head}
          {/* min-w-0 so the matrix scrolls inside its own box, not the page */}
          <div className="mt-8 min-w-0">{children}</div>
        </>
      ) : (
        <div className="grid gap-x-10 gap-y-5 lg:grid-cols-[16rem_1fr]">
          {head}
          <div className="min-w-0">{children}</div>
        </div>
      )}
    </section>
  );
}

export function PaperFigures() {
  const [task, setTask] = useState<TaskId>("event");
  const active = TASKS.find((t) => t.id === task)!;

  return (
    <div className="mt-10 border border-rule bg-[color:var(--paper-raised)] p-7 sm:p-9">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-signal" aria-hidden />
            <span className="readout text-signal">Model Evaluation</span>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Detecting a pothole is the easy half. Not calling a speed bump a pothole is the half
            that decides whether a road authority can act on the data — so the evaluation is
            reported per class, against five alternative models, rather than as one headline
            number.
          </p>
        </div>
      </div>

      {/* task selector — the three questions the system has to answer */}
      <div
        className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-3"
        role="tablist"
        aria-label="Classification task"
      >
        {TASKS.map((t) => {
          const on = t.id === task;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTask(t.id)}
              className={`bg-[color:var(--paper-raised)] px-5 py-4 text-left transition-colors duration-200 ${
                on ? "" : "hover:bg-[color:var(--paper)]"
              }`}
              style={on ? { background: "var(--paper)" } : undefined}
            >
              <span className={`readout ${on ? "text-signal" : "text-ink-faint"}`}>
                {t.short}
              </span>
              <span className="mt-2 block text-sm leading-snug text-ink">{t.question}</span>
              <span className="tabular mt-1.5 block text-xs text-ink-faint">
                {t.classes.length} classes
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 space-y-10">
        <Panel
          n="01"
          title="Accuracy by model"
          note={`${active.label}. The CNN is compared against two other deep models and three non-neural baselines on identical data.`}
        >
          <Scoreboard task={task} />
        </Panel>

        <Panel
          n="02"
          wide
          title="Where the errors go"
          note="Overall accuracy hides which mistakes a model makes. The diagonal is correct; everything off it is a misclassification, and the shade is that error's share of the true class."
        >
          <ConfusionMatrix task={task} />
        </Panel>

        <Panel
          n="03"
          title="The classes that actually matter"
          note="Per-class F-measure on the stability-event task. Every model finds potholes. Only one holds up on speed bumps and street gutters — the two events that generate false pothole reports."
        >
          <ClassBreakdown />
        </Panel>
      </div>

      <p className="mt-10 border-t border-rule pt-5 text-xs leading-relaxed text-ink-faint">
        {PAPER_CREDIT}
      </p>
    </div>
  );
}
