"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LogoSliderProps {
  logos: React.ReactNode[];
  speed?: number;
  direction?: "left" | "right";
  showBlur?: boolean;
  blurLayers?: number;
  blurIntensity?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export const LogoSlider = ({
  logos,
  speed = 40,
  direction = "left",
  showBlur = true,
  className,
  pauseOnHover = false,
}: LogoSliderProps) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden flex items-center min-h-[140px]",
        className
      )}
    >
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); } 
        }
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }
      `}</style>

      {/* Blur removed by request */}

      <div 
         className={cn(
            "flex w-max items-center",
            direction === "left" ? "animate-scroll-left" : "animate-scroll-right",
            pauseOnHover && "hover:[animation-play-state:paused]"
         )}
         style={{ animationDuration: `${speed}s` }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[240px] lg:w-[350px] px-8 sm:px-12 flex items-center justify-center [&>svg]:max-h-[120px] [&>img]:w-full [&>img]:max-h-[120px] [&>img]:object-contain"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
};

LogoSlider.displayName = "LogoSlider";
export default LogoSlider;
