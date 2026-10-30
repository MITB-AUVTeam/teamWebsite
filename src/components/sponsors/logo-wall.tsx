import { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export interface LogoWallItem {
  name: string;
  logo: string;
  href?: string;
  /** Per-logo scale tweak; the source PNGs carry different amounts of padding. */
  logoClass?: string;
  /** Overrides logoClass in the wall's short tiles, for artwork that already fills its canvas. */
  wallClass?: string;
  /** Show the logo on a light tile (for dark artwork). */
  lightPlate?: boolean;
}

/**
 * Hairline grid of partner logos. GSAP: cells flip up into place from the
 * centre outwards, and each logo floats toward the cursor while hovered.
 */
export function LogoWall({ items, className }: { items: LogoWallItem[]; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".lw-cell", {
        rotateX: -80,
        yPercent: 30,
        scale: 0.85,
        autoAlpha: 0,
        transformOrigin: "50% 100%",
        duration: 1.4,
        ease: "expo.out",
        stagger: { each: 0.1, from: "center", grid: "auto" },
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
      gsap.from(".lw-frame", { autoAlpha: 0, duration: 1, scrollTrigger: { trigger: root.current, start: "top 85%", once: true } });

      if (!window.matchMedia("(pointer: fine)").matches) return;
      const cleanups: (() => void)[] = [];
      gsap.utils.toArray<HTMLElement>(".lw-link").forEach((cell) => {
        const logo = cell.querySelector<HTMLElement>(".lw-logo");
        if (!logo) return;
        const x = gsap.quickTo(logo, "x", { duration: 0.8, ease: "power3.out" });
        const y = gsap.quickTo(logo, "y", { duration: 0.8, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = cell.getBoundingClientRect();
          x(((e.clientX - r.left) / r.width - 0.5) * 22);
          y(((e.clientY - r.top) / r.height - 0.5) * 16);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        cell.addEventListener("pointermove", move);
        cell.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          cell.removeEventListener("pointermove", move);
          cell.removeEventListener("pointerleave", leave);
        });
      });
      return () => cleanups.forEach((c) => c());
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cn("[perspective:1200px]", className)}>
      <div className="lw-frame overflow-hidden rounded-2xl border border-white/10">
        <ul className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-5">
          {items.map((item, i) => {
            const Cell = item.href ? "a" : "div";
            return (
              <li
                key={item.name}
                className={cn("lw-cell bg-[#030b1f]", i === items.length - 1 && items.length % 2 === 1 && "col-span-2 md:col-span-1")}
              >
                <Cell
                  {...(item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  data-cursor={item.href ? "Visit" : undefined}
                  className="lw-link group flex h-full flex-col items-center justify-between gap-4 px-6 pb-6 pt-8 transition-colors duration-500 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-tone"
                >
                  <div className={cn("flex h-24 w-full items-center justify-center overflow-hidden rounded-xl", item.lightPlate && "bg-white/90")}>
                    <span className="lw-logo flex h-full w-full items-center justify-center">
                      <img
                        src={item.logo}
                        alt=""
                        loading="lazy"
                        className={cn(
                          "max-h-full max-w-[80%] object-contain opacity-80 transition-opacity duration-500 group-hover:opacity-100",
                          item.wallClass ?? item.logoClass,
                        )}
                      />
                    </span>
                  </div>
                  <span className="text-center font-mono text-xs text-slate-400 transition-colors duration-300 group-hover:text-white">{item.name}</span>
                </Cell>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
