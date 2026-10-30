import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds before the animation starts. */
  delay?: number;
  /** Distance in px the element rises from. */
  y?: number;
  as?: "div" | "section" | "li" | "article";
}

/** Fades and lifts its content into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Reveals each direct child in turn. */
export function Stagger({
  children,
  className,
  itemClassName,
  step = 0.08,
}: {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  step?: number;
}) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, i) => (
        <Reveal key={i} delay={i * step} className={cn(itemClassName)}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
