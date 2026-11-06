import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface SponsorRowProps {
  index: number;
  name: string;
  logo: string;
  logoClass?: string;
  /** Sit the logo on a light plate (for dark artwork that vanishes on the dark page). */
  lightPlate?: boolean;
  href?: string;
  /** Short label for what they provide, e.g. "Simulation software". */
  role: string;
  description: string;
}

/**
 * Numbered list row: index, logo plate, then role, name and the full description.
 * GSAP: the hairline draws across, the number counts up, the logo plate wipes
 * open and the text rises in behind it.
 */
export function SponsorRow({ index, name, logo, logoClass, lightPlate, href, role, description }: SponsorRowProps) {
  const root = useRef<HTMLElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const label = String(index + 1).padStart(2, "0");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
      const counter = { v: 0 };
      tl.from(".sr-rule", { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "power3.inOut" })
        .to(
          counter,
          {
            v: index + 1,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => {
              if (number.current) number.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
            },
          },
          0.2,
        )
        .from(".sr-plate", { clipPath: "inset(0 100% 0 0 round 16px)", duration: 1.4 }, 0.3)
        .from(".sr-plate img", { scale: 1.35, duration: 1.8 }, 0.3)
        .from(".sr-text > *", { y: 40, autoAlpha: 0, stagger: 0.08, duration: 1.2 }, 0.45);
    },
    { scope: root },
  );

  const Title = href ? "a" : "span";
  return (
    <article ref={root} className="group relative grid gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14">
      <span aria-hidden="true" className="sr-rule absolute inset-x-0 top-0 h-px bg-white/10" />
      <span ref={number} className="font-mono text-sm tabular-nums text-slate-500 md:col-span-1">{label}</span>

      <div
        className={cn(
          "sr-plate flex h-36 items-center justify-center overflow-hidden rounded-2xl border md:col-span-4 md:h-44",
          lightPlate ? "border-white/10 bg-white/90" : "border-white/10 bg-white/[0.03]",
        )}
      >
        <img
          src={logo}
          alt={`${name} logo`}
          loading="lazy"
          className={cn("max-h-[70%] max-w-[70%] object-contain transition-transform duration-700 group-hover:scale-[1.04]", logoClass)}
        />
      </div>

      <div className="sr-text md:col-span-7">
        <p className="mb-3 font-mono text-xs text-slate-400">{role}</p>
        <h3 className="mb-4 text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
          <Title
            {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-start gap-2 rounded-sm transition-colors hover:text-tone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone"
          >
            {name}
            {href && <ArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 text-slate-500 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tone" />}
          </Title>
        </h3>
        <p className="max-w-xl text-base leading-relaxed text-slate-400">{description}</p>
      </div>
    </article>
  );
}
