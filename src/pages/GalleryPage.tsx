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
import img5 from "@/assets/Gallery/IMG5.webp";
import img6 from "@/assets/Gallery/IMG6.webp";
import img7 from "@/assets/Gallery/IMG7.webp";
import img8 from "@/assets/Gallery/IMG8.webp";
import img9 from "@/assets/Gallery/IMG9.webp";
import img10 from "@/assets/Gallery/IMG10.webp";
import img11 from "@/assets/Gallery/IMG11.webp";
import img12 from "@/assets/Gallery/IMG12.webp";
import img13 from "@/assets/Gallery/IMG13.webp";
import img14 from "@/assets/Gallery/IMG14.webp";
import img15 from "@/assets/Gallery/IMG15.webp";
import img16 from "@/assets/Gallery/IMG16.webp";
import img17 from "@/assets/Gallery/IMG17.webp";
import img18 from "@/assets/Gallery/IMG18.webp";
import img19 from "@/assets/Gallery/IMG19.webp";
import img20 from "@/assets/Gallery/IMG20.webp";
import img21 from "@/assets/Gallery/IMG21.webp";
import img22 from "@/assets/Gallery/IMG22.webp";
import img23 from "@/assets/Gallery/IMG23.webp";
import img24 from "@/assets/Gallery/IMG24.webp";
import img25 from "@/assets/Gallery/IMG25.webp";
import img26 from "@/assets/Gallery/IMG26.webp";
import img27 from "@/assets/Gallery/IMG27.webp";
import img28 from "@/assets/Gallery/IMG28.webp";
import img29 from "@/assets/Gallery/IMG29.webp";
import img30 from "@/assets/Gallery/IMG30.webp";
import img31 from "@/assets/Gallery/IMG31.webp";
import img32 from "@/assets/Gallery/IMG32.webp";
import img33 from "@/assets/Gallery/IMG33.webp";
import img34 from "@/assets/Gallery/IMG34.webp";
import img35 from "@/assets/Gallery/IMG35.webp";
import img36 from "@/assets/Gallery/IMG36.webp";
import img37 from "@/assets/Gallery/IMG37.webp";
import img38 from "@/assets/Gallery/IMG38.webp";
import img39 from "@/assets/Gallery/IMG39.webp";
import img40 from "@/assets/Gallery/IMG40.webp";
import img41 from "@/assets/Gallery/IMG41.webp";
import img42 from "@/assets/Gallery/IMG42.webp";
import img43 from "@/assets/Gallery/IMG43.webp";
import img44 from "@/assets/Gallery/IMG44.webp";
import img45 from "@/assets/Gallery/IMG45.webp";
import img46 from "@/assets/Gallery/IMG46.webp";
import im2g0 from "@/assets/Gallery/IM2G0.webp";
import im2g1 from "@/assets/Gallery/IM2G1.webp";
import im2g2 from "@/assets/Gallery/IM2G2.webp";
import im2g3 from "@/assets/Gallery/IM2G3.webp";
import im2g4 from "@/assets/Gallery/IM2G4.webp";
import im2g5 from "@/assets/Gallery/IM2G5.webp";
import im2g6 from "@/assets/Gallery/IM2G6.webp";
import im2g7 from "@/assets/Gallery/IM2G7.webp";
import im2g8 from "@/assets/Gallery/IM2G8.webp";
import im2g9 from "@/assets/Gallery/IM2G9.webp";
import im2g10 from "@/assets/Gallery/IM2G10.webp";
import im2g11 from "@/assets/Gallery/IM2G11.webp";
import im2g12 from "@/assets/Gallery/IM2G12.webp";
import im2g13 from "@/assets/Gallery/IM2G13.webp";
import im2g14 from "@/assets/Gallery/IM2G14.webp";
import im2g15 from "@/assets/Gallery/IM2G15.webp";

