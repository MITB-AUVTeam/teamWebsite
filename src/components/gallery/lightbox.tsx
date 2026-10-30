import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { thumbOf } from "@/components/gallery/data";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
}

const pad = (n: number) => String(n).padStart(3, "0");

/**
 * Full-screen viewer styled as a camera feed: targeting brackets, a frame counter
 * and a thumbnail strip. Arrow keys, swipes or thumbnails browse; Escape closes and
 * focus returns to the tile that opened it.
 */
export function Lightbox({ images, index, onChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const lastIndex = useRef<number | null>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null && images[index] !== undefined;

  // Each photo wipes open from the centre, sliding in from the side you browsed toward.
  useGSAP(
    () => {
      const img = imgRef.current;
      if (!open || !img || prefersReducedMotion()) return;
      const prev = lastIndex.current;
      const dir = prev === null || index === null ? 0 : index > prev ? 1 : -1;
      lastIndex.current = index;
      gsap.fromTo(
        img,
        { clipPath: "inset(0% 50% 0% 50% round 16px)", scale: 1.12, xPercent: dir * 6 },
        { clipPath: "inset(0% 0% 0% 0% round 16px)", scale: 1, xPercent: 0, duration: 1.1, ease: "expo.out" },
      );
    },
    { dependencies: [open, index] },
  );
  if (!open) lastIndex.current = null;

  // Lock the page (Lenis pauses on body overflow) and hand focus back on close.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previous?.focus({ preventScroll: true });
    };
  }, [open]);

  const step = (d: number) => onChange(((index ?? 0) + d + images.length) % images.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") onChange(((index ?? 0) + 1) % images.length);
      else if (e.key === "ArrowLeft") onChange(((index ?? 0) - 1 + images.length) % images.length);
      else if (e.key === "Tab" && dialogRef.current) {
        // Keep Tab inside the dialog.
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onChange]);

  // Keep the active thumbnail in view.
  useEffect(() => {
    if (!open) return;
    const thumb = stripRef.current?.querySelector<HTMLElement>(`[data-thumb="${index}"]`);
    thumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [open, index]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={images[index].alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[20000] flex flex-col bg-[#01040b]/95 backdrop-blur-sm"
          onClick={() => onChange(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50 && images.length > 1) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] sm:px-8" onClick={(e) => e.stopPropagation()}>
            <span className="flex items-center gap-3 text-slate-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
              <span className="tabular-nums">
                <span className="text-white">FRM {pad(index + 1)}</span> / {pad(images.length)}
              </span>
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => onChange(null)}
              aria-label="Close"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-24">
            <div className="relative flex max-h-full max-w-full items-center justify-center">
              <img
                ref={imgRef}
                key={images[index].src}
                src={images[index].src}
                alt={images[index].alt}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[calc(100svh-15rem)] max-w-full rounded-2xl object-contain"
              />
              {/* Targeting brackets */}
              <span aria-hidden="true" className="pointer-events-none absolute -inset-3 hidden sm:block">
                <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-cyan-300/70" />
                <span className="absolute right-0 top-0 h-6 w-6 border-r border-t border-cyan-300/70" />
                <span className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-cyan-300/70" />
                <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-cyan-300/70" />
              </span>
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => { e.stopPropagation(); step(-1); }}
                  className="absolute left-2 hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white transition-colors hover:border-cyan-300/50 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone sm:left-6 sm:flex"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => { e.stopPropagation(); step(1); }}
                  className="absolute right-2 hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white transition-colors hover:border-cyan-300/50 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone sm:right-6 sm:flex"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <p className="px-5 pt-4 text-center text-sm text-slate-300">{images[index].alt}</p>
            {images.length > 1 && (
              <div ref={stripRef} className="no-scrollbar mx-auto flex max-w-5xl gap-2 overflow-x-auto px-5 py-4" data-lenis-prevent>
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    data-thumb={i}
                    onClick={() => onChange(i)}
                    aria-label={`Show image ${i + 1}: ${img.alt}`}
                    aria-current={i === index}
                    className={cn(
                      "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone",
                      i === index ? "border-cyan-300 opacity-100" : "border-white/10 opacity-40 hover:opacity-80",
                    )}
                  >
                    <img src={thumbOf(img.src)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
