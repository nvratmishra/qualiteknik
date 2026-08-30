"use client";

import { useEffect, useRef } from "react";

/**
 * Wireframe of a pickup wheelwell tracking a road profile, with the three
 * accelerometer axes plotted beneath it.
 *
 * Two decisions make this informative rather than decorative:
 *
 * 1. The traces are computed as a function of road *position*, not elapsed
 *    time. Every spike therefore sits directly under the feature that caused
 *    it, so the reader can see cause and signal in one glance.
 *
 * 2. The tyre is modelled as an envelope over its contact patch rather than a
 *    point follower. A real tyre bridges a narrow gutter and drops into a wide
 *    pothole — which is exactly the ambiguity the classifier has to resolve,
 *    and a point follower would hide it.
 */

const TRACK = 900; // world length before the profile repeats
const SPEED = 46; // px/sec
const TYRE_R = 38; // world units

type Feature = { at: number; kind: "pothole" | "bump" | "gutter" | "rough"; label: string };

const FEATURES: Feature[] = [
  { at: 150, kind: "pothole", label: "Pothole" },
  { at: 370, kind: "bump", label: "Speed bump" },
  { at: 560, kind: "gutter", label: "Street gutter" },
  { at: 745, kind: "rough", label: "Broken surface" },
];

/** Deterministic value noise — stable as the road scrolls, unlike Math.random. */
function vnoise(x: number) {
  const i = Math.floor(x);
  const f = x - i;
  const h = (n: number) => {
    const s = Math.sin(n * 127.1) * 43758.5453;
    return s - Math.floor(s);
  };
  const a = h(i);
  const b = h(i + 1);
  const t = f * f * (3 - 2 * f); // smoothstep
  return (a + (b - a) * t) * 2 - 1;
}

/** Road surface height at world position x. Negative is down. */
function profile(x: number) {
  const p = ((x % TRACK) + TRACK) % TRACK;
  let h = 0;

  for (const f of FEATURES) {
    const d = p - f.at;
    switch (f.kind) {
      case "pothole": {
        // wider than the tyre's bridging span, so the wheel genuinely drops in
        const w = 32;
        if (Math.abs(d) < w) h -= 16 * Math.pow(Math.cos((d / w) * (Math.PI / 2)), 2);
        break;
      }
      case "bump": {
        const w = 34;
        if (Math.abs(d) < w) h += 11 * Math.pow(Math.cos((d / w) * (Math.PI / 2)), 2);
        break;
      }
      case "gutter": {
        // narrow and sharp — the tyre bridges most of it, so the signature is
        // sharp but small. That near-miss is what a naive threshold gets wrong.
        const w = 9;
        if (Math.abs(d) < w) h -= 16 * (1 - Math.abs(d) / w);
        break;
      }
      case "rough": {
        const w = 46;
        if (Math.abs(d) < w) {
          const fade = 1 - Math.abs(d) / w;
          h += vnoise(p * 0.9) * 2.4 * fade;
        }
        break;
      }
    }
  }
  return h;
}

/**
 * Height of the tyre *centre* above the road datum.
 *
 * A circle of radius R centred at height yc touches the surface where
 * yc − √(R²−dx²) = profile(x+dx), so the resting centre is the maximum of
 * profile(x+dx) + √(R²−dx²) across the contact patch. On flat road this
 * returns exactly R, which is what keeps the wheel on the ground.
 */
function tyreHeight(x: number) {
  let best = -Infinity;
  const steps = 14;
  for (let i = -steps; i <= steps; i++) {
    const dx = (i / steps) * TYRE_R;
    const lift = Math.sqrt(Math.max(0, TYRE_R * TYRE_R - dx * dx));
    best = Math.max(best, profile(x + dx) + lift);
  }
  return best;
}

/** Second difference of tyre height — what the vertical axis actually feels. */
function accelZ(x: number) {
  const d = 3;
  return (tyreHeight(x - d) - 2 * tyreHeight(x) + tyreHeight(x + d)) / (d * d);
}

function accelY(x: number) {
  // pitch: responds to slope change, gentler than Z
  const d = 5;
  return ((tyreHeight(x + d) - tyreHeight(x - d)) / (2 * d)) * 0.5 + vnoise(x * 0.35) * 0.02;
}

