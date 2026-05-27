import { useEffect, useState } from "react"
import { motion, stagger, useAnimate } from "motion/react"

import Floating, {
  FloatingElement,
} from "@/components/ui/parallax-floating"
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Footer } from "@/components/Footer";
import azadLockedIn from "@/assets/Gallery/azad_lockedin.webp";
import img_1184 from "@/assets/Gallery/IMG_1184.webp";
import img_1187 from "@/assets/Gallery/IMG_1187.webp";
import img_1325 from "@/assets/Gallery/IMG_1325.webp";
import img_1328 from "@/assets/Gallery/IMG_1328.webp";
import img_2551 from "@/assets/Gallery/IMG_2551.webp";
import img_2811 from "@/assets/Gallery/IMG_2811.webp";
import img_2812 from "@/assets/Gallery/IMG_2812.webp";
import img_2816 from "@/assets/Gallery/IMG_2816.webp";
import img_3106 from "@/assets/Gallery/IMG_3106.webp";
import img_3145 from "@/assets/Gallery/IMG_3145.webp";
import img_3146 from "@/assets/Gallery/IMG_3146.webp";
import img_3556 from "@/assets/Gallery/IMG_3556.webp";
import img_3559 from "@/assets/Gallery/IMG_3559.webp";
import img_3566 from "@/assets/Gallery/IMG_3566.webp";
import img_3568 from "@/assets/Gallery/IMG_3568.webp";
import img_3845 from "@/assets/Gallery/IMG_3845.webp";
import img_3849 from "@/assets/Gallery/IMG_3849.webp";
import img_3923 from "@/assets/Gallery/IMG_3923.webp";
import img_3933 from "@/assets/Gallery/IMG_3933.webp";
import img_3977 from "@/assets/Gallery/IMG_3977.webp";
import img_3980 from "@/assets/Gallery/IMG_3980.webp";
import img_4006 from "@/assets/Gallery/IMG_4006.webp";
import img_4017 from "@/assets/Gallery/IMG_4017.webp";
import img_4026 from "@/assets/Gallery/IMG_4026.webp";
import img0 from "@/assets/Gallery/IMG0.webp";
import img1 from "@/assets/Gallery/IMG1.webp";
import img2 from "@/assets/Gallery/IMG2.webp";
import img3 from "@/assets/Gallery/IMG3.webp";
import img4 from "@/assets/Gallery/IMG4.webp";
import img6 from "@/assets/Gallery/IMG6.webp";
import img7 from "@/assets/Gallery/IMG7.webp";
import img9 from "@/assets/Gallery/IMG9.webp";
import img10 from "@/assets/Gallery/IMG10.webp";
import img11 from "@/assets/Gallery/IMG11.webp";
import img12 from "@/assets/Gallery/IMG12.webp";
import img14 from "@/assets/Gallery/IMG14.webp";
import img15 from "@/assets/Gallery/IMG15.webp";
import img16 from "@/assets/Gallery/IMG16.webp";
import img17 from "@/assets/Gallery/IMG17.webp";
import img18 from "@/assets/Gallery/IMG18.webp";
import img19 from "@/assets/Gallery/IMG19.webp";
import img20 from "@/assets/Gallery/IMG20.webp";
import img22 from "@/assets/Gallery/IMG22.webp";
import img23 from "@/assets/Gallery/IMG23.webp";
import img25 from "@/assets/Gallery/IMG25.webp";
import img26 from "@/assets/Gallery/IMG26.webp";
import img28 from "@/assets/Gallery/IMG28.webp";
import img31 from "@/assets/Gallery/IMG31.webp";
import img32 from "@/assets/Gallery/IMG32.webp";
import img33 from "@/assets/Gallery/IMG33.webp";
import img34 from "@/assets/Gallery/IMG34.webp";
import img36 from "@/assets/Gallery/IMG36.webp";
import img39 from "@/assets/Gallery/IMG39.webp";
import img40 from "@/assets/Gallery/IMG40.webp";
import img41 from "@/assets/Gallery/IMG41.webp";
import img42 from "@/assets/Gallery/IMG42.webp";
import img43 from "@/assets/Gallery/IMG43.webp";
import img44 from "@/assets/Gallery/IMG44.webp";
import im2g3 from "@/assets/Gallery/IM2G3.webp";
import im2g6 from "@/assets/Gallery/IM2G6.webp";
import im2g12 from "@/assets/Gallery/IM2G12.webp";
import im2g14 from "@/assets/Gallery/IM2G14.webp";
import im2g15 from "@/assets/Gallery/IM2G15.webp";
import aryanImg from "@/assets/Gallery/aryan.jpeg";
import cam1Img from "@/assets/Gallery/cam1.jpeg";
import internalImg from "@/assets/Gallery/internal.jpeg";
import teamImg from "@/assets/Gallery/team.jpeg";
import galleryWhiteboard from "@/assets/Gallery/gallery_whiteboard.jpg";
import galleryPoolSide from "@/assets/Gallery/gallery_pool_side.jpg";
import galleryUnderwater from "@/assets/Gallery/gallery_underwater.jpg";
import galleryBoard from "@/assets/Gallery/gallery_board.jpg";
import galleryCad from "@/assets/Gallery/gallery_cad.jpg";
import img_5589 from "@/assets/Gallery/IMG_5589.MOV";
import galleryMentors from "@/assets/Gallery/gallery_mentors.jpg";
import galleryWorking from "@/assets/Gallery/gallery_working.jpg";
import galleryAward from "@/assets/Gallery/gallery_award.jpg";
import galleryPressureTest from "@/assets/Gallery/gallery_pressure_test.jpg";
import galleryPoolTest2 from "@/assets/Gallery/gallery_pool_test_2.mov";

