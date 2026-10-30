import { useRef } from "react";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { VehicleScan, type VehicleScanData } from "./vehicle-scan";

export interface Vehicle {
  name: string;
  tagline: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  scan?: VehicleScanData;
}

/**
 * One vehicle as an editorial chapter, staged with GSAP: the giant name's
 * letters drift in from scattered positions and assemble as the chapter
 * scrolls up, the photo wipes open, and each spec row draws its hairline.
 */
export function VehicleChapter({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const root = useRef<HTMLElement>(null);
  const flip = index % 2 === 1;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = root.current!;

      // Name: letters scatter → assemble, scrubbed with the scroll
      const split = SplitText.create(el.querySelector(".vc-name")!, { type: "chars" });
      gsap.from(split.chars, {
        x: () => gsap.utils.random(-160, 160),
        y: () => gsap.utils.random(-120, 120),
        rotate: () => gsap.utils.random(-50, 50),
        autoAlpha: 0,
        stagger: { each: 0.03, from: "random" },
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", end: "top 30%", scrub: 0.8 },
      });
      gsap.from(".vc-kicker", { y: 20, autoAlpha: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 80%", once: true } });

      // Ghost index numeral slides across behind the chapter
      gsap.fromTo(
        ".vc-ghost",
        { xPercent: flip ? -30 : 30 },
        { xPercent: flip ? 10 : -10, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 } },
      );

      // Photo: directional wipe with a settling zoom
      const photo = el.querySelector(".vc-photo");
      gsap.fromTo(
        photo,
        { clipPath: flip ? "inset(0% 0% 0% 100% round 24px)" : "inset(0% 100% 0% 0% round 24px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          ease: "none",
          scrollTrigger: { trigger: photo, start: "top 90%", end: "top 35%", scrub: 0.8 },
        },
      );
      gsap.fromTo(".vc-photo-inner", { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: photo, start: "top 90%", end: "top 35%", scrub: 0.8 } });

      // Spec rows: hairline draws, then label and value slide in
      gsap.utils.toArray<HTMLElement>(".vc-row", el).forEach((row, i) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 92%", once: true }, delay: (i % 4) * 0.05 });
        tl.from(row.querySelector(".vc-rule"), { scaleX: 0, transformOrigin: "left", duration: 1, ease: "expo.inOut" })
          .from(row.querySelector("dt"), { x: -24, autoAlpha: 0, duration: 0.9 }, 0.25)
          .from(row.querySelector("dd"), { x: 24, autoAlpha: 0, duration: 0.9 }, 0.3);
      });

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id={vehicle.name.toLowerCase()}
      aria-labelledby={`${vehicle.name}-title`}
      className="relative scroll-mt-28 py-24 md:py-36 border-t border-white/10 first:border-t-0"
    >
      <span
        aria-hidden="true"
        className={cn(
          "vc-ghost pointer-events-none absolute top-10 -z-10 select-none text-[40vw] md:text-[26vw] font-semibold leading-none tracking-[-0.06em] text-white/[0.025]",
          flip ? "left-0" : "right-0",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="mb-12 md:mb-16 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="vc-kicker mb-4 font-mono text-sm text-slate-400">
            <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-3 inline-block h-px w-8 align-middle bg-white/20" />
            {vehicle.tagline}
          </p>
          <h2
            id={`${vehicle.name}-title`}
            className="text-6xl sm:text-7xl md:text-[8.5rem] font-semibold leading-[0.9] tracking-[-0.05em] text-white"
          >
            <span className="vc-name inline-block">{vehicle.name}</span>
            <span className="text-tone">.</span>
          </h2>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className={cn("vc-photo overflow-hidden rounded-3xl lg:col-span-7", flip && "lg:order-2")}>
          <div className="vc-photo-inner">
            <ParallaxImage src={vehicle.image} alt={vehicle.name} className="aspect-[4/3] rounded-none" strength={10} />
          </div>
        </div>

        <div className={cn("lg:col-span-5 flex flex-col", flip && "lg:order-1")}>
          <p data-gsap="lines" className="text-xl md:text-2xl leading-relaxed text-slate-400">{vehicle.description}</p>
          <div className="mt-10">
            <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-slate-400">Specifications</h3>
            <dl className="border-b border-white/10">
              {vehicle.specs.map((spec) => (
                <div key={spec.label} className="vc-row relative grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-4 py-3.5 text-sm">
                  <span aria-hidden="true" className="vc-rule absolute inset-x-0 top-0 h-px bg-white/10" />
                  <dt className="text-slate-400">{spec.label}</dt>
                  <dd className="text-right text-white">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {vehicle.scan && <VehicleScan name={vehicle.name} image={vehicle.image} scan={vehicle.scan} />}
    </section>
  );
}
