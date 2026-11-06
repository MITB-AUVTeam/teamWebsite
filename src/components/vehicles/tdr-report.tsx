import { ArrowUpRight } from "lucide-react";
import tdrPdf from "@/assets/tdr/TDR_Team AUV MIT-B_RS2026.pdf";
import tdrCover from "@/assets/tdr/tdr-cover.webp";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";

interface Chapter {
  num: string;
  title: string;
  page: number;
  parts?: { title: string; page: number }[];
}

/** The report's own table of contents; each row opens the PDF at that page. */
const CONTENTS: Chapter[] = [
  { num: "I", title: "Competition strategy", page: 1 },
  {
    num: "II",
    title: "Design strategy",
    page: 1,
    parts: [
      { title: "Mechanical", page: 2 },
      { title: "Electrical", page: 2 },
      { title: "Software", page: 4 },
      { title: "Controls", page: 5 },
    ],
  },
  { num: "III", title: "Testing strategy", page: 6 },
  { num: "A", title: "Component specification", page: 8 },
  { num: "B", title: "Localization with RTAB‑Map", page: 10 },
  { num: "C", title: "Electrical and control architecture", page: 11 },
  { num: "D", title: "Outreach activities", page: 12 },
];

const at = (page: number) => `${tdrPdf}#page=${page}`;
const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * The design report as a printed document: its cover on a small stack of pages,
 * beside a contents list that opens the PDF at the right page. Nothing heavy loads
 * until a visitor asks for it, and it reads the same on a phone.
 */
export function TdrReport() {
  return (
    <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
      <Reveal className="lg:col-span-5">
        <a
          href={tdrPdf}
          {...newTab}
          data-cursor="Read"
          aria-label="Open the technical design report (PDF, new tab)"
          className="group relative mx-auto block w-full max-w-[300px] sm:max-w-[400px] [perspective:1400px]"
        >
          {/* The pages underneath */}
          <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rotate-[3deg] rounded-[3px] bg-[#c9d3e0]/[0.10] ring-1 ring-white/10 transition-transform duration-700 ease-out group-hover:translate-x-5 group-hover:rotate-[5deg]" />
          <span aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[1.4deg] rounded-[3px] bg-[#c9d3e0]/[0.16] ring-1 ring-white/10 transition-transform duration-700 ease-out group-hover:translate-x-2.5 group-hover:rotate-[2.4deg]" />
          <span className="relative block overflow-hidden rounded-[3px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_60px_-20px_var(--t1)] transition-transform duration-700 ease-out [transform:rotateY(-6deg)_rotate(-1deg)] group-hover:[transform:rotateY(0deg)_rotate(0deg)_translateY(-6px)]">
            <img
              src={tdrCover}
              alt="First page of the Technical Design Report of Deuterium"
              width={900}
              height={1165}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
            {/* Light catching the paper */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/25 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
          </span>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#020617]/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-300 transition-colors group-hover:border-tone/50 group-hover:text-white">
            RoboSub 2026 · TDR
          </span>
        </a>
      </Reveal>

      <Reveal className="lg:col-span-7" delay={0.1}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
          <span className="text-tone">Contents</span>
          <span>PDF · 12 pages</span>
          <span>IEEE two-column</span>
        </div>

        <ol className="mt-6 border-t border-white/10">
          {CONTENTS.map((c) => (
            <li key={c.num} className="border-b border-white/10">
              <a
                href={at(c.page)}
                {...newTab}
                className="group flex items-baseline gap-5 py-4 transition-colors"
              >
                <span className="w-8 shrink-0 font-mono text-xs text-tone/80">{c.num}</span>
                <span className="text-base text-slate-200 transition-colors group-hover:text-white md:text-lg">{c.title}</span>
                <span aria-hidden="true" className="mb-1 flex-1 border-b border-dotted border-white/15 transition-colors group-hover:border-tone/40" />
                <span className="font-mono text-xs tabular-nums text-slate-500 transition-colors group-hover:text-white">
                  p.{String(c.page).padStart(2, "0")}
                </span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 self-center text-slate-600 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>
              {c.parts && (
                <ul className="-mt-1 flex flex-wrap gap-2 pb-4 pl-[3.25rem]">
                  {c.parts.map((p) => (
                    <li key={p.title}>
                      <a
                        href={at(p.page)}
                        {...newTab}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400 transition-colors hover:border-tone/50 hover:text-white"
                      >
                        {p.title}
                        <span className="font-mono text-[11px] tabular-nums text-slate-500">p.{p.page}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <PillButton href={tdrPdf} newTab>
            Read the report
          </PillButton>
          <PillButton href={tdrPdf} download="RoboSub_2026_TDR.pdf" variant="ghost">
            Download PDF
          </PillButton>
        </div>
      </Reveal>
    </div>
  );
}