const archiveImages = [
  { src: aryanImg, category: "team", alt: "Aryan" },
  { src: cam1Img, category: "testing", alt: "Camera View" },
  { src: internalImg, category: "vehicles", alt: "Internal Vehicle View" },
  { src: teamImg, category: "team", alt: "Team Photo" },
  { src: galleryMentors, category: "team", alt: "Team with Mentors" },
  { src: img_1184, category: "team", alt: "Team" },
  { src: img_1187, category: "team", alt: "Team" },
  { src: galleryWhiteboard, category: "team", alt: "Whiteboard Brainstorming" },
  { src: img_1325, category: "team", alt: "Testing" },
  { src: img_1328, category: "team", alt: "Testing" },
  { src: img_2551, category: "team", alt: "Vehicle work session" },
  { src: img_2811, category: "team", alt: "Vehicle assembly work" },
  { src: img_2812, category: "team", alt: "Vehicle assembly close-up" },
  { src: galleryPoolSide, category: "testing", alt: "Poolside Testing" },
  { src: img_2816, category: "team", alt: "Vehicle testing setup" },
  { src: galleryWorking, category: "team", alt: "Prototyping Session" },
  { src: img_3106, category: "team", alt: "Team" },
  { src: img_3145, category: "team", alt: "Testing" },
  { src: img_3146, category: "team", alt: "Testing" },
  { src: img_3556, category: "vehicles", alt: "Vehicle frame and electronics" },
  { src: img_3559, category: "team", alt: "Team working on the vehicle" },
  { src: galleryUnderwater, category: "testing", alt: "AUV Underwater Test" },
  { src: img_3566, category: "team", alt: "Team" },
  { src: img_3568, category: "vehicles", alt: "Vehicle assembly" },
  { src: img_3845, category: "vehicles", alt: "Vehicle testing setup" },
  { src: img_3849, category: "vehicles", alt: "Vehicle testing close-up" },
  { src: galleryAward, category: "vehicles", alt: "First Prize at IEEE RAS Competition" },
  { src: img_3923, category: "team", alt: "Team vehicle work session" },
  { src: img_3933, category: "team", alt: "Team working near the vehicle" },
  { src: img_3977, category: "team", alt: "Team" },
  { src: img_3980, category: "vehicles", alt: "Vehicle hardware close-up" },
  { src: img_4006, category: "testing", alt: "Testing" },
  { src: img_4017, category: "testing", alt: "Testing" },
  { src: img_5589, category: "testing", alt: "AUV Test Run Video" },
  { src: galleryBoard, category: "vehicles", alt: "Main MCU Board" },
  { src: img_4026, category: "vehicles", alt: "Vehicle electronics and wiring" },
  { src: img0, category: "testing", alt: "Swimming pool assembly" },
  { src: img1, category: "testing", alt: "First T200 thruster testing" },
  { src: img2, category: "testing", alt: "Ground launcher testing" },
  { src: img3, category: "team", alt: "Assembling the first ground bot" },
  { src: img4, category: "team", alt: "Aditya and Pranav working" },
  { src: img6, category: "team", alt: "First test of all five thrusters" },
  { src: img7, category: "testing", alt: "Top view of the hull" },
  { src: img9, category: "testing", alt: "Ground launcher testing" },
  { src: img10, category: "testing", alt: "Checking ZED 2i camera feed" },
  { src: img11, category: "testing", alt: "Azad using the oscilloscope" },
  { src: img12, category: "vehicles", alt: "Ground bot" },
  { src: img14, category: "vehicles", alt: "Hydrogen in the pool" },
  { src: galleryPressureTest, category: "testing", alt: "Watertight Pressure Testing" },
  { src: img15, category: "team", alt: "Faizal, Azad, and Arunava working" },
  { src: img16, category: "team", alt: "Arunava and Faizal in the wood workshop" },
  { src: img17, category: "testing", alt: "Pool testing" },
  { src: img18, category: "team", alt: "Hanging up our IEEE RAS first-place award" },
  { src: img19, category: "testing", alt: "Wiring the AUV in front of the pool" },
  { src: img20, category: "team", alt: "Wood fabrication" },
  { src: img22, category: "vehicles", alt: "Screwing in the thrusters" },
  { src: img23, category: "vehicles", alt: "Siddharth standing in the pool" },
  { src: img25, category: "testing", alt: "Preparing the AUV for testing" },
  { src: img26, category: "team", alt: "Siddharth and Azad discussing something important" },
  { src: img28, category: "testing", alt: "Woodfish Gazebo simulation" },
  { src: img31, category: "team", alt: "Chatur and Azad discussing" },
  { src: img32, category: "team", alt: "Faizal sitting in the balcony" },
  { src: img33, category: "team", alt: "Wooden stick in Arunava's hair" },
  { src: img34, category: "team", alt: "Animesh and Azad discussing" },
  { src: img36, category: "vehicles", alt: "First test of all five thrusters" },
  { src: galleryCad, category: "vehicles", alt: "AUV 3D Render" },
  { src: img39, category: "vehicles", alt: "First look at the fabricated hull" },
  { src: img40, category: "team", alt: "Testing the ground bot" },
  { src: img41, category: "team", alt: "First pool testing of Hydrogen" },
  { src: galleryPoolTest2, category: "testing", alt: "Underwater Swimming Test" },
  { src: img42, category: "team", alt: "Azad teaching Aditya and Pranav" },
  { src: img43, category: "testing", alt: "First DShot testing" },
  { src: img44, category: "team", alt: "Arunava working on the ground bot" },
  { src: im2g3, category: "testing", alt: "Internal layout of the AUV" },
  { src: im2g6, category: "team", alt: "Hydrophones PCB design" },
  { src: im2g12, category: "team", alt: "RTAB-Map visualization" },
  { src: im2g14, category: "testing", alt: "Animesh, Chatur, and Arunava" },
  { src: im2g15, category: "testing", alt: "IM2G15" },
  { src: azadLockedIn, category: "team", alt: "Azad Roy" },
];

