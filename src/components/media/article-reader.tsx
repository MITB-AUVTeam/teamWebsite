import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { MarkdownContent } from "@/components/media/markdown-content";
import { CHANNEL_COLOR, channelOf, logId, readLabel } from "@/components/media/media-utils";

export interface Post {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  content?: string[];
  markdown?: string;
  externalLink?: string;
  /** Legacy flag from the acoustics post; no longer rendered. */
  sonarPing?: boolean;
}

/** Older posts store paragraphs as an array; short unpunctuated lines read as subheadings. */
function ParagraphContent({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((para, idx) => {
        if (para.startsWith("●") || para.startsWith("-")) {
          return (
            <p key={idx} className="relative pl-6 before:absolute before:left-1 before:top-[0.75em] before:h-1.5 before:w-1.5 before:rotate-45 before:bg-tone before:content-['']">
              {para.replace(/^[●\-]\s*/, "")}
            </p>
          );
        }
        const isHeading =
          (para.length < 85 && !para.endsWith(".")) ||
          /^[123]\. /.test(para) ||
          para.startsWith("Upcoming Events");
        if (isHeading) {
          return (
            <h3 key={idx} className="pt-10 text-2xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-[1.85rem]">
              {para}
            </h3>
          );
        }
        return <p key={idx}>{para}</p>;
      })}
    </>
  );
}

interface ArticleReaderProps {
  post: Post | null;
  onClose: () => void;
  /** Every post in display order, for previous / next links. */
  posts?: Post[];
  onNavigate?: (post: Post) => void;
  logOf?: (post: Post) => number;
}

/**
 * Full-screen reading view, portaled above the navbar. Locks page scroll (Lenis
 * pauses with it), traps focus, closes on Escape and hands focus back on close.
 */
export function ArticleReader({ post, onClose, posts = [], onNavigate, logOf }: ArticleReaderProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const open = post !== null;

  // Lock, focus and restore once per open, not on every article change.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, onClose]);

  // A new article starts at the top with the progress bar reset.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
  }, [post]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el || !progressRef.current) return;
    const max = el.scrollHeight - el.clientHeight;
    progressRef.current.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`;
  };

  const readable = posts.filter((p) => !p.externalLink);
  const index = post ? readable.indexOf(post) : -1;
  const newer = index > 0 ? readable[index - 1] : null;
  const older = index >= 0 && index < readable.length - 1 ? readable[index + 1] : null;
  const channel = post ? channelOf(post) : "Other";

  return createPortal(
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[20000] flex items-end justify-center bg-[#01040c]/80 sm:items-center sm:p-6"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={post.title}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#050d22] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:h-[90vh] sm:rounded-3xl"
          >
            {/* Header bar with reading progress */}
            <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/[0.07] bg-[#050d22] px-5 py-3 md:px-8">
              <p className="flex min-w-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: CHANNEL_COLOR[channel], boxShadow: `0 0 8px ${CHANNEL_COLOR[channel]}` }}
                />
                <span className="truncate">
                  {logOf ? `${logId(logOf(post))} // ` : ""}
                  {channel} // {readLabel(post)}
                </span>
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close article"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:border-tone hover:bg-tone hover:text-slate-950"
              >
                <X className="h-4 w-4" />
              </button>
              <div aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-px bg-white/5">
                <div
                  ref={progressRef}
                  className="h-full origin-left bg-gradient-to-r from-tone-deep via-tone to-tone-soft shadow-[0_0_10px_var(--t1)]"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>

            <div ref={scrollRef} onScroll={onScroll} data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain">
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {post.image && (
                  <div className="relative h-60 w-full overflow-hidden md:h-[26rem]">
                    <img src={post.image} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050d22] via-[#050d22]/30 to-transparent" />
                  </div>
                )}
                <article className="relative mx-auto -mt-16 max-w-[44rem] px-6 pb-16 md:-mt-24 md:px-10">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-tone-soft">{post.date}</p>
                  <h2 className="mt-4 text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-[3.25rem]">
                    {post.title}
                  </h2>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/[0.07] py-4 text-sm text-slate-400">
                    <span>
                      By <span className="text-white">{post.author}</span>
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em]">{post.category}</span>
                  </div>
                  <p className="mt-8 text-lg leading-relaxed text-slate-200 md:text-xl">{post.excerpt}</p>
                  <div className="mt-8 space-y-6 text-[17px] leading-[1.8] text-slate-300 md:text-[18px]">
                    {post.markdown ? (
                      <MarkdownContent text={post.markdown} />
                    ) : post.content ? (
                      <ParagraphContent paragraphs={post.content} />
                    ) : null}
                  </div>

                  {onNavigate && (newer || older) && (
                    <nav aria-label="More articles" className="mt-16 grid gap-3 border-t border-white/[0.07] pt-8 sm:grid-cols-2">
                      {older ? (
                        <button
                          type="button"
                          onClick={() => onNavigate(older)}
                          className="group rounded-2xl border border-white/10 p-5 text-left transition-colors hover:border-tone/50 hover:bg-white/[0.03]"
                        >
                          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> Previous log
                          </span>
                          <span className="mt-2 block font-semibold leading-snug text-white">{older.title}</span>
                        </button>
                      ) : (
                        <span />
                      )}
                      {newer && (
                        <button
                          type="button"
                          onClick={() => onNavigate(newer)}
                          className="group rounded-2xl border border-white/10 p-5 text-right transition-colors hover:border-tone/50 hover:bg-white/[0.03]"
                        >
                          <span className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                            Next log <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                          <span className="mt-2 block font-semibold leading-snug text-white">{newer.title}</span>
                        </button>
                      )}
                    </nav>
                  )}
                </article>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
