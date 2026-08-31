/**
 * The Qualiteknik mark — a polygon approximating a circle, one vertex outside
 * tolerance.
 *
 * The ring is the target: a continuous function. The form inscribed in it is
 * the approximation — the oldest picture of approximation there is (Archimedes
 * bounding π with polygons), and the same picture a ReLU network draws, its
 * output being piecewise linear. One vertex breaks through the ring and
 * returns, and that flagged excursion is the Q's tail.
 *
 * Two cuts of the same mark, because one drawing cannot serve both sizes:
 *
 *   detailed  — 13 units, visible neurons, dashed target and control limits.
 *               The full statement. Needs ~120px or more to read.
 *   simple    — 7 units, one solid ring, heavier stroke. Survives 32px in a
 *               header, where the detailed cut collapses into a lumpy blob.
 *
 * This is the normal way identities work, not a compromise: the detail is
 * spent where there are pixels to spend it on.
 */

const CX = 32;
const CY = 32;

type Cut = { n: number; r: number; tailR: number; start: number; jitter: number };

const SIMPLE: Cut = { n: 7, r: 19.5, tailR: 30.5, start: 50, jitter: 0 };
const DETAILED: Cut = { n: 13, r: 19.2, tailR: 31, start: 50, jitter: 0.95 };

type Pt = { x: number; y: number; tail: boolean };

function build(c: Cut): { pts: Pt[]; path: string } {
  const pts: Pt[] = Array.from({ length: c.n }, (_, i) => {
    const deg = c.start + (i / c.n) * 360;
    const a = (deg * Math.PI) / 180;
    const tail = i === 0;
    const r = tail ? c.tailR : c.r + c.jitter * Math.sin(i * 2.3);
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a), tail };
  });
  const path =
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") +
    " Z";
  return { pts, path };
}

const CUTS = { simple: build(SIMPLE), detailed: build(DETAILED) };

export function Logo({
  className = "",
  animated = true,
  detailed = false,
}: {
  className?: string;
  animated?: boolean;
  /** Use the full mark. Give it 120px or more. */
  detailed?: boolean;
}) {
  const { pts, path } = detailed ? CUTS.detailed : CUTS.simple;
  const tip = pts[0];

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" role="img" aria-label="Qualiteknik">
      {/* the control limit — only in the full mark */}
      {detailed && (
        <circle
          cx={CX}
          cy={CY}
          r="25"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeDasharray="2 4"
          opacity="0.3"
        />
      )}

      {/* the target function */}
      <circle
        cx={CX}
        cy={CY}
        r={detailed ? DETAILED.r : SIMPLE.r}
        stroke="currentColor"
        strokeWidth={detailed ? 0.9 : 1.3}
        strokeDasharray={detailed ? "1.5 3" : undefined}
        opacity={detailed ? 0.45 : 0.38}
      />

      {/* the approximation */}
      <path
        d={path}
        stroke="var(--signal)"
        strokeWidth={detailed ? 1.7 : 2.6}
        strokeLinejoin="round"
        strokeLinecap="round"
        className={animated ? (detailed ? "logo-trace-long" : "logo-trace") : undefined}
      />

      {/* hidden units */}
      {detailed && (
        <g className={animated ? "logo-nodes" : undefined}>
          {pts.map((p, i) =>
            p.tail ? null : (
              <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="currentColor" opacity="0.7" />
            ),
          )}
        </g>
      )}

      {/* the excursion that left tolerance */}
      <circle
        cx={tip.x}
        cy={tip.y}
        r={detailed ? 2.3 : 3}
        fill="var(--signal)"
        className={animated ? "logo-flag" : undefined}
      />

      {/* μ — the target, only in the full mark */}
      {detailed && <circle cx={CX} cy={CY} r="1.3" fill="currentColor" opacity="0.5" />}
    </svg>
  );
}
