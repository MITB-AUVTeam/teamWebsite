import { Link } from "react-router-dom";
import { useEffect, useState, type PointerEvent } from "react";
import imgBg from "../assets/hero_parallax/979650ce95a6c67ea15bbbf0ad0681f152bbf7b3.png";
import imgScreenshot20251022182250Photoroom1 from "../assets/hero_parallax/b0b02181d3064ccfa838a5b7d18e44696ad67457.png";
import imgChatGptImageOct252025114243PmPhotoroom1 from "../assets/hero_parallax/ffd48cdd2aea9c7f098608b847a7c0c99b5f4eb8.png";
import imgGeminiGeneratedImageSucjggsucjggsucjPhotoroom13 from "../assets/hero_parallax/724bc4d4bdcd3aa5ae40dbbe2940545d28abfe9c.png";
import imgGeminiGeneratedImage41Nzht41Nzht41NzPhotoroom1 from "../assets/hero_parallax/152fd27cdd307ca2d7657a11e9e58325de922f88.png";
import imgGeminiGeneratedImageK988Jxk988Jxk988Photoroom1 from "../assets/hero_parallax/1c12efb875dc486a28207d77f13caa9aaac52df6.png";
import logoAnsys from "../assets/Background - less sponsors logos/Ansys.png";
import AUV_GROUP_PIC from "@/assets/Group_photo/AUV_GROUP_PIC.jpeg";
import logoDassault from "../assets/Background - less sponsors logos/Dassault Systemes.png";
import logoMIT from "../assets/Background - less sponsors logos/MIT.png";
import logoVicharak from "../assets/Background - less sponsors logos/Vicharak.png";
import logoWisdom from "../assets/Background - less sponsors logos/Wisdom Technologies.png";
import mechanicalBg from "@/assets/homepage_bento_background/mechanical.jpeg";
import electricalBg from "@/assets/homepage_bento_background/electrical.jpg";
import designBg from "@/assets/homepage_bento_background/design.jpg";
import managementBg from "@/assets/homepage_bento_background/management.jpeg";
import softwareBg from "@/assets/homepage_bento_background/software.jpg";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { LogoSlider } from "@/components/ui/logo-slider";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  FileTextIcon,
  InputIcon,
  GlobeIcon,
  CalendarIcon,
  BellIcon,
} from "@radix-ui/react-icons";
import { ArrowRight, Cpu, Zap, Code, LayoutDashboard, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { PhotoGallery } from "@/components/ui/gallery";

const features = [
  {
    Icon: Cpu,
    name: "Mechanical",
    description: "Structural integrity and fluid dynamics.",
    href: "/team",
    cta: "Explore Subsystem",
    background: <img src={mechanicalBg} className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Mechanical" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Zap,
    name: "Electrical",
    description: "Power systems and embedded electronics.",
    href: "/team",
    cta: "Explore Subsystem",
    background: <img src={electricalBg} className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Electrical" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: LayoutDashboard,
    name: "Design",
    description: "Social media and content creation",
    href: "/team",
    cta: "Explore Subsystem",
    background: <img src={designBg} className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Design" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Management",
    description: "Project timelines and resource allocation.",
    href: "/team",
    cta: "Explore Subsystem",
    background: <img src={managementBg} className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Management" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Code,
    name: "Software",
    description: "Autonomous navigation and computer vision.",
    href: "/team",
    cta: "Explore Subsystem",
    background: <img src={softwareBg} className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Software" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

const baseLogos = [
  <img key="1" src={logoAnsys} alt="Ansys" />,
  <img key="2" src={logoDassault} alt="Dassault Systemes" />,
  <img key="3" src={logoMIT} alt="MIT" />,
  <img key="4" src={logoVicharak} alt="Vicharak" />,
  <img key="5" src={logoWisdom} alt="Wisdom Technologies" />,
];

const logos = [
  ...baseLogos,
  ...baseLogos.map((logo) => <img key={`5-${logo.key}`} src={logo.props.src} alt={logo.props.alt} />),
  ...baseLogos.map((logo) => <img key={`9-${logo.key}`} src={logo.props.src} alt={logo.props.alt} />),
  ...baseLogos.map((logo) => <img key={`13-${logo.key}`} src={logo.props.src} alt={logo.props.alt} />),
];

interface HighlightItem {
  title: string;
  desc: string;
  icon: any;
}

interface TeamDetail {
  title: string;
  subTitle: string;
  description: string;
  highlights: HighlightItem[];
  colorClass: string;
  borderColor: string;
  glowColor: string;
}

const subsystemDetails: Record<string, TeamDetail> = {
  "Mechanical": {
    title: "Mechanical Team",
    subTitle: "Physical design, hydrodynamic optimization, and structural fabrication",
    description: "Building Deuterium meant constantly balancing waterproofing, stability, and the ability to tear things apart and rebuild quickly. Every mechanical decision came back to those three priorities.",
    colorClass: "from-blue-500 to-indigo-600 shadow-blue-500/15",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    glowColor: "bg-blue-500/10",
    highlights: [
      {
        title: "Hull",
        desc: "Rectangular aluminium mono-hull with a transparent acrylic lid and double O-rings for visual inspection.",
        icon: Cpu,
      },
      {
        title: "Penetrators",
        desc: "All cable pass-throughs use 6.5mm Blue Robotics WetLink Penetrators for waterproof reliability.",
        icon: Cpu,
      },
      {
        title: "Thruster Placement",
        desc: "Five T200 thrusters (three horizontal, two vertical) symmetrically placed to avoid unexpected rotation.",
        icon: Cpu,
      },
      {
        title: "Placement of Electronics",
        desc: "Batteries mounted low and central for stability; other systems modular 3D print mounts.",
        icon: Cpu,
      },
      {
        title: "Torpedo Launcher",
        desc: "Slot-guided barrel locked by servo; spring-driven launch with adjustable compression.",
        icon: Cpu,
      },
      {
        title: "Dropper",
        desc: "SG90 servo spinning a disc for marble markers; mineral-oil filled and epoxy-sealed.",
        icon: Cpu,
      },
    ]
  },
  "Electrical": {
    title: "Electrical & Controls Team",
    subTitle: "Power architecture, sensor integration, and real-time stabilization",
    description: "The electrical subsystem ties everything together — it's what gets power where it needs to go and keeps data flowing between the sensors, actuators, and the brain of the vehicle.",
    colorClass: "from-amber-500 to-orange-600 shadow-amber-500/15",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    glowColor: "bg-blue-500/10",
    highlights: [
      {
        title: "Single Board Computer",
        desc: "All onboard computation runs on an NVIDIA Jetson Orin Nano Super.",
        icon: Zap,
      },
      {
        title: "Power Management",
        desc: "4S Li-ion pack (18Ah) with custom distribution circuit isolating noise from sensitive chips.",
        icon: Zap,
      },
      {
        title: "Battery Management",
        desc: "Dedicated BMS for balancing and telemetry over RS-485; RP2040 micro aggregates data.",
        icon: Zap,
      },
      {
        title: "Sensors",
        desc: "Full suite: depth pressure sensor, BNO055 IMU, dual ZED2i stereo cameras, leak sensor, current sensor.",
        icon: Zap,
      },
      {
        title: "Actuators",
        desc: "Five T200 thrusters driven by Basic ESCs running BLHeli_S for precise attitude adjustments.",
        icon: Zap,
      },
      {
        title: "Communication and Telemetry",
        desc: "MCU communicates over DShot PIO, USB CDC to Jetson, and telemetry over high-speed Ethernet.",
        icon: Zap,
      },
    ]
  },
  "Software": {
    title: "Software & Automation Team",
    subTitle: "Vehicle autonomy, visual object detection, and behavior control",
    description: "The software stack is what actually makes Deuterium autonomous. Everything runs on Ubuntu 22.04 on the Jetson Orin Nano, written primarily in Python and C++, with ROS 2 Humble handling communication between all the moving parts.",
    colorClass: "from-cyan-500 to-blue-600 shadow-cyan-500/15",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    glowColor: "bg-blue-500/10",
    highlights: [
      {
        title: "Vision Pipeline",
        desc: "Task-specific YOLOv8 neural models with XFeat matching, RANSAC, HDBSCAN, and PnP for 3D pose extraction.",
        icon: Code,
      },
      {
        title: "Simulation",
        desc: "Gazebo Fortress physics simulation incorporating Fossen hydrodynamics and tuned vehicle parameters.",
        icon: Code,
      },
      {
        title: "Mission Planner",
        desc: "Modular Behavior Trees (BehaviorTree.CPP) replacing rigid FSMs for real-time adaptive logic.",
        icon: Code,
      },
      {
        title: "Testing Interface",
        desc: "Custom GUI dashboard rendering AUV telemetry and diagnostics in real time during wet tests.",
        icon: Code,
      },
    ]
  },
  "Design": {
    title: "Management, Business & Design Team",
    subTitle: "Web representation, corporate sponsorships, and campus administration",
    description: "The Management, Business and Design subsystem handles the operational and outreach side of the project. Responsibilities include general administration, approaching companies for sponsorships, financial auditing and logistics support, designing and maintaining the team website, producing the team introduction video, and running both on-campus and off-campus promotional activities.",
    colorClass: "from-fuchsia-500 to-pink-600 shadow-fuchsia-500/15",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    glowColor: "bg-blue-500/10",
    highlights: [
      {
        title: "Sponsorship & Finances",
        desc: "Managing corporate outreach, sponsor packages, and financial auditing.",
        icon: LayoutDashboard,
      },
      {
        title: "Website & Branding",
        desc: "Designing and developing this responsive platform, maintaining AUV identity.",
        icon: LayoutDashboard,
      },
      {
        title: "Media Production",
        desc: "Filming, editing, and producing the official high-impact AUV introduction videos.",
        icon: LayoutDashboard,
      },
      {
        title: "Events & Promotion",
        desc: "Organizing wet test events and on/off-campus promotion for general public.",
        icon: LayoutDashboard,
      },
    ]
  },
  "Management": {
    title: "Management, Business & Design Team",
    subTitle: "Web representation, corporate sponsorships, and campus administration",
    description: "The Management, Business and Design subsystem handles the operational and outreach side of the project. Responsibilities include general administration, approaching companies for sponsorships, financial auditing and logistics support, designing and maintaining the team website, producing the team introduction video, and running both on-campus and off-campus promotional activities.",
    colorClass: "from-fuchsia-500 to-pink-600 shadow-fuchsia-500/15",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    glowColor: "bg-blue-500/10",
    highlights: [
      {
        title: "Sponsorship & Finances",
        desc: "Managing corporate outreach, sponsor packages, and financial auditing.",
        icon: LayoutDashboard,
      },
      {
        title: "Website & Branding",
        desc: "Designing and developing this responsive platform, maintaining AUV identity.",
        icon: LayoutDashboard,
      },
      {
        title: "Media Production",
        desc: "Filming, editing, and producing the official high-impact AUV introduction videos.",
        icon: LayoutDashboard,
      },
      {
        title: "Events & Promotion",
        desc: "Organizing wet test events and on/off-campus promotion for general public.",
        icon: LayoutDashboard,
      },
    ]
  }
};

export function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Esc key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveTeam(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeTeam) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeTeam]);

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden flex flex-col">

      <section
        className="relative h-[100vh] w-full overflow-hidden bg-[#000910] order-1 md:order-1"
      >

        <div
          className="absolute inset-0 w-full h-[120vh]"
          style={{
            transform: `translate3d(0px, ${scrollY * 0.3}px, 0)`,
            willChange: 'transform'
          }}
        >
          <img
            alt="Deep Ocean Background"
            className="w-full h-full object-cover opacity-60"
            src={imgBg}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate3d(0px, ${scrollY * 0.4}px, 0)`,
            willChange: 'transform'
          }}
        >

          <div className="absolute w-[140vw] left-[-55vw] bottom-[-55vw] md:w-[100vw] md:left-[-35vw] md:bottom-[-35vw]">
            <img
              alt="Left Rocks"
              className="w-full h-auto object-contain opacity-90"
              src={imgGeminiGeneratedImage41Nzht41Nzht41NzPhotoroom1}
            />
          </div>

          <div className="absolute w-[180vw] left-[45vw] bottom-[-55vw] md:w-[120vw] md:left-[35vw] md:bottom-[-35vw]">
            <img
              alt="Right Rocks"
              className="w-full h-auto object-contain opacity-90"
              src={imgGeminiGeneratedImageK988Jxk988Jxk988Photoroom1}
            />
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            transform: `translate3d(0px, ${scrollY * 0.6}px, 0)`,
            willChange: 'transform'
          }}
        >

          <div className="absolute w-[120vw] left-[-20vw] bottom-[-50vw] md:w-[80vw] md:left-[-10vw] md:bottom-[-30vw]">
            <img
              alt="Foreground Rocks"
              className="w-full h-auto object-contain"
              src={imgGeminiGeneratedImageSucjggsucjggsucjPhotoroom13}
            />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10 pt-16">
          <div className="relative flex flex-col items-center gap-[20px] scale-75 md:scale-100">

            <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px]">
              <div
                className="absolute inset-0"
                style={{
                  transform: `rotate(${scrollY * 0.06}deg)`,
                  willChange: 'transform'
                }}
              >
                <div className="absolute inset-0 border border-[rgba(0,240,255,0.15)] rounded-full">

                  <div className="absolute w-[8px] h-[8px] bg-[#00f0ff] rounded-full left-1/2 -translate-x-1/2 top-0 shadow-[0_0_20px_#00f0ff]" />

                  <div className="absolute w-[8px] h-[8px] bg-[#00f0ff] rounded-full left-1/2 -translate-x-1/2 bottom-0 shadow-[0_0_20px_#00f0ff]" />
                </div>

                <div className="absolute inset-[80px] md:inset-[100px] border border-[rgba(0,240,255,0.25)] border-dashed rounded-full" />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-[11px] opacity-100">
                <div className="w-[300px] h-[150px] md:w-[400px] md:h-[200px] relative">
                  <img
                    alt="AUV Logo Main"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    src={imgScreenshot20251022182250Photoroom1}
                  />
                </div>
                <div className="font-medium text-3xl md:text-[40px] text-white text-center tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  MIT BENGALURU
                </div>
              </div>

              <div
                className="absolute w-[300px] h-[250px] md:w-[400px] md:h-[350px] right-[-60px] top-[40px] md:right-[-80px] md:top-[50px] opacity-90"
                style={{
                  transform: `translate3d(${scrollY * -0.1}px, ${scrollY * -0.15}px, 0)`,
                  willChange: 'transform'
                }}
              >
                <img
                  alt="School of Fish"
                  className="w-full h-full object-contain"
                  src={imgChatGptImageOct252025114243PmPhotoroom1}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent pointer-events-none z-30" />
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 order-2 md:order-2">
        {/* Sleek, master high-tech panel container */}
        <div className="relative overflow-hidden bg-slate-950/40 backdrop-blur-xl border border-slate-800/80 rounded-[2.5rem] p-8 md:p-12 lg:p-14 shadow-2xl group/panel">
          {/* Subtle decorative grid lines / tech styling */}
          <div className="absolute inset-0 border border-slate-850 rounded-[2.5rem] pointer-events-none z-20 m-2" />

          {/* Faint blue glows placed dynamically under the hood */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-blue-500 rounded-full"></span>
                <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">About Our Mission</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-[1.1] text-white">
                Pushing the boundaries of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300">marine robotics.</span>
              </h3>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
                We are a team of passionate engineers and researchers dedicated to developing state-of-the-art autonomous underwater vehicles. Our mission is to create robust, intelligent systems capable of performing complex tasks in the harsh underwater environment, from environmental monitoring to underwater inspection.
              </p>

              {/* High-Tech Stats Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 w-full">
                {/* Stat 1 */}
                <div className="flex flex-col p-5 bg-slate-950/40 backdrop-blur-md border border-slate-900 rounded-2xl relative overflow-hidden group/cell transition-all duration-300 hover:border-blue-500/20 hover:bg-slate-950/60 shadow-inner">
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover/cell:w-full transition-all duration-300" />
                  <span className="text-3xl font-black text-white tracking-tight mb-1 drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]">2</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">Vehicles Built</span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col p-5 bg-slate-950/40 backdrop-blur-md border border-slate-900 rounded-2xl relative overflow-hidden group/cell transition-all duration-300 hover:border-blue-500/20 hover:bg-slate-950/60 shadow-inner">
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover/cell:w-full transition-all duration-300" />
                  <span className="text-3xl font-black text-white tracking-tight mb-1 drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]">20+</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">Team Members</span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col p-5 bg-slate-950/40 backdrop-blur-md border border-slate-900 rounded-2xl relative overflow-hidden group/cell transition-all duration-300 hover:border-blue-500/20 hover:bg-slate-950/60 shadow-inner">
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover/cell:w-full transition-all duration-300" />
                  <span className="text-3xl font-black text-white tracking-tight mb-1 drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]">1+</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">Awards Won</span>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col p-5 bg-slate-950/40 backdrop-blur-md border border-slate-900 rounded-2xl relative overflow-hidden group/cell transition-all duration-300 hover:border-blue-500/20 hover:bg-slate-950/60 shadow-inner">
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover/cell:w-full transition-all duration-300" />
                  <span className="text-3xl font-black text-white tracking-tight mb-1 drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]">2025</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">Established</span>
                </div>
              </div>

              <Button className="w-fit rounded-full px-8 py-6 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 font-bold transition-all duration-300 hover:scale-105 group z-10" asChild>
                <Link to="/about">
                  Read our full story
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Right Picture Column */}
            <div className="lg:col-span-5 relative w-full flex justify-center mt-12 lg:mt-0 select-none">
              <div className="relative z-10 w-[95%] md:w-[90%] aspect-[16/9] rounded-[2rem] overflow-hidden border border-slate-800/80 bg-slate-950 shadow-2xl group/img transition-all duration-700 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/5 opacity-40 z-0 pointer-events-none" />
                <img
                  src={AUV_GROUP_PIC}
                  alt="AUV MIT Bengaluru Team Group Photo"
                  className="w-full h-full object-cover grayscale-[10%] group-hover/img:grayscale-0 group-hover/img:scale-[1.03] transition-all duration-700 ease-out z-10"
                />

                {/* HUD border frame overlay */}
                <div className="absolute inset-0 border border-slate-800/40 rounded-[2rem] pointer-events-none z-20 m-1.5" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 z-10 pointer-events-none" />

                {/* Floating HUD glass label */}
                <div className="absolute bottom-6 left-6 right-6 z-20 transition-all duration-500 transform translate-y-1 group-hover/img:translate-y-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800/80 shadow-sm inline-block">
                    Team MIT Bengaluru
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto order-4 md:order-3">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-3">Sub-systems</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">The core of our vehicle</h3>
        </div>
        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard
              key={feature.name}
              {...feature}
              onClick={() => setActiveTeam(feature.name)}
            />
          ))}
        </BentoGrid>
      </section>


      <section className="py-24 overflow-hidden border-t border-slate-800/50 order-6 md:order-5">
        <div className="flex flex-col items-center justify-center text-center mb-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-3">Our Team</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Meet the minds behind the machine</h3>
        </div>
        <div className="flex w-full justify-center items-center">
          <StaggerTestimonials />
        </div>
      </section>

      <section className="py-24 border-t border-slate-800/50 order-5 md:order-6">
        <PhotoGallery />
      </section>

      <section className="py-24 border-t border-slate-800/50 bg-[#020617] order-7 md:order-7">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-3">Thank You To</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Our Proud Sponsors</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center max-w-5xl mx-auto">
            {baseLogos.map((logo, idx) => (
              <div
                key={idx}
                className="group relative flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl border border-blue-900/60 bg-gradient-to-br from-[#0c1f4a] via-[#0b1a3d] to-[#08142f] p-3 transition-all duration-300 hover:border-blue-400/30 md:h-40 md:p-4 last:col-span-2 last:max-w-[calc(50%-12px)] md:last:col-span-1 md:last:max-w-full"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(96,165,250,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.08)_1px,transparent_1px)] bg-[size:14px_14px] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
                <div className="absolute h-[180px] w-[180px] rounded-full bg-blue-300/10 blur-[40px] opacity-70 transition-all duration-700 group-hover:bg-cyan-300/15 group-hover:opacity-100 pointer-events-none" />
                <div className="relative flex max-h-full max-w-full items-center justify-center transition-all duration-300 [&_img]:max-h-20 [&_img]:w-auto [&_img]:object-contain [&_img]:drop-shadow-lg [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-105 md:[&_img]:max-h-28">
                  {logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="order-8 md:order-8">
        <Footer />
      </div>

      <AnimatePresence>
        {activeTeam && subsystemDetails[activeTeam] && (() => {
          const detail = subsystemDetails[activeTeam];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTeam(null)}
              className="fixed inset-0 z-[20000] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-slate-950/70"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] flex flex-col overflow-hidden rounded-[2rem] border bg-slate-950 shadow-2xl p-6 md:p-10 select-none",
                  detail.borderColor
                )}
              >
                {/* Visual back-glow */}
                <div className={cn("absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 opacity-40", detail.glowColor)} />
                <div className={cn("absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 opacity-40", detail.glowColor)} />

                {/* Tech background grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

                {/* Header */}
                <div className="relative z-10 flex items-start justify-between mb-6 md:mb-8">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-1 leading-tight tracking-tight">
                      {detail.title}
                    </h2>
                    <p className="text-slate-400 text-xs md:text-sm mt-1.5 md:mt-2 max-w-2xl leading-relaxed">
                      {detail.subTitle}
                    </p>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setActiveTeam(null)}
                    aria-label="Close modal"
                    className="p-2 md:p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300 shadow-md group hover:scale-105 active:scale-95 cursor-pointer ml-4"
                  >
                    <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                  </button>
                </div>

                {/* Content body */}
                <div className="relative z-10 flex-1 overflow-y-auto space-y-6 md:space-y-8 pr-2">
                  {/* Description paragraph */}
                  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 p-5 md:p-6 rounded-2xl">
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed tracking-wide font-normal font-sans">
                      {detail.description}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div>
                    <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 font-mono">
                      Key Responsibilities & Domains
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {detail.highlights.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div
                            key={index}
                            className={cn(
                              "flex gap-4 p-4 md:p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 border border-slate-900/60 transition-all duration-300 hover:border-slate-800",
                              "hover:bg-slate-950/80 group/item relative overflow-hidden"
                            )}
                          >
                            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 transition-colors duration-300 group-hover/item:text-cyan-400 group-hover/item:border-cyan-500/20">
                              <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm md:text-base font-semibold text-slate-200 group-hover/item:text-white transition-colors duration-300">
                                {item.title}
                              </h4>
                              <p className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
