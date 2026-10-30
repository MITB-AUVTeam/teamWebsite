import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CrewMember } from "./types";

/** Member links (LinkedIn, GitHub, email) as round icon buttons; `labelled` adds the network name. */
export function CrewLinks({ member, labelled = false, className }: { member: CrewMember; labelled?: boolean; className?: string }) {
  const social = member.social ?? {};
  const links = [
    { icon: Linkedin, label: "LinkedIn", href: social.linkedin },
    { icon: Github, label: "GitHub", href: social.github },
    { icon: Mail, label: "Email", href: social.email },
  ].filter((l): l is typeof l & { href: string } => Boolean(l.href));
  if (!links.length) return null;

  return (
    <div className={cn("flex shrink-0 flex-wrap items-center gap-1.5", className)}>
      {links.map(({ icon: Icon, label, href }) => {
        const url = href.startsWith("http") || href.startsWith("mailto:") ? href : `https://${href}`;
        return (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on ${label}`}
            className={cn(
              "flex items-center justify-center gap-2 rounded-full border border-white/10 text-slate-400 transition-colors duration-300 hover:border-cyan-300/60 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
              labelled ? "h-10 px-4 font-mono text-[11px] uppercase tracking-[0.18em]" : "h-8 w-8",
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {labelled && label}
          </a>
        );
      })}
    </div>
  );
}
