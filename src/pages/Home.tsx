import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import imgBg from "../assets/hero_parallax/979650ce95a6c67ea15bbbf0ad0681f152bbf7b3.png";
import imgScreenshot20251022182250Photoroom1 from "../assets/hero_parallax/b0b02181d3064ccfa838a5b7d18e44696ad67457.png";
import imgChatGptImageOct252025114243PmPhotoroom1 from "../assets/hero_parallax/ffd48cdd2aea9c7f098608b847a7c0c99b5f4eb8.png";
import imgGeminiGeneratedImageSucjggsucjggsucjPhotoroom13 from "../assets/hero_parallax/724bc4d4bdcd3aa5ae40dbbe2940545d28abfe9c.png";
import imgGeminiGeneratedImage41Nzht41Nzht41NzPhotoroom1 from "../assets/hero_parallax/152fd27cdd307ca2d7657a11e9e58325de922f88.png";
import imgGeminiGeneratedImageK988Jxk988Jxk988Photoroom1 from "../assets/hero_parallax/1c12efb875dc486a28207d77f13caa9aaac52df6.png";
import logoAnsys from "../assets/Backgroud - less sponsors logos/Ansys.png";
import AUV_GROUP_PIC from "@/assets/Group_photo/AUV_GROUP_PIC.jpeg";
import logoDassault from "../assets/Backgroud - less sponsors logos/Dassault Systemes.png";
import logoMIT from "../assets/Backgroud - less sponsors logos/MIT.png";
import logoVicharak from "../assets/Backgroud - less sponsors logos/Vicharak.png";
import logoWisdom from "../assets/Backgroud - less sponsors logos/Wisdom Technologies.png";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
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
import { ArrowRight, Cpu, Zap, Code, LayoutDashboard } from "lucide-react";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { PhotoGallery } from "@/components/ui/gallery";

const features = [
  {
    Icon: Cpu,
    name: "Mechanical",
    description: "Structural integrity and fluid dynamics.",
    href: "/team",
    cta: "View Team",
    background: <img src="https://picsum.photos/seed/mech/600/600" className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Mechanical" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Zap,
    name: "Electrical",
    description: "Power systems and embedded electronics.",
    href: "/team",
    cta: "View Team",
    background: <img src="https://picsum.photos/seed/elec/600/600" className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Electrical" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: LayoutDashboard,
    name: "Design",
    description: "Aerodynamic and ergonomic vehicle design.",
    href: "/team",
    cta: "View Team",
    background: <img src="https://picsum.photos/seed/design/600/600" className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Design" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Management",
    description: "Project timelines and resource allocation.",
    href: "/team",
    cta: "View Team",
    background: <img src="https://picsum.photos/seed/mgmt/600/600" className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Management" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Code,
    name: "Software",
    description: "Autonomous navigation and computer vision.",
    href: "/team",
    cta: "View Team",
    background: <img src="https://picsum.photos/seed/soft/600/600" className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Software" />,
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


export function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden flex flex-col">
      
      <section className="relative h-[100vh] w-full overflow-hidden bg-[#000910] order-1 md:order-1">
        
        <div 
          className="absolute inset-0 w-full h-[120vh]"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
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
            transform: `translateY(${scrollY * 0.4}px)`,
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
            transform: `translateY(${scrollY * 0.6}px)`,
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
              <div className="absolute inset-0 border border-[rgba(0,240,255,0.15)] rounded-full">
                
                <div className="absolute w-[8px] h-[8px] bg-[#00f0ff] rounded-full left-1/2 -translate-x-1/2 top-0 shadow-[0_0_20px_#00f0ff]" />
                
                <div className="absolute w-[8px] h-[8px] bg-[#00f0ff] rounded-full left-1/2 -translate-x-1/2 bottom-0 shadow-[0_0_20px_#00f0ff]" />
              </div>

              <div className="absolute inset-[80px] md:inset-[100px] border border-[rgba(0,240,255,0.25)] border-dashed rounded-full" />

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
                  transform: `translate(${scrollY * -0.1}px, ${scrollY * -0.15}px)`,
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
              <div className="relative z-10 w-[95%] md:w-[90%] aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-800/80 bg-slate-950 shadow-2xl group/img transition-all duration-700 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
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
            <BentoCard key={feature.name} {...feature} />
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
                className="group relative flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl border border-blue-900/60 bg-gradient-to-br from-[#0c1f4a] via-[#0b1a3d] to-[#08142f] p-3 transition-all duration-300 hover:border-blue-400/30 md:h-40 md:p-4"
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
    </div>
  );
}
