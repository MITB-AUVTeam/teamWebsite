import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';
import HowItWorks, { Step } from '../components/ui/how-it-works';
import VerticalTabs from '../components/ui/vertical-tabs';
import AUV_GROUP_PIC from '@/assets/Group_photo/AUV_GROUP_PIC.webp';

// Timeline Data Structure
const timelineData = [
  {
    year: "2025",
    events: [
      {
        date: "JANUARY 2025",
        title: "Team Formation",
        description: "Founded Team AUV MIT-B with passionate students across mechanical, electrical, and software domains."
      },
      {
        date: "FEBRUARY 2025",
        title: "First Prototype Design",
        description: "Completed initial CAD modeling and acoustic simulation for our baseline underwater vehicle."
      },
      {
        date: "APRIL 2025",
        title: "Electronics & Sensor Integration",
        description: "Assembled power distribution boards, thrusters, and hydrophone array test rigs."
      },
      {
        date: "AUGUST 2025",
        title: "In-Pool Autonomous Testing",
        description: "Successfully executed first pool trials demonstrating autonomous depth hold and buoy detection."
      }
    ]
  },
  {
    year: "2026",
    events: [
      {
        date: "JANUARY 2026",
        title: "Hull Fabrication & Assembly",
        description: "Manufactured the primary waterproof carbon fiber/acrylic hull for our competition AUV."
      },
      {
        date: "MARCH 2026",
        title: "Main AUV Hardware Testing",
        description: "Integrated the power distribution boards, sensors, and computer systems for full-system dry tests."
      },
      {
        date: "APRIL 1, 2026",
        title: "Robosub Registration",
        description: "Officially registered for the international RoboSub Competition in California."
      },
      {
        date: "JUNE 2026",
        title: "AUV Fully Developed",
        description: "Finalized autonomous navigation algorithms, object detection, and path planning pipelines."
      },
      {
        date: "JULY 11 - 17, 2026",
        title: "RoboSub Competition",
        description: "Competed at the international RoboSub Arena, demonstrating autonomous tasks underwater."
      },
      {
        date: "AUGUST 2026",
        title: "Collab Hackathon with Vicharak",
        description: "Co-hosted a specialized marine robotics hackathon in partnership with Vicharak."
      }
    ]
  }
];

export function AboutPage() {
  // Flatten milestones and construct Step array
  const timelineFeatures = React.useMemo(() => {
    return timelineData.flatMap((yearBlock) =>
      yearBlock.events.map((event, idx) => {
        const themeColors: ("blue" | "orange" | "purple")[] = ["blue", "orange", "purple"];
        const theme = themeColors[idx % 3];
        
        return {
          title: event.title,
          description: event.description,
          number: event.date,
          colorTheme: theme,
        };
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-slate-50 pb-0 font-sans flex flex-col">

      {/* 1. About Us Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-20 order-1 md:order-1 w-full">
        <div className="bg-[#0a1128] border border-slate-800/60 rounded-[1.8rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 border border-slate-800/50 rounded-[1.8rem] sm:rounded-[2.5rem] pointer-events-none z-20 m-1.5 sm:m-2" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-start items-start gap-4 sm:gap-6 w-full"
          >
            <h1 className="text-left mx-0 pl-0 text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-none">
              About Us
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full mt-4 sm:mt-6"
          >
            <div className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed space-y-3 sm:space-y-4 max-w-full w-full">
              <p>
                We are Team AUV MIT-B, a student-led team passionate about underwater robotics, innovation, and hands-on engineering. Bringing together students from mechanical, electrical, and software domains, we collaboratively design and build autonomous underwater vehicles completely in-house.
              </p>
              <p>
                Through continuous development, testing, and competition-driven learning, we turn theoretical knowledge into practical engineering experience. By participating in competitions such as RoboSub Competition, we aim to strengthen our technical skills while pushing the boundaries of student-led underwater robotics.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Group Photo Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 md:mt-8 order-2 md:order-2 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/8.2] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-slate-800/80 bg-slate-950 shadow-2xl"
        >
          <img
            src={AUV_GROUP_PIC}
            alt="AUV MIT Bengaluru Team Group Photo"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* 3. Our Journey Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 md:mt-20 lg:mt-24 order-3 md:order-3 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-7xl mx-auto py-6 sm:py-12 md:py-16 px-2 sm:px-8 relative z-10 flex flex-col items-center justify-center text-center"
        >
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 mb-2 sm:mb-4 block">
            Timeline & Milestones
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            Our Journey
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed tracking-tight">
            From a group of enthusiastic students to building state-of-the-art autonomous underwater vehicles, here is a chronological look at our milestones.
          </p>
        </motion.div>

        {/* Connective Wave Timeline Visuals */}
        <HowItWorks features={timelineFeatures} />
      </section>

      {/* 4. Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 md:mt-20 lg:mt-24 order-4 md:order-4 w-full">
        <VerticalTabs />
      </section>

      <div className="order-5 md:order-5">
        <Footer />
      </div>

    </div>
  );
}

export default AboutPage;
