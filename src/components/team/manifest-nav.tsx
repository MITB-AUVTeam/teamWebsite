import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ManifestGroup {
  slug: string;
  label: string;
  count: number;
}

interface ManifestNavProps {
  groups: ManifestGroup[];
  onJump: (slug: string) => void;
  className?: string;
}

/**
 * Sticky crew-manifest bar that sits just under the floating navbar. Scroll-spy
 * marks the group in view with a sliding pill and keeps it visible on narrow screens.
 */
export function ManifestNav({ groups, onJump, className }: ManifestNavProps) {
  const [active, setActive] = useState<string | null>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = groups.map((g) => document.getElementById(g.slug)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [groups]);

  // Keep the active tab in view without moving the page.
  useEffect(() => {
    const el = track.current?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    const box = track.current;
    if (!el || !box) return;
    box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  const activeIndex = groups.findIndex((g) => g.slug === active);

  return (
    <nav aria-label="Team groups" className={cn("sticky top-[84px] z-30 mx-auto w-full max-w-7xl px-3 sm:top-[92px] sm:px-8", className)}>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#030a1f]/95 p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
        <span className="hidden shrink-0 items-center gap-2 pl-3 pr-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/70 lg:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
          Manifest
          <span className="tabular-nums text-slate-500">{activeIndex >= 0 ? String(activeIndex + 1).padStart(2, "0") : "--"}/{String(groups.length).padStart(2, "0")}</span>
        </span>
        <div ref={track} className="no-scrollbar relative flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {groups.map((g) => {
            const isActive = active === g.slug;
            return (
              <a
                key={g.slug}
                data-slug={g.slug}
                href={`#${g.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onJump(g.slug);
                  history.replaceState(null, "", `#${g.slug}`);
                }}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                  isActive ? "text-slate-950" : "text-slate-400 hover:text-white",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="manifest-pill"
                    className="absolute inset-0 rounded-xl bg-cyan-200 shadow-[0_0_24px_rgba(103,232,249,0.35)]"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative">{g.label}</span>
                <span className={cn("relative font-mono text-[10px] tabular-nums", isActive ? "text-slate-700" : "text-slate-500")}>
                  {String(g.count).padStart(2, "0")}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