const archiveImages = [
  { src: img_1184, category: "team", alt: "Team" },
  { src: img_1187, category: "team", alt: "Team" },
  { src: img_1325, category: "team", alt: "Testing" },
  { src: img_1328, category: "team", alt: "Testing" },
  { src: img_2551, category: "team", alt: "Vehicles" },
  { src: img_2811, category: "team", alt: "Vehicles" },
  { src: img_2812, category: "team", alt: "Vehicles" },
  { src: img_2816, category: "team", alt: "Vehicles" },
  { src: img_3106, category: "team", alt: "Team" },
  { src: img_3145, category: "team", alt: "Testing" },
  { src: img_3146, category: "team", alt: "Testing" },
  { src: img_3556, category: "vehicles", alt: "Vehicless" },
  { src: img_3559, category: "team", alt: "Vehicless" },
  { src: img_3566, category: "team", alt: "Team" },
  { src: img_3568, category: "vehicles", alt: "Team" },
  { src: img_3845, category: "vehicles", alt: "Testing" },
  { src: img_3849, category: "vehicles", alt: "Testing" },
  { src: img_3923, category: "team", alt: "Vehicless" },
  { src: img_3933, category: "team", alt: "Vehicless" },
  { src: img_3977, category: "team", alt: "Team" },
  { src: img_3980, category: "vehicles", alt: "Team" },
  { src: img_4006, category: "testing", alt: "Testing" },
  { src: img_4017, category: "testing", alt: "Testing" },
  { src: img_4026, category: "vehicles", alt: "Vehicless" },
  { src: img0, category: "testing", alt: "IMG0" },
  { src: img1, category: "testing", alt: "IMG1" },
  { src: img2, category: "testing", alt: "IMG2" },
  { src: img3, category: "team", alt: "IMG3" },
  { src: img4, category: "team", alt: "IMG4" },
  { src: img5, category: "goofy", alt: "IMG5" },
  { src: img6, category: "team", alt: "IMG6" },
  { src: img7, category: "testing", alt: "IMG7" },
  { src: img8, category: "goofy", alt: "IMG8" },
  { src: img9, category: "testing", alt: "IMG9" },
  { src: img10, category: "testing", alt: "IMG10" },
  { src: img11, category: "testing", alt: "IMG11" },
  { src: img12, category: "vehicles", alt: "IMG12" },
  { src: img13, category: "goofy", alt: "IMG13" },
  { src: img14, category: "vehicles", alt: "IMG14" },
  { src: img15, category: "team", alt: "IMG15" },
  { src: img16, category: "team", alt: "IMG16" },
  { src: img17, category: "testing", alt: "IMG17" },
  { src: img18, category: "team", alt: "IMG18" },
  { src: img19, category: "testing", alt: "IMG19" },
  { src: img20, category: "team", alt: "IMG20" },
  { src: img21, category: "goofy", alt: "IMG21" },
  { src: img22, category: "vehicles", alt: "IMG22" },
  { src: img23, category: "vehicles", alt: "IMG23" },
  { src: img24, category: "goofy", alt: "IMG24" },
  { src: img25, category: "testing", alt: "IMG25" },
  { src: img26, category: "team", alt: "IMG26" },
  { src: img27, category: "testing", alt: "IMG27" },
  { src: img28, category: "testing", alt: "IMG28" },
  { src: img29, category: "goofy", alt: "IMG29" },
  { src: img30, category: "goofy", alt: "IMG30" },
  { src: img31, category: "team", alt: "IMG31" },
  { src: img32, category: "team", alt: "IMG32" },
  { src: img33, category: "team", alt: "IMG33" },
  { src: img34, category: "team", alt: "IMG34" },
  { src: img35, category: "team", alt: "IMG35" },
  { src: img36, category: "vehicles", alt: "IMG36" },
  { src: img37, category: "goofy", alt: "IMG37" },
  { src: img38, category: "goofy", alt: "IMG38" },
  { src: img39, category: "vehicles", alt: "IMG39" },
  { src: img40, category: "team", alt: "IMG40" },
  { src: img41, category: "team", alt: "IMG41" },
  { src: img42, category: "team", alt: "IMG42" },
  { src: img43, category: "testing", alt: "IMG43" },
  { src: img44, category: "team", alt: "IMG44" },
  { src: img45, category: "goofy", alt: "IMG45" },
  { src: img46, category: "goofy", alt: "IMG46" },
  { src: im2g0, category: "goofy", alt: "IM2G0" },
  { src: im2g1, category: "goofy", alt: "IM2G1" },
  { src: im2g2, category: "team", alt: "IM2G2" },
  { src: im2g3, category: "testing", alt: "IM2G3" },
  { src: im2g4, category: "goofy", alt: "IM2G4" },
  { src: im2g5, category: "goofy", alt: "IM2G5" },
  { src: im2g6, category: "team", alt: "IM2G6" },
  { src: im2g7, category: "goofy", alt: "IM2G7" },
  { src: im2g8, category: "goofy", alt: "IM2G8" },
  { src: im2g9, category: "goofy", alt: "IM2G9" },
  { src: im2g10, category: "goofy", alt: "IM2G10" },
  { src: im2g11, category: "team", alt: "IM2G11" },
  { src: im2g12, category: "team", alt: "IM2G12" },
  { src: im2g13, category: "goofy", alt: "IM2G13" },
  { src: im2g14, category: "testing", alt: "IM2G14" },
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
    <div className="flex flex-col min-h-screen bg-black -mt-24">
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
          <p className="text-4xl md:text-6xl lg:text-7xl z-50 text-white font-semibold tracking-tight">
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
            <h2 className="text-3xl md:text-5xl font-semibold uppercase tracking-tight text-white">
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
            <ToggleGroupItem
              value="goofy"
              className="rounded-full px-6 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-blue-400 hover:bg-white/5 data-[state=on]:bg-white/5 data-[state=on]:text-blue-400"
            >
              Goofy Stuff
            </ToggleGroupItem>
          </ToggleGroup>

          <FlipReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full mt-8" keys={[key]} showClass="flex" hideClass="hidden">
            {archiveImages.map((img, idx) => (
              <FlipRevealItem key={idx} flipKey={img.category} className="w-full aspect-square">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-xl border border-white/5"
                />
              </FlipRevealItem>
            ))}
          </FlipReveal>
        </div>
      </div>

      <Footer />
    </div>
  )
}
