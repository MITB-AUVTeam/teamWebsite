import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import VerticalTabs from "@/components/ui/vertical-tabs";
import AUV_GROUP_PIC from "@/assets/Group_photo/AUV_GROUP_PIC.jpeg";
import { Footer } from "@/components/Footer";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 pb-0 font-sans flex flex-col">
      
      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 order-1 md:order-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-none">
            About Us
          </h1>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-8 order-4 md:order-2 w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
          className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] rounded-[2rem] overflow-hidden"
        >
          <img 
            src={AUV_GROUP_PIC} 
            alt="AUV MIT Bengaluru Team Group Photo" 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-[#3b82f6] hover:bg-[#2563eb] rounded-full hidden md:flex items-center justify-center transition-colors shadow-lg"
          >
            <ArrowDown className="text-white w-6 h-6" strokeWidth={2.5} />
          </button>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-32 order-2 md:order-3">
        <div className="grid grid-cols-1">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0f172a] rounded-[2rem] p-8 md:p-12 lg:p-16 flex flex-col justify-center"
          >
            <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
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

      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-32 order-3 md:order-4">
        <VerticalTabs />
      </section>

      <div className="order-5 md:order-5">
        <Footer />
      </div>
    </div>
  );
}
