import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}

/**
 * Hairline card with a soft light that follows the cursor across its surface
 * and border. The light is pure CSS driven by two custom properties.
 */
export function SpotlightCard({ children, className, as: Tag = "div" }: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref as never}
      onPointerMove={onMove}
      className={cn(
        "group/spot relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] transition-colors duration-500 hover:border-white/[0.14]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--t1) 10%, transparent), transparent 60%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </Tag>
  );
}
