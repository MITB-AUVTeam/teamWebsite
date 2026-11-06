import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import type { Post } from "@/components/media/article-reader";
import { ArticleLink, ChannelTag } from "@/components/media/article-card";
import { logId, readLabel } from "@/components/media/media-utils";

/**
 * Featured article as an incoming transmission: a wide photo that irises open,
 * targeting brackets, a scrambling signal header and the headline rising word by word.
 */
export function TransmissionHero({ post, log, onOpen }: { post: Post; log: number; onOpen: (post: Post) => void }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const split = SplitText.create(".t-title", { type: "words", mask: "words" });
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 85%", once: true } })
        .fromTo(".t-frame", { clipPath: "inset(48% 48% 48% 48% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.8, ease: "expo.inOut" })
        .from(".t-img", { scale: 1.4, duration: 2.4 }, 0)
        .from(".t-corner", { scale: 2, autoAlpha: 0, stagger: 0.06, duration: 1 }, 0.9)
        .from(".t-signal > *", { autoAlpha: 0, y: -10, stagger: 0.08, duration: 0.8 }, 1)
        .from(split.words, { yPercent: 110, stagger: 0.04, duration: 1.2 }, 1.1)
        .from(".t-rest > *", { autoAlpha: 0, y: 20, stagger: 0.08, duration: 1 }, 1.4);
      gsap.fromTo(
        ".t-img",
        { yPercent: -5 },
        { yPercent: 5, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 } },
      );
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="mx-auto w-full max-w-7xl px-5 pt-16 sm:px-8 md:pt-24">
      <ArticleLink post={post} onOpen={onOpen} className="rounded-3xl">
        <div className="t-frame relative overflow-hidden rounded-3xl border border-white/10 bg-[#030b1c]">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]">
            <img
              src={post.image}
              alt=""
              className="t-img absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 [filter:saturate(0.8)_brightness(0.8)] group-hover:[filter:saturate(1)_brightness(0.9)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/55 to-[#020617]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/80 via-transparent to-transparent" />
            {/* Scanlines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 4px)" }}
            />
          </div>

          {/* Targeting brackets */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-4 md:inset-6">
            <span className="t-corner absolute left-0 top-0 h-6 w-6 border-l border-t border-cyan-200/70" />
            <span className="t-corner absolute right-0 top-0 h-6 w-6 border-r border-t border-cyan-200/70" />
            <span className="t-corner absolute bottom-0 left-0 h-6 w-6 border-b border-l border-cyan-200/70" />
            <span className="t-corner absolute bottom-0 right-0 h-6 w-6 border-b border-r border-cyan-200/70" />
          </div>

          <div className="t-signal absolute inset-x-8 top-8 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-100/80 md:inset-x-12 md:top-10">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-red-400/70 motion-reduce:hidden" />
                <span className="relative h-2 w-2 rounded-full bg-red-400" />
              </span>
              Incoming transmission
            </span>
            <span className="hidden sm:inline">{logId(log)} // Featured</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 lg:p-14">
            <div className="max-w-3xl">
              <h2 className="t-title text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">{post.title}</h2>
              <div className="t-rest">
                <p className="mt-5 hidden max-w-2xl text-base leading-relaxed text-slate-300 md:block md:text-lg">{post.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">
                  <ChannelTag post={post} className="text-slate-200" />
                  <span>{post.date}</span>
                  <span>{readLabel(post)}</span>
                  <span className="text-slate-300">{post.author}</span>
                </div>
              </div>
            </div>
          </div>

          <span className="absolute bottom-8 right-8 hidden h-16 w-16 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur-sm transition duration-300 group-hover:rotate-45 group-hover:scale-110 group-hover:border-tone group-hover:bg-tone group-hover:text-slate-950 md:flex lg:bottom-12 lg:right-12">
            <ArrowUpRight className="h-6 w-6" />
          </span>
        </div>
      </ArticleLink>
    </section>
  );
}
