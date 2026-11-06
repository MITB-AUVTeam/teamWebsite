import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { LineFigure } from "@/components/ui/line-figure";
import { Phosphor } from "@lucasmarkes/hairline/react";

export interface ScanPoint {
  /** Position on the photo, in percent of its width / height. */
  x: number;
  y: number;
  system: string;
  label: string;
  detail: string;
}

export interface VehicleScanData {
  /** Width / height of the photo, so the hotspots stay pinned to the hardware. */
  aspect: number;
  points: ScanPoint[];
}

/**
 * Systems scan: the vehicle photo stays stuck in view while a scan line sweeps
 * over it, and each subsystem in the list locks a callout onto the hardware as
 * it scrolls through the middle of the screen. Tapping a row does the same.
 */
export function VehicleScan({ name, image, scan }: { name: string; image: string; scan: VehicleScanData }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const idOf = (p: ScanPoint) => `${name}-${p.system}`.toLowerCase();

  // The Vehicles page asks for a subsystem (from the Home subsystem cards): light it up
  useEffect(() => {
    const onFocus = (e: Event) => {
      const i = scan.points.findIndex((p) => idOf(p) === (e as CustomEvent<string>).detail);
      if (i >= 0) setActive(i);
    };
    window.addEventListener("auv:focus-system", onFocus);
    return () => window.removeEventListener("auv:focus-system", onFocus);
  }, [scan.points]); // eslint-disable-line react-hooks/exhaustive-deps

  useGSAP(
    () => {
      const el = root.current!;
      gsap.utils.toArray<HTMLElement>(".vs-item", el).forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          end: "bottom 62%",
          onToggle: ({ isActive }) => isActive && setActive(i),
        });
      });
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        ".vs-scan",
        { yPercent: 0 },
        { yPercent: 100, ease: "none", scrollTrigger: { trigger: el, start: "top 40%", end: "bottom 60%", scrub: 0.6 } },
      );
      gsap.from(".vs-frame", { scale: 0.92, autoAlpha: 0, duration: 1.4, scrollTrigger: { trigger: el, start: "top 80%", once: true } });
      gsap.from(".vs-item", {
        x: 40,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1,
        scrollTrigger: { trigger: ".vs-list", start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  const point = scan.points[active];

  return (
    <div ref={root} className="relative mt-20 md:mt-28">
      <div className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tone shadow-[0_0_8px_var(--t1)]" />
        Systems scan // {name}
        <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        <span className="tabular-nums text-slate-500">
          {String(active + 1).padStart(2, "0")}/{String(scan.points.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        {/* Photo with hotspots: sticks while the subsystem list scrolls past */}
        <div className="sticky top-0 z-10 self-start bg-[#030712] pb-4 pt-[72px] lg:top-28 lg:col-span-8 lg:bg-transparent lg:pb-0 lg:pt-0">
          <div
            className="vs-frame relative overflow-hidden rounded-2xl border border-tone/15 md:rounded-3xl"
            style={{ aspectRatio: scan.aspect }}
          >
            <img src={image} alt={`${name}, annotated`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-[#020617]/45" />
            <div aria-hidden="true" className="holo-grid absolute inset-0 opacity-60" />

            {/* Scan line travels top to bottom with the scroll */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="vs-scan absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-16 -translate-y-full bg-gradient-to-b from-transparent to-tone/15" />
                <div className="absolute inset-x-0 top-0 h-px bg-tone shadow-[0_0_14px_2px_var(--t1)]" />
              </div>
            </div>

            {scan.points.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.system}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`${p.system}: ${p.label}`}
                  className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full border transition duration-300",
                      on ? "scale-100 border-tone opacity-100" : "scale-50 border-white/40 opacity-60",
                    )}
                  />
                  {on && <span className="absolute inset-0 animate-ping rounded-full border border-tone/60" />}
                  <span
                    className={cn(
                      "absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500",
                      on ? "bg-tone shadow-[0_0_12px_var(--t1)]" : "bg-white/70",
                    )}
                  />
                </button>
              );
            })}

            {/* Callout for the active subsystem */}
            {point && (
              <div
                key={active}
                aria-hidden="true"
                className="vs-callout pointer-events-none absolute flex items-center"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: point.x > 55 ? "translate(calc(-100% - 20px), -50%)" : "translate(20px, -50%)",
                  flexDirection: point.x > 55 ? "row-reverse" : "row",
                }}
              >
                <span className="h-px w-8 bg-tone md:w-14" style={{ transformOrigin: point.x > 55 ? "right" : "left" }} />
                <span className="whitespace-nowrap rounded-md border border-tone/40 bg-[#020617]/90 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-tone-soft shadow-[0_0_18px_-4px_var(--t1)] md:text-xs">
                  {point.label}
                </span>
              </div>
            )}

            <div aria-hidden="true" className="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50 md:bottom-4 md:left-4">
              {name} · {point?.system}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
        {/* Sonar display: a phosphor screen that keeps a fading trail wherever the pointer paints */}
        <div className="hidden pt-[6vh] lg:block">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400">
            <span>Sonar // live</span>
            <span className="text-tone/80">Paint it</span>
          </div>
          <LineFigure figure={Phosphor} label="A phosphor dot matrix that keeps a fading trail where the pointer paints" intensity={0.8} className="mt-3" />
        </div>
        <ol className="vs-list lg:py-[12vh]">
          {scan.points.map((p, i) => {
            const on = i === active;
            return (
              <li key={p.system} id={idOf(p)} className="vs-item flex min-h-[38vh] items-center lg:min-h-[46vh]">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full border-l py-2 pl-6 text-left transition duration-300",
                    on ? "border-tone opacity-100" : "border-white/10 opacity-60 hover:opacity-90",
                  )}
                >
                  <span className={cn("font-mono text-xs tabular-nums transition-colors duration-500", on ? "text-tone" : "text-slate-500")}>
                    {String(i + 1).padStart(2, "0")} — {p.system}
                  </span>
                  <span className="mt-3 block text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">{p.label}</span>
                  <span className="mt-3 block max-w-md text-base leading-relaxed text-slate-400">{p.detail}</span>
                </button>
              </li>
            );
          })}
        </ol>
        </div>
      </div>
    </div>
  );
}
