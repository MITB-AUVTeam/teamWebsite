import { useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag, X, Search } from "lucide-react";
import { Footer } from "@/components/Footer";
import communicationBlog from "@/assets/blogs/communication-is-everything.md?raw";
import sonarBlog from "@/assets/blogs/passive-sonar-acoustic-localization.md?raw";
import pcbBlog from "@/assets/blogs/perfboard-to-pcb.md?raw";
import gripperBlog from "@/assets/blogs/cad-novice-to-worm-driven-gripper.md?raw";
import killSwitchBlog from "@/assets/blogs/engineering-the-kill-switch.md?raw";
import teamTreeLookup from "@/assets/Gallery/team_tree_lookup.jpg";
import pcbBoardPhoto from "@/assets/Gallery/pcb_rp2350_board.jpg";
import wormGripperCad from "@/assets/Gallery/worm_gripper_cad.jpg";
import galleryCad from "@/assets/Gallery/gallery_cad.jpg";
import azadLockedIn from "@/assets/Gallery/azad_lockedin.webp";
import img_2816 from "@/assets/Gallery/IMG_2816.webp";
import hull_inside from "@/assets/Gallery/hull_inside.jpg";
import rtab from "@/assets/Gallery/rtab.jpg";
import pcb from "@/assets/Gallery/pcb.jpg";
import galleryBoard from "@/assets/Gallery/gallery_board.jpg";
import IMG_3923 from "@/assets/Gallery/IMG_3923.webp";
import prithaPhoto from "@/assets/Personal_photo/pritha.jpeg";
import faculty_group from "@/assets/Personal_photo/faculty_group.jpeg";

interface Post {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  content?: string[];
  markdown?: string;
  externalLink?: string;
  /** Overlays an animated sonar "ping" on the card, for acoustics posts. */
  sonarPing?: boolean;
}

/**
 * Expanding concentric rings that mimic an acoustic pinger pulsing underwater.
 * Purely decorative, so it is hidden from assistive tech and stands down when
 * the visitor prefers reduced motion.
 */
