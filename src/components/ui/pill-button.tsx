import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { RollText } from "@/components/ui/roll-text";

interface PillButtonProps {
  children: ReactNode;
  /** Internal route ("/contact") or external URL. */
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  /** Show the trailing arrow (default true). */
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  download?: boolean | string;
  /** Open an internal file (e.g. a PDF) in a new tab; external links always do. */
  newTab?: boolean;
  className?: string;
}

/**
 * The site's one button. Solid is white-on-dark, ghost is a hairline outline;
 * the arrow slides out and back in on hover.
 */
export function PillButton({
  children,
  to,
  href,
  onClick,
  variant = "solid",
  arrow = true,
  type = "button",
  disabled,
  download,
  newTab,
  className,
}: PillButtonProps) {
  const classes = cn(
    "group relative inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone focus-visible:ring-offset-2 focus-visible:ring-offset-abyss disabled:pointer-events-none disabled:opacity-50",
    variant === "solid"
      ? "bg-white text-slate-950 hover:bg-tone-soft"
      : "border border-white/15 text-white hover:border-white/40 hover:bg-white/[0.04]",
    className,
  );

  const content = (
    <>
      {typeof children === "string" ? <RollText>{children}</RollText> : <span>{children}</span>}
      {arrow && (
        <span className="relative h-4 w-4 overflow-hidden" aria-hidden="true">
          <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-4 group-hover:translate-x-4" />
          <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Magnetic>
        <Link to={to} className={classes} onClick={onClick}>
          {content}
        </Link>
      </Magnetic>
    );
  }
  if (href) {
    const external = newTab || /^https?:/.test(href);
    return (
      <Magnetic>
      <a
        href={href}
        className={classes}
        onClick={onClick}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
      </Magnetic>
    );
  }
  return (
    <Magnetic>
      <button type={type} className={classes} onClick={onClick} disabled={disabled}>
        {content}
      </button>
    </Magnetic>
  );
}
