import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>=~";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Milliseconds per resolved character. */
  speed?: number;
}

/**
 * Decrypts its text from random glyphs, left to right, the first time it scrolls
 * into view. Screen readers get the real text; reduced motion shows it immediately.
 */
export function ScrambleText({ text, className, speed = 35 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let interval = 0;
    const scramble = (resolved: number) =>
      text
        .split("")
        .map((ch, i) => (i < resolved || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("");

    setDisplay(scramble(0));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        interval = window.setInterval(() => {
          const resolved = Math.floor((performance.now() - start) / speed);
          if (resolved >= text.length) {
            setDisplay(text);
            window.clearInterval(interval);
          } else {
            setDisplay(scramble(resolved));
          }
        }, 40);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(interval);
    };
  }, [text, speed]);

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
