import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { resolvedTeamCategories } from "@/components/ui/team-section-block-shadcnui";
import { cn } from "@/lib/utils";
import { NoPhoto, isPlaceholder } from "@/components/team/no-photo";

// The home page showcases the working team only: faculty advisors and project
// mentors live on the Team page instead. Matching the category by prefix keeps
// this working if "Faculty Advisors" is ever retitled.
const nonFacultyMembers = resolvedTeamCategories
  .filter((category) => !category.title.startsWith("Faculty"))
  .flatMap((category) => category.members)
  .filter((member) => !/mentor/i.test(member.role));

// Start the rotation on Animesh Mishra, as the old carousel did.
const start = Math.max(0, nonFacultyMembers.findIndex((member) => member.name === "Animesh Mishra"));
const voices = [...nonFacultyMembers.slice(start), ...nonFacultyMembers.slice(0, start)].map((member) => ({
  name: member.name,
  role: member.role,
  quote: member.bio || member.role,
  image: member.image,
}));

const INTERVAL = 6000;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One crew member at a time: portrait on the left, their words set large on the
 * right. Advances on its own while visible; arrows and the progress bar let you take over.
 */
export function TeamVoices() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const total = voices.length;
  const voice = voices[index];
  const playing = inView && !paused && !reduced;

  const go = useCallback((step: number) => setIndex((i) => (i + step + total) % total), [total]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => go(1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [playing, index, go]);

  if (!voice) return null;
  const long = voice.quote.length > 140;

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 md:grid-cols-12 md:gap-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-2xl bg-white/[0.04] md:col-span-5 md:max-w-none">
        <AnimatePresence initial={false} mode="popLayout">
          {isPlaceholder(voice.image) ? (
            <motion.div
              key={voice.name}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="absolute inset-0"
            >
              <NoPhoto name={voice.name} />
            </motion.div>
          ) : (
            <motion.img
              key={voice.name}
              src={voice.image}
              alt={voice.name}
              loading="lazy"
              initial={reduced ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="md:col-span-7">
        <div className="min-h-[220px] md:min-h-[260px]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={voice.name}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <blockquote
                className={cn(
                  "font-normal leading-[1.15] tracking-[-0.03em] text-white",
                  long ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl",
                )}
              >
                &ldquo;{voice.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <p className="text-lg text-white">{voice.name}</p>
                <p className="mt-1 font-mono text-xs text-slate-400">{voice.role}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous team member"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-tone hover:text-tone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next team member"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-tone hover:text-tone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone"
          >
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="ml-2 flex flex-1 items-center gap-4">
            <span className="font-mono text-xs tabular-nums text-white">
              {String(index + 1).padStart(2, "0")} <span className="text-slate-500">/ {String(total).padStart(2, "0")}</span>
            </span>
            <div className="relative h-px flex-1 overflow-hidden bg-white/10">
              <motion.div
                key={`${index}-${playing}`}
                className="absolute inset-y-0 left-0 w-full origin-left bg-tone"
                initial={{ scaleX: playing ? 0 : (index + 1) / total }}
                animate={{ scaleX: playing ? 1 : (index + 1) / total }}
                transition={{ duration: playing ? INTERVAL / 1000 : 0.4, ease: "linear" }}
              />
            </div>
          </div>
        </div>

        <Link
          to="/team"
          className="mt-8 inline-block text-sm text-slate-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-tone hover:decoration-tone"
        >
          See the whole crew
        </Link>
      </div>
    </div>
  );
}
