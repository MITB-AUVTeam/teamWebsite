import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { featured } from "@/components/gallery/data";

// Frame sizes and vertical offsets, cycled, so the strip reads like a contact sheet.
const SHAPES = [
  "h-[64vh] w-[46vw] self-start",
  "h-[46vh] w-[30vw] self-end",
  "h-[56vh] w-[26vw] self-center",
  "h-[60vh] w-[44vw] self-end",
];

const pad = (n: number) => String(n).padStart(3, "0");

/**
 * Opening field log: on wide screens the section pins and the frames slide past
 * sideways as you scroll, each photo panning inside its window. On touch and
 * small screens it becomes a native swipeable strip.
 */
export function FeatureReel({ onOpen }: { onOpen: (index: number) => void }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024,
  );

  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pinned = wide && !prefersReducedMotion();

  useGSAP(
    () => {
      const el = track.current;
      if (!pinned || !el) return;
      const q = gsap.utils.selector(root);
      const distance = () => el.scrollWidth - window.innerWidth;

      const slide = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          // The page is a flex column, where GSAP would otherwise skip the spacer.
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const frame = Math.min(
              featured.length,
              Math.max(
                1,
                Math.round(self.progress * (featured.length - 1)) + 1,
              ),
            );
            // Text changes cost a layout pass; only write when the frame number moves.
            const label = String(frame).padStart(2, "0");
            if (counter.current && counter.current.textContent !== label)
              counter.current.textContent = label;
            if (bar.current)
              bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // Each photo pans inside its frame, and the backdrop word lags behind the track.
      q(".fr-img").forEach((img: HTMLElement) => {
        gsap.fromTo(
          img,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: slide,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
      gsap.to(q(".fr-word"), {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
        },
      });
      gsap.from(q(".fr-frame"), {
        y: 80,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1.4,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    },
    { scope: root, dependencies: [pinned], revertOnUpdate: true },
  );

  const intro = (
    <div
      className={cn(
        "flex shrink-0 flex-col justify-center",
        pinned
          ? "w-[34vw] pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-12"
          : "mb-8 px-5 sm:px-8",
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300/80">{`Field log // ${pad(featured.length)} frames`}</p>
      <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white md:text-6xl xl:text-7xl">
        Selected{" "}
        <span className="font-serif font-normal italic text-water">
          frames.
        </span>
      </h2>
      <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-400">
        The moments that made the season, from the first dive in a campus pool
        to the team village at RoboSub.
      </p>
      {pinned && (
        <div className="mt-10 flex items-center gap-4 font-mono text-xs text-slate-400">
          <span className="tabular-nums text-white">
            <span ref={counter}>01</span>
            <span className="text-slate-500">
              {" "}
              / {String(featured.length).padStart(2, "0")}
            </span>
          </span>
          <span className="relative h-px w-40 overflow-hidden bg-white/15">
            <span
              ref={bar}
              className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-cyan-300 to-blue-500"
            />
          </span>
          <span className="uppercase tracking-[0.2em]">Scroll</span>
        </div>
      )}
    </div>
  );

  const frames = featured.map((f, i) => (
    <figure
      key={f.src}
      className={cn(
        "fr-frame group relative shrink-0",
        pinned ? SHAPES[i % SHAPES.length] : "w-[78vw] snap-center sm:w-[56vw]",
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(i)}
        aria-label={`Open: ${f.alt}`}
        data-cursor="View"
        className={cn(
          "hud-lock relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone",
          pinned ? "h-full" : "aspect-[4/5]",
        )}
      >
        <img
          src={f.src}
          alt={f.alt}
          loading="lazy"
          className={cn(
            "fr-img absolute inset-0 h-full object-cover transition-[filter] duration-700 group-hover:brightness-110",
            pinned ? "-left-[12%] w-[124%] max-w-none" : "w-full",
          )}
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
        <span className="pointer-events-none absolute left-4 top-4 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-200/90">
          FRM {pad(i + 1)}
        </span>
      </button>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span className="text-white">{f.caption}</span>
        <span className="text-slate-500">{f.place}</span>
      </figcaption>
    </figure>
  ));

  if (!pinned) {
    return (
      <section ref={root} className="relative pt-16 md:pt-24">
        {intro}
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8"
        >
          {frames}
        </div>
      </section>
    );
  }

  return (
    <div>
      <section ref={root} className="relative h-screen overflow-hidden">
        <span
          aria-hidden="true"
          className="fr-word pointer-events-none absolute bottom-[6vh] left-[20vw] select-none whitespace-nowrap text-[22vw] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(125,211,252,0.12)]"
        >
          Field log 2026
        </span>
        <div
          ref={track}
          className="relative flex h-full items-stretch gap-10 py-[14vh] pr-[10vw] will-change-transform"
        >
          {intro}
          {frames}
        </div>
      </section>
    </div>
  );
}
