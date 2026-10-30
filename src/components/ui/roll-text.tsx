import { cn } from "@/lib/utils";

/**
 * Text that rolls up to a duplicate of itself on hover of the nearest `group`
 * ancestor. Purely CSS; screen readers get the text once.
 */
export function RollText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("relative inline-flex overflow-hidden align-top", className)}>
      <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
