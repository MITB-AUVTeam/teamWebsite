import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CrewLinks } from "./crew-links";
import { NoPhoto, isPlaceholder } from "./no-photo";
import type { CrewMember } from "./types";

interface CrewCardProps {
  member: CrewMember;
  code: string;
  onOpen: (trigger: HTMLElement) => void;
  /** Short group name ("Mechanical", "Current Leadership"), shown in the hover preview. */
  group?: string;
}

/** Stagger slot for a preview line; the delay itself lives in TEAM_CSS. */
const slot = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Hover / keyboard-focus preview over the photo: a scan line sweeps down while
 * the file's lines rise in. Only rendered visible on fine-pointer screens from
 * md up (see TEAM_CSS); touch keeps tap-to-open. Decorative, since the button
 * and the dossier carry the same details for assistive tech.
 */
function CrewPeek({ member, group }: Pick<CrewCardProps, "member" | "group">) {
  const skills = member.skills?.slice(0, 4) ?? [];
  const rows = [
    { k: "Unit", v: group },
    { k: "Branch", v: member.department },
  ].filter((r) => r.v);
  let i = 0;

  return (
    <div aria-hidden="true" className="cm-peek pointer-events-none absolute inset-0 flex-col justify-end overflow-hidden bg-gradient-to-t from-[#020617] from-30% via-[#020617]/75 to-transparent p-3">
      <span className="cm-peek-sweep absolute inset-0 border-b border-cyan-300/60 bg-gradient-to-b from-transparent via-transparent to-cyan-300/15" />
      {["left-2 top-2 border-l border-t", "right-2 bottom-2 border-b border-r"].map((c) => (
        <span key={c} className={`absolute h-4 w-4 border-cyan-300/60 ${c}`} />
      ))}

      <p style={slot(i++)} className="cm-peek-line flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-200/70">
        <span className="h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_6px_#67e8f9]" />
        Dossier // preview
      </p>
      <p style={slot(i++)} className="cm-peek-line mt-2 text-sm font-medium leading-snug text-white">{member.role}</p>

      {rows.length > 0 && (
        <dl className="mt-2.5 space-y-1.5 border-t border-white/[0.08] pt-2.5 font-mono text-[11px]">
          {rows.map((r) => (
            <div key={r.k} style={slot(i++)} className="cm-peek-line flex gap-2">
              <dt className="w-12 shrink-0 uppercase tracking-[0.18em] text-slate-500">{r.k}</dt>
              <dd className="line-clamp-2 font-sans text-[11px] leading-snug text-slate-200">{r.v}</dd>
            </div>
          ))}
        </dl>
      )}

      {skills.length > 0 && (
        <ul style={slot(i++)} className="cm-peek-line mt-2.5 flex flex-wrap gap-1.5">
          {skills.map((s) => (
            <li key={s} className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-100">
              {s}
            </li>
          ))}
        </ul>
      )}

      <p style={slot(i++)} className="cm-peek-line mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-300">Open file →</p>
    </div>
  );
}

/**
 * ID-badge card. The name is a button stretched over the whole card (opens the
 * dossier); social links sit above it so they stay separately clickable.
 */
