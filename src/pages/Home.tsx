import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback, type PointerEvent } from "react";
import imgBg from "../assets/hero_parallax/979650ce95a6c67ea15bbbf0ad0681f152bbf7b3.webp";
import imgScreenshot20251022182250Photoroom1 from "../assets/hero_parallax/b0b02181d3064ccfa838a5b7d18e44696ad67457.webp";
import imgChatGptImageOct252025114243PmPhotoroom1 from "../assets/hero_parallax/ffd48cdd2aea9c7f098608b847a7c0c99b5f4eb8.webp";
import imgGeminiGeneratedImageSucjggsucjggsucjPhotoroom13 from "../assets/hero_parallax/724bc4d4bdcd3aa5ae40dbbe2940545d28abfe9c.webp";
import imgGeminiGeneratedImage41Nzht41Nzht41NzPhotoroom1 from "../assets/hero_parallax/152fd27cdd307ca2d7657a11e9e58325de922f88.webp";
import imgGeminiGeneratedImageK988Jxk988Jxk988Photoroom1 from "../assets/hero_parallax/1c12efb875dc486a28207d77f13caa9aaac52df6.webp";
import logoAnsys from "../assets/Background - less sponsors logos/Ansys.webp";
import hullPoolTesting from "@/assets/Gallery/hull_pool_testing.jpg";
import logoDassault from "../assets/Background - less sponsors logos/Dassault Systemes.webp";
import logoMIT from "../assets/Background - less sponsors logos/MIT.webp";
import logoVicharak from "../assets/Background - less sponsors logos/Vicharak.webp";
import logoWisdom from "../assets/Background - less sponsors logos/Wisdom Technologies.webp";
import mechanicalBg from "@/assets/homepage_bento_background/mechanical.webp";
import electricalBg from "@/assets/homepage_bento_background/electrical.webp";
import managementBg from "@/assets/homepage_bento_background/management.webp";
import softwareBg from "@/assets/homepage_bento_background/software.webp";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { LogoSlider } from "@/components/ui/logo-slider";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LiquidButton } from "@/components/animate-ui/components/buttons/liquid";
import {
  FileTextIcon,
  InputIcon,
  GlobeIcon,
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
    href: "/team#mechanical",
    cta: "Explore Subsystem",
    background: <img src={mechanicalBg} className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Mechanical" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Zap,
    name: "Electrical",
    description: "Power systems and embedded electronics.",
    href: "/team#electrical",
    cta: "Explore Subsystem",
    background: <img src={electricalBg} className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Electrical" />,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Code,
    name: "Software",
    description: "Autonomous navigation and computer vision.",
    href: "/team#software",
    cta: "Explore Subsystem",
    background: <img src={softwareBg} className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Software" />,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: LayoutDashboard,
    name: "Management & Design",
    description: "Sponsorships, branding, media production, and outreach.",
    href: "/team#management",
    cta: "Explore Subsystem",
    background: <img src={managementBg} className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105" alt="Management and Design" />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3",
  },
];

const sponsorItems = [
  { logo: logoAnsys, alt: "Ansys", href: "https://www.ansys.com/en-in" },
  { logo: logoDassault, alt: "Dassault Systemes", href: "https://www.solidworks.com/product/students" },
  { logo: logoMIT, alt: "MIT", href: "https://www.manipal.edu/mu/campuses/mahe-bengaluru/academics/institution-list/mit-blr.html" },
  { logo: logoVicharak, alt: "Vicharak", href: "https://vicharak.in/" },
  { logo: logoWisdom, alt: "Wisdom Technologies", href: "https://in.linkedin.com/company/wisdom-technologies-pvt-ltd" },
];

const baseLogos = sponsorItems.map((s, idx) => (
  <img key={idx + 1} src={s.logo} alt={s.alt} />
));

const logos = [
  ...baseLogos,
  ...baseLogos.map((logo) => <img key={`5-${logo.key}`} src={logo.props.src} alt={logo.props.alt} />),
  ...baseLogos.map((logo) => <img key={`9-${logo.key}`} src={logo.props.src} alt={logo.props.alt} />),
  ...baseLogos.map((logo) => <img key={`13-${logo.key}`} src={logo.props.src} alt={logo.props.alt} />),
];



