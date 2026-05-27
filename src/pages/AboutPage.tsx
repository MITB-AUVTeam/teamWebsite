import { motion } from "framer-motion";
import VerticalTabs from "@/components/ui/vertical-tabs";
import AUV_GROUP_PIC from "@/assets/Group_photo/AUV_GROUP_PIC.webp";
import { Footer } from "@/components/Footer";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-slate-50 pb-0 font-sans flex flex-col">

      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 order-1 md:order-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-start items-start gap-6 w-full"
        >
          <h1 className="text-left mx-0 pl-0 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tighter leading-none">
            About Us
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full mt-6"
        >
          <div className="text-slate-400 text-base md:text-lg leading-relaxed space-y-4 max-w-7xl w-full">
            <p>
              We are Team AUV MIT-B, a student-led team passionate about underwater robotics, innovation, and hands-on engineering. Bringing together students from mechanical, electrical, and software domains, we collaboratively design and build autonomous underwater vehicles completely in-house.
            </p>
            <p>
              Through continuous development, testing, and competition-driven learning, we turn theoretical knowledge into practical engineering experience. By participating in competitions such as RoboSub Competition, we aim to strengthen our technical skills while pushing the boundaries of student-led underwater robotics.
            </p>
          </div>
        </motion.div>
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
          {/* arrow button removed */}
        </motion.div>
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