function accelX(x: number) {
  // lateral: mostly quiet, wanders on broken surface
  return vnoise(x * 0.5 + 91) * 0.035 + accelZ(x) * 0.12;
}

export function RoadSensing() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ink = "#15171b";
    let inkFaint = "#8d929a";
    let signal = "#b8371c";
    let paper = "#f3f1ec";

    function readTheme() {
      const cs = getComputedStyle(document.documentElement);
      const pick = (n: string, f: string) => cs.getPropertyValue(n).trim() || f;
      ink = pick("--ink", ink);
      inkFaint = pick("--ink-faint", inkFaint);
      signal = pick("--signal", signal);
      paper = pick("--paper", paper);
    }
    readTheme();

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", readTheme);
    const themeObs = new MutationObserver(readTheme);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

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

    let scroll = reduced ? 118 : 0; // reduced-motion parks mid-pothole

    function alpha(hex: string, a: number) {
      return `color-mix(in srgb, ${hex} ${Math.round(a * 100)}%, transparent)`;
    }

    function draw() {
      if (w < 2 || h < 2) return;
      ctx!.clearRect(0, 0, w, h);

      const sceneH = h * 0.44;
      // the truck needs roughly 80px of headroom above the road; sitting the
      // datum at 0.62 of the band keeps it filling the frame rather than
      // floating in empty space
      const roadY = sceneH * 0.62;
      const wheelX = w * 0.34; // the truck holds station; the road moves
      const laneTop = sceneH + 14;
      const laneH = (h - laneTop - 16) / 3;

      const worldAt = (sx: number) => scroll + (sx - wheelX);

      /* ---------- road ---------- */
      ctx!.strokeStyle = ink;
      ctx!.lineWidth = 1.25;
      ctx!.beginPath();
      for (let sx = 0; sx <= w; sx++) {
        const y = roadY - profile(worldAt(sx));
        if (sx === 0) ctx!.moveTo(sx, y);
        else ctx!.lineTo(sx, y);
      }
      ctx!.stroke();

      /* ---------- feature labels + alignment guides ---------- */
      for (const f of FEATURES) {
        // find the on-screen position of this feature this cycle
        const base = Math.floor((scroll - wheelX) / TRACK) * TRACK;
        for (const cycle of [base, base + TRACK]) {
          const sx = wheelX + (cycle + f.at - scroll);
          if (sx < -60 || sx > w + 60) continue;

          const near = Math.abs(sx - wheelX) < 46;

          ctx!.strokeStyle = alpha(signal, near ? 0.5 : 0.16);
          ctx!.lineWidth = 1;
          ctx!.setLineDash([2, 4]);
          ctx!.beginPath();
          ctx!.moveTo(sx, roadY + 8);
          ctx!.lineTo(sx, h - 8);
          ctx!.stroke();
          ctx!.setLineDash([]);

          ctx!.fillStyle = near ? signal : alpha(inkFaint, 0.85);
          ctx!.font = '9px ui-monospace, "SF Mono", Menlo, monospace';
          ctx!.textAlign = "center";
          ctx!.fillText(f.label.toUpperCase(), sx, roadY + 24);
        }
      }

      /* ---------- tyre + wheelwell ---------- */
      // tyreHeight already is the centre height above the datum
      const axleY = roadY - tyreHeight(scroll);

      // body follows the axle softly — the cab moves less than the wheel
      const bodyLag = 0.42;
      const bodyY = axleY * bodyLag + (roadY - TYRE_R - 6) * (1 - bodyLag);

      ctx!.save();
      ctx!.strokeStyle = ink;
      ctx!.lineWidth = 1.1;

      // tyre
      ctx!.beginPath();
      ctx!.arc(wheelX, axleY, TYRE_R, 0, Math.PI * 2);
      ctx!.stroke();
      // rim
      ctx!.strokeStyle = alpha(ink, 0.5);
      ctx!.beginPath();
      ctx!.arc(wheelX, axleY, TYRE_R * 0.52, 0, Math.PI * 2);
      ctx!.stroke();
      // spokes, rotating with distance travelled
      const rot = scroll / TYRE_R;
      ctx!.strokeStyle = alpha(ink, 0.32);
      for (let i = 0; i < 5; i++) {
        const a = rot + (i * Math.PI * 2) / 5;
        ctx!.beginPath();
        ctx!.moveTo(wheelX + Math.cos(a) * TYRE_R * 0.16, axleY + Math.sin(a) * TYRE_R * 0.16);
        ctx!.lineTo(wheelX + Math.cos(a) * TYRE_R * 0.5, axleY + Math.sin(a) * TYRE_R * 0.5);
        ctx!.stroke();
      }
      // hub
      ctx!.fillStyle = ink;
      ctx!.beginPath();
      ctx!.arc(wheelX, axleY, 2, 0, Math.PI * 2);
      ctx!.fill();

      // wheel arch — squared-shoulder pickup fender, drawn as two offset lines
      const archR = TYRE_R + 13;
      const archTop = bodyY - 6;
      for (const [r, a] of [
        [archR, 1],
        [archR + 7, 0.4],
      ] as const) {
        ctx!.strokeStyle = alpha(ink, a);
        ctx!.lineWidth = a === 1 ? 1.2 : 1;
        ctx!.beginPath();
        ctx!.moveTo(wheelX - r, archTop + r * 0.72);
        ctx!.lineTo(wheelX - r, archTop + r * 0.2);
        ctx!.quadraticCurveTo(wheelX - r, archTop - r * 0.36, wheelX - r * 0.52, archTop - r * 0.5);
        ctx!.lineTo(wheelX + r * 0.52, archTop - r * 0.5);
        ctx!.quadraticCurveTo(wheelX + r, archTop - r * 0.36, wheelX + r, archTop + r * 0.2);
        ctx!.lineTo(wheelX + r, archTop + r * 0.72);
        ctx!.stroke();
      }

      // rocker panel / body sill running off both edges
      ctx!.strokeStyle = alpha(ink, 0.55);
      ctx!.lineWidth = 1;
      const sillY = archTop + archR * 0.72;
      ctx!.beginPath();
      ctx!.moveTo(0, sillY);
      ctx!.lineTo(wheelX - archR - 7, sillY);
      ctx!.moveTo(wheelX + archR + 7, sillY);
      ctx!.lineTo(w, sillY);
      ctx!.stroke();

      // suspension strut between axle and body
      ctx!.strokeStyle = alpha(ink, 0.45);
      const strutTop = archTop - archR * 0.42;
      ctx!.beginPath();
      ctx!.moveTo(wheelX, axleY);
      ctx!.lineTo(wheelX, strutTop);
      ctx!.stroke();
      // coil
      const coils = 6;
      const cTop = strutTop + 4;
      const cBot = axleY - 8;
      ctx!.beginPath();
      for (let i = 0; i <= coils * 8; i++) {
        const t = i / (coils * 8);
        const y = cTop + (cBot - cTop) * t;
        const x = wheelX + Math.sin(t * coils * Math.PI * 2) * 7;
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.stroke();
      ctx!.restore();

      /* ---------- travel dimension, drafting style ---------- */
      const restY = roadY - TYRE_R;
      const dimX = wheelX + archR + 34;
      ctx!.strokeStyle = alpha(inkFaint, 0.9);
      ctx!.lineWidth = 1;
      ctx!.setLineDash([2, 3]);
      ctx!.beginPath();
      ctx!.moveTo(wheelX + archR + 10, restY);
      ctx!.lineTo(dimX + 8, restY);
      ctx!.moveTo(wheelX + archR + 10, axleY);
      ctx!.lineTo(dimX + 8, axleY);
      ctx!.stroke();
      ctx!.setLineDash([]);
      ctx!.beginPath();
      ctx!.moveTo(dimX, restY);
      ctx!.lineTo(dimX, axleY);
      ctx!.stroke();
      ctx!.fillStyle = inkFaint;
      ctx!.font = '9px ui-monospace, "SF Mono", Menlo, monospace';
      ctx!.textAlign = "left";
      ctx!.fillText(
        `${(restY - axleY >= 0 ? "+" : "") + (restY - axleY).toFixed(0)}`,
        dimX + 5,
        (restY + axleY) / 2 + 3,
      );
      ctx!.fillText("TRAVEL", dimX + 5, (restY + axleY) / 2 + 15);

      /* ---------- accelerometer lanes ---------- */
      // Scales differ per axis so each trace uses its lane. Z stays the loudest
      // relative to its own lane, which is the physical truth: a road defect is
      // overwhelmingly a vertical event.
      const axes = [
        { key: "X", fn: accelX, scale: 150, note: "lateral" },
        { key: "Y", fn: accelY, scale: 95, note: "longitudinal" },
        { key: "Z", fn: accelZ, scale: 68, note: "vertical" },
      ];

      axes.forEach((ax, i) => {
        const top = laneTop + i * laneH;
        const mid = top + laneH / 2;

        // lane baseline
        ctx!.strokeStyle = alpha(inkFaint, 0.4);
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(30, mid);
        ctx!.lineTo(w, mid);
        ctx!.stroke();

        ctx!.fillStyle = inkFaint;
        ctx!.font = '10px ui-monospace, "SF Mono", Menlo, monospace';
        ctx!.textAlign = "left";
        ctx!.fillText(ax.key, 4, mid + 3.5);

        // the trace itself
        const isZ = ax.key === "Z";
        ctx!.strokeStyle = isZ ? signal : alpha(ink, 0.55);
        ctx!.lineWidth = isZ ? 1.3 : 1;
        ctx!.beginPath();
        for (let sx = 30; sx <= w; sx++) {
          const v = ax.fn(worldAt(sx)) * ax.scale;
          const y = mid - Math.max(-laneH / 2 + 3, Math.min(laneH / 2 - 3, v));
          if (sx === 30) ctx!.moveTo(sx, y);
          else ctx!.lineTo(sx, y);
        }
        ctx!.stroke();

        // live readout at the wheel's own position
        const nowV = ax.fn(scroll) * ax.scale;
        const ny = mid - Math.max(-laneH / 2 + 3, Math.min(laneH / 2 - 3, nowV));
        ctx!.fillStyle = isZ ? signal : alpha(ink, 0.55);
        ctx!.beginPath();
        ctx!.arc(wheelX, ny, isZ ? 3 : 2, 0, Math.PI * 2);
        ctx!.fill();
      });

      // the sampling line: everything on it happened at the same instant
      ctx!.strokeStyle = alpha(signal, 0.55);
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(wheelX, roadY + 4);
      ctx!.lineTo(wheelX, h - 6);
      ctx!.stroke();
    }

    // rAF is suspended in background tabs; time it ourselves and never assume
    // the loop has been running.
    let raf = 0;
    let last = performance.now();

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      scroll += SPEED * dt;
      draw();
    }

    draw();
    if (!reduced) raf = requestAnimationFrame(frame);

    function onVis() {
      last = performance.now();
    }
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObs.disconnect();
      scheme.removeEventListener("change", readTheme);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="mt-10 border border-rule bg-[color:var(--paper-raised)] p-7 sm:p-9">
      <div className="flex items-center gap-3">
        <span className="h-px w-7 bg-signal" aria-hidden />
        <span className="readout text-signal">Signal Capture</span>
      </div>

      <div className="mt-4 grid gap-x-10 gap-y-4 lg:grid-cols-[22rem_1fr]">
        <p className="text-sm leading-relaxed text-ink-soft">
          A phone in a moving vehicle senses the road through the suspension. Each trace is
          plotted against road position, so every spike sits directly beneath the defect that
          produced it.
        </p>
        <p className="text-sm leading-relaxed text-ink-soft">
          The tyre bridges what is narrower than its contact patch, so a street gutter registers
          differently from a pothole of the same depth — and a speed bump produces a clean
          signature that looks a great deal like a defect. Separating those three is the
          classification problem.
        </p>
      </div>

      <div ref={wrapRef} className="mt-8 h-[340px] w-full sm:h-[400px]">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Wireframe cross-section of a pickup wheel travelling over a road profile containing a pothole, a speed bump, a street gutter and broken surface, with the three accelerometer axes plotted beneath and aligned to each defect."
        />
      </div>
    </div>
  );
}
