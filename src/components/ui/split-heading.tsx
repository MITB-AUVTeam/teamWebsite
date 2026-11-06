import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/ui/scramble-text";

interface SplitHeadingProps {
  text: string;
  /** Trailing words set in the italic serif accent. */
  accent?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  /** The accent (gradient) words also decrypt from random glyphs as they rise. */
  scramble?: boolean;
}

/** Headline whose words rise out of a mask one after another. */
export function SplitHeading({ text, accent, className, as = "h2", delay = 0, scramble = false }: SplitHeadingProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ").map((w) => ({ w, accent: false }));
  const firstAccent = words.length;
  if (accent) words.push(...accent.split(" ").map((w) => ({ w, accent: true })));

  return (
    <Tag
      className={cn("tracking-tight text-white", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={[text, accent].filter(Boolean).join(" ")}
    >
      {words.map(({ w, accent: isAccent }, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.2em] -mb-[0.2em] pr-[0.16em] -mr-[0.16em] align-bottom">
          <motion.span
            className={cn("inline-block", isAccent && "font-serif italic font-normal text-water")}
            variants={{
              hidden: reduced ? { y: 0 } : { y: "110%" },
              show: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {scramble && isAccent ? <ScrambleText text={w} stable speed={55} delay={(i - firstAccent) * 90} /> : w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
