# Qualiteknik

Marketing site for Qualiteknik Inc. — an AI/ML engineering consultancy based in
Toronto and Lucknow.

Live: https://qualiteknik.vercel.app

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · TypeScript.
All routes are statically prerendered; there is no server runtime.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Where things live

| Path | What it holds |
|---|---|
| `lib/content.ts` | Every word on the site. Edit copy here, never in a component. |
| `lib/paperFigures.ts` | Published evaluation data for the road-monitoring case study. |
| `components/ControlChart.tsx` | The hero: a live control chart, canvas. |
| `components/RoadSensing.tsx` | Wheel-over-road wireframe with 3-axis accelerometer traces. |
| `components/PaperFigures.tsx` | Accuracy bars, confusion matrix, per-class F-measure. |
| `app/globals.css` | Design tokens and the shared "instrument" vocabulary. |

## Design system

The site is dressed as a calibration report rather than an AI landing page:
warm paper, ink, hairline rules, tabular figures, and a single measured red
that means *signal*. No gradients. Instrument Serif for display, Public Sans
for body, JetBrains Mono for every figure and label.

Two rules worth knowing before editing CSS:

- Colours are defined as tokens on bare `:root`, then redefined for dark under
  both `prefers-color-scheme` and `[data-theme="dark"]`. Never give a colour
  its only definition inside a media query.
- Base resets live inside `@layer base`. An unlayered rule outranks every
  layered one regardless of specificity, which silently defeats Tailwind's
  `text-*` utilities on links.

## Canvas components

`ControlChart` and `RoadSensing` both:

- time with `performance.now()`, never assuming `requestAnimationFrame` has
  been running (it is suspended in background tabs);
- paint one correct frame before starting the loop, so a hidden tab still
  renders something real;
- re-read their palette on a `prefers-color-scheme` change *and* on a
  `[data-theme]` mutation, since the latter fires no media query;
- fall back to a static settled frame under `prefers-reduced-motion`.

## Evaluation data

The figures in the road-monitoring case study reproduce published results from
Varona, Monteserin & Teyseyre, *Personal and Ubiquitous Computing* 24:519–534
(2020) — the research the project's method follows. The numbers are
transcribed verbatim and credited on the page. They are not Qualiteknik's own
measurements and must not be presented as such.

## Deploys

Pushing to `master` deploys to production via the Vercel Git integration.
Tags mark reviewed states (`v1-metrology` → …).
