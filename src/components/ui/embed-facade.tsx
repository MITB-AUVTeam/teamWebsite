import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmbedFacadeProps {
  /** Accessible name for the placeholder button, e.g. "Play video". */
  label: string;
  /** What shows until the visitor asks for the embed. */
  preview: ReactNode;
  /** The real third-party embed, rendered only after a click. */
  render: () => ReactNode;
  className?: string;
}

/**
 * Click-to-load placeholder for third-party embeds (YouTube, Google Maps). The
 * page stays fast and nothing from Google loads, so no trackers and no
 * blocked-request errors, until the visitor actually wants the embed.
 */
export function EmbedFacade({ label, preview, render, className }: EmbedFacadeProps) {
  const [loaded, setLoaded] = useState(false);
  if (loaded) return <>{render()}</>;
  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={label}
      data-cursor="Load"
      className={cn("group relative block h-full w-full overflow-hidden text-left", className)}
    >
      {preview}
    </button>
  );
}
