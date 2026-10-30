import { useEffect, useRef } from "react";

/** Metres covered by scrolling one page top to bottom, on top of the page's own depth. */
const PAGE_SPAN = 80;
const TICKS = Array.from({ length: 25 }, (_, i) => i);

/**
 * Fixed vertical depth gauge: each page starts at its own depth on the dive and
 * scrolling adds to it. Desktop (xl+) only. Updates the DOM directly to avoid
 * re-rendering on scroll.
 */
export function DepthGauge({ base = 0 }: { base?: number }) {
  const baseRef = useRef(base);
  baseRef.current = base;
  const markerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const pressureRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The gauge only shows at xl; skip all the scroll work below that.
    const mq = window.matchMedia("(min-width: 1280px)");
    let raf = 0;
    let max = 0;
    let trackH = 0;
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
      trackH = trackRef.current?.offsetHeight ?? 0;
    };
    // Writes only (no layout reads) so scrolling never forces a synchronous reflow.
    const update = () => {
      raf = 0;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const depth = baseRef.current + p * PAGE_SPAN;
      if (markerRef.current) markerRef.current.style.transform = `translate3d(0, ${p * trackH}px, 0) translateY(-50%)`;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
      if (readoutRef.current) readoutRef.current.textContent = depth.toFixed(1).padStart(5, "0");
      if (pressureRef.current) pressureRef.current.textContent = (1 + depth / 10).toFixed(2);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const resizer = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    const start = () => {
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      resizer.observe(document.body);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      window.removeEventListener("scroll", onScroll);
      resizer.disconnect();
    };
    window.addEventListener("auv:depth", onScroll);
    const onMedia = () => (mq.matches ? start() : stop());
    onMedia();
    mq.addEventListener("change", onMedia);
    return () => {
      mq.removeEventListener("change", onMedia);
      window.removeEventListener("auv:depth", onScroll);
      stop();
    };
  }, []);

  // New page, new starting depth: redraw the readout
  useEffect(() => {
    window.dispatchEvent(new Event("auv:depth"));
  }, [base]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-5 top-1/2 z-[60] hidden -translate-y-1/2 select-none flex-col items-end gap-3 font-mono xl:flex"
    >
      <div className="text-right text-[9px] uppercase tracking-[0.3em] text-tone/50">Depth</div>
      <div ref={trackRef} className="relative h-[42vh] w-10">
        <div className="absolute right-0 top-0 h-full w-px bg-tone/10" />
        <div
          ref={fillRef}
          className="absolute right-0 top-0 h-full w-px origin-top bg-gradient-to-b from-tone/0 via-tone/70 to-tone"
          style={{ transform: "scaleY(0)" }}
        />
        {TICKS.map((i) => (
          <div
            key={i}
            className="absolute right-0 h-px bg-tone/25"
            style={{ top: `${(i / (TICKS.length - 1)) * 100}%`, width: i % 4 === 0 ? 14 : 6 }}
          />
        ))}
        {/* Shifted right by half the diamond (4px) minus half the line (0.5px), so the diamond sits centred on the line */}
        <div ref={markerRef} className="absolute -right-[3.5px] top-0 flex items-center gap-1.5" style={{ transform: "translateY(-50%)" }}>
          <span className="whitespace-nowrap rounded-sm border border-tone/30 bg-[#020617]/80 px-1.5 py-0.5 text-[10px] tabular-nums text-tone-soft shadow-[0_0_12px_var(--t1)]">
            <span ref={readoutRef}>000.0</span>m
          </span>
          <span className="h-2 w-2 rotate-45 border border-tone bg-tone/30 shadow-[0_0_10px_var(--t1)]" />
        </div>
      </div>
      <div className="text-right text-[9px] uppercase tracking-[0.2em] text-slate-500">
        <span ref={pressureRef} className="tabular-nums text-tone/70">1.00</span> atm
      </div>
    </div>
  );
}
