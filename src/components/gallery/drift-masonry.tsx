import { useEffect, useMemo, useRef, useState } from "react";
import { Play } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { categoryLabel, isVideo, thumbOf, type GalleryItem } from "@/components/gallery/data";

// How far (px) each column drifts across the scroll; alternating so neighbours shear apart.
const DRIFT = [-40, 50, -70, 30];

function useColumnCount() {
  const get = () => (typeof window === "undefined" ? 4 : window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2);
  const [count, setCount] = useState(get);
  useEffect(() => {
    const onResize = () => setCount(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return count;
}

interface DriftMasonryProps {
  items: GalleryItem[];
  /** Global frame number for each item, so tiles keep their label across filters. */
  frameOf: (item: GalleryItem) => number;
  onOpen: (item: GalleryItem) => void;
  /** Changes whenever the visible set changes, to replay the reveal. */
  revealKey: string;
}

/**
 * Archive wall: photos dealt into balanced columns that drift at different
 * speeds while you scroll (md and up). Tiles wipe open from below as they enter.
 */
export function DriftMasonry({ items, frameOf, onOpen, revealKey }: DriftMasonryProps) {
  const root = useRef<HTMLDivElement>(null);
  const count = useColumnCount();
  const columns = useMemo(() => {
    // Each photo goes to the currently shortest column, so the wall ends evenly.
    const cols: GalleryItem[][] = Array.from({ length: count }, () => []);
    const heights = new Array<number>(count).fill(0);
    items.forEach((item) => {
      const c = heights.indexOf(Math.min(...heights));
      cols[c].push(item);
      heights[c] += item.ratio + 0.05;
    });
    return cols;
  }, [items, count]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);

      const tiles = q(".dm-tile") as HTMLElement[];
      // Transform and opacity only: dozens of tiles can rise at once without repainting.
      gsap.set(tiles, { autoAlpha: 0, y: 60, scale: 0.94 });
      ScrollTrigger.batch(tiles, {
        start: "top 94%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.06, ease: "expo.out" }),
      });

      if (count > 2) {
        q(".dm-col").forEach((col: HTMLElement, i: number) => {
          const d = DRIFT[i % DRIFT.length];
          gsap.fromTo(
            col,
            { y: -d },
            { y: d, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.9 } },
          );
        });
      }
      // Scroll speed shears the wall: a fast flick tilts the columns, then they spring
      // back upright. The skew eases toward zero on its own once scrolling stops.
      const cols = q(".dm-col") as HTMLElement[];
      const skew = { v: 0 };
      const setSkew = gsap.quickSetter(cols, "skewY", "deg");
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-3.5, 3.5, self.getVelocity() / -450);
          if (Math.abs(v) > Math.abs(skew.v)) {
            skew.v = v;
            gsap.to(skew, { v: 0, duration: 0.9, ease: "power3.out", overwrite: true, onUpdate: () => setSkew(skew.v) });
          }
        },
      });

      // Every tile reserves its height up front (aspect-ratio from the data), so lazy
      // images arriving mid-scroll never move anything; one refresh here is enough.
      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [revealKey, count], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="flex items-start gap-3 sm:gap-4 md:pb-8 md:pt-20">
      {columns.map((col, c) => (
        <div key={c} className="dm-col flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
          {col.map((item) => {
            const frame = `FRM ${String(frameOf(item)).padStart(3, "0")}`;
            if (isVideo(item.src)) {
              return (
                <figure key={item.src} className="dm-tile relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <video src={item.src} controls preload="metadata" aria-label={item.alt} style={{ aspectRatio: `1 / ${item.ratio}` }} className="w-full bg-black object-cover" />
                  <figcaption className="flex items-center gap-2 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">
                    <Play className="h-3 w-3 text-cyan-300" /> {`${frame} // Clip`}
                  </figcaption>
                </figure>
              );
            }
            return (
              <button
                key={item.src}
                type="button"
                onClick={() => onOpen(item)}
                aria-label={`Open: ${item.alt}`}
                data-cursor="View"
                className="dm-tile hud-lock group relative block w-full overflow-hidden rounded-2xl bg-white/[0.06] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone"
              >
                {/* A light sweeps the empty frame until the photo arrives */}
                <span aria-hidden="true" className="dm-shimmer pointer-events-none absolute inset-0" />
                <img
                  ref={(img) => {
                    if (img?.complete) img.dataset.loaded = "";
                  }}
                  onLoad={(e) => (e.currentTarget.dataset.loaded = "")}
                  src={thumbOf(item.src)}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: `1 / ${item.ratio}` }}
                  className="dm-img relative block w-full object-cover transition-[transform,filter,opacity] duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:brightness-110"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/85 via-[#020617]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4">
                  <span>{frame}</span>
                  <span className="text-slate-300">{categoryLabel[item.category]}</span>
                </span>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 text-xs text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-4 sm:text-sm">
                  {item.alt}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
