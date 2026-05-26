import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Footer } from "@/components/Footer";

export function MediaPage() {
  const featuredPost = {
    title: "The Evolution of Deuterium: Integrating Custom HYDROPHONES",
    excerpt: "Coming Soon....",
    category: "Engineering / Electrical Subsystem",
    date: "15 June, 2026",
    author: "Chatur Vasireddy",
    image: "",
  };

  const recentPosts = [
    {
      title: "RTAB-Map or RTAB-Maybe: Navigating the Deep Without Lying to Yourself",
      excerpt: "A deep dive into the trial and error with one of the core stacks the Software Team worked on to overcome the challange of not having a DVL.",
      category: "Engineering / Software and Automation Subsystem",
      date: "May 23, 2026",
      author: "Advithiya Duddu",
      image: "",
    },
    {
      title: "Mastering 5 Degrees of Freedom in Underwater Robotics",
      excerpt: "Understanding the complex control systems required to achieve stable surge, heave, roll, pitch, and yaw in unpredictable aquatic environments.",
      category: "Technical",
      date: "January 12, 2026",
      author: "Kshithij Jaitly",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Community Outreach: Inspiring the Next Generation of Engineers",
      excerpt: "How our team is giving back to the community by hosting STEM workshops and robotics demonstrations for local high school students.",
      category: "Outreach",
      date: "December 05, 2025",
      author: "Siddharth P S",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 pb-0 font-sans">
      
      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-none">
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex flex-col lg:flex-row cursor-pointer hover:border-white/20 transition-colors"
        >
          <div className="w-full lg:w-3/5 h-[300px] lg:h-[500px] overflow-hidden">
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
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
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
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Recent Articles
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.title}
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
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  Read More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