const exampleImages = [
  {
    url: azadLockedIn,
    author: "Azad Roy",
    link: "#",
    title: "Azad Locked In",
  },
  {
    url: img_1184,
    link: "#",
    title: "Team photo 1",
    author: "Team",
  },
  {
    url: img_1187,
    link: "#",
    author: "Team",
    title: "Team photo 2",
  },
  {
    url: img_1325,
    link: "#",
    author: "Testing",
    title: "Testing photo 1",
  },
  {
    url: img_1328,
    link: "#",
    author: "Testing",
    title: "Testing photo 2",
  },
  {
    url: img_2551,
    link: "#",
    author: "Vehicless",
    title: "Vehicles photo 1",
  },
  {
    url: img_2811,
    title: "Vehicle photo 2",
    author: "Vehicles",
    link: "#",
  },
  {
    url: img_2812,
    author: "Vehicles",
    link: "#",
    title: "Vehicle photo 3",
  },
];

export function GalleryPage() {
  const [scope, animate] = useAnimate()
  const [key, setKey] = useState("all");

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [animate])

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] -mt-24">
      <div
        className="relative flex w-full h-screen min-h-[600px] justify-center items-center overflow-hidden"
        ref={scope}
      >
        <motion.div
          className="z-50 text-center space-y-6 items-center flex flex-col px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.88, delay: 1.5 }}
        >
          <p className="text-4xl md:text-6xl lg:text-7xl z-50 text-white font-bold tracking-tight">
            Explore Our Gallery
          </p>
          <p className="text-slate-300 text-lg md:text-xl max-w-xl z-50">
            A visual journey through our team's projects, events, and achievements.
          </p>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="text-sm font-semibold z-50 hover:scale-105 transition-transform bg-white text-black rounded-full px-8 py-3 mt-4"
          >
            Scroll Down
          </button>
        </motion.div>

        <Floating sensitivity={-1} className="overflow-hidden">
          <FloatingElement depth={0.5} className="top-[2%] left-[-6%] md:top-[8%] md:left-[11%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[0].url}
              className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-2xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl -rotate-12 md:rotate-0"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[10%] left-[22%] md:top-[10%] md:left-[32%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[1].url}
              className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-2xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-6 md:rotate-0"
            />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[2%] left-[48%] md:top-[2%] md:left-[53%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[2].url}
              className="w-24 h-30 md:w-40 md:h-56 lg:w-56 lg:h-72 object-cover rounded-2xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl -rotate-6 md:rotate-0"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[12%] left-[78%] md:top-[0%] md:left-[83%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[3].url}
              className="w-24 h-24 md:w-44 md:h-44 object-cover rounded-2xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-12 md:rotate-0"
            />
          </FloatingElement>

          <FloatingElement depth={1} className="top-[38%] left-[-8%] md:top-[40%] md:left-[2%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[4].url}
              className="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 object-cover rounded-2xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-12 md:rotate-0"
            />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[42%] left-[86%] md:top-[70%] md:left-[77%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[7].url}
              className="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-60 object-cover rounded-2xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl -rotate-12 md:rotate-0"
            />
          </FloatingElement>

          <FloatingElement depth={4} className="top-[74%] left-[4%] md:top-[73%] md:left-[15%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[5].url}
              className="w-24 h-30 md:w-56 md:h-72 object-cover rounded-2xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl -rotate-6 md:rotate-0"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[80%] left-[48%] md:top-[80%] md:left-[50%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[6].url}
              className="w-24 h-24 md:w-44 md:h-44 object-cover rounded-2xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-6 md:rotate-0"
            />
          </FloatingElement>
        </Floating>
      </div>

      <div className="flex-1 min-h-screen flex flex-col items-center justify-start pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl w-full flex flex-col items-center gap-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Project Archives
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Browse through our collection of vehicles, team moments, and underwater testing footage.
            </p>
          </div>

          <ToggleGroup
            type="single"
            className="flex flex-wrap items-center justify-center gap-3 rounded-2xl sm:rounded-full border border-white/10 bg-[#0a1128]/95 px-3 py-2 shadow-2xl backdrop-blur-lg"
            value={key}
            onValueChange={(e) => {
              if (e) setKey(e);
            }}
          >
            <ToggleGroupItem
              value="all"
              className="rounded-full px-6 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-blue-400 hover:bg-white/5 data-[state=on]:bg-white/5 data-[state=on]:text-blue-400"
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem
              value="vehicles"
              className="rounded-full px-6 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-blue-400 hover:bg-white/5 data-[state=on]:bg-white/5 data-[state=on]:text-blue-400"
            >
              Vehicles
            </ToggleGroupItem>
            <ToggleGroupItem
              value="team"
              className="rounded-full px-6 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-blue-400 hover:bg-white/5 data-[state=on]:bg-white/5 data-[state=on]:text-blue-400"
            >
              Team
            </ToggleGroupItem>
            <ToggleGroupItem
              value="testing"
              className="rounded-full px-6 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-blue-400 hover:bg-white/5 data-[state=on]:bg-white/5 data-[state=on]:text-blue-400"
            >
              Testing
            </ToggleGroupItem>

          </ToggleGroup>

          <FlipReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full mt-8" keys={[key]} showClass="flex" hideClass="hidden">
            {archiveImages.map((img, idx) => {
              const isVideo = img.src.endsWith(".MOV") || img.src.endsWith(".mov") || img.src.endsWith(".mp4");
              return (
                <FlipRevealItem key={idx} flipKey={img.category} className="w-full aspect-square">
                  {isVideo ? (
                    <video
                      src={img.src}
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover rounded-2xl shadow-xl border border-white/5"
                    />
                  ) : (
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-xl border border-white/5"
                    />
                  )}
                </FlipRevealItem>
              );
            })}
          </FlipReveal>
        </div>
      </div>

      <Footer />
    </div>
  )
}
