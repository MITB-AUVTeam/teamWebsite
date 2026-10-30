import { useEffect, useRef } from "react";
import { ScrambleText } from "@/components/ui/scramble-text";

const SYSTEMS = ["Sonar", "Nav lock", "Vision", "Thrusters"];

/**
 * Heads-up display laid over the hero: targeting brackets, live telemetry that
 * ticks like an onboard readout, and system status lights. Purely decorative.
 * Values are written straight to the DOM so the hero never re-renders.
 */
export function HeroHud() {
  const heading = useRef<HTMLSpanElement>(null);
  const depth = useRef<HTMLSpanElement>(null);
  const temp = useRef<HTMLSpanElement>(null);
  const clock = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const id = window.setInterval(() => {
      t += 1;
      if (heading.current) heading.current.textContent = String(Math.round(214 + Math.sin(t / 9) * 6)).padStart(3, "0");
      if (depth.current) depth.current.textContent = (4.2 + Math.sin(t / 14) * 0.35).toFixed(2);
      if (temp.current) temp.current.textContent = (24.6 + Math.sin(t / 21) * 0.2).toFixed(1);
      if (clock.current) clock.current.textContent = new Date().toISOString().slice(11, 19);
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div aria-hidden="true" className="h-hud pointer-events-none absolute inset-0 z-[7] select-none font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200/70">
      {/* Targeting brackets */}
      <div className="hud-frame absolute inset-4 hidden sm:inset-6 md:block md:inset-10 md:top-24">
        <span className="hud-corner left-0 top-0 border-l border-t" />
        <span className="hud-corner right-0 top-0 border-r border-t" />
        <span className="hud-corner bottom-0 left-0 border-b border-l" />
        <span className="hud-corner bottom-0 right-0 border-b border-r" />
      </div>

      {/* Horizontal scan */}
      <div className="hud-scan absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent shadow-[0_0_18px_2px_rgba(103,232,249,0.35)]" />

      {/* Telemetry, bottom left */}
      <div className="hud-panel absolute bottom-24 left-6 hidden flex-col gap-1.5 md:flex md:left-14">
        <div className="mb-1 flex items-center gap-2 text-cyan-300">
          <span className="hud-blink h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
          <ScrambleText text="Telemetry // live" />
        </div>
        <Row label="Lat">12.9716 N</Row>
        <Row label="Lon">77.5946 E</Row>
        <Row label="Hdg"><span ref={heading}>214</span>&deg;</Row>
        <Row label="Depth"><span ref={depth}>4.20</span> m</Row>
        <Row label="Temp"><span ref={temp}>24.6</span> &deg;C</Row>
        <Row label="UTC"><span ref={clock}>00:00:00</span></Row>
      </div>

      {/* Systems, bottom right */}
      <div className="hud-panel absolute bottom-24 right-6 hidden flex-col items-end gap-1.5 md:flex md:right-14 xl:right-28">
        <div className="mb-1 text-cyan-300">
          <ScrambleText text="Systems // nominal" />
        </div>
        {SYSTEMS.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <span className="text-slate-400">{s}</span>
            <span className="flex gap-0.5">
              {Array.from({ length: 6 }, (_, j) => (
                <span key={j} className="hud-bar h-2 w-1 bg-cyan-300/70" style={{ animationDelay: `${(i * 6 + j) * 90}ms` }} />
              ))}
            </span>
          </div>
        ))}
      </div>

      {/* Top strip */}
      <div className="hud-panel absolute left-1/2 top-24 hidden -translate-x-1/2 items-center gap-4 text-slate-400 md:flex">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/50" />
        <ScrambleText text="AUV-MITB // Mission 02 // Autonomous" />
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-300/50" />
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 tabular-nums">
      <span className="w-12 text-slate-500">{label}</span>
      <span className="text-cyan-100">{children}</span>
    </div>
  );
}
