"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface TimelineYear {
  year: string;
  intro?: string;
  events: TimelineEvent[];
}

export const Timeline = ({ data }: { data: TimelineYear[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!timelineRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.target.getBoundingClientRect().height);
      }
    });
    observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div 
      ref={containerRef}
      className="w-full bg-[#0a1128] border border-slate-800/60 rounded-[2.5rem] font-sans px-4 py-10 md:px-10 md:py-16 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 border border-slate-800/50 rounded-[2.5rem] pointer-events-none z-20 m-2" />
      
      {/* Page Header Area */}
      <div className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-8 lg:px-10 relative z-10 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-5xl mb-4 text-white font-bold tracking-tight">
          Our Journey
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
          From a group of enthusiastic students to building state-of-the-art autonomous underwater vehicles, here is a chronological look at our milestones.
        </p>
      </div>

      {/* Main Timeline Section */}
      <div ref={timelineRef} className="relative max-w-5xl mx-auto pb-20 mt-8">
        
        {/* Base Center Timeline Line */}
        {/* On desktop: Centered. On mobile: Left-aligned at left-4 */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-cyan-500/10 -translate-x-1/2 pointer-events-none z-0 shadow-[0_0_8px_rgba(34,211,238,0.05)]" />

        {/* Animated Timeline Tracer Beam */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-4 md:left-1/2 top-4 w-[2px] bg-transparent -translate-x-1/2 pointer-events-none z-0 overflow-hidden"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-transparent via-blue-500 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.9)]"
          />
        </div>

        {/* Year Groups */}
        {data.map((yearGroup, yearIndex) => (
          <div key={yearGroup.year} className="mb-20 last:mb-0 relative z-10">
            
            {/* Centered Year Header Pill */}
            <div className="flex flex-col items-center justify-center mb-16 relative">
              {/* Year Label */}
              <div className="px-6 py-2 rounded-full border border-slate-700 bg-[#0a1128] text-2xl md:text-4xl font-black text-white tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.15)] relative z-10">
                {yearGroup.year}
              </div>

              {/* Year Intro Paragraph */}
              {yearGroup.intro && (
                <p className="text-slate-400 text-center max-w-xl text-xs md:text-sm mt-4 px-4 bg-[#0a1128] py-2 rounded-xl border border-slate-800/40 leading-relaxed">
                  {yearGroup.intro}
                </p>
              )}

              {/* Node underneath the year label */}
              <div className="w-5 h-5 rounded-full bg-[#0a1128] border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] mt-6 flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Events for this Year */}
            <div className="space-y-0 relative">
              {yearGroup.events.map((event, eventIndex) => {
                // Alternating Sides: Event 1 -> RIGHT, Event 2 -> LEFT, etc.
                const isLeft = eventIndex % 2 !== 0;

                return (
                  <div
                    key={eventIndex}
                    className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full mb-16 md:mb-28 last:mb-0 pl-10 md:pl-0"
                  >
                    
                    {/* LEFT Card Container (visible only on desktop) */}
                    <div
                      className={`hidden md:flex w-[43%] justify-end ${
                        isLeft ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      {isLeft && <CardContent event={event} isLeft={true} />}
                    </div>

                    {/* Timeline Node & Connectors */}
                    {/* Desktop: Centered on vertical line. Mobile: Left-4 */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 w-8 h-8">
                      {/* Interactive pulsing node */}
                      <motion.div 
                        initial={{ scale: 0.6, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.4 }}
                        className="h-4.5 w-4.5 rounded-full bg-[#0a1128] border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)] z-20 flex items-center justify-center cursor-default"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      </motion.div>

                      {/* Desktop Horizontal Connectors */}
                      <div
                        className={`hidden md:block absolute h-[1.5px] bg-cyan-400/30 ${
                          isLeft ? "right-4 w-[48px]" : "left-4 w-[48px]"
                        }`}
                      />

                      {/* Mobile Horizontal Connector */}
                      <div className="block md:hidden absolute left-4 w-6 h-[1.5px] bg-cyan-400/30" />
                    </div>

                    {/* RIGHT Card Container (desktop right-hand cards, mobile all cards) */}
                    <div
                      className={`w-full md:w-[43%] flex justify-start ${
                        !isLeft ? "opacity-100" : "md:pointer-events-none md:opacity-0"
                      }`}
                    >
                      <div className="w-full">
                        <div className={isLeft ? "block md:hidden" : "block"}>
                          <CardContent event={event} isLeft={false} />
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

// Sub-component for clean card rendering with subtle framer-motion entry transitions
const CardContent = ({ event, isLeft }: { event: TimelineEvent; isLeft: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -25 : 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="p-5 rounded-2xl border border-slate-700 bg-[#0a1128] hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300 w-full"
    >
      <span className="text-blue-400 font-mono text-xs block mb-1 uppercase tracking-wider">
        {event.date}
      </span>
      <h4 className="text-white text-lg font-bold tracking-tight">
        {event.title}
      </h4>
      <p className="text-slate-400 text-sm mt-2 leading-relaxed">
        {event.description}
      </p>
    </motion.div>
  );
};
