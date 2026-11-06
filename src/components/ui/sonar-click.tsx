import { useEffect, useState } from "react";

interface Ping {
  id: number;
  x: number;
  y: number;
}

/**
 * Every click sends out a small sonar ping: two rings that spread from the pointer
 * and fade. Purely decorative, so it never takes pointer events, and it stays off
 * for reduced motion.
 */
export function SonarClick() {
  const [pings, setPings] = useState<Ping[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const ping = { id: ++id, x: e.clientX, y: e.clientY };
      // Keep only the last few so rapid clicking never piles up nodes
      setPings((p) => [...p.slice(-4), ping]);
      window.setTimeout(() => setPings((p) => p.filter((q) => q.id !== ping.id)), 900);
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100000]">
      {pings.map((p) => (
        <span key={p.id} className="absolute" style={{ left: p.x, top: p.y }}>
          <span className="sonar-ring absolute -left-6 -top-6 h-12 w-12 rounded-full border border-tone/70" />
          <span className="sonar-ring absolute -left-6 -top-6 h-12 w-12 rounded-full border border-tone/40 [animation-delay:120ms]" />
        </span>
      ))}
    </div>
  );
}
