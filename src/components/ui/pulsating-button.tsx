import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  pulseColor?: string;
  duration?: string;
}

const PulsatingButton = React.forwardRef<HTMLButtonElement, PulsatingButtonProps>(
  (
    {
      className,
      asChild = false,
      pulseColor = "rgba(6, 182, 212, 0.45)", // Muted cyan glow to match AUV team Website branding
      duration = "1.5s",
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <>
        <style>{`
          @keyframes magicui-pulse {
            0%, 100% {
              box-shadow: 0 0 0 0 var(--pulse-color);
            }
            50% {
              box-shadow: 0 0 0 8px var(--pulse-color);
            }
          }
          .animate-magicui-pulse {
            animation: magicui-pulse var(--duration, 1.5s) infinite;
          }
        `}</style>
        <Comp
          className={cn(
            "relative text-center cursor-pointer flex justify-center items-center text-white bg-cyan-600 hover:bg-cyan-500 font-medium px-6 py-3 rounded-xl transition-all duration-300 animate-magicui-pulse",
            className
          )}
          style={
            {
              "--pulse-color": pulseColor,
              "--duration": duration,
            } as React.CSSProperties
          }
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      </>
    );
  }
);

PulsatingButton.displayName = "PulsatingButton";

export { PulsatingButton };
