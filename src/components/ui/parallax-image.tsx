import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Total vertical drift as a percentage of the frame height. */
  strength?: number;
}

/**
 * Rounded image frame whose picture drifts slower than the page as you scroll. On first
 * sight the frame opens from a narrow band to full size, like a hatch sliding back.
 */
export function ParallaxImage({ src, alt, className, imgClassName, strength = 12 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength / 2}%`, `${strength / 2}%`]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden rounded-3xl bg-white/[0.03]", className)}
      initial={reduced ? false : { clipPath: "inset(18% 10% 18% 10% round 24px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.3, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={reduced ? undefined : { y, scale: 1 + strength / 100 }}
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </motion.div>
  );
}
