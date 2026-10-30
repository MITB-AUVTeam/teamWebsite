import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { NEXT_MISSION } from "@/lib/mission";

export interface Milestone {
  date: string;
  title: string;
  description: string;
}

export interface MilestoneYear {
  year: string;
  events: Milestone[];
}

/**
 * Year-grouped timeline: the year sits sticky on the left while its entries
 * scroll past on a rail that GSAP draws in as you read. Each dot fills and
 * pulses as the line reaches it.
 */
export function MilestoneTimeline({ data }: { data: MilestoneYear[] }) {
  return (
    <div className="space-y-20 md:space-y-28">
      {data.map((block) => (
        <YearBlock key={block.year} block={block} />
      ))}
      <UpNext />
    </div>
  );
}

function YearBlock({ block }: { block: MilestoneYear }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const list = root.current?.querySelector("ol");

      // Year digits roll up one by one
      gsap.from(".tl-digit", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.3,
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
      gsap.from(".tl-count", { autoAlpha: 0, y: 12, duration: 1, delay: 0.4, scrollTrigger: { trigger: root.current, start: "top 80%", once: true } });

      // Rail draws with the scroll
      gsap.fromTo(
        ".tl-fill",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 60%", scrub: 0.8 } },
      );

      // Each entry slides in; its dot lights up when the rail gets there
      gsap.utils.toArray<HTMLElement>(".tl-item", root.current).forEach((item) => {
        gsap.from(item.querySelectorAll(".tl-text > *"), {
          x: 40,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%", once: true },
        });
        const dot = item.querySelector(".tl-dot");
        gsap.fromTo(
          dot,
          { scale: 0.4, backgroundColor: "#020617" },
          {
            scale: 1,
            backgroundColor: "#7dd3fc",
            boxShadow: "0 0 0 6px rgba(125,211,252,0.15)",
            duration: 0.6,
            ease: "back.out(3)",
            scrollTrigger: { trigger: item, start: "top 62%", toggleActions: "play none none reverse" },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-4">
        <div className="md:sticky md:top-32">
          <p className="flex overflow-hidden text-6xl md:text-8xl font-semibold tracking-[-0.05em] text-white" aria-label={block.year}>
            {block.year.split("").map((d, i) => (
              <span key={i} aria-hidden="true" className="tl-digit inline-block">
                {d}
              </span>
            ))}
          </p>
          <p className="tl-count mt-3 font-mono text-xs text-slate-400">{block.events.length} milestones</p>
        </div>
      </div>

      <ol className="relative md:col-span-8">
        <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-white/10" />
        <span aria-hidden="true" className="tl-fill absolute left-[5px] top-2 bottom-2 w-px origin-top bg-tone" />
        {block.events.map((event) => (
          <li key={event.title} className="tl-item relative pl-10 pb-12 last:pb-0">
            <span aria-hidden="true" className="tl-dot absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-tone bg-[#020617]" />
            <div className="tl-text">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-400">{event.date}</p>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">{event.title}</h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-400">{event.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Open end of the rail: the next mission, still ahead, so the story doesn't stop at the last entry. */
function UpNext() {
  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-8 md:col-start-5">
        <div className="relative pl-10">
          <span aria-hidden="true" className="absolute -top-20 left-[5px] h-20 w-px bg-gradient-to-b from-white/10 to-tone/60 md:-top-28 md:h-28" />
          <span aria-hidden="true" className="absolute left-0 top-1.5 h-[11px] w-[11px]">
            <span className="absolute inset-0 rounded-full bg-tone/60 motion-safe:animate-ping" />
            <span className="absolute inset-0 rounded-full border border-tone bg-[#020617]" />
          </span>
          <p className="font-mono text-xs uppercase tracking-wider text-tone">Up next · {NEXT_MISSION.place}</p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
            {NEXT_MISSION.name}
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-400">
            The lessons from Irvine are already going into the next dive.
          </p>
        </div>
      </div>
    </div>
  );
}
