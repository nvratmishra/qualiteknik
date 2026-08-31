/**
 * The Qualiteknik mark — a polygon approximating a circle, with one vertex
 * outside tolerance.
 *
 * The thin ring is the target: a continuous function. The bold heptagon
 * inscribed in it is the approximation — the oldest picture of approximation
 * there is (Archimedes bounding π with polygons), and the same picture a ReLU
 * network draws, since its output is piecewise linear. One vertex breaks
 * through the ring and returns, and that flagged excursion is the Q's tail.
 *
 * Designed at 32px first. Everything here survives that size: a regular
 * silhouette the eye completes, two stroke weights, one filled accent. The
 * neuron dots are opt-in via `detailed` because at header size they degrade
 * into a lumpy outline rather than reading as nodes.
 */

const CX = 32;
const CY = 32;
const R = 19.5; // the target function
const N = 7; // hidden units — odd, so the form never looks mirrored
const START = 50; // degrees, puts a vertex at lower-right for the tail
const TAIL_R = 30.5;

type Pt = { x: number; y: number; tail: boolean };

const NODES: Pt[] = Array.from({ length: N }, (_, i) => {
  const deg = START + (i / N) * 360;
  const a = (deg * Math.PI) / 180;
  const tail = i === 0;
  const r = tail ? TAIL_R : R;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a), tail };
});

const TRACE =
  NODES.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") +
  " Z";

const TIP = NODES[0];

export function Logo({
  className = "",
  animated = true,
  detailed = false,
}: {
  className?: string;
  animated?: boolean;
  /** Show the per-unit nodes. Only legible above roughly 64px. */
  detailed?: boolean;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" role="img" aria-label="Qualiteknik">
      {/* the target function */}
      <circle cx={CX} cy={CY} r={R} stroke="currentColor" strokeWidth="1.3" opacity="0.38" />

      {/* the approximation */}
      <path
        d={TRACE}
        stroke="var(--signal)"
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        className={animated ? "logo-trace" : undefined}
      />

      {detailed && (
        <g className={animated ? "logo-nodes" : undefined}>
          {NODES.map((p, i) =>
            p.tail ? null : (
              <circle key={i} cx={p.x} cy={p.y} r="1.8" fill="currentColor" opacity="0.65" />
            ),
          )}
        </g>
      )}

      {/* the excursion that left tolerance */}
      <circle
        cx={TIP.x}
        cy={TIP.y}
        r="3"
        fill="var(--signal)"
        className={animated ? "logo-flag" : undefined}
      />
    </svg>
  );
}
