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
          <p className="text-slate-300 max-w-md md:text-right text-sm md:text-base leading-relaxed">
           We are Team AUV MIT-B — a group of nine passionate students working towards building innovative autonomous underwater systems. United by curiosity, engineering, and teamwork, we aim to design technology capable of solving real-world underwater challenges.

Our project, Deuterium, is an Autonomous Underwater Vehicle (AUV) developed to perform underwater operations with precision, stability, and autonomy. From navigation and sensing to control and system integration, every aspect of the vehicle is designed and developed in-house by our team.

The team is divided into four core subsystems — Electrical, Mechanical, Software, and Management & Design — each playing a vital role in transforming concepts into a fully functional autonomous platform. Through collaboration across disciplines, we strive to create efficient, reliable, and intelligent underwater systems.

At AUV MIT-B, we are driven by innovation, continuous learning, and the ambition to push the boundaries of student-led engineering.


          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-8 order-4 md:order-2 w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden group"
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Group photo" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-[#0f172a] rounded-[2rem] p-8 md:p-12 lg:p-16 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">Who We Are</h2>
            <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
              <p>
                We believe in the power of interdisciplinary collaboration. By merging mechanical robustness with intelligent software, we gain a deep understanding of the unique challenges of the marine environment.
              </p>
              <p>
                Our holistic approach integrates acoustic systems, computer vision, and hydrodynamics to create seamless autonomous behaviors. By staying ahead of the curve and embracing the latest sensors and processors, we ensure our AUVs are cutting-edge solutions capable of complex tasks like object manipulation and path following.
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
