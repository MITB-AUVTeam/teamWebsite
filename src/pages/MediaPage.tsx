import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, Tag, X, Search } from "lucide-react";
import { Footer } from "@/components/Footer";
import azadLockedIn from "@/assets/Gallery/azad_lockedin.webp";
import img_2816 from "@/assets/Gallery/IMG_2816.webp";
import hull_inside from "@/assets/Gallery/hull_inside.jpg";
import rtab from "@/assets/Gallery/rtab.jpg";
import pcb from "@/assets/Gallery/pcb.jpg";
import IMG_3923 from "@/assets/Gallery/IMG_3923.webp";
import prithaPhoto from "@/assets/Personal_photo/pritha.jpeg";

export function MediaPage() {
  const [activePost, setActivePost] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
      title: "The Long Dive: Starting an AUV Team at MIT Bengaluru",
      excerpt: "A reflection by team mentor Pritha Jaipal on the journey of AUV MIT-B—from a spark of an idea in August 2024 to the team taking part in RoboSub 2026.",
      category: "Personal Memoir",
      date: "May 26, 2026",
      author: "Pritha Jaipal",
      image: prithaPhoto,
      content: [
        "Back in August 2024, I found myself seated across two second-year undergraduate students, Animesh and Arunava, who were brimming with the kind of energy and enthusiasm that hinted at the herculean task they were about to undertake. They wanted to start an Autonomous Underwater Vehicle student team at our university, MIT Bengaluru, and they were starting from scratch. It would be one of the first projects of its kind on our campus, and they had neither a blueprint nor a roadmap to follow. What they did have was a request that I mentor them as they set out to bring their vision to life.",
        "With over three years of experience at a major student project, Mars Rover Manipal, I had witnessed firsthand how large, well-established student projects operated behind the scenes. In addition, founding my university’s astronomy club from scratch as a first-year undergraduate had taught me something equally important—how beginnings really look.",
        "Our initial meet-ups, after class hours, proved momentous. We talked endlessly about where to begin, how to structure the team, how to find and recruit the right set of people, how and what to self-learn, and many other considerations that arise when embarking on such an endeavour. I was glad to see how steadily they kept at it—they often returned with many more questions and updates on their progress.",
        "Knowing the gargantuan effort it took the team to get from navigating uncharted waters to becoming completely submerged in the project makes me incredibly proud. What started as two students with an idea and the unwavering support of faculty advisors, Dr.Ujjwal, Dr. Adithya and Dr. Manasa, has grown into a fully fledged effort with real momentum today! I am truly excited for AUV-MITB’s participation as one of the two teams from India to compete in the RoboSub 2026 at the Woollett Aquatics Center in Irvine, California."
      ]
    },
    {
      title: "RTAB-Map or RTAB-Maybe: Navigating the Deep Without Lying to Yourself",
      excerpt: "A deep dive into the trial and error with one of the core stacks the Software Team worked on to overcome the challange of not having a DVL.",
      category: "Technical / Software and Automation Subsystem",
      date: "May 19, 2026",
      author: "Advithiya Duddu",
      image: rtab,
      content: [
        "Imagine you’re blindfolded, spun around ten times, and dropped into a dark, silent room. Your only way to find the door is by touching the walls. Now, imagine those walls are occasionally moving, and the floor is covered in slippery moss. Welcome to the daily life of an Autonomous Underwater Vehicle (AUV).",
        "In land-based robotics, we’re spoiled. A Roomba in a living room has easy, sharp corners, distinct coffee table legs, and reliable walls. These are features, the bread and butter of navigation. But the moment a robot submerges, the physics of the world stop playing nice. Standard LiDAR signals are absorbed by the water almost instantly (a literal light-sink). GPS is a distant memory the second you break the surface. Even high-def cameras are stuck fighting a losing battle against backscatter, refraction, and the endless blue void.",
        "In the ocean, you aren't just navigating; you’re trapped in a feature desert where one grey rock looks exactly like its twin brother three meters away.",
        "If we had an unlimited budget (talk to Siddharth about this), we would just slap a DVL (Doppler Velocity Log) on the AUV. Those sensors are incredible because they bounce sound waves off the seabed to give you near-perfect velocity readings.",
        "We have to make do with just an IMU and a Stereo Camera. We rely on visual odometry to bridge the gap, essentially using the camera as a digital leash to stop the IMU from drifting into a different zip code every time it gets confused.",
        "The Digital Life Raft: Dead Reckoning and the EKF",
        "When an AUV loses its visual North Star, it doesn’t just give up and sink. It relies on Dead Reckoning: which, despite the metal-band name, is just the robotic equivalent of counting your steps in the dark to guess how far you’ve traveled. By mathematically integrating these tiny movements over time, the robot can estimate its position even when the cameras see nothing but murky static.",
        "However, as we just established, dead reckoning is notoriously fragile. To keep our bot from having an existential crisis, we implement an Extended Kalman Filter (EKF). Does this sound familiar? Because it should. Azad just covered this topic in detail, so read the previous blog to get a better idea of it.",
        "Just to refresh your memory and kinda summarize it in a less math heavy fashion (For all the RJ’s out there) : The EKF is a real-time data fusion engine. It’s constantly refereeing a fight between two competing narratives:",
        "● The high-speed, frantic guesses from the IMU.",
        "● The high-accuracy, slow-motion observations from the ZED camera’s visual odometry.",
        "When the water is clear, the EKF listens to the camera to correct the IMU’s drift. When things get murky and the camera loses its way, the EKF leans on the IMU to keep the trajectory smooth. It’s the ultimate balancing act, ensuring the AUV maintains a stable sense of self rather than teleporting across the map every time a frame drops.",
        "Why the AUV Never Forgets a Face (or a Rock)",
        "While the EKF is busy refereeing the constant shouting match between the IMU and the ZED camera, RTAB-Map (Real-Time Appearance-Based Mapping) is in the back taking polaroids of every rock, pipe, and patch of moss it passes. It is not just drawing a line; it is building a \"pose-graph,\" a massive, interconnected web of every place it has ever been.",
        "Graph-Based SLAM: Connecting the Dots (Literally)",
        "Think of the AUV as a tourist in a foreign city with no map. To find its way back, it takes a photo of every street corner it turns. RTAB-Map uses Simultaneous Localization and Mapping (SLAM) to build a 3D map of the environment while simultaneously using that same map to figure out where the hell it is.",
        "It does not just look at raw pixels; it looks for features. These are unique visual signatures, like a jagged edge on a rock or a rust stain on a gate. RTAB-Map turns these into a digital fingerprint it can recognize later.",
        "It keeps building this web, frame by frame, waiting for the one moment that makes all this math worth it: the Loop Closure.",
        "The Quest for the Perfect Loop Closure: Wait, Haven’t We Met Before?",
        "If you have ever been lost in a giant parking lot, wandering aimlessly for twenty minutes until you finally spot that one dented silver Audi you parked next to, you have performed a manual loop closure.",
        "In the world of SLAM, a Loop Closure is the holy grail. It is the exact moment the AUV looks at a patch of the seafloor and realizes with 100% certainty: \"I have been here before.\"",
        "Deleting the Drift In Hindsight",
        "Without loop closure, drift turns your map into a toddler’s scribble. But the moment RTAB-Map recognizes a familiar visual fingerprint, it triggers a global optimization, calculating the gap between where the sensors think the robot is and where the landmarks prove it is.",
        "Then comes the \"snap.\" It doesn’t just fix the current position; it retroactively recalibrates the entire path the AUV took to get there. In a single heartbeat, a distorted mess of a trajectory is rewritten into a crisp, consistent 3D model.",
        "Swipe Right on a Rock: Feature Matching in a Void",
        "To pull off a loop closure, RTAB-Map has to be an expert at Feature Matching. It uses algorithms like ORB (Oriented FAST and Rotated BRIEF) to pick out stable, unique points in an image. Think of it as the robot's internal dating app, where it is desperately trying to \"match\" the rock it sees now with a rock it met ten minutes ago.",
        "Underwater, you are dealing with:",
        "● Marine Snow: Floating gunk that reflects light and looks like a feature but is actually just trash.",
        "● The Blue Void: Entire frames with the visual complexity of a blank sheet of paper.",
        "This is why RTAB-Map is aggressively picky. It doesn't just look for any match; it looks for a statistically significant cluster of them. It needs a \"perfect\" loop closure that is convincing enough to tell the IMU to shut up and stop pretending we are in the middle of the Atlantic.",
        "Home is Where the Map Snaps",
        "The \"Quest\" in the title is there for a reason: a bad loop closure is infinitely worse than no loop closure at all. If the robot incorrectly decides that two different grey rocks are the same rock, it will \"snap\" the map into a completely fictional geometry.",
        "In the biz, we call this a false positive. In reality, it is the fastest way to turn a successful mission into a high-speed collision with a pool wall because the robot suddenly thinks the wall is three meters behind where it actually is. Our job is to tune the thresholds so the robot stays skeptical enough to ignore the \"catfish\" loops but smart enough to catch the real ones before the drift becomes terminal.",
        "Abyss-mal Navigation? Not on Our Watch",
        "At the end of the day, we are not just building a robot that swims; we are building one that can survive its own confusion. In a world with zero GPS and a featureless blue void, knowing where you are is the ultimate engineering hurdle.",
        "By merging the raw speed of the IMU, the depth perception of the ZED, and the long term memory of RTAB-Map, we turn a drifting hunk of metal into a precise explorer. It is a constant battle against entropy and bad math, but it is the only way to ensure that when we send our AUV into the deep, it actually has a plan to come back.",
        "Because at the end of the day, the ocean doesn't care about your algorithms—it only cares if you're smart enough to remember the way back out.",
        "Out there in the blue void, the difference between being lost and being home is just one good memory."
      ]
    },
    {
      title: "Building a Leak Detection System That We Hope Never Triggers",
      excerpt: "A peek into how we build safe systems keeping in mind all the electronics inside using a water-leak sensor and a Kill Switch.",
      category: "Technical / Electrical Subsystem",
      date: "May 12, 2026",
      author: "Harshika Devarasetty",
      image: hull_inside,
      content: [
        "Water inside an AUV hull is one of those things nobody really worries about until it happens once. And once it does, you immediately realize how unforgiving underwater systems can be. A single droplet in the wrong place is enough to short a regulator, kill a communication line, or silently end an entire mission. So while most subsystems on the vehicle are designed around performance, the leak detection system is built entirely around paranoia.",
        "The original idea sounded simple enough: if water enters the hull, detect it immediately and shut everything down before anything expensive dies. But after the first few prototypes, it became obvious that “detecting water” was actually the easy part. The difficult part was making the system reliable inside an electrically noisy underwater robot filled with ESCs, motors, switching regulators, long wire runs, and conductive saltwater.",
        "Sensor Placement and Design",
        "The final system uses distributed copper-electrode sensing zones positioned along the upper perimeter of the hull, around camera ports, and near critical sealing interfaces. Each sensing section consists of paired copper electrodes separated by a very small gap. Under normal dry conditions the circuit remains open, but once water bridges the electrodes, conductivity between the strips changes and the onboard controller detects the voltage drop almost instantly.",
        "One of the earliest design decisions was sensor placement. Initially, placing the sensors near the bottom of the hull seemed logical since water eventually pools there anyway. But that approach only detects leaks after water accumulation has already started near sensitive electronics. Instead, the sensors were moved closer to the upper hull perimeter and sealing regions so seepage could be detected as early as possible, ideally before water ever reaches critical components.",
        "Electrode geometry also turned out to matter far more than expected. Larger gaps between electrodes required visible pooling before triggering, while sub-millimeter spacing could detect isolated droplets almost immediately. Wider copper strips improved sensitivity further by allowing droplets to spread more easily across the sensing gap.",
        "The Sensing Network",
        "The sensing network itself operates using a high-impedance voltage-divider configuration. Early prototypes used low-value pull-up resistors, but those required a significant amount of water before the system responded. Increasing the pull-up resistance into the hundreds of kilo-ohms dramatically improved sensitivity, allowing even small droplets to trigger detection while keeping current through the electrodes extremely low.",
        "At roughly I = 3.3V / 300kΩ ≈ 11μA per sensing channel, the current draw becomes practically negligible while also minimizing long-term electrode corrosion. Since the sensing method relies on conductivity, reducing electrochemical degradation of the copper electrodes became surprisingly important during repeated testing.",
        "Localization and Noise Mitigation",
        "Initially, the system used one continuous sensing line routed around the hull perimeter. While electrically simple, this quickly created two major problems. First, it became impossible to determine where the leak originated. Second, the long sensing line behaved like an antenna once the thrusters and ESCs became active, introducing false triggers from electrical noise.",
        "Dividing the hull into multiple independent sensing zones solved both problems simultaneously. Each zone could now be monitored independently, improving both localization and stability.",
        "Software Validation and Response",
        "The sensing zones interface directly with the onboard controller using pull-up based digital inputs. Under dry conditions, the controller reads a stable HIGH signal. Once water bridges the electrodes, the signal is pulled LOW and a leak event is registered.",
        "Since the vehicle operates in a high-noise electrical environment, software-side validation was added to prevent transient EMI spikes from triggering false leak events. Multiple consecutive LOW readings are required before a leak is confirmed.",
        "One unexpected observation during testing was how dramatically the sensor behavior changed between freshwater and saltwater. Saltwater conductivity is significantly higher, which made the sensors considerably more sensitive during underwater testing compared to initial bench tests using tap water. A sensor configuration that barely reacted to small droplets in air became highly responsive once exposed to seawater conditions.",
        "Once a leak is confirmed, the onboard controller generates an interrupt and activates the kill-switch mechanism. Critical power rails are sequentially disabled to protect sensitive electronics from short circuits and irreversible damage. The kill-switch remains latched until manually reset, preventing repeated power cycling in situations where intermittent water contact occurs during operation.",
        "Conclusion",
        "One of the more interesting parts of building this subsystem was realizing how different hardware engineering feels compared to software. Software bugs are usually deterministic. Hardware failures are not. Things fail because of humidity, wire routing, EMI, grounding, corrosion, tolerances, or because a single droplet happened to land in exactly the wrong place. Designing for underwater robotics ends up being less about perfection and more about anticipating failure before it happens.",
        "Hopefully, this is one subsystem that never actually has to do its job during a competition run. But if it ever does, it will probably save the vehicle."
      ]
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
      content: [
        "The team actively participated in multiple outreach and technical interaction activities during the development of our vehicles over the last 1.5 years. These interactions helped the team gain practical exposure, receive expert feedback, build some great connections all the while helping other similar initiatives step into this field of underwater robotics.",
        "1. IEEE RAS Competition – IEEE Robotics and Automation Society, Vidyashilp University",
        "The team’s first major outreach initiative was participation in the IEEE Robotics and Automation Society (RAS) competition conducted at Vidyashilp University. This event marked the first public showcase of the team’s prototype before robotics enthusiasts, researchers, and technical experts, acting as a good test of our design thinking and approach to building functional robots. Competing against multiple teams, AUV MIT-B secured First Place, making it a significant milestone during the early stages of the project.",
        "We also interacted with fellow students and companies present at this event discussing our challenges with building underwater bots and also discussed wider concepts around autonomous systems in general.",
        "2. Technical Interaction at ARTPARK, IISc Bengaluru",
        "The team was invited to ARTPARK (AI & Robotics Technology Park), a deep-tech innovation and incubation centre established by IISc Bengaluru. ARTPARK is one of India’s leading ecosystems for AI, robotics, autonomous systems, and translational research.",
        "As part of the interaction, the team showcased the project and engaged in technical discussions with researchers, innovators, and fellow robotics teams. The engagement helped establish a positive professional relationship with researchers and members of the ARTPARK community, creating opportunities for future collaboration and technical exchange.",
        "3. Industry Interaction with Alstom",
        "Another important outreach activity was the interaction conducted with representatives from Alstom, a global leader in smart and sustainable mobility solutions, during their campus visit. The team was invited by the college director to present the project before the company representatives and the placement committee. The presentation focused on the system architecture, subsystem integration, and the development methodology followed during the project.",
        "The interaction provided valuable industry exposure and insights into professional engineering practices, large-scale system development, and real-world problem-solving approaches followed within the industry. The team also shared perspectives on how student-driven technical projects are developed through interdisciplinary collaboration, rapid prototyping, and hands-on implementation.",
        "The team consistently helps out other such student projects on our campus working on building various machines like cube satellites, Autonomous cars, drones etc either with the strong technical knowledge we have built over the last 1.5 years or with spare components that may be of help to them.",
        "Upcoming Events",
        "The team has recently been shortlisted among a select few teams for participation in AeroCON 2026, scheduled to be held in Bengaluru. The event will provide an opportunity to showcase the project to researchers, industry professionals, and technology enthusiasts from across the country.",
        "We vow to reach out to a wider community in the coming days and learn from them while also trying to help out in whatever way possible."
      ]
    }
  ];

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return recentPosts;
    }

    return recentPosts.filter((post) => {
      const searchableText = [
        post.title,
        post.excerpt,
        post.category,
        post.date,
        post.author,
        Array.isArray(post.content) ? post.content.join(" ") : "",
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [recentPosts, searchQuery]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 pb-0 font-sans">
      
      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-none">
              Media & Works
            </h1>
            <p className="text-slate-400 text-sm md:text-base tracking-[0.2em] uppercase font-medium ml-1">
              Our Journey & Insights
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-4 md:items-end md:-translate-y-5">
            <label className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles"
                aria-label="Search articles"
                className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 hover:border-white/20 focus:border-blue-400 focus:bg-white/10"
              />
            </label>
          </div>
        </motion.div>
      </section>

      {!searchQuery.trim() && (
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
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-6 text-slate-400 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="font-semibold tracking-wider uppercase">{featuredPost.category}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{featuredPost.date}</span>
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
      )}

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Recent Articles
          </h3>
        </div>
        
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
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
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center">
            <p className="text-lg font-semibold text-white">No articles found</p>
            <p className="mt-2 text-sm text-slate-400">
              Try searching by title, author, category, or topic.
            </p>
          </div>
        )}
      </section>

      {/* New Section: Creative Works - Videos */}
      <section className="max-w-7xl mx-auto px-6 pb-24 border-t border-white/10 pt-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Team Introduction Video
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Watch our team introduction video for RoboSub 2026. More updates coming soon....
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Video */}
          <div className="lg:col-span-2 aspect-video rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl relative group">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Team AUV Introduction Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Video Information / Sidebar */}
          <div className="flex flex-col justify-center bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase self-start mb-6">
              Featured Video
            </span>
            <h4 className="text-2xl font-bold text-white mb-4 leading-tight">
              Team AUV Introduction
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              An overview of our autonomous underwater vehicle projects, student-led workshop environments, and collaborative engineering journey.
            </p>
            <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
              <span className="text-slate-400 text-xs font-medium">
                Published by Team AUV
              </span>
              <a
                href="https://www.youtube.com/@TeamAUVMIT-B"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
              >
                Visit Channel <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
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
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-6 text-slate-400 text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="font-semibold tracking-wider uppercase">{activePost.category}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{activePost.date}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>{activePost.author}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                    {activePost.title}
                  </h2>

                  <div className="space-y-4 text-slate-300 leading-relaxed md:text-lg">
                    {Array.isArray(activePost.content) ? (
                      activePost.content.map((para: any, idx: number) => {
                        // Check for bullet points
                        if (para.startsWith("●") || para.startsWith("-")) {
                          return (
                            <li key={idx} className="list-none pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-blue-400 leading-relaxed text-slate-300 my-2">
                              {para.replace(/^[●\-]\s*/, "")}
                            </li>
                          );
                        }

                        // Check for subheadings (short lines without sentence-ending periods, or specific patterns)
                        const isHeading = 
                          (para.length < 85 && !para.endsWith(".")) || 
                          para.startsWith("1. ") || 
                          para.startsWith("2. ") || 
                          para.startsWith("3. ") || 
                          para.startsWith("Upcoming Events");

                        if (isHeading) {
                          return (
                            <h4 key={idx} className="text-xl md:text-2xl font-bold text-white pt-6 pb-2 border-b border-white/10 tracking-tight mt-6 mb-3">
                              {para}
                            </h4>
                          );
                        }

                        // Normal paragraph
                        return <p key={idx} className="mb-4 leading-relaxed text-slate-300">{para}</p>;
                      })
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
