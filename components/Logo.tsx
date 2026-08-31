/**
 * The Qualiteknik mark — universal approximation, drawn.
 *
 * A faint dashed circle is the target: a continuous function. The solid form
 * over it is a *piecewise-linear* approximation with a neuron at every vertex —
 * which is exactly what a ReLU network produces, and exactly the picture the
 * universal approximation theorem paints: a single hidden layer, a finite
 * number of units, hugging any continuous function as closely as you like.
 *
 * The outer dashed ring is the control limit. One vertex breaks through it and
 * returns, and that flagged excursion is the Q's tail.
 *
 * So the mark carries the firm's whole argument: the theorem promises the fit
 * exists, the approximation is visibly made of pieces, and something still has
 * to be watching when one of them leaves tolerance. Theory, practice, and the
 * measurement between them.
 *
 * Geometry is computed once at module load — deterministic, no runtime cost,
 * identical on server and client so hydration cannot diverge.
 */

const CX = 32;
const CY = 32;
const N = 13; // hidden units — odd, so the tail sits off-axis
const BASE_R = 19.2;

/** Where the tail sits (degrees; 0° = 3 o'clock, y grows downward). */
const TAIL_INDEX = 2;
const TAIL_R = 31;

type Pt = { x: number; y: number; tail: boolean };

const NODES: Pt[] = Array.from({ length: N }, (_, i) => {
  const a = (i / N) * Math.PI * 2;
  const tail = i === TAIL_INDEX;
  // slight per-unit variation: an approximation, not a regular polygon
  const r = tail ? TAIL_R : BASE_R + 0.95 * Math.sin(i * 2.3);
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a), tail };
});

const TRACE =
  NODES.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") +
  " Z";

const TIP = NODES[TAIL_INDEX];

export function Logo({
  className = "",
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" role="img" aria-label="Qualiteknik">
      {/* the target function */}
      <circle
        cx={CX}
        cy={CY}
        r={BASE_R}
        stroke="currentColor"
        strokeWidth="0.9"
        strokeDasharray="1.5 3"
        opacity="0.34"
      />

      {/* control limit */}
      <circle
        cx={CX}
        cy={CY}
        r="24.5"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeDasharray="2 4"
        opacity="0.22"
      />

      {/* the approximation */}
      <path
        d={TRACE}
        stroke="var(--signal)"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
        className={animated ? "logo-trace" : undefined}
      />

      {/* hidden units */}
      <g className={animated ? "logo-nodes" : undefined}>
        {NODES.map((p, i) =>
          p.tail ? null : (
            <circle key={i} cx={p.x} cy={p.y} r="1.35" fill="currentColor" opacity="0.7" />
          ),
        )}
      </g>

      {/* the excursion that left tolerance */}
      <circle
        cx={TIP.x}
        cy={TIP.y}
        r="2.1"
        fill="var(--signal)"
        className={animated ? "logo-flag" : undefined}
      />

      {/* μ */}
      <circle cx={CX} cy={CY} r="1.3" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
