import { useEffect, useState } from "react"
import { motion, stagger, useAnimate } from "motion/react"

import Floating, {
  FloatingElement,
} from "@/components/ui/parallax-floating"
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Footer } from "@/components/Footer";
import azadLockedIn from "@/assets/Gallery/azad_lockedin.jpg";
import img_1184 from "@/assets/Gallery/IMG_1184.jpeg";
import img_1187 from "@/assets/Gallery/IMG_1187.jpeg";
import img_1325 from "@/assets/Gallery/IMG_1325.jpeg";
import img_1328 from "@/assets/Gallery/IMG_1328.jpeg";
import img_2551 from "@/assets/Gallery/IMG_2551.jpeg";
import img_2811 from "@/assets/Gallery/IMG_2811.jpeg";
import img_2812 from "@/assets/Gallery/IMG_2812.jpeg";
import img_2816 from "@/assets/Gallery/IMG_2816.jpeg";
import img_3106 from "@/assets/Gallery/IMG_3106.jpeg";
import img_3145 from "@/assets/Gallery/IMG_3145.jpeg";
import img_3146 from "@/assets/Gallery/IMG_3146.jpeg";
import img_3556 from "@/assets/Gallery/IMG_3556.jpeg";
import img_3559 from "@/assets/Gallery/IMG_3559.jpeg";
import img_3566 from "@/assets/Gallery/IMG_3566.jpeg";
import img_3568 from "@/assets/Gallery/IMG_3568.jpeg";
import img_3845 from "@/assets/Gallery/IMG_3845.jpeg";
import img_3849 from "@/assets/Gallery/IMG_3849.jpeg";
import img_3923 from "@/assets/Gallery/IMG_3923.jpeg";
import img_3933 from "@/assets/Gallery/IMG_3933.jpeg";
import img_3977 from "@/assets/Gallery/IMG_3977.jpeg";
import img_3980 from "@/assets/Gallery/IMG_3980.jpeg";
import img_4006 from "@/assets/Gallery/IMG_4006.jpeg";
import img_4017 from "@/assets/Gallery/IMG_4017.jpeg";
import img_4024 from "@/assets/Gallery/IMG_4024.jpeg";
import img_4026 from "@/assets/Gallery/IMG_4026.jpeg";

const archiveImages = [
  { src: img_1184, category: "team", alt: "Team" },
  { src: img_1187, category: "team", alt: "Team" },
  { src: img_1325, category: "testing", alt: "Testing" },
  { src: img_1328, category: "testing", alt: "Testing" },
  { src: img_2551, category: "vehicles", alt: "Vehicles" },
  { src: img_2811, category: "vehicles", alt: "Vehicles" },
  { src: img_2812, category: "vehicles", alt: "Vehicles" },
  { src: img_2816, category: "vehicles", alt: "Vehicles" },
  { src: img_3106, category: "team", alt: "Team" },
  { src: img_3145, category: "testing", alt: "Testing" },
  { src: img_3146, category: "testing", alt: "Testing" },
  { src: img_3556, category: "vehicles", alt: "Vehicles" },
  { src: img_3559, category: "vehicles", alt: "Vehicles" },
  { src: img_3566, category: "team", alt: "Team" },
  { src: img_3568, category: "team", alt: "Team" },
  { src: img_3845, category: "testing", alt: "Testing" },
  { src: img_3849, category: "testing", alt: "Testing" },
  { src: img_3923, category: "vehicles", alt: "Vehicles" },
  { src: img_3933, category: "vehicles", alt: "Vehicles" },
  { src: img_3977, category: "team", alt: "Team" },
  { src: img_3980, category: "team", alt: "Team" },
  { src: img_4006, category: "testing", alt: "Testing" },
  { src: img_4017, category: "testing", alt: "Testing" },
  { src: img_4024, category: "vehicles", alt: "Vehicles" },
  { src: img_4026, category: "vehicles", alt: "Vehicles" },
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
    author: "Vehicles",
    title: "Vehicle photo 1",
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
          <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[0].url}
              className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[10%] left-[32%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[1].url}
              className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
            />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[2%] left-[53%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[2].url}
              className="w-28 h-40 md:w-40 md:h-52 object-cover rounded-xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[0%] left-[83%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[3].url}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
            />
          </FloatingElement>

          <FloatingElement depth={1} className="top-[40%] left-[2%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[4].url}
              className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
            />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[70%] left-[77%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[7].url}
              className="w-28 h-28 md:w-36 md:h-48 object-cover rounded-xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
            />
          </FloatingElement>

          <FloatingElement depth={4} className="top-[73%] left-[15%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[5].url}
              className="w-40 md:w-52 h-full object-cover rounded-xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[80%] left-[50%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[6].url}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
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
                className="bg-white/5 backdrop-blur-sm rounded-full border border-white/10 p-1.5"
                value={key}
                onValueChange={(e) => {
                    if (e) setKey(e);
                }}>
                <ToggleGroupItem value="all" className="sm:px-6 rounded-full data-[state=on]:bg-blue-500 data-[state=on]:text-white text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                    All
                </ToggleGroupItem>
                <ToggleGroupItem value="vehicles" className="sm:px-6 rounded-full data-[state=on]:bg-blue-500 data-[state=on]:text-white text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                    Vehicles
                </ToggleGroupItem>
                <ToggleGroupItem value="team" className="sm:px-6 rounded-full data-[state=on]:bg-blue-500 data-[state=on]:text-white text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                    Team
                </ToggleGroupItem>
                <ToggleGroupItem value="testing" className="sm:px-6 rounded-full data-[state=on]:bg-blue-500 data-[state=on]:text-white text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                    Testing
                </ToggleGroupItem>
                <ToggleGroupItem value="goofy" className="sm:px-6 rounded-full data-[state=on]:bg-blue-500 data-[state=on]:text-white text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                    Goofy stuff
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
