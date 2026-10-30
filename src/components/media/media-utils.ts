import type { Post } from "@/components/media/article-reader";

export type Channel = "Electrical" | "Mechanical" | "Software" | "Memoir" | "Outreach" | "Other";

/** Short channel name from a post's long category, e.g. "Technical / Electrical Subsystem" -> "Electrical". */
export function channelOf(post: Post): Channel {
  const c = post.category.toLowerCase();
  if (c.includes("electrical")) return "Electrical";
  if (c.includes("mechanical")) return "Mechanical";
  if (c.includes("software")) return "Software";
  if (c.includes("memoir")) return "Memoir";
  if (c.includes("outreach")) return "Outreach";
  return "Other";
}

/** Accent colour for each channel's signal dot. */
export const CHANNEL_COLOR: Record<Channel, string> = {
  Electrical: "#facc15",
  Mechanical: "#a78bfa",
  Software: "#67e8f9",
  Memoir: "#f9a8d4",
  Outreach: "#86efac",
  Other: "#94a3b8",
};

/** Estimated minutes to read, or null for posts hosted elsewhere. */
export function readMinutes(post: Post): number | null {
  if (post.externalLink && !post.markdown && !post.content) return null;
  const text = post.markdown ?? post.content?.join(" ") ?? post.excerpt;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function readLabel(post: Post) {
  const m = readMinutes(post);
  return m === null ? "External" : `${m} min read`;
}

/** Zero-padded log number, e.g. 7 -> "LOG 007". */
export const logId = (n: number) => `LOG ${String(n).padStart(3, "0")}`;
