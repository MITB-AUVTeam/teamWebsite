"use client";

import React, { useRef, useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  className?: string;
  rotate?: string;
  style?: React.CSSProperties;
  isRevealed: boolean;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  colorTheme = "blue",
  className,
  rotate,
  style,
  isRevealed,
  colors: customColors,
}: CardProps) => {
  const defaultBgColors = {
    orange: "bg-orange-500/5",
    blue: "bg-blue-500/5",
    purple: "bg-purple-500/5",
  };
  const defaultTextColors = {
    orange: "text-orange-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
  };
  const defaultBorderColors = {
    orange: "border-orange-500/20",
    blue: "border-blue-500/20",
    purple: "border-purple-500/20",
  };

  const bgColor = customColors?.bg || defaultBgColors[colorTheme];
  const textColor = customColors?.text || defaultTextColors[colorTheme];
  const borderColor = customColors?.border || defaultBorderColors[colorTheme];

  return (
    <m.div
      className={`relative w-full max-w-sm mx-auto md:max-w-none md:w-[280px] hover:z-30 z-20 ${rotate} ${className}`}
      style={style}
      initial={isRevealed ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 30 }}
      animate={isRevealed ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 30 }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 14,
      }}
      whileHover={isRevealed ? { scale: 1.03, transition: { duration: 0.2 } } : undefined}
    >
      <div className="bg-[#0a1128] p-2 rounded-[22px] sm:rounded-[25px] border border-slate-700 shadow-2xl relative overflow-hidden">
        {/* Inner HUD Overlay border */}
        <div className="absolute inset-0 border border-slate-800/40 rounded-[22px] sm:rounded-[25px] pointer-events-none z-20 m-1.5" />
        
        <Pin className={`w-6 h-6 sm:w-8 sm:h-8 ${textColor} z-20 mb-3 sm:mb-6 mx-auto relative`} />
        <div
          className={`${bgColor} border ${borderColor} rounded-[14px] sm:rounded-[15px] p-3.5 sm:p-[15px] h-full flex flex-col relative overflow-hidden z-10`}
        >
          <span className={`${textColor} text-2xl sm:text-3xl font-mono font-bold tracking-tighter mb-2 sm:mb-4 block`}>
            {number}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-2 sm:mb-[10px]">
            {title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed tracking-tight">
            {description}
          </p>
        </div>
      </div>
    </m.div>
  );
};

export interface Step {
  title: string;
  description: string;
  number?: string;
  colorTheme?: "orange" | "blue" | "purple";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
  style?: React.CSSProperties;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

// Numerical integration to compute the exact arc length of a cubic Bezier curve
const getBezierLength = (
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number
): number => {
  const steps = 12;
  let length = 0;
  let prevX = x0;
  let prevY = y0;

  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    
    // Cubic Bezier curve equations
    const x = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
    const y = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
    
    const dx = x - prevX;
    const dy = y - prevY;
    length += Math.sqrt(dx * dx + dy * dy);
    
    prevX = x;
    prevY = y;
  }
  return length;
};

