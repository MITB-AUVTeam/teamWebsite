"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const SERVICES = [
  {
    id: "01",
    title: "What",
    description:
      "We aim to design and develop autonomous underwater vehicles for applications such as defense surveillance, acoustic signal detection, and search-and-rescue operations, focusing on modular and scalable AUV platforms.",
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Why",
    description: "India's maritime security and underwater operations demand indigenous, reliable AUV technologies. Our vision is to contribute to self-reliant defense systems while giving students hands on experience in solving real engineering challenges.",
    image:
      "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "How",
    description:
      "By integrating in house mechanical design, embedded electronics, and real time signal processing, validated through extensive field testing, we build cost effective and mission ready AUV systems aligned with defense and industry needs.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
  },
];

const AUTO_PLAY_DURATION = 3000;

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
    enter: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="w-full bg-transparent py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-8">
            <div className="space-y-2 mb-16">
              <h2 className="tracking-tight text-balance text-4xl font-bold md:text-5xl lg:text-6xl text-white">
                Our Approach
              </h2>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-[0.3em] block ml-1">
                (MISSION & VISION)
              </span>
            </div>

            <div className="flex flex-col space-y-0">
              {SERVICES.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-6 py-8 md:py-10 text-left transition-all duration-500 border-t border-white/10 first:border-0",
                      isActive
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-300"
                    )}
                  >
                    <div className="absolute left-[-24px] md:left-[-32px] top-0 bottom-0 w-[2px] bg-white/10">
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
                              duration: 2,
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
          <div className="lg:col-span-7 flex flex-col justify-end h-full order-1 lg:order-2">
            <div
              className="relative group/gallery"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[16/11] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-900">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
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

                {/* Navigation Controls */}
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-3 md:gap-4 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all active:scale-90 shadow-sm"
                    aria-label="Previous"
                  >
                    <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all active:scale-90 shadow-sm"
                    aria-label="Next"
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
