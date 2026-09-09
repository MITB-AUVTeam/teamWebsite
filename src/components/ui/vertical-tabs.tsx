"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";

import ABOUT_TAB_1 from "@/assets/Gallery/about us page 1.jpeg";
import ABOUT_TAB_2 from "@/assets/Gallery/about us page 2.jpeg";
import ABOUT_TAB_3 from "@/assets/Gallery/about us page 3.jpeg";

const marqueeData = [
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

const features = [
  {
    title: "Why",
    description:
      "To create an environment where young students learn engineering through real systems, real problems, with real teamwork, and real responsibility under budget and time constraints, while developing cost-effective AUVs in India, for the world.",
    image: ABOUT_TAB_1,
    id: "01",
  },
  {
    title: "How",
    description:
      "Students from different engineering fields coming together after late nights to work even later nights full of rapid prototyping, frequent fixes, and more time than we’d like to admit with our heads in our hands to bring the bot to life.",
    image: ABOUT_TAB_2,
    id: "02",
  },
  {
    title: "What",
    description:
      "An autonomous underwater vehicle designed, built, broken, rebuilt, and tested almost entirely in-house. From the electronics that keep it running, to the frame that keeps it safe, to the software that brings it to life.",
    image: ABOUT_TAB_3,
    id: "03",
  },
];

export default function VerticalTabs() {
  const m1 = marqueeData.slice(0, marqueeData.length / 3);
  const m2 = marqueeData.slice(
    marqueeData.length / 3,
    (marqueeData.length / 3) * 2
  );
  const m3 = marqueeData.slice((marqueeData.length / 3) * 2);

  return (
    <section className="relative bg-transparent pt-12 pb-24 md:pb-32 w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Unified Card Container Panel (Matches the 'About Us' panel styling) */}
        <div className="bg-[#0a1128] border border-slate-800/60 rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 border border-slate-800/50 rounded-[2.5rem] pointer-events-none z-20 m-2" />
          
          {/* Section Header */}
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-4 px-5 text-center md:px-10 mb-12 relative z-10">
            <h2 className="max-w-3xl font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter leading-none bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Mission & Vision
            </h2>
            <p className="max-w-2xl text-slate-400 text-sm md:text-base leading-relaxed tracking-tight">
              Pioneering the future of marine robotics through hands-on engineering and continuous iteration.
            </p>
            
            {/* Scrolling Badges Container */}
            <div className="relative mx-auto max-w-4xl overflow-hidden w-full pt-6">
              <div className="absolute left-0 z-50 h-full w-24 bg-gradient-to-r from-[#0a1128] to-transparent pointer-events-none" />
              <div className="absolute right-0 z-50 h-full w-24 bg-gradient-to-l from-[#0a1128] to-transparent pointer-events-none" />

              <div className="flex flex-col space-y-3 w-full">
                <Marquee className="[--duration:35s] [--gap:0.75rem]" repeat={3}>
                  {m1.map((q) => (
                    <Badge
                      className="rounded-full border-slate-850 bg-slate-950/60 px-4 py-1.5 font-mono text-xs text-cyan-400 hover:border-slate-700/50 hover:bg-slate-900/60 transition-colors"
                      key={q}
                      variant="outline"
                    >
                      {q}
                    </Badge>
                  ))}
                </Marquee>

                <Marquee
                  className="[--duration:40s] [--gap:0.75rem]"
                  repeat={3}
                  reverse
                >
                  {m2.map((q) => (
                    <Badge
                      className="rounded-full border-slate-850 bg-slate-950/60 px-4 py-1.5 font-mono text-xs text-cyan-400 hover:border-slate-700/50 hover:bg-slate-900/60 transition-colors"
                      key={q}
                      variant="outline"
                    >
                      {q}
                    </Badge>
                  ))}
                </Marquee>

                <Marquee className="[--duration:32s] [--gap:0.75rem]" repeat={3}>
                  {m3.map((q) => (
                    <Badge
                      className="rounded-full border-slate-850 bg-slate-950/60 px-4 py-1.5 font-mono text-xs text-cyan-400 hover:border-slate-700/50 hover:bg-slate-900/60 transition-colors"
                      key={q}
                      variant="outline"
                    >
                      {q}
                    </Badge>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>

          {/* Features Pillars Grid */}
          <div className="mt-12 grid grid-cols-1 divide-y divide-slate-800/60 divide-dashed border-slate-800/60 border-t border-dashed md:grid-cols-3 md:divide-y-0 md:divide-x relative z-10">
            {features.map((feature) => (
              <div
                className="flex flex-col gap-6 px-4 py-8 md:py-12 hover:bg-slate-900/[0.04] transition-all duration-300"
                key={feature.title}
              >
                {/* Premium Image Container */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl group">
                  <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-3 pt-4">
                  <span className="font-mono text-xs text-cyan-400 font-bold tracking-widest block">
                    /{feature.id}
                  </span>
                  <h3 className="font-black text-3xl md:text-4xl text-white uppercase tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-slate-400 text-sm md:text-base tracking-tight">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
