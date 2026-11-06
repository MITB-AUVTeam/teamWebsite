import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { NEXT_MISSION } from "@/lib/mission";

const FOUNDED = new Date("2025-01-01T00:00:00+05:30");

const LAST_MISSION = { name: "RoboSub 2026", detail: "Jul 11–17 · California, USA" };

const pad = (n: number, width = 2) => String(n).padStart(width, "0");

/**
 * Live mission telemetry: days in operation, the time at base, the last and
 * next competition. Ticks once a second by writing text directly, so the page
 * never re-renders for it, and stops while off screen.
 */
export function TelemetryStrip({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const days = useRef<HTMLSpanElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const countdown = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const target = NEXT_MISSION.date ? new Date(NEXT_MISSION.date).getTime() : null;

    const tick = () => {
      const now = Date.now();
      if (days.current) days.current.textContent = Math.floor((now - FOUNDED.getTime()) / 86_400_000).toLocaleString("en-IN");
      if (clock.current) clock.current.textContent = time.format(now);
      if (countdown.current && target) {
        const left = Math.max(0, target - now) / 1000;
        countdown.current.textContent = `${pad(Math.floor(left / 86400), 3)}d ${pad(Math.floor((left % 86400) / 3600))}h ${pad(Math.floor((left % 3600) / 60))}m ${pad(Math.floor(left % 60))}s`;
      }
    };

    let id = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(id);
      if (entry.isIntersecting) {
        tick();
        id = window.setInterval(tick, 1000);
      }
    });
    if (root.current) io.observe(root.current);
    tick();
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);

  const cells = [
    { label: "Days in operation", value: <span ref={days} className="tabular-nums">—</span>, note: "Since January 2025" },
    { label: "Base time · IST", value: <span ref={clock} className="tabular-nums">--:--:--</span>, note: "MIT Bengaluru" },
    { label: "Last mission", value: LAST_MISSION.name, note: LAST_MISSION.detail },
    {
      label: "Next mission",
      value: NEXT_MISSION.date ? <span ref={countdown} className="tabular-nums">—</span> : NEXT_MISSION.name,
      note: NEXT_MISSION.date ? NEXT_MISSION.name : NEXT_MISSION.place,
      live: true,
    },
  ];

  return (
    <div ref={root} className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/60", className)}>
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-slate-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        Live telemetry
        <span className="ml-auto text-slate-500">IST · UTC+5:30</span>
      </div>
      <dl data-gsap="batch" className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {cells.map((c) => (
          <div key={c.label} className="flex flex-col gap-2 px-5 py-6 sm:border-white/[0.06] sm:[&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0">
            <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">{c.label}</dt>
            <dd className={cn("text-2xl font-semibold tracking-[-0.03em] md:text-3xl", c.live ? "text-tone-soft" : "text-white")}>{c.value}</dd>
            <dd className="text-sm text-slate-400">{c.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
