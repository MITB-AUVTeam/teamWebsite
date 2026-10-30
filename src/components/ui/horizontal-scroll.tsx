import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  /** Left-hand intro pinned in the first viewport of the track. */
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Converts vertical scrolling into a sideways glide: the section pins and its
 * track slides left by exactly its overflow. Below md (and with reduced motion)
 * it falls back to a native horizontal scroller.
 */
export function HorizontalScroll({ intro, children, className }: HorizontalScrollProps) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);

  useLayoutEffect(() => {
    const onResize = () => setWide(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Re-measure whenever the layout switches, since the track element changes.
  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [wide, reduced]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  const pinned = wide && !reduced;

  if (!pinned) {
    return (
      <section ref={section} className={cn("relative py-24", className)}>
        {intro && <div className="mx-auto max-w-7xl px-5 sm:px-8 mb-10">{intro}</div>}
        <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:px-8 pb-4">{children}</div>
      </section>
    );
  }

  return (
    <section ref={section} className={cn("relative", className)} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-stretch gap-6 pl-8 pr-[8vw] lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {intro && <div className="flex w-[34vw] max-w-[520px] shrink-0 flex-col justify-center pr-10">{intro}</div>}
          {children}
        </motion.div>
        <div className="mx-auto mt-12 h-px w-[min(80rem,calc(100%-4rem))] bg-white/10">
          <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-tone" />
        </div>
      </div>
    </section>
  );
}
