import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { StackCards } from "@/components/ui/stack-cards";
import ABOUT_TAB_1 from "@/assets/Gallery/about us page 1.jpeg";
import ABOUT_TAB_2 from "@/assets/Gallery/about us page 2.jpeg";
import ABOUT_TAB_3 from "@/assets/Gallery/about us page 3.jpeg";

const QUESTIONS = [
  "How do we localize using passive acoustics?",
  "What's the best thruster configuration for pitch control?",
  "How do we prevent leak-induced short circuits?",
  "Which IMU filter handles magnetic noise best?",
  "How does YOLO run real-time on a Jetson Orin?",
  "Why carbon fiber over acrylic for the main AUV hull?",
  "How do we coordinate mechanical, electrical, and software?",
  "What is the team structure of AUV MIT-B?",
  "How do we secure sponsorships for marine tech?",
  "How do we tune thruster response telemetry?",
  "What's the best way to handle battery thermal stability?",
  "How do we test buoyancy in a pool?",
];

const STATEMENTS = [
  {
    title: "Why",
    description:
      "To create an environment where young students learn engineering through real systems, real problems, with real teamwork, and real responsibility under budget and time constraints, while developing cost-effective AUVs in India, for the world.",
    image: ABOUT_TAB_1,
  },
  {
    title: "How",
    description:
      "Students from different engineering fields coming together after late nights to work even later nights full of rapid prototyping, frequent fixes, and more time than we’d like to admit with our heads in our hands to bring the bot to life.",
    image: ABOUT_TAB_2,
  },
  {
    title: "What",
    description:
      "An autonomous underwater vehicle designed, built, broken, rebuilt, and tested almost entirely in-house. From the electronics that keep it running, to the frame that keeps it safe, to the software that brings it to life.",
    image: ABOUT_TAB_3,
  },
];

/** Why / How / What as cards that pin and pile up on each other while scrolling. */
export function MissionStatements() {
  return (
    <StackCards
      items={STATEMENTS.map((s, i) => (
        <div key={s.title} className="grid min-h-[60vh] md:grid-cols-2">
          <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
            <span className="text-sm tabular-nums text-slate-500">0{i + 1} / 03</span>
            <div>
              <h3 className="text-6xl md:text-8xl font-semibold tracking-[-0.05em] text-white">
                {s.title}
                <span className="font-serif italic font-normal text-water">?</span>
              </h3>
              <p className="mt-6 max-w-md text-lg md:text-xl leading-relaxed text-slate-300">{s.description}</p>
            </div>
          </div>
          <div className="relative min-h-[260px] overflow-hidden">
            <img src={s.image} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      ))}
    />
  );
}

/** Quiet scrolling band of the questions the team works through. */
export function QuestionsBand() {
  const rows = [QUESTIONS.slice(0, 6), QUESTIONS.slice(6)];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      {rows.map((row, r) => (
        // GSAP drift on top of the CSS marquee: rows slide apart as the band scrolls through
        <div key={r} data-gsap="drift" data-speed={r === 0 ? -14 : 14}>
          <Marquee reverse={r === 1} repeat={3} pauseOnHover className="[--duration:60s] [--gap:0.75rem] py-1.5">
            {row.map((q) => (
              <span key={q} className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400">
                {q}
              </span>
            ))}
          </Marquee>
        </div>
      ))}
    </div>
  );
}
