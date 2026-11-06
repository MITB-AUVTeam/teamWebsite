import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { CrewLinks } from "./crew-links";
import type { CrewMember } from "./types";
import { NoPhoto, isPlaceholder } from "./no-photo";

export interface DossierEntry {
  member: CrewMember;
  code: string;
  group: string;
}

interface CrewDossierProps {
  entry: DossierEntry | null;
  onClose: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Side drawer with a member's full file. Locks page scroll (Lenis pauses on its
 * own), traps Tab inside, closes on Escape or backdrop click; the caller
 * returns focus to the card that opened it.
 */
export function CrewDossier({ entry, onClose }: CrewDossierProps) {
  const panel = useRef<HTMLDivElement>(null);
  const open = Boolean(entry);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {entry && (
        <motion.div
          key="dossier"
          className="fixed inset-0 z-[10002] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button type="button" aria-label="Close dossier" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-[#01040c]/70 backdrop-blur-sm" />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dossier-name"
            data-lenis-prevent
            className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-cyan-300/15 bg-[#030a1a] shadow-[-40px_0_120px_rgba(0,0,0,0.6)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-[#030a1a]/90 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-200/80 backdrop-blur-xl sm:px-8">
              <span className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
                Dossier // {entry.code}
              </span>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-cyan-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <X className="h-4 w-4" aria-hidden />
                <span className="sr-only">Close</span>
              </button>
            </header>

            <div className="p-6 sm:p-8">
              <motion.div
                className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              >
                {isPlaceholder(entry.member.image) ? (
                  <NoPhoto name={entry.member.name} />
                ) : (
                  <img src={entry.member.image} alt={entry.member.name} className="absolute inset-0 h-full w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a] via-transparent to-transparent" />
                <span aria-hidden="true" className="cm-scan-loop pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent" />
                {/* Corner brackets */}
                {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((c) => (
                  <span key={c} aria-hidden="true" className={`absolute h-6 w-6 border-cyan-300/70 ${c}`} />
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}>
                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">{entry.member.role}</p>
                <h2 id="dossier-name" className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  {entry.member.name}
                </h2>
                {entry.member.bio?.trim() && (
                  <p className="mt-6 font-serif text-2xl italic leading-snug text-slate-200">“{entry.member.bio}”</p>
                )}

                <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.06] font-mono text-xs">
                  {[
                    { k: "Group", v: entry.group },
                    { k: "Badge", v: entry.code },
                    { k: "Branch", v: entry.member.department },
                    { k: "Station", v: entry.member.location },
                  ]
                    .filter((r) => r.v)
                    .map((r) => (
                      <div key={r.k} className="bg-[#030a1a] p-4">
                        <dt className="uppercase tracking-[0.2em] text-slate-500">{r.k}</dt>
                        <dd className="mt-2 font-sans text-sm leading-snug text-slate-200">{r.v}</dd>
                      </div>
                    ))}
                </dl>

                {!!entry.member.skills?.length && (
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
                    {entry.member.skills.map((s) => (
                      <li key={s} className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-100">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}

                <CrewLinks member={entry.member} labelled className="mt-8" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
