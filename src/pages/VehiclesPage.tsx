import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Ruler,
  Weight,
  Move3d,
  Compass,
  Cpu,
  Battery,
  Fan,
  Code2,
  Eye,
  Grab,
  Waves,
  Download,
  FileText
} from "lucide-react";
import { Footer } from "@/components/Footer";
import proto1Img from "@/assets/Gallery/IMG_4024_2.png";
import proto2Img from "@/assets/Gallery/deuterium3.jpeg";
import tdrPdf from "@/assets/tdr/IEEE_Conference_Template.pdf";

export function VehiclesPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const vehicles = [
    {
      name: "Hydrogen",
      tagline: "Prototype 0",
      description: "Our zeroth prototype, which was essentially an ROV, designed to test our basic design philosophy and understand the core concepts around underwater robotics.",
      image: proto1Img,
      specs: [
        { icon: Ruler, label: "Dimensions", value: "330mm (L) × 340mm (W) × 230mm (H)" },
        { icon: Weight, label: "Mass", value: "5 kg" },
        { icon: Move3d, label: "Degrees of Freedom", value: "5 (Surge, Heave, Roll, Pitch, Yaw)" },
        { icon: Compass, label: "Navigation", value: "BNO055 IMU" },
        { icon: Cpu, label: "Compute", value: "Raspberry Pi5 8GB" },
        { icon: Battery, label: "Power", value: "External DC Power Supply" },
        { icon: Fan, label: "Propulsion", value: "5× T200 Thrusters, 5× BlueRobotics Basic ESCs" },
        { icon: Code2, label: "Software", value: "ROS on Ubuntu 22.04 LTS" },
      ]
    },
    {
      name: "Deuterium",
      tagline: "Prototype 1",
      description: "Our very first AUV, designed based on our learnings from Hydrogen, this model gives us extreme modularity and ample space to house all essential electronics safely for successful task execution.",
      image: proto2Img,
      specs: [
        { icon: Ruler, label: "Dimensions", value: "620mm (L) × 400mm (W) × 250mm (H)" },
        { icon: Weight, label: "Mass", value: "20 kg" },
        { icon: Move3d, label: "Degrees of Freedom", value: "5 (Surge, Heave, Roll, Pitch, Yaw)" },
        { icon: Compass, label: "Navigation", value: "BNO055 IMU, BlueRobotics Pressure/Depth Sensor" },
        { icon: Cpu, label: "Compute", value: "Raspberry Pi5 8GB, Nvidia Jetson Orin Nano 8GB" },
        { icon: Battery, label: "Power", value: "Lithium-ion Battery (14.8V, 18Ah) " },
        { icon: Eye, label: "Vision System", value: "Zed 2i Depth Camera (x2)" },
        { icon: Fan, label: "Propulsion", value: "5× T200 Thrusters, 5× BlueRobotics Basic ESCs" },
        { icon: Grab, label: "Dropper", value: "Custom-designed 3D printed dropper" },
        { icon: Waves, label: "Hydrophones", value: "In-house custom-built Hydrophones" },
        { icon: Code2, label: "Software", value: "ROS2 on Ubuntu 22.04 LTS" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-slate-50 pb-0 font-sans">

      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold uppercase tracking-tighter leading-none">
              Our Vehicles
            </h1>
            <p className="text-slate-400 text-sm md:text-base tracking-[0.2em] uppercase font-medium ml-1">
              Engineering the Deep
            </p>
          </div>
          <p className="text-slate-300 max-w-md md:text-right text-sm md:text-base leading-relaxed">
            Discover the engineering marvels that power our underwater exploration. From our initial proof-of-concept to our advanced autonomous systems.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-32 pb-24 md:pb-32">
        {vehicles.map((vehicle, index) => (
          <section key={vehicle.name} className="relative">
            <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 1 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10" />
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />

                  <div className="absolute bottom-8 left-8 z-30">
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase text-white mb-4 inline-block">
                      {vehicle.tagline}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-semibold text-white uppercase tracking-tight">
                      {vehicle.name}
                    </h2>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 1 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2 flex flex-col justify-center"
              >
                <p className="text-slate-300 text-lg leading-relaxed mb-10">
                  {vehicle.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {vehicle.specs.map((spec, i) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + (i * 0.05) }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center shrink-0 mt-1">
                        <spec.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                          {spec.label}
                        </h4>
                        <p className="text-sm text-slate-200 font-medium leading-snug">
                          {spec.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </section>
        ))}

        {/* Technical Design Report Section */}
        <section className="border-t border-slate-800/50 pt-24 mt-24">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-4 max-w-xl">
              <span className="w-8 h-[2px] bg-blue-500 rounded-full inline-block"></span>
              <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase block">Documentation</h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-white tracking-tight uppercase leading-none">
                Technical Design Report
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Our official Technical Design Report (TDR) details the engineering decisions, hardware architecture, and software autonomy methodologies behind our competition vehicles.
              </p>
            </div>

            <a
              href={tdrPdf}
              download="RoboSub_2026_TDR.pdf"
              className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-full shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 group/dl cursor-pointer z-10"
            >
              <Download className="w-4 h-4 transition-transform duration-300 group-hover/dl:translate-y-0.5" />
              Download Report PDF
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full rounded-[2.5rem] overflow-hidden border border-slate-800/85 bg-slate-950/40 backdrop-blur-xl p-4 md:p-6 lg:p-8 shadow-2xl flex flex-col gap-6"
          >
            {/* Visual ambient glows inside panel */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none z-0" />

            {isMobile ? (
              /* High-Tech Technical PDF Card Mockup for Mobile */
              <div className="relative z-10 w-full p-6 sm:p-8 bg-[#0b0f19]/90 border border-blue-500/20 rounded-2xl flex flex-col items-center text-center shadow-inner gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                    RoboSub 2026 TDR
                  </h4>
                  <p className="text-slate-400 text-xs tracking-wider uppercase font-mono">
                    Format: PDF • 10 Pages • IEEE Standard
                  </p>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
                  The document includes comprehensive details on vehicle hull structures, thruster math models, electronic wiring layout, sensor specs, and autonomous behavior trees.
                </p>
                <a
                  href={tdrPdf}
                  download="RoboSub_2026_TDR.pdf"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-950"
                >
                  <Download className="w-4 h-4" />
                  Download Document
                </a>
              </div>
            ) : (
              /* Interactive Embedded PDF Viewer container for Desktop */
              <div className="relative w-full h-[650px] md:h-[750px] lg:h-[800px] bg-[#0b0f19] rounded-2xl overflow-hidden shadow-inner border border-blue-500/20 flex flex-col z-10">
                <iframe
                  src={`${tdrPdf}#toolbar=1&navpanes=0`}
                  className="w-full h-full border-none rounded-2xl"
                  title="RoboSub 2026 Technical Design Report"
                />
              </div>
            )}
          </motion.div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
