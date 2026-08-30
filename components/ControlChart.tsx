"use client";

import { useEffect, useRef } from "react";

/**
 * A live control chart — the hero, and the firm's argument in one image.
 *
 * A signal traces right inside a tolerance band. Drift accumulates, approaches
 * a control limit, gets flagged, and is corrected back toward the centre line.
 * That is precisely what Qualiteknik sells, so it is the page's thesis rather
 * than decoration.
 *
 * Deliberately 2D canvas, not WebGL: a chart should read as *drawn*.
 */

const N = 240; // samples across the plot
const STEP_MS = 55; // how often a new sample lands
const LIMIT = 1.0; // control limit, in normalised units
const WARN = 0.78; // where we start calling it drift

type Flag = { pos: number; age: number };

/** Small deterministic PRNG — natural-looking noise that never spikes absurdly. */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export function ControlChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rng = makeRng(20260830);

    // ---- simulation state ------------------------------------------------
    const values: number[] = [];
    let noise = 0;
    let drift = 0;
    let driftDir = 1;
    let sinceEpisode = 0;
    let correcting = 0;
    const flags: Flag[] = [];

    function sample(): number {
      // gentle random walk, mean-reverting so it never wanders off on its own
      noise += (rng() - 0.5) * 0.22;
      noise *= 0.93;

      if (correcting > 0) {
        // caught: pull the drift back toward the centre line
        drift *= 0.9;
        correcting -= 1;
      } else {
        sinceEpisode += 1;
        // every so often, start drifting — this is the thing being monitored.
        // Alternate direction: a random walk of directions leaves the trace
        // stacked in one half of the band and the chart looks lopsided.
        if (sinceEpisode > 150 && rng() > 0.988) {
          sinceEpisode = 0;
          driftDir = -driftDir;
        }
        if (sinceEpisode < 90) drift += driftDir * 0.011;
        else drift *= 0.985;
      }

      const v = noise + drift;

      if (Math.abs(v) > WARN && correcting === 0) {
        flags.push({ pos: values.length, age: 0 });
        correcting = 55; // flagged — now it gets corrected
        // End the episode too. Without this the same episode resumes pushing
        // the same way once correction finishes, and the trace piles up in one
        // half of the band instead of exercising both.
        sinceEpisode = 120;
        driftDir = -driftDir;
      }
      return v;
    }

    // Prefill so the chart has history on first paint rather than growing in
    // from an empty axis — and so a background tab still renders something real.
    for (let i = 0; i < N; i++) values.push(sample());

    // ---- theme-aware colours --------------------------------------------
    let ink = "#15171b";
    let inkFaint = "#8d929a";
    let signal = "#b8371c";

    function readTheme() {
      const cs = getComputedStyle(document.documentElement);
      const pick = (n: string, fallback: string) =>
        cs.getPropertyValue(n).trim() || fallback;
      ink = pick("--ink", ink);
      inkFaint = pick("--ink-faint", inkFaint);
      signal = pick("--signal", signal);
    }
    readTheme();

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", readTheme);

    // A theme can also change by an explicit [data-theme] stamp on <html>,
    // which fires no media query. Without this the canvas keeps the previous
    // palette and the limits are drawn in a colour the ground has swallowed.
    const themeObserver = new MutationObserver(() => {
      readTheme();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // ---- sizing ----------------------------------------------------------
    let w = 0;
    let h = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = wrap!.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    // ---- drawing ---------------------------------------------------------
    const PAD_L = 54;
    const PAD_R = 18;
    const PAD_Y = 30;

    function yFor(v: number) {
      const mid = h / 2;
      const half = h / 2 - PAD_Y;
      return mid - (v / (LIMIT * 1.45)) * half;
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const plotW = w - PAD_L - PAD_R;
      if (plotW <= 0 || h <= 0) return;

      const xFor = (i: number) => PAD_L + (i / (N - 1)) * plotW;

      // The band and the limits are the point of the chart, so they are drawn
      // from `ink` at explicit alphas rather than the --rule tokens — those are
      // tuned for hairline dividers and all but vanish on the light paper.

      // tolerance band — the region the signal is allowed to occupy
      ctx!.fillStyle = ink;
      ctx!.globalAlpha = 0.05;
      ctx!.fillRect(PAD_L, yFor(LIMIT), plotW, yFor(-LIMIT) - yFor(LIMIT));

      // control limits
      ctx!.globalAlpha = 0.45;
      ctx!.strokeStyle = ink;
      ctx!.lineWidth = 1;
      ctx!.setLineDash([4, 5]);
      for (const lim of [LIMIT, -LIMIT]) {
        ctx!.beginPath();
        ctx!.moveTo(PAD_L, yFor(lim) + 0.5);
        ctx!.lineTo(w - PAD_R, yFor(lim) + 0.5);
        ctx!.stroke();
      }
      ctx!.setLineDash([]);

      // centre line — the target
      ctx!.globalAlpha = 0.22;
      ctx!.beginPath();
      ctx!.moveTo(PAD_L, yFor(0) + 0.5);
      ctx!.lineTo(w - PAD_R, yFor(0) + 0.5);
      ctx!.stroke();
      ctx!.globalAlpha = 1;

      // axis labels
      ctx!.fillStyle = inkFaint;
      ctx!.font = '10px ui-monospace, "SF Mono", Menlo, monospace';
      ctx!.textAlign = "right";
      ctx!.textBaseline = "middle";
      ctx!.fillText("UCL", PAD_L - 10, yFor(LIMIT));
      ctx!.fillText("μ", PAD_L - 10, yFor(0));
      ctx!.fillText("LCL", PAD_L - 10, yFor(-LIMIT));

      // the signal
      ctx!.strokeStyle = signal;
      ctx!.lineWidth = 1.4;
      ctx!.lineJoin = "round";
      ctx!.beginPath();
      for (let i = 0; i < values.length; i++) {
        const x = xFor(i);
        const y = yFor(values[i]);
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.stroke();

      // flagged excursions
      for (const f of flags) {
        const i = f.pos;
        if (i < 0 || i >= values.length) continue;
        const x = xFor(i);
        const y = yFor(values[i]);
        const fade = Math.max(0, 1 - f.age / 260);

        ctx!.globalAlpha = fade;
        ctx!.strokeStyle = signal;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(x + 0.5, PAD_Y * 0.5);
        ctx!.lineTo(x + 0.5, h - PAD_Y * 0.5);
        ctx!.stroke();

        ctx!.fillStyle = signal;
        ctx!.beginPath();
        ctx!.arc(x, y, 3, 0, Math.PI * 2);
        ctx!.fill();

        if (fade > 0.5) {
          ctx!.globalAlpha = (fade - 0.5) * 2;
          ctx!.fillStyle = signal;
          ctx!.font = '9px ui-monospace, "SF Mono", Menlo, monospace';
          ctx!.textAlign = x > w - 160 ? "right" : "left";
          ctx!.fillText(
            "DRIFT FLAGGED",
            x > w - 160 ? x - 7 : x + 7,
            PAD_Y * 0.5 + 6,
          );
        }
        ctx!.globalAlpha = 1;
      }

      // leading edge — where the newest sample just landed
      const lastX = xFor(values.length - 1);
      const lastY = yFor(values[values.length - 1]);
      ctx!.fillStyle = ink;
      ctx!.beginPath();
      ctx!.arc(lastX, lastY, 2.5, 0, Math.PI * 2);
      ctx!.fill();
    }

    // ---- loop ------------------------------------------------------------
    // NB: time it with performance.now(), and never assume rAF is running —
    // it is suspended in background tabs, which would otherwise leave a blank
    // canvas on first paint for anyone opening the site in a new tab.
    let raf = 0;
    let last = performance.now();
    let acc = 0;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 200);
      last = now;
      acc += dt;

      let stepped = false;
      while (acc >= STEP_MS) {
        acc -= STEP_MS;
        values.push(sample());
        values.shift();
        for (const f of flags) f.pos -= 1;
        for (const f of flags) f.age += 1;
        while (flags.length && (flags[0].pos < 0 || flags[0].age > 260)) flags.shift();
        stepped = true;
      }
      if (stepped) draw();
    }

    draw();
    if (!reduced) raf = requestAnimationFrame(frame);

    function onVisible() {
      // rAF was suspended; don't let the delta avalanche into a burst of steps
      last = performance.now();
      acc = 0;
    }
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      scheme.removeEventListener("change", readTheme);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <div ref={wrapRef} className="h-[300px] w-full sm:h-[380px] lg:h-[440px]">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A live control chart: a monitored signal tracing inside its upper and lower control limits, with drift excursions flagged and corrected."
      />
    </div>
  );
}