function SonarPing() {
  const shouldReduceMotion = useReducedMotion();
  const rings = [0, 1, 2];

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      <div className="absolute bottom-8 left-8 h-0 w-0 sm:bottom-10 sm:left-10">
        {/* Emitter core */}
        <motion.span
          className="absolute -left-1.5 -top-1.5 block h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_2px_rgba(103,232,249,0.9)]"
          animate={
            shouldReduceMotion
              ? { opacity: 0.9 }
              : { opacity: [0.45, 1, 0.45], scale: [0.85, 1.15, 0.85] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Outgoing pulses */}
        {rings.map((i) => (
          <motion.span
            key={i}
            className="absolute block rounded-full border border-cyan-300/70"
            style={{ left: 0, top: 0, height: 24, width: 24, x: "-50%", y: "-50%" }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={
              shouldReduceMotion
                ? { scale: 1, opacity: 0.25 }
                : { scale: [0.4, 7], opacity: [0.7, 0] }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// --- Lightweight markdown renderer (headings, bold/italic, inline code,
// fenced code blocks, bullet lists and horizontal rules) ---

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  // Inline code first so formatting markers inside code are left untouched.
  return text.split(/(`[^`]+`)/g).flatMap<ReactNode>((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (/^`[^`]+`$/.test(part)) {
      return [
        <code
          key={key}
          className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[0.85em] text-cyan-300"
        >
          {part.slice(1, -1)}
        </code>,
      ];
    }
    return renderBold(part, key);
  });
}

function renderBold(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).flatMap<ReactNode>((part, i) => {
    const key = `${keyPrefix}-b${i}`;
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return [
        <strong key={key} className="font-bold text-white">
          {renderItalic(part.slice(2, -2), key)}
        </strong>,
      ];
    }
    return renderItalic(part, key);
  });
}

function renderItalic(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(_[^_]+_|\*[^*]+\*)/g).flatMap<ReactNode>((part, i) => {
    const key = `${keyPrefix}-i${i}`;
    if (/^_[^_]+_$/.test(part) || /^\*[^*]+\*$/.test(part)) {
      return [
        <em key={key} className="italic">
          {part.slice(1, -1)}
        </em>,
      ];
    }
    return part ? [<span key={key}>{part}</span>] : [];
  });
}

function MarkdownContent({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  const isBlockStart = (l: string) =>
    /^\s*```/.test(l) || /^\s*---+\s*$/.test(l) || /^#{1,6}\s/.test(l) || /^\s*[-•]\s+/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (/^\s*```/.test(line)) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push(
        <pre
          key={key++}
          className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-sm"
        >
          <code className="font-mono whitespace-pre text-slate-200">{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    // Horizontal rule
    if (/^\s*---+\s*$/.test(line)) {
      blocks.push(<hr key={key++} className="my-8 border-white/10" />);
      i++;
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Heading
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      blocks.push(
        <h4
          key={key++}
          className="border-b border-white/10 pt-6 pb-2 text-xl font-bold tracking-tight text-white md:text-2xl"
        >
          {renderInline(heading[2], `h${key}`)}
        </h4>,
      );
      i++;
      continue;
    }

    // Bullet list
    if (/^\s*[-•]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-•]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-•]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key++} className="space-y-2">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="relative pl-6 leading-relaxed text-slate-300 before:absolute before:left-2 before:text-blue-400 before:content-['•']"
            >
              {renderInline(item, `li${key}-${idx}`)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Paragraph (join soft-wrapped lines until a blank line or block start)
    const para = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !isBlockStart(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="leading-relaxed text-slate-300">
        {renderInline(para.join(" "), `p${key}`)}
      </p>,
    );
  }

  return <>{blocks}</>;
}

export function MediaPage() {
  const [activePost, setActivePost] = useState<Post | null>(null);
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

  const featuredPost: Post = {
    title: "'Maxxxing' Deuterium: Integrating Custom HYDROPHONES",
    excerpt: "Building a complete passive sonar pipeline from $6 piezo transducers: hydrophone design, an unruly analog front-end, Goertzel detection on four RP2350s, and PIO-synchronised TDOA to find an underwater pinger.",
    category: "Technical / Electrical Subsystem",
    date: "July 21, 2026",
    author: "Chatur Vasireddy",
    image: pcb,
    markdown: sonarBlog,
    sonarPing: true,
  };

  const recentPosts: Post[] = [
    {
      title: "Everything Lies: Gyro Drift",
      excerpt: "Why gyroscopes steadily lie to you, and the filtering ladder (calibration, complementary filters, Kalman) that lets a robot still know which way is up.",
      category: "Technical / Electrical Subsystem",
      date: "July 28, 2026",
      author: "Azad Roy",
      image: azadLockedIn,
      externalLink: "https://azadroy.com/2026/07/28/everything-lies-1-gyro-drift.html",
    },
    {
      title: "Engineering the Kill Switch: Magnetics, MOSFETs, and Mechanical Relays",
      excerpt: "If a sensor fails underwater, software can compensate; if the kill switch fails, you can't stop the vehicle. A deep dive into transitioning from microsecond MOSFET switching to a robust 30A mechanical relay with 50ms software debouncing.",
      category: "Technical / Electrical Subsystem",
      date: "June 30, 2026",
      author: "Kopal Agrawal",
      image: galleryBoard,
      markdown: killSwitchBlog,
    },
    {
      title: "From CAD Novice to Designing a Worm-Driven Parallel Gripper",
      excerpt: "A year of learning mechanical design the hard way: three iterations, a discouraging torque budget, backlash that only showed up in print, and the 3 AM realisation that the motor didn't have to stand upright.",
      category: "Technical / Mechanical Subsystem",
      date: "June 23, 2026",
      author: "Shaurya Veer Singh",
      image: wormGripperCad,
      markdown: gripperBlog,
    },
    {
      title: "Perfboard to PCB: Or, How I Learned to Stop Taping Wires and Love KiCad",
      excerpt: "Every AUV needs a brain, but a brain is useless without a nervous system. Going from a masking-tape rat's nest to a fabricated board, via a ghosting RP2040, a hand-drawn schematic, and three days of KiCad.",
      category: "Technical / Electrical Subsystem",
      date: "June 16, 2026",
      author: "Aryan Sharma",
      image: pcbBoardPhoto,
      markdown: pcbBlog,
    },
    {
      title: "Communication Issues: Teaching a Robot to Talk Better Than I Do",
      excerpt: "I'm terrible at conversations, yet I somehow got a hull full of electronics talking to each other. A lighthearted tour through the protocols that keep Deuterium's Jetson, Pico, sensors and thrusters in sync.",
      category: "Technical / Software Subsystem",
      date: "June 9, 2026",
      author: "Aditya R Jemshetty",
      image: teamTreeLookup,
      markdown: communicationBlog,
    },
    {
      title: "Current Affairs: Powering Deuterium from the Inside Out",
      excerpt: "A look inside the Power Supply Distribution System (PSDS), the electrical backbone that quietly keeps every subsystem on the AUV alive, and the lessons learned building it by hand on perf boards.",
      category: "Technical / Electrical Subsystem",
      date: "June 2, 2026",
      author: "Adwait Bhardwaj",
      image: galleryBoard,
      content: [
        "Power distribution probably isn't the first thing people notice when they look at an Autonomous Underwater Vehicle (AUV). The cameras, thrusters and software usually steal the spotlight. But beneath all of that sits a subsystem that quietly keeps everything alive, and it's also one of the few systems that nobody notices until it fails.",
        "A poorly designed power system rarely fails spectacularly. Instead, it causes problems that are much harder to track down: a voltage rail dips for a fraction of a second and the onboard computer silently reboots, electrical noise from a motor controller creeps into a sensor line, or a connector heats up under load and starts affecting everything downstream. Individually trivial, together these issues can turn the AUV into a dead boat.",
        "For us, designing the electrical subsystem was never about simply getting power from the battery to the components. It was about ensuring every component received the right power, at the right voltage, with as little interference as possible, which eventually evolved into the Power Supply Distribution System (PSDS), responsible for distribution, voltage regulation, electrical isolation, noise suppression and safety.",
        "The challenge grows underwater. Our propulsion system consists of multiple thrusters driven by Electronic Speed Controllers (ESCs), while the compute side houses a Jetson Orin Nano Super, RPi Pico-based controllers and a collection of sensors. All draw from the same battery but expect completely different things from it. The propulsion side is electrically noisy by nature: ESCs switch large currents using PWM, generating ripple and EMI that tries to propagate through shared power lines. The compute side is far less tolerant: even small disturbances can cause communication errors or unexpected resets.",
        "That wasn't just theory: we learned it the hard way, retiring more than a few RPi Picos over multiple iterations before realising the common thread was power integrity: high-current switching noise leaking into places it didn't belong. Being a relatively new team, we also chose to build the first revision of the PSDS by hand on perf boards rather than jumping straight to custom PCBs, considerably more soldering and frustration, but it forced us to understand every connection we made.",
        "Designing the Power Architecture",
        "Every subsystem wants power, but not every subsystem wants the same kind of power. Feeding everything from a common supply would have been the easiest build, and the quickest way to introduce noise and instability. So the first decision was to split the vehicle into two electrical domains: compute and actuation.",
        "The compute domain (Jetson Orin Nano, RPi Pico controllers, sensors and supporting electronics) consumes comparatively little power but demands a clean, well-regulated supply, since the Jetson handles vision and navigation. The actuation domain (thrusters and servos) draws heavy, rapidly changing current, and every ESC happily injects switching noise back into the supply while doing its job. These two domains should not share the same electrical environment.",
        "At the very beginning sits a 4S Lithium-Ion battery pack (roughly 12–16.2 V), followed by a Battery Management System (BMS) that protects the battery itself against over-current, over-charge and excessive discharge. It does not protect the vehicle; everything past that point is the PSDS's job. From the BMS, power enters the main distribution bus, which carries battery voltage to the different power branches without stepping it up or down, keeping fault isolation simple.",
        "The first major branch feeds the PDB-Kill/PSDC-I, where battery voltage is converted into the various rails the vehicle needs. Instead of one shared regulator, dedicated converters generate each voltage, so high-current loads, compute hardware and auxiliary electronics all get a rail sized to their needs.",
        "Building the PSDS",
        "The Jetson rail got by far the most attention. Running variable workloads, the Jetson's power draw can change almost instantaneously, and small voltage dips that would go unnoticed elsewhere can cause brownouts here. The rail was built with a dedicated boost converter, bulk electrolytic capacitors for sudden load changes, ceramic capacitors for high-frequency noise, and Schottky diodes to block backfeed into the converter during power-down. None of these components is exciting on its own; together they make a resilient rail.",
        "The servo rail follows a different philosophy. Servos tolerate supply disturbances far better than compute hardware but produce sharp current spikes whenever they move, so the rail is locally regulated and filtered to keep those spikes from travelling across the vehicle. Across every rail, capacitors are placed as physically close as possible to the device they support: longer wires add inductance that fast-changing currents don't have time to fight, so local decoupling shortens that path.",
        "Perf boards made all of this harder than a textbook would suggest. There are no ground planes or controlled trace widths: every high-current connection had to be planned manually with heavier-gauge wire, and converter placement mattered as much as the schematic. It was also one of the biggest learning experiences of the project: every routing and grounding decision had a visible effect on the system, for better or worse.",
        "Every Watt Counts",
        "Efficiency isn't just about battery runtime: every watt that doesn't reach the electronics becomes heat, and inside a sealed pressure hull with limited airflow, unnecessary heat is as undesirable as unnecessary current draw. The figures below are engineering estimates from datasheets and our own testing rather than lab-grade measurements, but they're accurate enough to justify the design choices.",
        "The propulsion system is the largest consumer: five Blue Robotics T200 thrusters, each drawing roughly 8 A under sustained operation, put the actuation system near 40 A before transient peaks, though thrusters spend little time at max thrust in a typical mission. The Jetson draws far less current but needs a far steadier supply, so reliability took priority over squeezing out the last few points of efficiency.",
        "Take the Jetson rail: at roughly 30 W of load and about 88% converter efficiency, the converter draws close to 34.1 W, dissipating just over 4 W as heat, continuously, whenever the Jetson is under load. Add up similar losses across every converter and the subsystem produces a noticeable amount of heat inside an enclosed hull, so cutting unnecessary losses helps both runtime and thermal stability. That's why buck converters were used wherever voltage needed stepping down, and boost converters only where a rail genuinely needed to go up: there's no point boosting a voltage only to cut it back down later. Schottky diodes were preferred over silicon rectifiers for the same reason: their lower forward-voltage drop adds up across a whole mission.",
        "The more important lesson was knowing when not to optimise for efficiency. Extra filtering, bulk capacitance and local protection all cost a little power, weight and space, but they buy real robustness: a rail that's 2% less efficient but significantly more reliable is almost always the right call in an underwater robot.",
        "Harmony Between the Subsystems",
        "Giving every subsystem its own rail is only half the battle: the harder part is keeping each one well-behaved once everything is switched on. With thrusters, converters, microcontrollers, sensors and an embedded GPU all sharing one battery, some electrical noise is inevitable; the goal was to stop it from spreading rather than eliminate it entirely.",
        "The PSDS uses a star-ground topology, where every major power branch returns directly to a common grounding point instead of letting return currents wander through one another; this cuts ground loops and keeps large propulsion currents away from sensitive electronics. Bulk electrolytic capacitors and smaller ceramic capacitors are used together throughout: electrolytics act as energy reservoirs for sudden load changes, ceramics suppress high-frequency switching noise the electrolytics can't respond to fast enough. In the noisiest spots, inductors were added alongside local decoupling to form a simple low-pass filter.",
        "Placement mattered more than expected: a capacitor a few centimetres from the component it protects is often far less effective than one placed right across the supply pins, since even short wires add enough inductance to blunt the decoupling. Building on perf boards made this obvious: more than once, fixing a noise issue meant physically moving two modules apart rather than changing the schematic. The biggest takeaway was that electrical noise is rarely one bad component: it's usually several good components interacting in ways nobody intended.",
        "On Safety",
        "Underwater robotics teaches you quickly that failure is a question of when, not if. From the start, we wanted the electrical subsystem to follow one philosophy: fail safe rather than fail operational. That led to two independent safety mechanisms.",
        "The first is an external magnetic kill switch (a common competition requirement) that lets a diver disable all actuation from outside the hull without opening the vehicle. Removing the magnet cuts power to propulsion and actuation while the compute domain stays alive, so the vehicle can still log data, communicate and shut down in an orderly way, and returns to a safe, non-moving state once the kill switch is re-engaged.",
        "The second layer handles water ingress. Once a leak is detected, preserving computation is no longer the priority: preventing further damage is. The system performs a master shutdown of both compute and actuation domains, keeping only a small always-on controller alive to manage and confirm the shutdown sequence. The implementation is still evolving, but the underlying philosophy hasn't changed: safety should never depend on a single point of failure.",
        "What Is Next?",
        "Building the first revision entirely on perf boards was a deliberate choice, slower than a custom PCB, but it made every wire, capacitor placement and routing decision a visible lesson. The PSDS is far from finished; future revisions will move toward dedicated PCBs, improved telemetry, per-rail current monitoring and smarter diagnostics.",
        "Though this article focused on the PSDS, it really tells a larger story: every subsystem on the vehicle depends on another, and very little gets built in isolation. Countless discussions with the Mechanical and Software teams shaped the final design: routing cables through an already crowded hull, finding room for one more converter, or making sure the electrical architecture supported the software rather than fighting it.",
        "For now, the Power Supply Distribution System has grown from a rough collection of sketches into the electrical backbone of our AUV, quietly delivering power, keeping subsystems from arguing with each other, and hopefully ensuring the only surprises we meet underwater are the ones we planned for."
      ]
    },
    {
      title: "Empowering Student Initiatives: A Faculty Perspective",
      excerpt: "A short memoir by Dr. Manasa Kongot on the Team's journey from building small prototypes to now competing in RoboSub 2026, during her time as the Assitant Director - Major Student Projects at MIT-Bengaluru.",
      category: "Personal Memoir",
      date: "May 30, 2026",
      author: "Dr. Manasa Kongot",
      image: faculty_group,
      content: [
        "When I was entrusted with the responsibility of facilitating major student projects at MIT Bengaluru by the Director of MIT Blr in July 2025, the students who first met me were Animesh and Arunava, the founders and current team leads of Team AUV, MITB.",
        "By the time they met me, the students had already managed to build a small prototype using very limited funds and resources. Even at that early stage, what stood out was their passion, sincerity, and determination to build something meaningful completely from scratch.",
        "My role was mainly to support and facilitate the team through institutional permissions, workspace, processes, and funding support wherever possible. But the real strength of this journey has always been the students themselves. They built the team from the ground up, sourced components, approached sponsors, learned independently, and worked tirelessly day and night to bring their ideas to life.",
        "Over time, their dedication transformed a small student initiative into the first legacy major student project team of our institute, aspiring to participate in RoboSub 2026, one of the world’s prestigious AUV competitions conducted by RoboNation.",
        "Today, Team AUV proudly represents MAHE and India on a global platform. I feel fortunate to have been associated with the team since its official inception and to have witnessed their journey so closely.",
        "Sometimes, all students need is a small window of support to transform their passion into something remarkable. I hope Team AUV’s journey inspires many more students to dream boldly, build fearlessly, and use their knowledge and innovation to contribute meaningfully towards our nation and society.",
        "And yes, the team has definitely kept me busy with endless approvals, urgent requests, and last-minute discussions and decisions, but seeing their passion and growth, I can happily say every bit of it has been worth it! Hope to see the team growing to newer heights with time!"
      ]
    },
    {
      title: "The Long Dive: Starting an AUV Team at MIT Bengaluru",
      excerpt: "A reflection by team mentor Pritha Jaipal on the journey of AUV MIT-B, from a spark of an idea in August 2024 to the team taking part in RoboSub 2026.",
      category: "Personal Memoir",
      date: "May 26, 2026",
      author: "Pritha Jaipal",
      image: prithaPhoto,
      content: [
        "Back in August 2024, I found myself seated across two second-year undergraduate students, Animesh and Arunava, who were brimming with the kind of energy and enthusiasm that hinted at the herculean task they were about to undertake. They wanted to start an Autonomous Underwater Vehicle student team at our university, MIT Bengaluru, and they were starting from scratch. It would be one of the first projects of its kind on our campus, and they had neither a blueprint nor a roadmap to follow. What they did have was a request that I mentor them as they set out to bring their vision to life.",
        "With over three years of experience at a major student project, Mars Rover Manipal, I had witnessed firsthand how large, well-established student projects operated behind the scenes. In addition, founding my university’s astronomy club from scratch as a first-year undergraduate had taught me something equally important: how beginnings really look.",
        "Our initial meet-ups, after class hours, proved momentous. We talked endlessly about where to begin, how to structure the team, how to find and recruit the right set of people, how and what to self-learn, and many other considerations that arise when embarking on such an endeavour. I was glad to see how steadily they kept at it; they often returned with many more questions and updates on their progress.",
        "Knowing the gargantuan effort it took the team to get from navigating uncharted waters to becoming completely submerged in the project makes me incredibly proud. What started as two students with an idea and the unwavering support of faculty advisors, Dr.Ujjwal, Dr. Adithya and Dr. Manasa, has grown into a fully fledged effort with real momentum today! I am truly excited for AUV-MITB’s participation as one of the two teams from India to compete in the RoboSub 2026 at the Woollett Aquatics Center in Irvine, California."
      ]
    },
    {
      title: "RTAB-Map or RTAB-Maybe: Navigating the Deep Without Lying to Yourself",
      excerpt: "A deep dive into the trial and error with one of the core stacks the Software Team worked on to overcome the challange of not having a DVL.",
      category: "Technical / Software Subsystem",
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
        "Because at the end of the day, the ocean doesn't care about your algorithms; it only cares if you're smart enough to remember the way back out.",
        "Out there in the blue void, the difference between being lost and being home is just one good memory."
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
    const allPosts = [featuredPost, ...recentPosts];
    const sortedAllPosts = [...allPosts].sort((a, b) => {
      // Handle "Coming Soon...." as newest (placed at the top)
      const aComing = a.date.toLowerCase().includes("coming soon");
      const bComing = b.date.toLowerCase().includes("coming soon");
      if (aComing && !bComing) return -1;
      if (!aComing && bComing) return 1;
      if (aComing && bComing) return 0;

      // If a date is empty, treat it as newest
      const aDateEmpty = !a.date;
      const bDateEmpty = !b.date;
      if (aDateEmpty && !bDateEmpty) return -1;
      if (!aDateEmpty && bDateEmpty) return 1;
      if (aDateEmpty && bDateEmpty) return 0;

      // Handle "Various Dates" as oldest (placed at the bottom)
      const aVarious = a.date.toLowerCase() === "various dates";
      const bVarious = b.date.toLowerCase() === "various dates";
      if (aVarious && !bVarious) return 1;
      if (!aVarious && bVarious) return -1;
      if (aVarious && bVarious) return 0;

      // Standard date parsing
      const timeA = Date.parse(a.date);
      const timeB = Date.parse(b.date);

      const validA = !isNaN(timeA);
      const validB = !isNaN(timeB);

      if (!validA && validB) return 1;
      if (validA && !validB) return -1;
      if (!validA && !validB) return 0;

      return timeB - timeA; // Descending (newest first)
    });

    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      // Exclude the featured post from the grid when not searching (as it is shown in the hero section)
      return sortedAllPosts.filter(post => post !== featuredPost);
    }

    return sortedAllPosts.filter((post) => {
      const searchableText = [
        post.title,
        post.excerpt,
        post.category,
        post.date,
        post.author,
        Array.isArray(post.content) ? post.content.join(" ") : "",
        post.markdown ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [recentPosts, searchQuery]);

  return (
    <div className="min-h-screen bg-transparent text-slate-50 pb-0 font-sans">

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
            className="group relative rounded-3xl overflow-hidden bg-[#0a1128] border border-white/10 flex flex-col lg:flex-row cursor-pointer hover:border-white/20 transition-colors"
          >
            <div className="relative w-full lg:w-3/5 h-[220px] sm:h-[300px] lg:h-[500px] overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {featuredPost.sonarPing && <SonarPing />}
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
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300">{featuredPost.author}</span>
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
                className="group flex flex-col bg-[#0a1128] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-colors"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
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
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 min-w-0">
                      <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="text-right font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300">{post.author}</span>
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
          <div className="rounded-2xl border border-white/10 bg-[#0a1128] px-6 py-12 text-center">
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
              src="https://www.youtube.com/embed/er7BXNt_4Kw"
              title="Team AUV MIT-B Introduction Video | RoboSub 2026"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Video Information / Sidebar */}
          <div className="flex flex-col justify-center bg-[#0a1128] border border-white/10 rounded-3xl p-8 lg:p-10">
            <h4 className="text-2xl font-bold text-white mb-4 leading-tight">
              Team AUV MIT-B Introduction Video |
              RoboSub 2026
            </h4>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Get to know the team building and representing Manipal Institute of Technology, Bengaluru for the very first time at RoboSub 2026.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Built with the effort of all 23 members on the team, Deuterium is the culmination of our work over the last 1.5 years.
            </p>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
              <span className="text-slate-400 text-xs font-medium">
                Published by Team AUV MIT-B
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
                      loading="lazy"
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
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300">{activePost.author}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                    {activePost.title}
                  </h2>

                  <div className="space-y-4 text-slate-300 leading-relaxed md:text-lg">
                    {activePost.markdown ? (
                      <MarkdownContent text={activePost.markdown} />
                    ) : Array.isArray(activePost.content) ? (
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
