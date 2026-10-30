import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandingMediaProps {
  src: string;
  alt: string;
  /** Word that slides out to the left as the media grows. */
  left: string;
  /** Word that slides out to the right. */
  right: string;
  /** Shown over the media once it fills the screen. */
  children?: ReactNode;
  /** Small content in the first frame (label, scroll cue); fades with the words. */
  kicker?: ReactNode;
  className?: string;
}

/**
 * Pinned scroll scene: a small rounded window of footage sits between two
 * giant words; scrolling grows it to fill the viewport while the words part
 * and fade, then the overlay content rises in.
 */
export function ExpandingMedia({ src, alt, left, right, children, kicker, className }: ExpandingMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const inset = useTransform(scrollYProgress, [0, 0.6], [30, 0]);
  const insetX = useTransform(scrollYProgress, [0, 0.6], [36, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [28, 0]);
  const clipPath = useTransform(
    [inset, insetX, radius] as never,
    ([i, ix, r]: number[]) => `inset(${i}% ${ix}% ${i}% ${ix}% round ${r}px)`,
  );
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1.35, 1]);
  const leftX = useTransform(scrollYProgress, [0, 0.5], ["0vw", "-60vw"]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], ["0vw", "60vw"]);
  const wordsOpacity = useTransform(scrollYProgress, [0.25, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const overlayY = useTransform(scrollYProgress, [0.6, 0.8], [40, 0]);
  const shade = useTransform(scrollYProgress, [0.5, 0.8], [0, 0.55]);

  if (reduced) {
    return (
      <section ref={ref} className={cn("relative h-[80vh] overflow-hidden", className)}>
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#020617]/55" />
        <div className="relative flex h-full items-center justify-center px-5">{children}</div>
      </section>
    );
  }

  return (
    <section ref={ref} className={cn("relative h-[260vh]", className)}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ clipPath }}>
          <motion.img src={src} alt={alt} style={{ scale: imgScale }} className="h-full w-full object-cover" />
          <motion.div className="absolute inset-0 bg-[#020617]" style={{ opacity: shade }} />
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{ opacity: wordsOpacity }}
          className="pointer-events-none relative z-10 flex w-full items-center justify-between px-5 sm:px-10 text-[17vw] md:text-[13vw] font-semibold leading-none tracking-[-0.06em] text-white"
        >
          <motion.span style={{ x: leftX }}>{left}</motion.span>
          <motion.span style={{ x: rightX }} className="font-serif italic font-normal text-water">{right}</motion.span>
        </motion.div>

        {kicker && (
          <motion.div style={{ opacity: wordsOpacity }} className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
            {kicker}
          </motion.div>
        )}

        <motion.div style={{ opacity: overlayOpacity, y: overlayY }} className="absolute inset-0 z-20 flex items-center justify-center px-5">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
