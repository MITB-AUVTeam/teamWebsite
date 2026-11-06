import type { HTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "@/components/media/article-reader";
import { CHANNEL_COLOR, channelOf, logId, readLabel } from "@/components/media/media-utils";

interface ArticleLinkProps extends Omit<HTMLAttributes<HTMLElement>, "onClick"> {
  post: Post;
  onOpen: (post: Post) => void;
  children: ReactNode;
}

/**
 * Wraps a teaser so it opens the post: external posts are real links, internal
 * ones are buttons that open the reader. Both work from the keyboard.
 */
export function ArticleLink({ post, onOpen, children, className, ...rest }: ArticleLinkProps) {
  const classes = cn(
    "group block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone focus-visible:ring-offset-4 focus-visible:ring-offset-[#020617]",
    className,
  );
  if (post.externalLink) {
    return (
      <a href={post.externalLink} target="_blank" rel="noopener noreferrer" className={classes} data-cursor="Read" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(post)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(post);
        }
      }}
      className={classes}
      data-cursor="Read"
      aria-label={`Read article: ${post.title}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Coloured signal dot plus channel name. */
export function ChannelTag({ post, className }: { post: Post; className?: string }) {
  const channel = channelOf(post);
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: CHANNEL_COLOR[channel], boxShadow: `0 0 8px ${CHANNEL_COLOR[channel]}` }} />
      {channel}
    </span>
  );
}

/** Grid teaser: framed photo with a log stamp, then metadata, title and byline. */
export function ArticleCard({ post, onOpen, log }: { post: Post; onOpen: (post: Post) => void; log: number }) {
  return (
    <ArticleLink post={post} onOpen={onOpen} className="flex h-full flex-col rounded-2xl">
      <div className="m-frame hud-lock relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="m-img h-full w-full object-cover transition-[scale,filter] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] [filter:saturate(0.85)] group-hover:scale-[1.07] group-hover:[filter:saturate(1.1)]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-[#020617]/30" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#020617]/85 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-100">
          {logId(log)}
        </span>
        <span className="absolute bottom-4 right-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80">{readLabel(post)}</span>
        {/* Scan line passes over the photo on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-y-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-full motion-reduce:hidden">
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-cyan-300/15" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-cyan-200/80 shadow-[0_0_14px_2px_rgba(103,232,249,0.5)]" />
        </span>
      </div>
      <div className="m-body flex flex-1 flex-col pt-6">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500">
          <ChannelTag post={post} className="text-slate-300" />
          <span>{post.date}</span>
        </p>
        <h3 className="m-title mt-3 text-xl md:text-2xl font-semibold leading-snug tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-tone-soft">
          {post.title}
        </h3>
        <p className="mb-6 mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5 text-sm">
          <span className="text-slate-300">{post.author}</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition duration-300 group-hover:rotate-45 group-hover:border-tone group-hover:bg-tone group-hover:text-slate-950">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </ArticleLink>
  );
}