export function Home() {
  const [scrollY, setScrollY] = useState(0);

  // Preload hero parallax images
  useEffect(() => {
    const imagesToPreload = [
      imgBg,
      imgGeminiGeneratedImage41Nzht41Nzht41NzPhotoroom1,
      imgGeminiGeneratedImageK988Jxk988Jxk988Photoroom1,
      imgGeminiGeneratedImageSucjggsucjggsucjPhotoroom13,
      imgScreenshot20251022182250Photoroom1,
      imgChatGptImageOct252025114243PmPhotoroom1,
    ];

    const linkElements = imagesToPreload.map((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      return link;
    });

    return () => {
      linkElements.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



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
            fetchPriority="high"
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
              fetchPriority="high"
            />
          </div>

          <div className="absolute w-[180vw] left-[45vw] bottom-[-55vw] md:w-[120vw] md:left-[35vw] md:bottom-[-35vw]">
            <img
              alt="Right Rocks"
              className="w-full h-auto object-contain opacity-90"
              src={imgGeminiGeneratedImageK988Jxk988Jxk988Photoroom1}
              fetchPriority="high"
            />
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none z-[2]"
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
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-[10] pt-16">
          <div className="relative flex flex-col items-center gap-[20px] scale-[0.85] sm:scale-75 md:scale-100">

            <div className="relative w-[290px] h-[290px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px]">
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

                <div className="absolute inset-[45px] sm:inset-[80px] md:inset-[100px] border border-[rgba(0,240,255,0.25)] border-dashed rounded-full" />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-[11px] opacity-100">
                <div className="font-medium text-xs sm:text-lg md:text-xl text-white tracking-widest uppercase select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] -mb-2 sm:-mb-4 md:-mb-5">
                  TEAM
                </div>
                <div className="w-[180px] h-[90px] sm:w-[300px] sm:h-[150px] md:w-[400px] md:h-[200px] relative">
                  <img
                    alt="AUV Logo Main"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    src={imgScreenshot20251022182250Photoroom1}
                    fetchPriority="high"
                  />
                </div>
                <div className="font-medium text-lg sm:text-3xl md:text-[40px] text-white text-center tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] -mt-2 sm:-mt-4 md:-mt-5">
                  MIT-BENGALURU
                </div>
              </div>

              <div
                className="absolute w-[180px] h-[150px] sm:w-[300px] sm:h-[250px] md:w-[400px] md:h-[350px] right-[-40px] top-[20px] sm:right-[-60px] sm:top-[40px] md:right-[-80px] md:top-[50px] opacity-90"
                style={{
                  transform: `translate3d(${scrollY * -0.1}px, ${scrollY * -0.15}px, 0)`,
                  willChange: 'transform'
                }}
              >
                <img
                  alt="School of Fish"
                  className="w-full h-full object-contain"
                  src={imgChatGptImageOct252025114243PmPhotoroom1}
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[-1px] left-0 right-0 h-[25vh] bg-gradient-to-t from-[#020617] via-[#020617]/85 to-transparent pointer-events-none z-[5]" />
      </section>

      <section className="w-full relative order-2 md:order-2">
        {/* Full-width gradient overlay to fade in the background caustics */}
        <div className="absolute top-0 left-0 right-0 h-[25vh] bg-gradient-to-b from-[#020617] via-[#020617]/85 to-transparent pointer-events-none z-0" />

        <div className="py-24 px-6 max-w-7xl mx-auto relative z-10">
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

                <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-[1.1] text-white">
                  Pushing the boundaries of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300">marine robotics.</span>
                </h3>

                <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
                  We are a team of passionate engineers and researchers dedicated to developing effective and affordable autonomous underwater vehicles. Our mission is to create robust, intelligent systems capable of performing complex tasks in the harsh underwater environment, from environmental monitoring to underwater inspection.
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
                    <span className="text-3xl font-black text-white tracking-tight mb-1 drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]">1</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">Awards Won</span>
                  </div>

                  {/* Stat 4 */}
                  <div className="flex flex-col p-5 bg-slate-950/40 backdrop-blur-md border border-slate-900 rounded-2xl relative overflow-hidden group/cell transition-all duration-300 hover:border-blue-500/20 hover:bg-slate-950/60 shadow-inner">
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover/cell:w-full transition-all duration-300" />
                    <span className="text-3xl font-black text-white tracking-tight mb-1 drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]">2025</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-mono">Established</span>
                  </div>
                </div>

                <LiquidButton variant="blueToWhite" className="w-fit rounded-full px-8 py-6 shadow-lg shadow-blue-900/30 font-bold text-sm hover:scale-105 group z-10" asChild>
                  <Link to="/about">
                    Read our full story
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </LiquidButton>
              </div>

              {/* Right Picture Column */}
              <div className="lg:col-span-5 relative w-full flex justify-center mt-12 lg:mt-0 select-none">
                <div className="relative z-10 w-[95%] md:w-[90%] aspect-[16/9] rounded-[2rem] overflow-hidden border border-slate-800/80 bg-slate-950 shadow-2xl group/img transition-all duration-700 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/5 opacity-40 z-0 pointer-events-none" />
                  <img
                    src={hullPoolTesting}
                    alt="AUV Hull Pool Testing"
                    className="w-full h-full object-cover grayscale-[10%] group-hover/img:grayscale-0 group-hover/img:scale-[1.03] transition-all duration-700 ease-out z-10"
                    loading="lazy"
                  />

                  {/* HUD border frame overlay */}
                  <div className="absolute inset-0 border border-slate-800/40 rounded-[2rem] pointer-events-none z-20 m-1.5" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 z-10 pointer-events-none" />

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto order-4 md:order-3 relative">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-3">Sub-systems</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">The core of our vehicle</h3>
        </div>

        <BentoGrid className="lg:grid-rows-2">
          {features.map((feature, idx) => (
            <BentoCard
              key={feature.name}
              {...feature}
              index={idx}
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

      <section className="py-24 border-t border-slate-800/50 bg-transparent order-7 md:order-7 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0a1128] border border-slate-800/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 border border-slate-800/50 rounded-[2.5rem] pointer-events-none z-20 m-2" />
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-3">Thank You To</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Our Proud Sponsors</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center max-w-5xl mx-auto">
                {sponsorItems.map((sponsor, idx) => {
                  const CardContent = (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(96,165,250,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.08)_1px,transparent_1px)] bg-[size:14px_14px] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
                      <div className="absolute h-[180px] w-[180px] rounded-full bg-blue-300/10 blur-[40px] opacity-70 transition-all duration-700 group-hover:bg-cyan-300/15 group-hover:opacity-100 pointer-events-none" />
                      <div className="relative flex max-h-full max-w-full items-center justify-center transition-all duration-300 [&_img]:max-h-20 [&_img]:w-auto [&_img]:object-contain [&_img]:drop-shadow-lg [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-105 md:[&_img]:max-h-28">
                        <img src={sponsor.logo} alt={sponsor.alt} />
                      </div>
                    </>
                  );

                  const cardClasses = "group relative flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl border border-blue-900/60 bg-gradient-to-br from-[#0c1f4a] via-[#0b1a3d] to-[#08142f] p-3 transition-all duration-300 hover:border-blue-400/30 md:h-40 md:p-4 last:col-span-2 last:max-w-[calc(50%-12px)] md:last:col-span-1 md:last:max-w-full cursor-pointer";

                  if (sponsor.href) {
                    return (
                      <a
                        key={idx}
                        href={sponsor.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cardClasses}
                      >
                        {CardContent}
                      </a>
                    );
                  }

                  return (
                    <div key={idx} className={cardClasses.replace("cursor-pointer", "cursor-default")}>
                      {CardContent}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="order-8 md:order-8">
        <Footer />
      </div>




    </div>
  );
}
