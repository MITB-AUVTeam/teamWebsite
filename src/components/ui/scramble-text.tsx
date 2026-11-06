import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Each character churns through its own kind (lowercase, capitals, digits), so a word
// keeps roughly its own width and shape while it decrypts
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Milliseconds per resolved character. */
  speed?: number;
  /** Hold the final text's width while scrambling, so neighbouring words never shift. */
  stable?: boolean;
  /** Wait this long after coming into view before decrypting. */
  delay?: number;
}

/**
 * Decrypts its text from random glyphs, left to right, the first time it scrolls
 * into view. Screen readers get the real text; reduced motion shows it immediately.
 */
export function ScrambleText({ text, className, speed = 35, stable, delay = 0 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let interval = 0;
    const scramble = (resolved: number) =>
      text
        .split("")
        .map((ch, i) => {
          // Spaces and punctuation hold still; only letters and digits churn
          if (i < resolved || !/[a-z0-9]/i.test(ch)) return ch;
          const set = ch >= "a" && ch <= "z" ? LOWER : ch >= "0" && ch <= "9" ? DIGITS : UPPER;
          return set[Math.floor(Math.random() * set.length)];
        })
        .join("");

    setDisplay(scramble(0));
    let wait = 0;
    const run = () => {
      // The preloader (fresh load) or the dive transition (page change) still covers
      // the page: decrypt once it has gone, so the effect is actually seen
      // Until then keep the glyphs churning, so it never sits frozen as gibberish
      if (document.querySelector("[data-preloader], [data-cover]")) {
        setDisplay(scramble(0));
        wait = window.setTimeout(run, 70);
        return;
      }
      const start = performance.now() + delay;
      interval = window.setInterval(() => {
        const resolved = Math.max(0, Math.floor((performance.now() - start) / speed));
        if (resolved >= text.length) {
          setDisplay(text);
          window.clearInterval(interval);
        } else {
          setDisplay(scramble(resolved));
        }
      }, 40);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(wait);
      window.clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      {stable ? (
        // Both layers share one grid cell: the real text holds the width, the scramble sits on it
        <span aria-hidden="true" className="inline-grid">
          <span className="invisible [grid-area:1/1]">{text}</span>
          <span className="whitespace-nowrap [grid-area:1/1]">{display}</span>
        </span>
      ) : (
        <span aria-hidden="true">{display}</span>
      )}
    </span>
  );
}
