import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/section-heading";
import { SplitHeading } from "@/components/ui/split-heading";
import { Reveal } from "@/components/ui/reveal";
import { ScrambleText } from "@/components/ui/scramble-text";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  /** Trailing words set in the italic serif accent. */
  accent?: string;
  description?: ReactNode;
  /** Slot under the description: buttons, stats, filters. */
  children?: ReactNode;
  /** Decrypt the headline's gradient accent words from random glyphs (on by default). */
  scramble?: boolean;
  className?: string;
}

/**
 * Page header: drifting light over a blueprint grid, a sonar scope that turns as you
 * scroll, a word-reveal headline and an intro that settles onto a glinting hairline.
 */
export function PageHeader({ eyebrow, title, accent, description, children, scramble = true, className }: PageHeaderProps) {
  const root = useRef<HTMLElement>(null);

  // GSAP: the hairline draws in, then the whole intro sinks and dims as you scroll past.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".ph-rule", { scaleX: 0, transformOrigin: "left", duration: 1.8, delay: 0.4 });
      // Sweep, aurora and glint loops rest once the header has scrolled away
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive }) => root.current?.classList.toggle("fx-paused", !isActive),
      });
      gsap.from(".ph-radar", { scale: 0.6, rotate: -90, autoAlpha: 0, duration: 2, delay: 0.3 });
      gsap.to(".ph-radar", {
        rotate: 120,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to(".ph-inner", {
        yPercent: 18,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to(".aurora", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    },
    { scope: root },
  );

  return (
    <header ref={root} className={cn("relative isolate w-full overflow-hidden", className)}>
      <div aria-hidden="true" className="aurora pointer-events-none absolute left-1/2 -top-40 -z-10 -ml-[min(550px,80vw)] h-[520px] w-[min(1100px,160vw)]" />
      <div aria-hidden="true" className="holo-grid pointer-events-none absolute inset-0 -z-10" />

      {/* Sonar scope with a live sector readout */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[-6rem] top-24 -z-10 hidden h-[26rem] w-[26rem] select-none lg:block xl:right-[2rem]">
        <div className="ph-radar absolute inset-0 rounded-full border border-cyan-300/15">
          <div className="absolute inset-[18%] rounded-full border border-dashed border-cyan-300/15" />
          <div className="absolute inset-[38%] rounded-full border border-cyan-300/10" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-300/10" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-300/10" />
          <div className="sonar-sweep absolute inset-0 rounded-full opacity-70" />
          <span className="hud-blink absolute left-[68%] top-[30%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
        </div>
        <div className="absolute -bottom-6 right-12 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-200/60">
          <ScrambleText text={`Sector // ${eyebrow}`} />
        </div>
      </div>

      <div className="ph-inner mx-auto max-w-7xl px-5 sm:px-8 pt-28 sm:pt-32 md:pt-36 pb-14 md:pb-20">
        <Reveal>
          <Eyebrow className="mb-8">{eyebrow}</Eyebrow>
        </Reveal>
        <SplitHeading
          as="h1"
          text={title}
          accent={accent}
          scramble={scramble}
          className="max-w-5xl text-[2.9rem] leading-[0.98] sm:text-7xl md:text-8xl lg:text-[7.5rem] font-semibold tracking-[-0.04em]"
        />
        {(description || children) && (
          <div className="mt-10 md:mt-14 grid gap-8 md:grid-cols-12">
            {description && (
              <Reveal delay={0.25} className="md:col-span-8 lg:col-span-7">
                <div className="text-lg md:text-xl leading-relaxed text-slate-400">{description}</div>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.35} className="md:col-span-12">
                {children}
              </Reveal>
            )}
          </div>
        )}
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="ph-rule relative h-px w-full overflow-hidden bg-gradient-to-r from-transparent via-white/15 to-transparent">
          <span className="rule-glint absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        </div>
      </div>
    </header>
  );
}
