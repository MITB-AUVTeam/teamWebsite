import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, Tag, X } from "lucide-react";
import { Footer } from "@/components/Footer";
import azadLockedIn from "@/assets/Gallery/azad_lockedin.webp";
import img_2816 from "@/assets/Gallery/IMG_2816.webp";
import hull_inside from "@/assets/Gallery/hull_inside.jpg";
import rtab from "@/assets/Gallery/rtab.jpg";
import pcb from "@/assets/Gallery/pcb.jpg";
import IMG_3923 from "@/assets/Gallery/IMG_3923.webp";

export function MediaPage() {
  const [activePost, setActivePost] = useState<any | null>(null);

  // Esc key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePost(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePost]);

  const featuredPost = {
    title: "Evolution of Deuterium: Integrating Custom HYDROPHONES",
    excerpt: "Coming Soon....",
    category: "Technical / Electrical Subsystem",
    date: "Coming Soon....",
    author: "Chatur Vasireddy",
    image: pcb,
  };

  const recentPosts = [
    {
      title: "RTAB-Map or RTAB-Maybe: Navigating the Deep Without Lying to Yourself",
      excerpt: "A deep dive into the trial and error with one of the core stacks the Software Team worked on to overcome the challange of not having a DVL.",
      category: "Technical / Software and Automation Subsystem",
      date: "May 19, 2026",
      author: "Advithiya Duddu",
      image: rtab,
    },
    {
      title: "Saving the AUV in case of a leakage",
      excerpt: "A peek into how we build safe systems keeping in mind all the electronics inside using a water-leak sensor and a Kill Switch.",
      category: "Technical / Electrical Subsystem",
      date: "May 12, 2026",
      author: "Harshika Devarasetty",
      image: hull_inside,
    },
    {
      title: "But What is the Kalman Filter?",
      excerpt: "Demistifying the concept of Kalman Filters, building from the ground up in an intuitive form.",
      category: "Technical / Electrical Subsystem",
      date: "March 20, 2026",
      author: "Azad Roy",
      image: azadLockedIn,
      externalLink: "https://azadroy.com/2026/03/20/but-what-is-the-kalman-filter.html",
    },
    {
      title: "From Hobby projects to real Embeddded Firmware",
      excerpt: "Moving from simple Arduino-level code to real production level embedded code.",
      category: "Technical / Electrical Subsystem",
      date: "January 11, 2026",
      author: "Azad Roy",
      image: img_2816,
      externalLink: "https://azadroy.com/2026/01/11/hobby-to-real-firmware.html",
    },
    {
      title: "Community Outreach: Building and learning together with the community",
      excerpt: "How our team is reaching out to the Bangalore Robotics and AI community through workshops, competitions and interactions with fellow engineers and learner.",
      category: "Outreach / Management and Design Team",
      date: "Various Dates",
      author: "Siddharth P S and Team",
      image: IMG_3923,
    }
  ];

  return (
    <div className="min-h-screen bg-black text-slate-50 pb-0 font-sans">
      
      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold uppercase tracking-tighter leading-none">
              Media & Works
            </h1>
            <p className="text-slate-400 text-sm md:text-base tracking-[0.2em] uppercase font-medium ml-1">
              Our Journey & Insights
            </p>
          </div>
          <p className="text-slate-300 max-w-md md:text-right text-sm md:text-base leading-relaxed">
            Read about our latest AUV builds, competition updates, and the stories around the team that builds it.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div 
          onClick={() => setActivePost(featuredPost)}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex flex-col lg:flex-row cursor-pointer hover:border-white/20 transition-colors"
        >
          <div className="w-full lg:w-3/5 h-[220px] sm:h-[300px] lg:h-[500px] overflow-hidden">
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Tag className="w-3 h-3" />
                {featuredPost.category}
              </span>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {featuredPost.date}
              </div>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
              {featuredPost.title}
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-8">
              {featuredPost.excerpt}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                <User className="w-3.5 h-3.5" />
                {featuredPost.author}
              </div>
              <span className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Recent Articles
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.title}
              onClick={() => {
                if (post.externalLink) {
                  window.open(post.externalLink, "_blank", "noopener,noreferrer");
                } else {
                  setActivePost(post);
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-colors"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-wider uppercase">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4 text-slate-400 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h4>
                
                <div className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </div>
                
                {post.externalLink ? (
                  <a
                    href={post.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-auto pt-4 border-t border-white/10 flex items-center text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Check it out here <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    Read More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePost(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-950/60 border border-white/10 flex items-center justify-center text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto flex-1">
                {/* Header Image */}
                {activePost.image && (
                  <div className="h-64 md:h-80 w-full overflow-hidden relative select-none">
                    <img
                      src={activePost.image}
                      alt={activePost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  </div>
                )}

                {/* Content Area */}
                <div className="p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
                      <Tag className="w-3 h-3" />
                      {activePost.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {activePost.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                      <User className="w-3.5 h-3.5" />
                      {activePost.author}
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                    {activePost.title}
                  </h2>

                  <div className="space-y-4 text-slate-300 leading-relaxed md:text-lg">
                    {Array.isArray(activePost.content) ? (
                      activePost.content.map((para: any, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))
                    ) : (
                      <p>{activePost.excerpt}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
