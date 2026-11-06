import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export interface SocialLink {
  title: string;
  href: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}

/** Row of channel cards, each a single link with a hover arrow. Revealed by GsapPageFx (data-gsap="batch"). */
export function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <div data-gsap="batch" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {links.map(({ title, href, subtitle, description, icon: Icon }) => {
        const external = /^https?:/.test(href);
        return (
          <SpotlightCard key={title} className="h-full">
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex h-full flex-col p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-tone rounded-2xl"
            >
              <div className="mb-6 flex items-center justify-between sm:mb-10">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10">
                  <Icon className="h-5 w-5 text-tone" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-slate-500 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tone" />
              </div>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{title}</h3>
              <p className="mb-3 font-mono text-xs text-slate-400">{subtitle}</p>
              <p className="text-sm leading-relaxed text-slate-400">{description}</p>
            </a>
          </SpotlightCard>
        );
      })}
    </div>
  );
}
