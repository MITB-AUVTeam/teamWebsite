import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillButton } from "@/components/ui/pill-button";

/**
 * Recruitment status. When applications open, set `open: true`, fill in `window`
 * (e.g. "Aug 1 – Aug 20, 2027") and put the form link in `applyHref`.
 */
const INTAKE: { open: boolean; window: string | null; applyHref: string | null } = {
  open: false,
  window: null,
  applyHref: null,
};

const CONTACT_EMAIL = "auv.mitblr@manipal.edu";

/** What each sub-team works on, drawn from the vehicles, specs and blogs on this site. */
const SUBTEAMS = [
  { name: "Mechanical", slug: "mechanical", work: "Hull and frame design in SolidWorks, Ansys simulation, pressure testing and 3D-printed parts like the dropper." },
  { name: "Electrical", slug: "electrical", work: "Power distribution boards, battery systems, sensor integration and in-house hydrophones." },
  { name: "Software", slug: "software", work: "ROS2 autonomy, computer vision on the Zed cameras, localisation and path planning." },
  { name: "Management", slug: "management", work: "Sponsorships, outreach, events, and keeping the team running." },
];

/** Recruitment call at the foot of the Team page; `onPick` scrolls to a sub-team's crew. */
export function JoinCrew({ onPick }: { onPick: (slug: string) => void }) {
  const applyHref = INTAKE.applyHref ?? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Joining Team AUV")}`;

  return (
    <section id="join" aria-label="Join the crew" className="scroll-mt-24 mx-auto w-full max-w-7xl px-5 pb-24 pt-28 sm:px-8 md:pb-36 md:pt-40">
      <SectionHeading
        eyebrow="Recruitment"
        title="Join"
        accent="the crew."
        description="We build our vehicles in-house, hull to code, across four sub-teams. If underwater robotics excites you, we'd like to hear from you."
      />

      <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span className={INTAKE.open ? "h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" : "h-2 w-2 rounded-full bg-amber-400/80"} />
        <span className="text-slate-300">
          {INTAKE.open ? `Applications open${INTAKE.window ? ` · ${INTAKE.window}` : ""}` : "Applications closed · next intake to be announced"}
        </span>
      </div>

      <ul data-gsap="batch" className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {SUBTEAMS.map((t, i) => (
          <li key={t.slug} className="bg-[#030712]">
            <a
              href={`#${t.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onPick(t.slug);
              }}
              className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-white/[0.03] md:p-8"
            >
              <span className="flex items-center justify-between font-mono text-xs tabular-nums text-slate-500 transition-colors group-hover:text-tone">
                {String(i + 1).padStart(2, "0")}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:rotate-45 group-hover:text-tone" />
              </span>
              <span className="text-2xl font-semibold tracking-[-0.03em] text-white">{t.name}</span>
              <span className="text-sm leading-relaxed text-slate-400">{t.work}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <PillButton href={applyHref}>{INTAKE.open ? "Apply now" : "Register your interest"}</PillButton>
        <PillButton to="/contact#contact-form" variant="ghost">
          Ask us anything
        </PillButton>
      </div>
    </section>
  );
}
