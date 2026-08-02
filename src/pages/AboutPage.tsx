import { motion } from "framer-motion";
import VerticalTabs from "@/components/ui/vertical-tabs";
import AUV_GROUP_PIC from "@/assets/Group_photo/AUV_GROUP_PIC.webp";
import { Footer } from "@/components/Footer";
import { Timeline } from "@/components/ui/timeline";

const timelineData = [
  {
    year: "2025",
    intro: "Our founding year. We assembled our multi-disciplinary team, designed our first mechanical prototypes, and secured our initial sponsorships.",
    events: [
      {
        date: "JANUARY 2025",
        title: "Team Created",
        description: "Team AUV MIT-B was founded with students from Mechanical, Electrical, and Software domains."
      },
      {
        date: "FEBRUARY 2025",
        title: "1st Task Phase",
        description: "Completed initial task phase aligning goals and designing subsystem components."
      },
      {
        date: "JUNE 2025",
        title: "1st Prototype Build",
        description: "Assembled our first physical prototype to test basic buoyancy and drive controls."
      },
      {
        date: "AUGUST 2025",
        title: "Won Vidyashilp Competition",
        description: "Won 1st place in the Vidyashilp competition, validating our initial architecture."
      },
      {
        date: "OCTOBER 2025",
        title: "Prototype Testing",
        description: "Conducted rigorous pool tests to evaluate sealing, thruster responses, and telemetry."
      },
      {
        date: "OCTOBER 28, 2025",
        title: "Vicharak Sponsorship",
        description: "Partnered with Vicharak as our hardware sponsor, acquiring high-performance single-board computers."
      },
      {
        date: "NOVEMBER 2025",
        title: "2nd Prototype Build & Testing",
        description: "Began building our 2nd prototype incorporating advanced sensor suites and refined hull dynamics, followed by testing."
      }
    ]
  },
  {
    year: "2026",
    intro: "The year of deployment. From manufacturing our main hull to registering and competing on the global stage.",
    events: [
      {
        date: "FEBRUARY 2026",
        title: "Main Hull Build",
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
  return (
    <div className="min-h-screen bg-transparent text-slate-50 pb-0 font-sans flex flex-col">

      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 order-1 md:order-1 w-full">
        <div className="bg-[#0a1128] border border-slate-800/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 border border-slate-800/50 rounded-[2.5rem] pointer-events-none z-20 m-2" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-start items-start gap-6 w-full"
          >
            <h1 className="text-left mx-0 pl-0 text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-none">
              About Us
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full mt-6"
          >
            <div className="text-slate-300 text-base md:text-lg leading-relaxed space-y-4 max-w-full w-full">
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

      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-8 order-4 md:order-2 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full aspect-[16/8.2] rounded-[2rem] overflow-hidden border border-slate-800/80 bg-slate-950 shadow-2xl"
        >
          <img
            src={AUV_GROUP_PIC}
            alt="AUV MIT Bengaluru Team Group Photo"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-20 lg:mt-24 order-3 md:order-3 w-full">
        <Timeline data={timelineData} />
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-20 lg:mt-24 order-3 md:order-4">
        <VerticalTabs />
      </section>

      <div className="order-5 md:order-5">
        <Footer />
      </div>
    </div>
  );
}


