import { useRef, useState, type ReactNode, type PointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Trail {
  id: number;
  x: number;
  y: number;
  src: string;
  rotate: number;
}

interface ImageTrailProps {
  images: string[];
  children?: ReactNode;
  className?: string;
  /** Pixels of travel between dropped images. */
  spacing?: number;
}

/**
 * Area that drops a fading photo behind the cursor every `spacing` pixels.
 * Mouse only; on touch the children render on their own.
 */
export function ImageTrail({ images, children, className, spacing = 110 }: ImageTrailProps) {
  const [trail, setTrail] = useState<Trail[]>([]);
  const last = useRef<{ x: number; y: number } | null>(null);
  const index = useRef(0);
  const id = useRef(0);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || images.length === 0) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (last.current && Math.hypot(x - last.current.x, y - last.current.y) < spacing) return;
    last.current = { x, y };
    const item = { id: id.current++, x, y, src: images[index.current++ % images.length], rotate: Math.random() * 16 - 8 };
    setTrail((t) => [...t.slice(-6), item]);
    window.setTimeout(() => setTrail((t) => t.filter((i) => i.id !== item.id)), 900);
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={() => (last.current = null)}
      className={cn("relative overflow-hidden", className)}
    >
      <AnimatePresence>
        {trail.map((t) => (
          <motion.img
            key={t.id}
            src={t.src}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6, rotate: t.rotate }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute z-0 h-44 w-36 md:h-56 md:w-44 -translate-x-1/2 -translate-y-1/2 rounded-xl object-cover shadow-2xl shadow-black/50"
            style={{ left: t.x, top: t.y }}
          />
        ))}
      </AnimatePresence>
      <div className="relative z-10 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">{children}</div>
    </div>
  );
}
