import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  /** Text appended after the number, e.g. "+". */
  suffix?: string;
  /** Number to start from (useful for years). */
  from?: number;
  duration?: number;
  className?: string;
}

/** Counts from `from` to `to` the first time it scrolls into view. Reduced motion shows the final value. */
export function CountUp({ to, suffix = "", from = 0, duration = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(from);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setValue(Math.round(from + (to - from) * eased));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, from, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
