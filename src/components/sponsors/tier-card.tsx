import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { PillButton } from "@/components/ui/pill-button";

export interface PartnershipTier {
  name: string;
  /** HUD depth label shown above the name, e.g. "0–200 m". */
  depth: string;
  tagline: string;
  /** Shown as "Everything in <includes>, plus" above the benefits. */
  includes?: string;
  benefits: string[];
  /** Draws the card with a tone border to mark it out. */
  featured?: boolean;
}

interface TierCardProps extends PartnershipTier {
  index: number;
  total: number;
  /** Where the "Let's talk" button goes. */
  to: string;
}

/**
 * One partnership tier: a depth gauge that fills further with each tier,
 * the tier name, what it includes and a "Let's talk" button.
 */
export function TierCard({ index, total, name, depth, tagline, includes, benefits, featured, to }: TierCardProps) {
  const fill = (index + 1) / total;
  return (
    <SpotlightCard className={cn("h-full", featured && "border-tone/30 hover:border-tone/50")}>
      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="mb-8 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
          <span>Tier {String(index + 1).padStart(2, "0")}</span>
          <span className="text-tone">{depth}</span>
        </div>

        {/* Depth gauge: deeper tiers fill more of the bar (transform only). */}
        <div aria-hidden="true" className="mb-8 h-px w-full overflow-hidden bg-white/10">
          <div
            className="h-full w-full origin-left bg-gradient-to-r from-tone-soft to-tone"
            style={{ transform: `scaleX(${fill})` }}
          />
        </div>

        <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">{name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{tagline}</p>

        <div className="mt-8 flex-1 border-t border-white/10 pt-6">
          {includes && (
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
              Everything in {includes}, plus
            </p>
          )}
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-tone" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <PillButton to={to} variant={featured ? "solid" : "ghost"} className="w-full">
            Let's talk
          </PillButton>
        </div>
      </div>
    </SpotlightCard>
  );
}
