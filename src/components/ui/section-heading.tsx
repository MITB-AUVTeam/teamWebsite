import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SplitHeading } from "@/components/ui/split-heading";
import { Reveal } from "@/components/ui/reveal";
import { ScrambleText } from "@/components/ui/scramble-text";

/** Small uppercase label with a pinging sonar dot; plain-text labels decrypt into view. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-400", className)}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-tone opacity-60 motion-reduce:hidden" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-tone" />
      </span>
      {typeof children === "string" ? <ScrambleText text={children} /> : children}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Trailing words in the italic serif accent. */
  accent?: string;
  description?: ReactNode;
  align?: "left" | "center";
  /** Right-hand slot on wide screens (a link or button). */
  action?: ReactNode;
  className?: string;
}

/** Eyebrow, word-reveal title and supporting copy for a page section. */
export function SectionHeading({ eyebrow, title, accent, description, align = "left", action, className }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "mb-12 md:mb-16 flex flex-col gap-6",
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", center && "mx-auto")}>
        {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
        <SplitHeading text={title} accent={accent} className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.02]" />
        {description && (
          <Reveal delay={0.15}>
            <div className={cn("mt-5 text-base md:text-lg leading-relaxed text-slate-400", center && "mx-auto max-w-2xl")}>{description}</div>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.2} className="shrink-0">{action}</Reveal>}
    </div>
  );
}
