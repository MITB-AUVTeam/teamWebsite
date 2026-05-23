import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import ansysLogo from "../assets/Backgroud - less sponsors logos/Ansys.png";
import dassaultLogo from "../assets/Backgroud - less sponsors logos/Dassault Systemes.png";
import vicharakLogo from "../assets/Backgroud - less sponsors logos/Vicharak.png";
import wisdomLogo from "../assets/Backgroud - less sponsors logos/Wisdom Technologies.png";
import mitLogo from "../assets/Backgroud - less sponsors logos/MIT.png";

const sponsors = [
  {
    name: "Manipal Institute of Technology",
    logo: mitLogo,
    description: "Serves as our primary institutional pillar, providing a state-of-the-art dedicated workshop space equipped with advanced electronic diagnostic instruments, oscilloscopes, dual-channel power supplies, cabling, and tooling. MIT Bengaluru also provides crucial direct funding for critical system components, combined with tireless administrative advocacy, world-class faculty mentorship, and active support in bridging connections with industry partners to facilitate seamless development.",
    logoClass: "scale-105 md:scale-115 lg:scale-120"
  },
  { 
    name: "Ansys", 
    logo: ansysLogo, 
    description: "Empowers our engineering analysis by providing advanced Ansys simulation software. This enables our team to rigorously model, test, and optimize fluid dynamics, mechanical stresses, and structural integrity under extreme deep-water pressures before physical deployment.",
    logoClass: "scale-125 md:scale-135 lg:scale-145" 
  },
  { 
    name: "Dassault Systèmes", 
    logo: dassaultLogo, 
    description: "Supports our mechanical modeling and prototyping processes by providing SolidWorks CAD software. This serves as the foundation for our entire 3D engineering lifecycle, enabling complex mechanical design, assembly integration, and precise models for custom 3D-printed vehicle components.",
    logoClass: "scale-115 md:scale-125 lg:scale-130" 
  },
  { 
    name: "Vicharak", 
    logo: vicharakLogo, 
    description: "Accelerates our computational hardware by providing us with Shrike Lite microcontroller boards featuring an RP2040 MCU coupled with an onboard FPGA. We utilize these high-performance boards as the master/main microcontroller unit (MCU) driving autonomous navigation and real-time sensor processing inside our AUV.",
    logoClass: "scale-135 md:scale-150 lg:scale-160" 
  },
  { 
    name: "Wisdom Technologies", 
    logo: wisdomLogo, 
    description: "Ensures the physical integrity and sealing of our vehicle by fabricating our custom AUV aluminum pressure hull. Their high-precision manufacturing provides the secure, watertight, and robust enclosure needed to protect our onboard electronics and computing hardware.",
    logoClass: "scale-95 md:scale-100" 
  }
];

export function SponsorsPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-[calc(100vh-400px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Sponsors</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We are deeply grateful for the generous support of our sponsors. Their contributions empower our team to push the boundaries of marine robotics and autonomous underwater vehicles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-slate-900/40 rounded-3xl p-8 md:p-12 border border-slate-800/50 hover:bg-slate-900/60 transition-colors group flex flex-col items-center text-center ${
                sponsor.name === "Manipal Institute of Technology" ? "md:col-span-2 md:max-w-4xl md:w-full md:mx-auto" : ""
              }`}
            >
              <div className="h-40 md:h-48 w-full flex items-center justify-center mb-8 p-4 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors overflow-hidden">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className={`max-h-full max-w-full object-contain filter drop-shadow-lg transition-transform duration-300 ${sponsor.logoClass || ""}`}
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">{sponsor.name}</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                {sponsor.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-24 text-center bg-blue-900/20 rounded-3xl p-10 lg:p-16 border border-blue-500/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Become a Sponsor</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Join us in shaping the future of underwater technology. Partnering with our team provides visibility among top engineering talent and demonstrates your commitment to innovation.
          </p>
          <Link
            to="/contact#contact-form"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700"
          >
            Contact Us for Sponsorship
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
