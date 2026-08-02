import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  style: React.CSSProperties;
  className: string;
  isCluster?: boolean;
  clusterBubbles?: Array<{
    style: React.CSSProperties;
    className: string;
  }>;
}

export function UnderwaterParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const list: Particle[] = [];
    let idCounter = 0;

    // Density Target Distribution (Significantly Increased Frequency & Populated Atmosphere):
    // - 80 Far atmospheric particles (tiny dots)
    // - 60 Small bubbles (mix of tiny dots & bubbles)
    // - 30 Medium bubbles (asymmetric refraction glass outlines)
    // - 16 Large bubbles (highly transparent optical rim)
    // - 10 Near blurry bubbles (cameras out of focus)
    // - 12 Golden bioluminescent lights
    // - 8 Cyan bokeh background light blobs
    // - 12 Bubble clusters (groups of 2-4 tiny irregular bubbles)
    // - 3 Rare "Hero Bubbles" (ultra premium, slow side spawn)

    // Helper: Randomize opacity intensity scale
    const getIntensityMultiplier = (): number => {
      const r = Math.random();
      if (r < 0.20) return 1.0;
      if (r < 0.65) return 0.7;
      if (r < 0.90) return 0.4;
      return 0.15;
    };

    // Helper: Generate randomized border radius for organic shape deformation
    const getOrganicBorderRadius = (): string => {
      const r1 = 46 + Math.floor(Math.random() * 9); // 46% - 55%
      const r2 = 100 - r1;
      const r3 = 46 + Math.floor(Math.random() * 9);
      const r4 = 100 - r3;
      return `${r1}% ${r2}% ${r3}% ${r4}% / ${r4}% ${r3}% ${r2}% ${r1}%`;
    };

    // Helper: Generate organic curved path checkpoints
    const getOrganicDriftPoints = (startX: number) => {
      const driftStart = (Math.random() - 0.5) * 40; // Starting horizontal drift offset (px)
      const driftEnd = driftStart + (Math.random() - 0.5) * 60; // Ending horizontal drift offset (px)
      const drift1 = driftStart + (Math.random() - 0.5) * 20;
      const drift2 = drift1 + (Math.random() - 0.5) * 20;
      const drift3 = drift2 + (Math.random() - 0.5) * 20;
      const drift4 = drift3 + (Math.random() - 0.5) * 20;

      // Rotation angles for shift-reflections
      const rot0 = Math.floor((Math.random() - 0.5) * 15); // -7deg to 7deg
      const rot1 = rot0 + Math.floor((Math.random() - 0.5) * 4);
      const rot2 = rot1 + Math.floor((Math.random() - 0.5) * 4);
      const rot3 = rot2 + Math.floor((Math.random() - 0.5) * 4);
      const rot4 = rot3 + Math.floor((Math.random() - 0.5) * 4);
      const rot5 = rot4 + Math.floor((Math.random() - 0.5) * 4);

      return {
        "--drift-start": `${driftStart}px`,
        "--drift-1": `${drift1}px`,
        "--drift-2": `${drift2}px`,
        "--drift-3": `${drift3}px`,
        "--drift-4": `${drift4}px`,
        "--drift-end": `${driftEnd}px`,
        "--rot-0": `${rot0}deg`,
        "--rot-1": `${rot1}deg`,
        "--rot-2": `${rot2}deg`,
        "--rot-3": `${rot3}deg`,
        "--rot-4": `${rot4}deg`,
        "--rot-5": `${rot5}deg`,
      };
    };

    // 1. FAR ATMOSPHERIC PARTICLES (80 count - tiny, slow, blurred dust)
    for (let i = 0; i < 80; i++) {
      const id = idCounter++;
      let x = Math.random() * 100;
      if (Math.random() > 0.6) {
        x = Math.random() > 0.5 ? 15 + Math.random() * 10 : 70 + Math.random() * 15;
      }
      
      const duration = 25 + Math.random() * 20; // 25s-45s
      const delay = -(Math.random() * duration);
      const driftVariables = getOrganicDriftPoints(x);

      const size = 1.5 + Math.random() * 2.5; // 1.5px-4px
      const baseOpacity = 0.10 + Math.random() * 0.15; // 0.10-0.25
      const maxOpacity = baseOpacity * getIntensityMultiplier();
      const blur = 0.5 + Math.random() * 1.0;

      const colorRand = Math.random();
      const colorClass = colorRand < 0.4 ? "bg-white/40" : colorRand < 0.7 ? "bg-sky-500/20" : "bg-teal-500/20";

      const style: React.CSSProperties = {
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        filter: `blur(${blur}px)`,
        animationName: "float-up-organic",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        position: "absolute",
        bottom: "-50px",
        pointerEvents: "none",
        ...driftVariables,
        "--max-opacity": maxOpacity,
      } as any;

      list.push({ id, style, className: `underwater-particle ${colorClass} rounded-full` });
    }

    // 2. SMALL BUBBLES (60 count - 4px-9px, mix of tiny dots & bubbles)
    for (let i = 0; i < 60; i++) {
      const id = idCounter++;
      let x = Math.random() * 100;
      if (Math.random() > 0.6) {
        x = Math.random() > 0.5 ? 15 + Math.random() * 10 : 70 + Math.random() * 15;
      }
      const duration = 18 + Math.random() * 14; // 18s-32s
      const delay = -(Math.random() * duration);
      const driftVariables = getOrganicDriftPoints(x);

      const size = 4 + Math.random() * 5; // 4px-9px
      const baseOpacity = 0.15 + Math.random() * 0.20; // 0.15-0.35
      const maxOpacity = baseOpacity * getIntensityMultiplier();
      const blur = Math.random() > 0.8 ? 0.4 : 0;
      const borderRadius = getOrganicBorderRadius();

      const isBubble = Math.random() > 0.3; // 70% bubbles, 30% dots
      let className = "underwater-particle ";
      if (isBubble) {
        className += "border border-sky-300/35 bg-gradient-to-br from-white/10 to-transparent shadow-[inset_1px_1px_1.5px_rgba(255,255,255,0.45)]";
      } else {
        const colorRand = Math.random();
        const colorClass = colorRand < 0.4 ? "bg-white/20" : colorRand < 0.7 ? "bg-sky-400/15" : "bg-teal-400/15";
        className += colorClass;
      }

      const style: React.CSSProperties = {
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        animationName: "float-up-organic",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        position: "absolute",
        bottom: "-50px",
        pointerEvents: "none",
        ...driftVariables,
        "--max-opacity": maxOpacity,
      } as any;

      list.push({ id, style, className });
    }

    // 3. MEDIUM BUBBLES (30 count - 9px-18px, asymmetric refraction glass outlines)
    for (let i = 0; i < 30; i++) {
      const id = idCounter++;
      const x = Math.random() > 0.5 ? Math.random() * 25 : 75 + Math.random() * 25;
      const duration = 16 + Math.random() * 12; // 16s-28s
      const delay = -(Math.random() * duration);
      const driftVariables = getOrganicDriftPoints(x);

      const size = 9 + Math.random() * 9; // 9px-18px
      const baseOpacity = 0.20 + Math.random() * 0.25; // 0.20-0.45
      const maxOpacity = baseOpacity * getIntensityMultiplier();
      const blur = Math.random() > 0.85 ? 0.4 : 0;
      const borderRadius = getOrganicBorderRadius();

      const hasHighlight = Math.random() > 0.4;
      const highlightClass = hasHighlight
        ? "before:content-[''] before:absolute before:w-[1.5px] before:h-[1.5px] before:bg-white/60 before:rounded-full before:top-[20%] before:left-[20%] before:pointer-events-none"
        : "";

      const className = `underwater-particle border border-sky-300/35 bg-gradient-to-br from-white/12 via-transparent to-black/5 shadow-[inset_1px_1.5px_2px_rgba(255,255,255,0.45),inset_-1px_-1px_1.5px_rgba(0,0,0,0.3)] ${highlightClass}`;

      const style: React.CSSProperties = {
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        animationName: "float-up-organic-wobble",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        position: "absolute",
        bottom: "-50px",
        pointerEvents: "none",
        ...driftVariables,
        "--max-opacity": maxOpacity,
      } as any;

      list.push({ id, style, className });
    }

    // 4. LARGE BUBBLES (16 count - 18px-32px, highly transparent optical rim)
    for (let i = 0; i < 16; i++) {
      const id = idCounter++;
      const x = Math.random() > 0.5 ? Math.random() * 25 : 75 + Math.random() * 25;
      const duration = 14 + Math.random() * 10; // 14s-24s
      const delay = -(Math.random() * duration);
      const driftVariables = getOrganicDriftPoints(x);

      const size = 18 + Math.random() * 14; // 18px-32px
      const baseOpacity = 0.15 + Math.random() * 0.20; // 0.15-0.35
      const maxOpacity = baseOpacity * getIntensityMultiplier();
      const blur = Math.random() > 0.75 ? 0.5 : 0;
      const borderRadius = getOrganicBorderRadius();

      const className = "underwater-particle border border-sky-300/40 bg-gradient-to-br from-white/10 via-transparent to-black/10 shadow-[inset_1.5px_1.5px_2.5px_rgba(255,255,255,0.55),inset_-1.5px_-1.5px_2px_rgba(0,0,0,0.35)] before:content-[''] before:absolute before:w-[2.5px] before:h-[2.5px] before:bg-white/70 before:rounded-full before:top-[22%] before:left-[22%] before:pointer-events-none after:content-[''] after:absolute after:inset-[2px] after:rounded-full after:border-t after:border-l after:border-white/35 after:pointer-events-none";

      const style: React.CSSProperties = {
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        animationName: "float-up-organic-wobble",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        position: "absolute",
        bottom: "-50px",
        pointerEvents: "none",
        ...driftVariables,
        "--max-opacity": maxOpacity,
      } as any;

      list.push({ id, style, className });
    }

    // 5. NEAR BLURRY BUBBLES (10 count - 25px-45px, cameras out of focus, faster)
    for (let i = 0; i < 10; i++) {
      const id = idCounter++;
      const x = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
      const duration = 12 + Math.random() * 6; // Faster: 12s-18s
      const delay = -(Math.random() * duration);
      const driftVariables = getOrganicDriftPoints(x);

      const size = 25 + Math.random() * 20; // 25px-45px
      const baseOpacity = 0.10 + Math.random() * 0.15; // 0.10-0.25 (faint, out of focus)
      const maxOpacity = baseOpacity * getIntensityMultiplier();
      const blur = 1.5 + Math.random() * 1.5;
      const borderRadius = getOrganicBorderRadius();

      const className = "underwater-particle border border-sky-300/30 bg-gradient-to-br from-white/5 to-transparent shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-2px_4px_rgba(0,0,0,0.2)]";

      const style: React.CSSProperties = {
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius,
        filter: `blur(${blur}px)`,
        animationName: "float-up-organic-wobble",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        position: "absolute",
        bottom: "-60px",
        pointerEvents: "none",
        ...driftVariables,
        "--max-opacity": maxOpacity,
      } as any;

      list.push({ id, style, className });
    }

    // 6. GOLDEN PARTICLES (12 count - tiny warm bokeh reflections)
    for (let i = 0; i < 12; i++) {
      const id = idCounter++;
      const x = Math.random() * 100;
      const duration = 22 + Math.random() * 13; // 22s-35s
      const delay = -(Math.random() * duration);
      const driftVariables = getOrganicDriftPoints(x);

      const size = i === 0 ? 5.5 : 2 + Math.random() * 3; // 2px-5.5px
      const baseOpacity = 0.15 + Math.random() * 0.20; // 0.15-0.35
      const maxOpacity = baseOpacity * getIntensityMultiplier();
      const blur = i === 0 ? 3.0 : 1.5 + Math.random() * 1.5;

      const className = "underwater-particle bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.35)]";

      const style: React.CSSProperties = {
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        filter: `blur(${blur}px)`,
        animationName: "float-up-organic-pulse",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        position: "absolute",
        bottom: "-50px",
        pointerEvents: "none",
        ...driftVariables,
        "--max-opacity": maxOpacity,
      } as any;

      list.push({ id, style, className });
    }

    // 7. SUBTLE CYAN BOKEH (8 count - very faint background light blobs)
    for (let i = 0; i < 8; i++) {
      const id = idCounter++;
      const x = Math.random() * 100;
      const duration = 24 + Math.random() * 14; // 24s-38s
      const delay = -(Math.random() * duration);
      const driftVariables = getOrganicDriftPoints(x);

      const size = 12 + Math.random() * 13; // 12px-25px
      const maxOpacity = 0.03 + Math.random() * 0.05; // 0.03-0.08
      const blur = 6.0 + Math.random() * 6.0;

      const className = "underwater-particle bg-sky-500/25 rounded-full shadow-[0_0_12px_rgba(14,165,233,0.15)]";

      const style: React.CSSProperties = {
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        filter: `blur(${blur}px)`,
        animationName: "float-up-organic-pulse",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        position: "absolute",
        bottom: "-50px",
        pointerEvents: "none",
        ...driftVariables,
        "--max-opacity": maxOpacity,
      } as any;

      list.push({ id, style, className });
    }

    // 8. BUBBLE CLUSTERS (12 clusters - groups of 2-4 tiny irregular bubbles)
    for (let i = 0; i < 12; i++) {
      const id = idCounter++;
      const x = Math.random() * 100;
      const duration = 20 + Math.random() * 8; // 20s-28s
      const delay = -(Math.random() * duration);
      const driftVariables = getOrganicDriftPoints(x);

      const baseOpacity = 0.15 + Math.random() * 0.20; // 0.15-0.35
      const maxOpacity = baseOpacity * getIntensityMultiplier();

      const style: React.CSSProperties = {
        left: `${x}%`,
        width: "40px",
        height: "40px",
        animationName: "float-up-organic",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        position: "absolute",
        bottom: "-50px",
        pointerEvents: "none",
        ...driftVariables,
        "--max-opacity": maxOpacity,
      } as any;

      const clusterBubbles = [
        {
          style: {
            position: "absolute" as const,
            left: "0px",
            top: "8px",
            width: "2px",
            height: "2px",
          },
          className: "bg-white/40 rounded-full",
        },
        {
          style: {
            position: "absolute" as const,
            left: "12px",
            top: "18px",
            width: "3px",
            height: "3px",
          },
          className: "border border-sky-300/35 bg-transparent rounded-full shadow-[inset_1px_1px_1px_rgba(255,255,255,0.3)]",
        },
        ...(Math.random() > 0.4
          ? [
              {
                style: {
                  position: "absolute" as const,
                  left: "5px",
                  top: "26px",
                  width: "1.5px",
                  height: "1.5px",
                },
                className: "bg-sky-400/20 rounded-full",
              },
            ]
          : []),
        ...(Math.random() > 0.7
          ? [
              {
                style: {
                  position: "absolute" as const,
                  left: "18px",
                  top: "6px",
                  width: "2px",
                  height: "2px",
                },
                className: "border border-teal-300/30 bg-transparent rounded-full shadow-[inset_1px_1px_1px_rgba(255,255,255,0.25)]",
              },
            ]
          : []),
      ];

      list.push({ id, style, className: "bg-transparent", isCluster: true, clusterBubbles });
    }

    // 9. RARE "HERO BUBBLES" (3 count - 38px-48px, ultra premium, slow side spawn)
    for (let i = 0; i < 3; i++) {
      const id = idCounter++;
      const x = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
      const duration = 28 + Math.random() * 14;
      const delay = -(Math.random() * duration);
      const driftVariables = getOrganicDriftPoints(x);

      const size = 38 + Math.random() * 10; // 38px-48px
      const opacity = 0.15 + Math.random() * 0.13;
      const blur = 0.4;
      const borderRadius = getOrganicBorderRadius();

      const className = "underwater-particle border border-sky-300/35 bg-gradient-to-br from-white/10 via-transparent to-black/15 shadow-[inset_2.5px_2.5px_4px_rgba(255,255,255,0.6),inset_-2px_-2px_3px_rgba(0,0,0,0.35),0_0_15px_rgba(56,189,246,0.05)] before:content-[''] before:absolute before:w-[3.5px] before:h-[3.5px] before:bg-white/80 before:rounded-full before:top-[20%] before:left-[20%] before:pointer-events-none after:content-[''] after:absolute after:inset-[3px] after:rounded-full after:border-t-2 after:border-l after:border-white/40 after:pointer-events-none";

      const style: React.CSSProperties = {
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius,
        filter: `blur(${blur}px)`,
        animationName: "float-up-organic-wobble",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        position: "absolute",
        bottom: "-60px",
        pointerEvents: "none",
        ...driftVariables,
        "--max-opacity": opacity,
      } as any;

      list.push({ id, style, className });
    }

    setParticles(list);
  }, []);

  return (
    <>
      <style>{`
        /* 1. Basic Float Keyframe: natural sinusoidal organic drift with slow rotation */
        @keyframes float-up-organic {
          0% {
            transform: translateY(0) translateX(var(--drift-start)) rotate(var(--rot-0));
            opacity: 0;
          }
          10% {
            opacity: var(--max-opacity);
            transform: translateY(-10vh) translateX(var(--drift-start)) rotate(var(--rot-1));
          }
          20% {
            transform: translateY(-20vh) translateX(var(--drift-1)) rotate(var(--rot-1));
          }
          40% {
            transform: translateY(-45vh) translateX(var(--drift-2)) rotate(var(--rot-2));
          }
          60% {
            transform: translateY(-70vh) translateX(var(--drift-3)) rotate(var(--rot-3));
          }
          80% {
            transform: translateY(-95vh) translateX(var(--drift-4)) rotate(var(--rot-4));
          }
          90% {
            opacity: var(--max-opacity);
            transform: translateY(-105vh) translateX(var(--drift-end)) rotate(var(--rot-5));
          }
          100% {
            transform: translateY(-115vh) translateX(var(--drift-end)) rotate(var(--rot-5));
            opacity: 0;
          }
        }

        /* 2. Float and Wobble Keyframe: incorporates organic scale squashing and stretching */
        @keyframes float-up-organic-wobble {
          0% {
            transform: translateY(0) translateX(var(--drift-start)) rotate(var(--rot-0)) scale(1, 1);
            opacity: 0;
          }
          10% {
            opacity: var(--max-opacity);
            transform: translateY(-10vh) translateX(var(--drift-start)) rotate(var(--rot-1)) scale(1.02, 0.98);
          }
          20% {
            transform: translateY(-20vh) translateX(var(--drift-1)) rotate(var(--rot-1)) scale(0.98, 1.02);
          }
          40% {
            transform: translateY(-45vh) translateX(var(--drift-2)) rotate(var(--rot-2)) scale(1.03, 0.97);
          }
          60% {
            transform: translateY(-70vh) translateX(var(--drift-3)) rotate(var(--rot-3)) scale(0.97, 1.03);
          }
          80% {
            transform: translateY(-95vh) translateX(var(--drift-4)) rotate(var(--rot-4)) scale(1.02, 0.98);
          }
          90% {
            opacity: var(--max-opacity);
            transform: translateY(-105vh) translateX(var(--drift-end)) rotate(var(--rot-5)) scale(0.98, 1.02);
          }
          100% {
            transform: translateY(-115vh) translateX(var(--drift-end)) rotate(var(--rot-5)) scale(1, 1);
            opacity: 0;
          }
        }

        /* 3. Golden Glow Pulse Keyframe: adds gentle brightness breathing */
        @keyframes float-up-organic-pulse {
          0% {
            transform: translateY(0) translateX(var(--drift-start)) rotate(var(--rot-0));
            opacity: 0;
          }
          10% {
            opacity: var(--max-opacity);
            transform: translateY(-10vh) translateX(var(--drift-start)) rotate(var(--rot-1));
          }
          25% {
            opacity: calc(var(--max-opacity) * 0.75);
            transform: translateY(-30vh) translateX(var(--wobble-1)) rotate(var(--rot-1));
          }
          50% {
            opacity: calc(var(--max-opacity) * 1.25);
            transform: translateY(-60vh) translateX(var(--wobble-2)) rotate(var(--rot-2));
          }
          75% {
            opacity: calc(var(--max-opacity) * 0.85);
            transform: translateY(-90vh) translateX(var(--wobble-3)) rotate(var(--rot-3));
          }
          90% {
            opacity: var(--max-opacity);
            transform: translateY(-105vh) translateX(var(--drift-end)) rotate(var(--rot-5));
          }
          100% {
            transform: translateY(-115vh) translateX(var(--drift-end)) rotate(var(--rot-5));
            opacity: 0;
          }
        }

        .underwater-particle {
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .underwater-particle {
            animation-play-state: paused !important;
            opacity: 0.15 !important;
            bottom: auto !important;
            top: var(--reduced-top, 50%) !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        {particles.map((p) => {
          // Provide static random top values for prefers-reduced-motion fallback
          const staticTop = `${Math.floor(Math.random() * 90) + 5}%`;
          const customStyle = {
            ...p.style,
            "--reduced-top": staticTop,
          } as React.CSSProperties;

          if (p.isCluster) {
            return (
              <div key={p.id} style={customStyle} className={p.className}>
                {p.clusterBubbles?.map((cb, idx) => (
                  <div key={idx} style={cb.style} className={cb.className} />
                ))}
              </div>
            );
          }

          return (
            <div
              key={p.id}
              className={p.className}
              style={customStyle}
            />
          );
        })}
      </div>
    </>
  );
}
