import { useEffect, useState } from "react"
import { motion, stagger, useAnimate } from "motion/react"

import Floating, {
  FloatingElement,
} from "@/components/ui/parallax-floating"
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Footer } from "@/components/Footer";

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Branislav Rodman",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-brushing-her-teeth-r1SjnJL5tf0",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
    author: "Serhii Tyaglovsky",
    title: "Mann im schwarzen Hemd unter blauem Himmel",
  },
  {
    url: "https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
    author: "Vladimir Yelizarov",
    title: "A women with a flower crown on her head",
  },
  {
    url: "https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A blurry photo of white flowers in a field",
    author: "Eugene Golovesov",
    link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
  },
  {
    url: "https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Mathilde Langevin",
    link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
    title: "A table topped with two wine glasses and plates",
  },
]

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
            </ToggleGroup>

            <FlipReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full mt-8" keys={[key]} showClass="flex" hideClass="hidden">
                <FlipRevealItem flipKey="vehicles" className="w-full aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop"
                        alt="Hydrogen Prototype"
                        className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-xl border border-white/5"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="team" className="w-full aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                        alt="Team Meeting"
                        className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-xl border border-white/5"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="testing" className="w-full aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=800&auto=format&fit=crop"
                        alt="Underwater Testing"
                        className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-xl border border-white/5"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="vehicles" className="w-full aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                        alt="Deuterium Engineering"
                        className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-xl border border-white/5"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="team" className="w-full aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800&auto=format&fit=crop"
                        alt="Team Collaboration"
                        className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-xl border border-white/5"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="testing" className="w-full aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop"
                        alt="Ocean Testing"
                        className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-xl border border-white/5"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="vehicles" className="w-full aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1580828369019-181321e2e4a4?q=80&w=800&auto=format&fit=crop"
                        alt="AUV Components"
                        className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-xl border border-white/5"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="testing" className="w-full aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop"
                        alt="Pool Testing"
                        className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-xl border border-white/5"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="team" className="w-full aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                        alt="Team Planning"
                        className="w-full h-full object-cover rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-xl border border-white/5"
                    />
                </FlipRevealItem>
            </FlipReveal>
        </div>
      </div>

      <Footer />
    </div>
  )
}
