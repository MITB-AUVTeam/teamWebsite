import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is RoboSub?",
    answer: "RoboSub is an international student competition where teams from around the world design and build autonomous underwater vehicles (AUVs) to complete complex underwater tasks such as navigation, object detection, acoustic localization, and robotic manipulation."
  },
  {
    question: "How does the vehicle navigate underwater without GPS?",
    answer: "Since GPS signals do not penetrate water, our AUVs use a custom sensor fusion algorithm. We combine dead reckoning sensors (BNO055 IMU), depth/pressure telemetry, ZED 2i stereoscopic cameras for visual odometry, and hydrophones for active acoustic tracking."
  },
  {
    question: "What technologies do you use for compute and control?",
    answer: "Our main compute unit is an NVIDIA Jetson Orin Nano for hardware-accelerated computer vision and AI task execution, paired with a Raspberry Pi 5 for hardware control interfaces. The software stack is built using ROS2 (Robot Operating System) running on Ubuntu 22.04 LTS."
  },
  {
    question: "How can students join the team?",
    answer: "We recruit at the beginning of each academic semester at MIT-B. We look for students interested in mechanical design, electrical routing, software architecture, computer vision, and management. Keep an eye on our social media or check our recruitment flyers!"
  },
  {
    question: "How can organizations sponsor the team?",
    answer: "We offer various tier-based sponsorship packages which provide logo placements, recruitment opportunities, and vehicle demonstrations. Interested organizations can reach out via our Contact page or read our Sponsors packet."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 border-t border-slate-900 bg-slate-950/20 backdrop-blur-3xl w-full">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Title Header */}
          <div className="lg:col-span-5 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              Resources
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-white">
              Frequently <br /> Asked <br /> Questions
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
              Discover quick and comprehensive answers about our submersibles, team structure, recruitment, and technologies.
            </p>
          </div>

          {/* Accordion Box */}
          <div className="lg:col-span-7 space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-850 bg-[#030712]/50 hover:bg-[#030712]/80 transition-colors duration-300 overflow-hidden shadow-lg select-none"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left text-white font-semibold text-base md:text-lg focus:outline-none transition-colors duration-200 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-slate-400 hover:text-white shrink-0 ml-4"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-400 text-sm md:text-base leading-relaxed border-t border-slate-900/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
