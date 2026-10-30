import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { Post } from "@/components/media/article-reader";
import { ArticleLink, ChannelTag } from "@/components/media/article-card";
import { logId, readLabel } from "@/components/media/media-utils";

interface LogIndexProps {
  posts: Post[];
  logOf: (post: Post) => number;
  onOpen: (post: Post) => void;
}

/**
 * Numbered mission log of every post. On a mouse, a preview of the hovered
 * article's photo trails the cursor; touch screens get a small thumbnail per row.
 */
export function LogIndex({ posts, logOf, onOpen }: LogIndexProps) {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // The preview chases the pointer with a little lag and tilts toward the motion.
  useGSAP(
    () => {
      const el = preview.current;
      if (!el || !window.matchMedia("(pointer: fine)").matches) return;
      const x = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
      const r = gsap.quickTo(el, "rotate", { duration: 0.9, ease: "power3.out" });
      let lastX = 0;
      const onMove = (e: PointerEvent) => {
        x(e.clientX);
        y(e.clientY);
        r(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative" onPointerLeave={() => setActive(null)}>
      <ol className="border-t border-white/10">
        {posts.map((post, i) => (
          <li key={post.title} className="m-item border-b border-white/10" onPointerEnter={() => setActive(i)}>
            <ArticleLink
              post={post}
              onOpen={onOpen}
              onFocus={() => setActive(i)}
              className="relative isolate grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 overflow-hidden py-6 md:grid-cols-[7rem_1fr_10rem_9rem_auto] md:gap-x-8 md:py-8"
            >
              {/* Hover wash sweeps in from the left */}
              <span className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-cyan-400/[0.08] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              <img src={post.image} alt="" loading="lazy" className="h-14 w-14 rounded-lg object-cover md:hidden" />
              <span className="hidden font-mono text-xs tracking-[0.15em] text-slate-500 transition-colors group-hover:text-tone md:block">{logId(logOf(post))}</span>
              <span className="min-w-0">
                <span className="block text-lg font-semibold leading-snug tracking-[-0.02em] text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:text-2xl lg:text-[1.7rem]">
                  {post.title}
                </span>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 md:hidden">
                  {post.date} · {readLabel(post)}
                </span>
              </span>
              <ChannelTag post={post} className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-slate-300 md:inline-flex" />
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 md:block">
                {post.date}
                <span className="block text-slate-500">{readLabel(post)}</span>
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-tone group-hover:bg-tone group-hover:text-slate-950">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </ArticleLink>
          </li>
        ))}
      </ol>

      {/* Cursor-following preview (fine pointers only) */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[50] hidden lg:pointer-fine:block"
      >
        <div
          className={cn(
            "relative -ml-[9rem] -mt-[13rem] h-[12rem] w-[18rem] overflow-hidden rounded-2xl border border-cyan-200/30 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-[opacity,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            active === null ? "scale-75 opacity-0" : "scale-100 opacity-100",
          )}
        >
          {posts.map((post, i) => (
            <img
              key={post.title}
              src={post.image}
              alt=""
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-[opacity,scale] duration-500",
                active === i ? "scale-100 opacity-100" : "scale-110 opacity-0",
              )}
            />
          ))}
          <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-100 drop-shadow">
            {active !== null && posts[active] ? logId(logOf(posts[active])) : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
