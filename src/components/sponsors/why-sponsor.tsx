import type { ComponentType, ReactNode } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export interface SponsorFact {
  value: ReactNode;
  label: string;
}

export interface SponsorReason {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
}

/** "Why sponsor us": a HUD strip of team facts, then the reasons to partner. */
export function WhySponsor({ facts, reasons }: { facts: SponsorFact[]; reasons: SponsorReason[] }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        eyebrow="Why sponsor us"
        title="A young team,"
        accent="already in the water."
        description="Back a student team that designs, builds and competes with its own autonomous underwater vehicles, hull to code."
      />

      <dl data-gsap="batch" className="mb-16 grid grid-cols-2 border-l border-t border-white/10 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="flex min-w-0 flex-col-reverse gap-3 border-b border-r border-white/10 p-5 sm:p-7">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">{f.label}</dt>
            <dd className="break-words text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div data-gsap="batch" className="grid gap-4 md:grid-cols-3">
        {reasons.map(({ icon: Icon, title, body }) => (
          <SpotlightCard key={title} className="h-full">
            <div className="flex h-full flex-col p-7">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-white/10">
                <Icon className="h-5 w-5 text-tone" />
              </div>
              <h3 className="mb-3 text-xl font-semibold tracking-[-0.02em] text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{body}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
