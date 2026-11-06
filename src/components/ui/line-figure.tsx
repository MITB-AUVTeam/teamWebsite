import type { ComponentType, CSSProperties } from "react";
import type { HairlineProps } from "@lucasmarkes/hairline/react";
import { cn } from "@/lib/utils";

interface LineFigureProps {
  /** A Hairline figure, e.g. `Patch` or `Terminal` from "@lucasmarkes/hairline/react". */
  figure: ComponentType<HairlineProps>;
  label: string;
  /** The surface the figure sits on; plates are filled, so this must match it. */
  plate?: string;
  intensity?: number;
  /** Walk through the figure on its own until the pointer arrives. */
  play?: boolean;
  className?: string;
}

/**
 * An isometric line drawing that answers the pointer, inked in the page tone so it
 * reads as a schematic of the work rather than an illustration.
 */
export function LineFigure({ figure: Figure, label, plate = "#030712", intensity = 0.6, play = true, className }: LineFigureProps) {
  const style = {
    "--hairline-plate": plate,
    "--hairline-hi": "var(--t1)",
    "--hairline-edge": "#94a3b8",
    "--hairline-mid": "#475569",
    "--hairline-lo": "#1e293b",
    "--hairline-stroke": "1",
  } as CSSProperties;

  return (
    <div style={style} className={cn("w-full", className)}>
      <Figure theme="dark" intensity={intensity} play={play} label={label} />
    </div>
  );
}
