import { cn } from "@/lib/utils";
import { resolveTeamImage } from "@/lib/team-images";

// Vite inlines the small placeholder SVG as a data URI, so compare against the resolved value
const PLACEHOLDER = resolveTeamImage("src/assets/Personal_photo/placeholder.svg");

/** True for crew members whose portrait hasn't been taken yet. */
export const isPlaceholder = (src: string) => src === PLACEHOLDER || /placeholder/i.test(src);

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && w.length > 1)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/**
 * Stand-in for a missing portrait: the member's initials on a sonar plate, so an
 * empty photo still looks like part of the site instead of a grey silhouette.
 */
export function NoPhoto({ name, decorative, className }: { name: string; decorative?: boolean; className?: string }) {
  return (
    <div
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": `${name}, portrait coming soon` })}
      className={cn("absolute inset-0 overflow-hidden [container-type:size] bg-[radial-gradient(120%_90%_at_50%_35%,color-mix(in_srgb,var(--t1)_14%,#020617),#020617)]", className)}
    >
      <span aria-hidden="true" className="holo-grid absolute inset-0 opacity-60" />
      <span aria-hidden="true" className="absolute left-1/2 top-[44%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-tone/15" />
      <span aria-hidden="true" className="absolute left-1/2 top-[44%] aspect-square w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-tone/20" />
      <span aria-hidden="true" className="absolute left-1/2 top-[44%] aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-tone/30 motion-safe:animate-ping [animation-duration:3s]" />
      <span aria-hidden="true" className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 font-serif text-[26cqw] italic leading-none text-white/90">
        {initials(name)}
      </span>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-[14%] text-center font-mono text-[11px] uppercase tracking-[0.3em] text-tone/70">
        Portrait pending
      </span>
    </div>
  );
}
