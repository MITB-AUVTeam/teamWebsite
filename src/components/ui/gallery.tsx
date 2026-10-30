import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const imageModules = import.meta.glob<{ default: string }>("../../assets/Gallery/*.{webp,png,jpg,jpeg}", { eager: true });
const allImages = Object.values(imageModules).map((mod) => mod.default);

function Row({ images, x, className }: { images: string[]; x: MotionValue<string>; className?: string }) {
  return (
    <motion.div style={{ x }} className={cn("flex w-max gap-4 md:gap-6", className)}>
      {images.map((src, i) => (
        <div
          key={src}
          className={cn(
            "group relative h-[200px] shrink-0 overflow-hidden rounded-2xl bg-white/[0.04] md:h-[320px]",
            i % 3 === 0 ? "w-[300px] md:w-[480px]" : "w-[220px] md:w-[340px]",
          )}
        >
          <img
            src={src}
            alt="Team AUV at work"
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        </div>
      ))}
    </motion.div>
  );
}

/**
 * Two rows of photos that slide in opposite directions as the section scrolls
 * past. Fourteen photos are picked at random from the gallery on each visit.
 */
export function PhotoGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [picks] = useState(() => [...allImages].sort(() => Math.random() - 0.5).slice(0, 14));
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], reduced ? ["-10%", "-10%"] : ["0%", "-22%"]);
  const right = useTransform(scrollYProgress, [0, 1], reduced ? ["-20%", "-20%"] : ["-30%", "-8%"]);

  return (
    <div ref={ref} className="flex flex-col gap-4 overflow-hidden md:gap-6" aria-label="Photos from the team" role="group">
      <Row images={picks.slice(0, 7)} x={left} />
      <Row images={picks.slice(7, 14)} x={right} />
    </div>
  );
}
