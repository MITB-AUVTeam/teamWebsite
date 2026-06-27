import { ReactNode, useState, useEffect, useRef } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[18rem] sm:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  onClick,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  onClick?: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);
  const [hasAnimatedViewport, setHasAnimatedViewport] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const [animateArrow, setAnimateArrow] = useState(false);

  // Resize and screen width detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Viewport Attention Animation (Intersection Observer - Mobile only)
  useEffect(() => {
    if (!isMobile || hasAnimatedViewport || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPulse(true);
          setHasAnimatedViewport(true);
          
          // Reset pulse state after animation duration (400ms)
          const timer = setTimeout(() => {
            setShouldPulse(false);
          }, 400);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasAnimatedViewport, isMobile]);

  // Subtle Arrow Animation (Mobile only, every 5-6s)
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setAnimateArrow(true);
      const timer = setTimeout(() => {
        setAnimateArrow(false);
      }, 250);
      return () => clearTimeout(timer);
    }, 5500);

    return () => clearInterval(interval);
  }, [isMobile]);

  const handleInteraction = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (onClick) {
      if (isMobile) {
        setIsTapping(true);
        setTimeout(() => {
          setIsTapping(false);
          onClick();
        }, 140); // 120-150ms tap duration feedback
      } else {
        onClick();
      }
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick ? handleInteraction : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleInteraction(e);
        }
      } : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? `View details for ${name}` : undefined}
      className={cn(
        "group relative col-span-1 md:col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-slate-900/40 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        
        // Old desktop focus rings
        onClick && "cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
        
        // Mobile tap feedback animation
        isMobile && isTapping && "scale-[0.96] duration-[120ms] ease-out",
        
        // Viewport attention animation pulse class (Mobile only)
        isMobile && shouldPulse && "animate-viewport-pulse",
        
        className,
      )}
    >
      {/* Background Graphic (Old desktop scale/overlay is native to background prop) */}
      <div className="absolute inset-0 z-0">
        {background}
      </div>

      {/* Top-Right Indicator (Mobile only) */}
      {isMobile && (
        <div className="absolute top-4 right-4 z-20 opacity-40 text-slate-400 pointer-events-none">
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </div>
      )}

      {/* Content Area */}
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-1.5">
        <Icon className="h-12 w-12 origin-left transform-gpu text-slate-400 transition-all duration-300 ease-in-out group-hover:scale-75 group-hover:text-blue-400" />
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-2">
          {name}
        </h3>
        <p className="max-w-lg text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
        
        {onClick && (
          <span className={cn(
            "text-xs font-black text-blue-400 flex items-center gap-1 transition-all duration-300 mt-2 select-none uppercase tracking-wider",
            isMobile
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
          )}>
            {cta}
            <ArrowRightIcon className={cn(
              "h-3 w-3 transition-transform duration-300",
              isMobile
                ? animateArrow ? "animate-arrow-nudge" : ""
                : "group-hover:translate-x-0.5"
            )} />
          </span>
        )}
      </div>

      {!onClick && (
        <div
          className={cn(
            "pointer-events-none absolute top-4 right-4 z-20 flex opacity-0 -translate-y-2 transform-gpu transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          <Button 
            variant="secondary" 
            asChild 
            className="group/btn pointer-events-auto rounded-full bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-800/80 hover:bg-blue-600 hover:border-blue-500 text-slate-200 hover:text-white transition-all duration-300 px-3.5 py-1.5 text-[10px] uppercase font-bold tracking-wider hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 transform-gpu h-auto"
          >
            <Link to={href} className="flex items-center gap-1">
              {cta}
              <ArrowRightIcon className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      )}
      
      {/* Old desktop hover overlay tint */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-slate-800/20" />
    </div>
  );
};

export { BentoCard, BentoGrid };