export default function HowItWorks({
  features,
  className,
  stepPositions,
}: HowItWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const defaultFeatures: Step[] = [
    {
      title: "Create Account",
      description:
        "Sign up in minutes. Enter your details and verify your email to get started.",
      colorTheme: "orange",
    },
    {
      title: "Verify Identity",
      description:
        "Complete your profile verification to ensure secure transactions and compliance.",
      colorTheme: "blue",
    },
    {
      title: "Select Plan",
      description:
        "Choose from a variety of investment plans tailored to your financial goals.",
      colorTheme: "purple",
    },
    {
      title: "Analyze & Invest",
      description:
        "Review returns and make your first investment with confidence.",
      colorTheme: "orange",
    },
    {
      title: "Track Growth",
      description:
        "Monitor your portfolio in real-time and watch your wealth grow over time.",
      colorTheme: "blue",
    },
  ];

  const data = features && features.length > 0 ? features : defaultFeatures;

  // Static container coordinates setup to support clean rendering before calculations settle
  const staticHeight = React.useMemo(() => {
    if (data.length <= 1) return 360;
    const lastIdx = data.length - 1;
    const lastTop = Math.floor(lastIdx / 2) * 360 + (lastIdx % 2 === 1 ? 160 : 0);
    return lastTop + 380;
  }, [data]);

  // Positions mapped programmatically (desktop uses absolute grid, mobile uses clean flex column)
  const positions = React.useMemo(() => {
    if (stepPositions && stepPositions.length >= data.length) {
      return stepPositions;
    }
    return data.map((_, idx) => {
      const topVal = Math.floor(idx / 2) * 360 + (idx % 2 === 1 ? 160 : 0);
      const isEven = idx % 2 === 0;

      if (isMobile) {
        return {
          className: "w-full mb-6 relative",
          rotate: "rotate-0",
          style: {} as React.CSSProperties,
        };
      }

      return {
        className: "md:absolute",
        rotate: isEven ? "rotate-6" : "-rotate-6",
        style: {
          position: "absolute",
          top: `${topVal}px`,
          [isEven ? "left" : "right"]: "15%",
        } as React.CSSProperties,
      };
    });
  }, [data, stepPositions, isMobile]);

  // Setup scroll-linked path drawing (reaches 100% when timeline bottom hits 90% of screen)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 90%"],
  });

  const [pathD, setPathD] = useState("");
  const [coords, setCoords] = useState<{ x: number; y: number }[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 1000, height: staticHeight });
  const [cardThresholds, setCardThresholds] = useState<number[]>([]);
  const [layoutSettled, setLayoutSettled] = useState(false);

  // Parent-managed state for permanent one-way bouncy reveals
  const [revealedIndices, setRevealedIndices] = useState<boolean[]>(() => {
    const initial = new Array(data.length).fill(false);
    initial[0] = true;
    return initial;
  });

  // Calculate coordinates and path dynamically relative to the container size
  const calculatePath = () => {
    if (!containerRef.current || isMobile) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = staticHeight;
    setContainerSize({ width, height });

    // Map card positions mathematically to prevent transforms from warping measurements
    const activeCoords = data.map((_, idx) => {
      const topVal = Math.floor(idx / 2) * 360 + (idx % 2 === 1 ? 160 : 0);
      const isEven = idx % 2 === 0;
      
      const x = isEven ? (0.15 * width + 140) : (width - 0.15 * width - 140);
      const y = topVal + 24;
      
      return { x, y };
    });

    if (activeCoords.length <= 1) {
      setPathD("");
      setCoords([]);
      return;
    }

    setCoords(activeCoords);

    // Build the snaking curved path
    const start = activeCoords[0];
    let d = `M ${start.x} ${start.y}`;

    const segmentLengths: number[] = [];
    for (let i = 0; i < activeCoords.length - 1; i++) {
      const curr = activeCoords[i];
      const next = activeCoords[i + 1];
      const dy = (next.y - curr.y) / 2;
      
      d += ` C ${curr.x} ${curr.y + dy}, ${next.x} ${next.y - dy}, ${next.x} ${next.y}`;

      const len = getBezierLength(
        curr.x, curr.y,
        curr.x, curr.y + dy,
        next.x, next.y - dy,
        next.x, next.y
      );
      segmentLengths.push(len);
    }

    setPathD(d);

    // Compute precise path segment thresholds
    const totalLen = segmentLengths.reduce((sum, val) => sum + val, 0);
    const thresholds = activeCoords.map((_, idx) => {
      if (idx === 0) return 0.0;
      let cumSum = 0;
      for (let i = 0; i < idx; i++) {
        cumSum += segmentLengths[i];
      }
      return Math.min(1.0, (cumSum / totalLen) + 0.015);
    });

    setCardThresholds(thresholds);
    setLayoutSettled(true);
  };

  useEffect(() => {
    calculatePath();

    const handleResize = () => {
      calculatePath();
    };
    window.addEventListener("resize", handleResize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      observer = new ResizeObserver(() => {
        calculatePath();
      });
      observer.observe(containerRef.current);
    } else {
      const timer = setTimeout(() => {
        calculatePath();
      }, 500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        calculatePath();
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, [data, isMobile]);

  // On mobile, reveal all cards directly or on viewport enter
  useEffect(() => {
    if (isMobile) {
      setRevealedIndices(new Array(data.length).fill(true));
    }
  }, [isMobile, data.length]);

  // Sync scroll position immediately once layout settles (desktop)
  useEffect(() => {
    if (!isMobile && layoutSettled && cardThresholds.length === data.length) {
      const latest = scrollYProgress.get();
      setRevealedIndices((prev) => {
        let changed = false;
        const next = [...prev];

        cardThresholds.forEach((threshold, idx) => {
          if (idx === 0) return;
          if (latest >= threshold && !next[idx]) {
            next[idx] = true;
            changed = true;
          }
        });

        return changed ? next : prev;
      });
    }
  }, [layoutSettled, cardThresholds, scrollYProgress, data.length, isMobile]);

  // Listen for scroll updates to permanently trigger reveal (desktop)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isMobile && layoutSettled && cardThresholds.length === data.length) {
      setRevealedIndices((prev) => {
        let changed = false;
        const next = [...prev];

        cardThresholds.forEach((threshold, idx) => {
          if (idx === 0) return;
          if (latest >= threshold && !next[idx]) {
            next[idx] = true;
            changed = true;
          }
        });

        return changed ? next : prev;
      });
    }
  });

  // Animated clip path height mapped to scroll progress
  const clipHeight = useTransform(scrollYProgress, [0, 1], [0, containerSize.height]);

  return (
    <LazyMotion features={domAnimation}>
      <div 
        ref={containerRef}
        className={`bg-transparent max-md:py-4 md:py-20 px-3 sm:px-8 relative ${className}`}
      >
        
        {/* Tech Blueprint Grid Background Accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.1]"
          style={{
            backgroundImage: "linear-gradient(rgba(56,189,248,0.2) 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "4px",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="relative w-full mx-auto flex flex-col space-y-4 md:space-y-0 md:block"
            style={isMobile ? {} : { height: `${containerSize.height}px` }}
          >
            {!isMobile && data.length > 1 && pathD && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0"
                viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
                preserveAspectRatio="none"
              >
                <defs>
                  {/* ClipPath rectangle that expands vertically on scroll, ensuring 100% Chrome compatibility */}
                  <clipPath id="timeline-clip">
                    <m.rect
                      x="0"
                      y="0"
                      width={containerSize.width}
                      height={clipHeight}
                    />
                  </clipPath>
                </defs>

                {/* 1. Outer Soft Glow Ambient Path */}
                <m.path
                  d={pathD}
                  stroke="rgba(34, 211, 238, 0.15)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  clipPath="url(#timeline-clip)"
                />

                {/* 2. Core Glow Path */}
                <m.path
                  d={pathD}
                  stroke="rgba(34, 211, 238, 0.35)"
                  strokeWidth="4.8"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  clipPath="url(#timeline-clip)"
                />

                {/* 3. Drawn Dashed Connective path (main filament) */}
                <m.path
                  d={pathD}
                  stroke="rgba(34, 211, 238, 0.9)"
                  strokeWidth="3.2"
                  strokeDasharray="8 6"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  clipPath="url(#timeline-clip)"
                  animate={{
                    strokeDashoffset: -140,
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* 4. Pulsing Connection Nodes at each milestone pin */}
                {coords.map((coord, idx) => {
                  const isRevealed = revealedIndices[idx];
                  return (
                    <m.circle
                      key={idx}
                      cx={coord.x}
                      cy={coord.y}
                      r="6"
                      fill="rgba(34, 211, 238, 0.95)"
                      stroke="#0a1128"
                      strokeWidth="2"
                      clipPath="url(#timeline-clip)"
                      animate={isRevealed ? {
                        scale: [1, 1.35, 1],
                        opacity: [0.8, 1, 0.8],
                      } : { scale: 1, opacity: 0.5 }}
                      transition={isRevealed ? {
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      } : undefined}
                    />
                  );
                })}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index];

              return (
                <div
                  key={step.title}
                  className={position.className}
                  style={position.style}
                >
                  <Card
                    number={step.number || `0${index + 1}`}
                    title={step.title}
                    description={step.description}
                    colorTheme={step.colorTheme || "blue"}
                    colors={step.colors}
                    rotate={position.rotate}
                    isRevealed={revealedIndices[index]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
