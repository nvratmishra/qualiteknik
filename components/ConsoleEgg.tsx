"use client";

import { useEffect } from "react";

/**
 * An easter egg for anyone who opens devtools — which, on a site selling ML
 * engineering, is a decent proxy for the audience worth talking to.
 *
 * The riff belongs next to the universal approximation theorem on /about:
 * "sufficiently dense" is the theorem's own language, so the joke is load
 * bearing rather than decorative.
 *
 * Kept out of the page itself on purpose. The site's voice is deliberately
 * sober; the wit is better earned than announced.
 */
export function ConsoleEgg() {
  useEffect(() => {
    const dim = "color:#8d929a;font-family:ui-monospace,monospace;font-size:11px";
    const quote = "color:#e2593a;font-style:italic;font-size:13px";
    const body = "color:#ecebe6;font-size:13px";

    // eslint-disable-next-line no-console
    console.log(
      `%cTHEN%c\n%c“There are things known and unknown, and in between are the Doors.”%c\n  — Jim Morrison\n\n%cNOW%c\n%c“There are things known and unknown, and in between is a sufficiently dense neural network.”%c\n  — the universal approximation theorem, roughly\n\n%cWe measure the in-between.  ·  qualiteknik.online`,
      dim,
      "",
      quote,
      dim,
      dim,
      "",
      quote,
      dim,
      body,
    );
  }, []);

  return null;
}
