import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface VelocityMarqueeProps {
  items: string[];
  /** Base drift in percent of one copy per second. */
  speed?: number;
  className?: string;
}

/**
 * Oversized text band that drifts on its own and speeds up (or reverses)
 * with scroll velocity. Words alternate between solid and outlined.
 */
export function VelocityMarquee({ items, speed = 2, className }: VelocityMarqueeProps) {
  const reduced = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = direction.current * speed * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = 1;
    else if (f > 0) direction.current = -1;
    move += direction.current * Math.abs(f) * speed * (delta / 1000);
    base.set(base.get() + move);
  });

  const row = (copy: number) =>
    items.map((item, i) => (
      <span key={`${copy}-${i}`} className="flex items-center">
        <span
          className={cn(
            "px-6 md:px-10",
            i % 2 === 1 && "font-serif italic font-normal text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]",
          )}
        >
          {item}
        </span>
        <span className="h-2 w-2 rounded-full bg-tone/70" />
      </span>
    ));

  return (
    <div className={cn("overflow-hidden whitespace-nowrap select-none", className)} aria-hidden="true">
      <motion.div className="flex w-max text-5xl md:text-8xl font-semibold tracking-tight text-white/90" style={{ x }}>
        {row(0)}
        {row(1)}
      </motion.div>
    </div>
  );
}
