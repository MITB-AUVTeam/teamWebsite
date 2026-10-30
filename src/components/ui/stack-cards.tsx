import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

function StackCard({
  children,
  index,
  total,
  progress,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card shrinks and dims slightly as the cards after it stack on top.
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index) * 0.04]);
  const dim = useTransform(progress, [start, 1], [0, (total - index - 1) * 0.12]);

  return (
    <div className="sticky top-28 md:top-32" style={{ paddingTop: index * 18 }}>
      <motion.div style={{ scale }} className="relative origin-top overflow-hidden rounded-3xl border border-white/10 bg-[#071330]">
        {children}
        <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-[#020617]" />
      </motion.div>
    </div>
  );
}

/** Cards that pin and pile up on each other as you scroll, the earlier ones receding. */
export function StackCards({ items, className }: { items: ReactNode[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // On phones a card is taller than the screen, so the next one would cover it mid-read.
  const [narrow] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  if (reduced || narrow) {
    return (
      <div ref={ref} className={cn("flex flex-col gap-6", className)}>
        {items.map((item, i) => (
          <div key={i} className="overflow-hidden rounded-3xl border border-white/10 bg-[#071330]">{item}</div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative flex flex-col gap-[30vh] pb-[10vh]", className)}>
      {items.map((item, i) => (
        <StackCard key={i} index={i} total={items.length} progress={scrollYProgress}>
          {item}
        </StackCard>
      ))}
    </div>
  );
}
