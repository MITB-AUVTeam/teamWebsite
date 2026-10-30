import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export type DivePhase = "idle" | "cover" | "reveal";

interface DiveTransitionProps {
  phase: DivePhase;
  label: string;
  fromDepth: number;
  toDepth: number;
  /** Fires once the screen is fully covered; swap the page here. */
  onCovered: () => void;
  onDone: () => void;
}

const EASE = [0.76, 0, 0.24, 1] as const;
const COVER = 0.55;
const REVEAL = 0.8;
const BUBBLES = [8, 19, 27, 41, 55, 63, 74, 88];

/** Gentle wave used for both water edges, so the panel reads as a body of water. */
function Wave({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 60" preserveAspectRatio="none" className={className}>
      <path d="M0 30 C 240 0 480 60 720 30 S 1200 0 1440 30 V60 H0 Z" fill="#020617" />
      <path d="M0 30 C 240 0 480 60 720 30 S 1200 0 1440 30" fill="none" stroke="var(--t1)" strokeOpacity="0.6" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Route change as a dive: dark water rises over the old page, the depth readout
 * counts down to the next page's depth, then the water drains upward to reveal it.
 */
export function DiveTransition({ phase, label, fromDepth, toDepth, onCovered, onDone }: DiveTransitionProps) {
  const readout = useRef<HTMLSpanElement>(null);

  // Count the depth across the whole dive (cover and reveal), writing straight to the DOM
  const diving = phase !== "idle";
  useEffect(() => {
    if (!diving) return;
    window.dispatchEvent(new Event("auv:dive"));
    const total = (COVER + REVEAL) * 1000;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);
      if (readout.current) readout.current.textContent = Math.round(fromDepth + (toDepth - fromDepth) * eased).toString().padStart(3, "0");
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [diving]); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "idle") return null;
  const descending = toDepth >= fromDepth;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-auto fixed inset-0 z-[99999] will-change-transform"
      initial={{ y: "105%" }}
      animate={{ y: phase === "cover" ? "0%" : "-110%" }}
      transition={{ duration: phase === "cover" ? COVER : REVEAL, ease: EASE, delay: phase === "reveal" ? 0.15 : 0 }}
      onAnimationComplete={() => (phase === "cover" ? onCovered() : onDone())}
    >
      <Wave className="absolute bottom-full left-0 h-10 w-full md:h-14" />
      <Wave className="absolute left-0 top-full h-10 w-full rotate-180 md:h-14" />

      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#020617]">
        <div className="holo-grid absolute inset-0 opacity-40" />
        {BUBBLES.map((left, i) => (
          <span
            key={left}
            className="dive-bubble absolute bottom-0 rounded-full border border-tone/40"
            style={{ left: `${left}%`, width: 4 + (i % 3) * 4, height: 4 + (i % 3) * 4, animationDelay: `${(i % 4) * 0.12}s` }}
          />
        ))}

        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-tone/70">
          {descending ? "Descending to" : "Ascending to"}
        </p>
        <p className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-white md:text-7xl">{label}</p>
        <p className="mt-6 font-mono text-sm tabular-nums text-tone-soft">
          <span ref={readout}>{String(fromDepth).padStart(3, "0")}</span>
          <span className="text-slate-500"> m</span>
        </p>
        <span className="mt-6 h-px w-40 overflow-hidden bg-white/10">
          <span className="dive-bar block h-full w-full origin-left bg-tone" />
        </span>
      </div>
    </motion.div>
  );
}
