"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

import ABOUT_TAB_1 from "@/assets/Gallery/about us page 1.jpeg";
import ABOUT_TAB_2 from "@/assets/Gallery/about us page 2.jpeg";
import ABOUT_TAB_3 from "@/assets/Gallery/about us page 3.jpeg";

const SERVICES = [
  {
    id: "01",
    title: "Why",
    description:
      "Students from different engineering fields coming together after late nights to work even later nights full of rapid prototyping, frequent fixes, and more time than we’d like to admit with our heads in our hands. All for the purpose of bringing that bot to life.",
    image: ABOUT_TAB_1,
  },
  {
    id: "02",
    title: "How",
    description:
      "Students from different engineering fields work together to build underwater robots. Learning happens through designing, solving problems, testing ideas, and taking part in competitions as a team.",
    image: ABOUT_TAB_2,
  },
  {
    id: "03",
    title: "What",
    description:
      "Autonomous underwater vehicles are designed and built using mechanical parts, electronics, and software. The robots are tested carefully to work in real underwater conditions.",
    image: ABOUT_TAB_3,
  },
];

const AUTO_PLAY_DURATION = 8000;

export default function VerticalTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: () => ({
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: () => ({
      zIndex: 0,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full bg-transparent pt-4 pb-12 md:pb-24 lg:pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* Left Column: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-2">
            <div className="space-y-2 mb-12">
              <h2 className="tracking-tight text-balance text-3xl font-bold md:text-5xl lg:text-6xl text-white">
                Mission & Vision
              </h2>
            </div>

            <div className="flex flex-col space-y-0">
              {SERVICES.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-6 py-6 md:py-10 text-left transition-all duration-500 border-t border-white/10 first:border-0 pl-6 md:pl-0",
                      isActive
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-300"
                    )}
                  >
                    <div className="absolute left-0 md:left-[-32px] top-0 bottom-0 w-[2px] bg-white/10">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute top-0 left-0 w-full bg-blue-500 origin-top"
                          initial={{ height: "0%" }}
                          animate={
                            isPaused ? { height: "0%" } : { height: "100%" }
                          }
                          transition={{
                            duration: AUTO_PLAY_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </div>

                    <span className="text-xs md:text-sm font-medium mt-1.5 tabular-nums opacity-50">
                      /{service.id}
                    </span>

                    <div className="flex flex-col gap-3 flex-1">
                      <span
                        className={cn(
                          "text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight transition-colors duration-500",
                          isActive ? "text-white" : ""
                        )}
                      >
                        {service.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 1.5,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-slate-400 text-base md:text-lg font-normal leading-relaxed max-w-md pb-4">
                              {service.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full order-1 lg:order-2">
            <div
              className="relative group/gallery w-full lg:max-w-[85%] lg:mx-auto transform lg:translate-x-6"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-900 border border-slate-800/80 shadow-2xl">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="wait"
                >
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={handleNext}
                  >
                    <img
                      src={SERVICES[activeIndex].image}
                      alt={SERVICES[activeIndex].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/gallery:scale-105"
                    />

                    {/* Subtle gradient overlay for better text contrast if needed */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
