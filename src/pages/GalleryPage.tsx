import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLenis } from "@/components/ui/smooth-scroll";
import { Lightbox, type LightboxImage } from "@/components/gallery/lightbox";
import { FeatureReel } from "@/components/gallery/feature-reel";
import { DriftMasonry } from "@/components/gallery/drift-masonry";
import { archiveImages, featured, filterCounts, filters, isVideo, type GalleryItem } from "@/components/gallery/data";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const frameNumber = new Map(archiveImages.map((item, i) => [item, i + 1]));
const frameOf = (item: GalleryItem) => frameNumber.get(item) ?? 0;
const pad = (n: number) => String(n).padStart(3, "0");

export function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [viewer, setViewer] = useState<{ images: LightboxImage[]; index: number } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const archive = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const visible = useMemo(
    () => (filter === "all" ? archiveImages : archiveImages.filter((i) => i.category === filter)),
    [filter],
  );
  // The lightbox browses the stills in the current filter; videos play inline.
  const stills = useMemo(() => visible.filter((i) => !isVideo(i.src)), [visible]);

  const onLightbox = useCallback(
    (i: number | null) => setViewer((v) => (v && i !== null ? { ...v, index: i } : null)),
    [],
  );

  const pickFilter = (value: string) => {
    setFilter(value);
    // If the bar is stuck partway down the wall, return to the top of the archive.
    const el = archive.current;
    if (el && el.getBoundingClientRect().top < 0) {
      if (lenis) lenis.scrollTo(el, { offset: -40 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Header counters tick up once per visit.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".g-count", root.current).forEach((el) => {
        const counter = { v: 0 };
        gsap.to(counter, {
          v: Number(el.dataset.count ?? 0),
          duration: 2,
          delay: 0.6,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v));
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="flex min-h-screen flex-col">
      <PageHeader
        eyebrow="Gallery"
        title="Life in and"
        // Non-breaking space: "the" always wraps together with "water."
        accent="around the water."
        description="A visual journey through our team's projects, events, and achievements, from late nights in the workshop to RoboSub 2026 in California."
      >
        <dl className="flex gap-10 text-sm">
          <div>
            <dt className="font-mono text-xs text-slate-400">Moments</dt>
            <dd data-count={archiveImages.length} className="g-count mt-1 text-4xl font-semibold tracking-[-0.04em] tabular-nums text-white">{archiveImages.length}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-slate-400">Collections</dt>
            <dd data-count={filters.length - 1} className="g-count mt-1 text-4xl font-semibold tracking-[-0.04em] tabular-nums text-white">{filters.length - 1}</dd>
          </div>
        </dl>
      </PageHeader>

      <FeatureReel onOpen={(index) => setViewer({ images: featured, index })} />

      <section ref={archive} id="archive" className="relative flex-1 scroll-mt-28 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Archive"
            title="Every frame,"
            accent="in one place."
            description="Browse our vehicles, team moments, and underwater testing footage."
            className="mb-10 md:mb-12"
          />

          {/* Filter bar: sticks under the navbar while you browse the wall */}
          <div className="sticky top-[84px] z-20 -mx-2 mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#020617]/95 p-2 md:top-[92px]">
            <div role="group" aria-label="Filter archive" className="no-scrollbar flex gap-1 overflow-x-auto">
              {filters.map((f) => {
                const active = filter === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => pickFilter(f.value)}
                    className={cn(
                      "relative inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tone",
                      active ? "text-slate-950" : "text-slate-300 hover:text-white",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="gallery-filter"
                        className="absolute inset-0 rounded-xl bg-white"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{f.label}</span>
                    <span className={"relative font-mono text-[11px] tabular-nums text-slate-500"}>
                      {filterCounts[f.value]}
                    </span>
                  </button>
                );
              })}
            </div>
            <p aria-live="polite" className="hidden px-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 sm:block">
              Showing <span className="tabular-nums text-cyan-200">{pad(visible.length)}</span> / {pad(archiveImages.length)} frames
            </p>
          </div>

          <DriftMasonry
            items={visible}
            frameOf={frameOf}
            revealKey={filter}
            onOpen={(item) => setViewer({ images: stills, index: stills.indexOf(item) })}
          />
        </div>
      </section>

      <Lightbox images={viewer?.images ?? []} index={viewer ? viewer.index : null} onChange={onLightbox} />
      <Footer />
    </div>
  );
}