export function CrewCard({ member, code, onOpen, group }: CrewCardProps) {
  return (
    <article className="cm-card hud-lock group relative flex flex-col rounded-[1.25rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-2 transition-colors duration-500 hover:border-cyan-300/30">
      <div className="cm-shot relative aspect-[4/5] overflow-hidden rounded-[0.9rem] bg-white/[0.04]">
        {isPlaceholder(member.image) ? (
          <NoPhoto name={member.name} decorative />
        ) : (
          <img
            src={member.image}
            alt=""
            loading="lazy"
            className="cm-img absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_sepia(0.3)_hue-rotate(165deg)_saturate(1.5)_contrast(1.06)_brightness(0.9)] group-hover:[filter:none] transition-[filter,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
        {/* Scan line passes over the photo on hover */}
        <span aria-hidden="true" className="cm-scan pointer-events-none absolute inset-x-0 top-0 h-16 -translate-y-full bg-gradient-to-b from-transparent via-cyan-300/25 to-transparent opacity-0 group-hover:opacity-100" />
        <CrewPeek member={member} group={group} />
        <span className="absolute left-2.5 top-2.5 rounded-md border border-white/10 bg-[#020617]/85 px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-cyan-100/90">
          {code}
        </span>
        <span aria-hidden="true" className="absolute right-3 top-3.5 h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7]" />
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <p className="font-mono text-[11px] uppercase leading-snug tracking-[0.16em] text-cyan-300/80">{member.role}</p>
        <h4 className="mt-1.5 text-base font-semibold leading-tight tracking-[-0.02em] text-white sm:text-lg">
          <button
            type="button"
            onClick={(e) => onOpen(e.currentTarget)}
            className="text-left after:absolute after:inset-0 after:z-[1] after:rounded-[1.25rem] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-cyan-300"
          >
            {member.name}
            <span className="sr-only">, open dossier</span>
          </button>
        </h4>
        {member.department && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{member.department}</p>}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <CrewLinks member={member} className="relative z-[2]" />
          <span
            aria-hidden="true"
            className={cn(
              "ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition duration-300",
              "group-hover:rotate-45 group-hover:border-cyan-300 group-hover:bg-cyan-300 group-hover:text-slate-950",
            )}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

/** Wide spotlight for a group's lead: portrait beside the details and quote. */
export function CrewSpotlight({ member, code, onOpen }: CrewCardProps) {
  return (
    <article className="cm-spot hud-lock group relative grid overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-gradient-to-br from-cyan-400/[0.07] via-white/[0.02] to-transparent p-2 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="cm-shot relative aspect-[4/5] overflow-hidden rounded-[1.1rem] bg-white/[0.04] sm:aspect-auto sm:min-h-[22rem]">
        {isPlaceholder(member.image) ? (
          <NoPhoto name={member.name} decorative />
        ) : (
          <img
            src={member.image}
            alt=""
            loading="lazy"
            className="cm-img absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_sepia(0.3)_hue-rotate(165deg)_saturate(1.5)_contrast(1.06)_brightness(0.9)] group-hover:[filter:none] transition-[filter] duration-700"
          />
        )}
        <span aria-hidden="true" className="cm-scan pointer-events-none absolute inset-x-0 top-0 h-20 -translate-y-full bg-gradient-to-b from-transparent via-cyan-300/25 to-transparent opacity-0 group-hover:opacity-100" />
      </div>

      <div className="relative flex flex-col justify-between gap-8 p-5 sm:p-8 md:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute right-6 top-6 h-28 w-28 rounded-full border border-cyan-300/15 md:h-36 md:w-36">
          <div className="absolute inset-[22%] rounded-full border border-dashed border-cyan-300/15" />
          <div className="cm-radar absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(103,232,249,0.25),transparent_70deg)]" />
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-200/80">
          <span className="rounded-full border border-cyan-300/30 bg-cyan-300/[0.06] px-3 py-1 text-cyan-200">Spotlight</span>
          {code}
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">{member.role}</p>
          <h4 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
            <button
              type="button"
              onClick={(e) => onOpen(e.currentTarget)}
              className="text-left after:absolute after:inset-0 after:z-[1] after:rounded-[1.5rem] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-cyan-300"
            >
              {member.name}
              <span className="sr-only">, open dossier</span>
            </button>
          </h4>
          {member.department && <p className="mt-3 text-sm text-slate-400 md:text-base">{member.department}</p>}
          {member.bio?.trim() && (
            <p className="mt-6 max-w-lg font-serif text-2xl italic leading-snug text-slate-200 md:text-3xl">“{member.bio}”</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <CrewLinks member={member} className="relative z-[2]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 transition-colors group-hover:text-cyan-200">
            Open dossier →
          </span>
        </div>
      </div>
    </article>
  );
}
