import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Search, LayoutGrid, Rows3 } from "lucide-react";
import { Flip } from "gsap/all";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillButton } from "@/components/ui/pill-button";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ArticleCard } from "@/components/media/article-card";
import { EmbedFacade } from "@/components/ui/embed-facade";
import { ArticleReader, type Post } from "@/components/media/article-reader";
import { TransmissionHero } from "@/components/media/transmission-hero";
import { LogIndex } from "@/components/media/log-index";
import { CHANNEL_COLOR, channelOf, type Channel } from "@/components/media/media-utils";

gsap.registerPlugin(Flip);

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

export function MediaPage() {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Built once so post identities stay stable for the reader's previous / next links.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allPosts = useMemo(() => sortPosts([featuredPost, ...recentPosts]), []);
  const featured = allPosts.find((p) => p.title === featuredPost.title)!;
  const logNumbers = useMemo(() => new Map(allPosts.map((p, i) => [p.title, allPosts.length - i])), [allPosts]);
  const logOf = useCallback((post: Post) => logNumbers.get(post.title) ?? 0, [logNumbers]);

  const channels = useMemo(() => {
    const counts = new Map<Channel, number>();
    allPosts.forEach((p) => counts.set(channelOf(p), (counts.get(channelOf(p)) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [allPosts]);

  const [channel, setChannel] = useState<Channel | "All">("All");
  const [view, setView] = useState<"grid" | "index">("grid");
  const query = searchQuery.trim().toLowerCase();
  const searching = query !== "";
  const showFeatured = !searching && channel === "All";

  const filteredPosts = useMemo(
    () =>
      allPosts.filter((post) => {
        if (showFeatured && post === featured) return false;
        if (channel !== "All" && channelOf(post) !== channel) return false;
        if (!query) return true;
        return [post.title, post.excerpt, post.category, post.date, post.author, post.content?.join(" ") ?? "", post.markdown ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(query);
      }),
    [allPosts, featured, showFeatured, channel, query],
  );

  // The featured post sits above the list but still counts as a result.
  const foundCount = filteredPosts.length + (showFeatured && featured ? 1 : 0);

  const openPost = useCallback((post: Post) => setActivePost(post), []);
  const closePost = useCallback(() => setActivePost(null), []);
  const results = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const listKey = filteredPosts.map((p) => p.title).join("|");

  // Snapshot the current layout before a filter change so the results can glide to their new spots.
  const captureLayout = () => {
    if (results.current && !prefersReducedMotion()) {
      flipState.current = Flip.getState(results.current.querySelectorAll(".m-item"));
    }
  };
  const changeChannel = (next: Channel | "All") => {
    captureLayout();
    setChannel(next);
  };
  const changeQuery = (next: string) => {
    captureLayout();
    setSearchQuery(next);
  };

  // Scroll reveal for the results, rebuilt when the view changes. Items are only hidden
  // once GSAP takes over, and anything already on screen is revealed immediately, so the
  // archive can never sit there as an empty block.
  useGSAP(
    () => {
      const el = results.current;
      if (!el || prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>(".m-item", el);
      gsap.set(items, { y: 60, autoAlpha: 0 });
      ScrollTrigger.batch(items, {
        start: "top 96%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.08, overwrite: true }),
      });
      ScrollTrigger.refresh();
    },
    { scope: results, dependencies: [view], revertOnUpdate: true },
  );

  // Filter / search changes: kept items glide to their new place, new ones surface.
  useLayoutEffect(() => {
    const state = flipState.current;
    flipState.current = null;
    if (!state || !results.current) return;
    const items = results.current.querySelectorAll<HTMLElement>(".m-item");
    Flip.from(state, {
      targets: items,
      duration: 0.8,
      ease: "expo.out",
      stagger: 0.02,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 30, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.04 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [listKey]);

  // Video: the player grows into place as it scrolls up, copy follows.
  useGSAP(
    () => {
      const el = videoRef.current;
      if (!el || prefersReducedMotion()) return;
      gsap.fromTo(
        el.querySelector(".m-video"),
        { scale: 0.82, rotateX: 12, transformPerspective: 1200 },
        { scale: 1, rotateX: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: 0.8 } },
      );
      gsap.from(el.querySelectorAll(".m-video-copy > *"), {
        autoAlpha: 0,
        y: 30,
        stagger: 0.1,
        duration: 1.1,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      });
    },
    { scope: videoRef },
  );

  const chip = (active: boolean) =>
    cn(
      "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300",
      active ? "border-tone bg-tone text-slate-950" : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/25 hover:text-white",
    );

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        eyebrow="Media & works"
        title="Notes from"
        accent="the workshop."
        description="Field notes, build logs and stories from the team: what we built, what broke, and what we learned along the way."
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
          <div>
            <dt>Logs filed</dt>
            <dd className="mt-1 text-2xl tracking-normal text-white tabular-nums">{String(allPosts.length).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>Channels</dt>
            <dd className="mt-1 text-2xl tracking-normal text-white tabular-nums">{String(channels.length).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>Latest</dt>
            <dd className="mt-1 text-2xl tracking-normal text-white">{allPosts[0]?.date}</dd>
          </div>
        </dl>
      </PageHeader>

      {showFeatured && <TransmissionHero post={featured} log={logOf(featured)} onOpen={openPost} />}

      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-24 md:py-32">
        <SectionHeading
          eyebrow={searching ? "Search" : "Archive"}
          title={searching ? "Results for" : "Mission"}
          accent={searching ? `“${searchQuery.trim()}”` : "logs."}
          key={searching ? "search" : "recent"}
          action={
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400" aria-live="polite">
              {String(foundCount).padStart(2, "0")} {foundCount === 1 ? "log" : "logs"} found
            </p>
          }
        />

        {/* Console: channel filters, search and view switch */}
        <div className="mb-12 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-3 md:mb-16 lg:flex-row lg:items-center">
          <div role="group" aria-label="Filter by channel" className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-1 lg:flex-wrap lg:px-0 lg:pb-0">
            <button type="button" aria-pressed={channel === "All"} onClick={() => changeChannel("All")} className={chip(channel === "All")}>
              All <span className="opacity-60">{allPosts.length}</span>
            </button>
            {channels.map(([name, count]) => (
              <button key={name} type="button" aria-pressed={channel === name} onClick={() => changeChannel(name)} className={chip(channel === name)}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: channel === name ? "#020617" : CHANNEL_COLOR[name] }} />
                {name} <span className="opacity-60">{count}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <label className="relative block flex-1 lg:w-72 lg:flex-none">
              <span className="sr-only">Search articles</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => changeQuery(e.target.value)}
                placeholder="Search logs"
                className="h-10 w-full rounded-full border border-white/10 bg-[#020617]/60 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 hover:border-white/20 focus:border-tone"
              />
            </label>
            <div role="group" aria-label="Layout" className="flex shrink-0 rounded-full border border-white/10 bg-[#020617]/60 p-1">
              {(
                [
                  ["grid", LayoutGrid, "Grid view"],
                  ["index", Rows3, "Index view"],
                ] as const
              ).map(([id, Icon, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-label={label}
                  aria-pressed={view === id}
                  onClick={() => setView(id)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    view === id ? "bg-white text-slate-950" : "text-slate-400 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={results}>
          {filteredPosts.length === 0 ? (
            <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-20 text-center">
              <span aria-hidden="true" className="relative mb-8 flex h-20 w-20 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full border border-tone/40 motion-reduce:hidden" />
                <span className="absolute inset-4 rounded-full border border-tone/30" />
                <span className="h-2 w-2 rounded-full bg-tone shadow-[0_0_12px_var(--t1)]" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-tone-soft">No signal</p>
              <p className="mt-3 text-lg text-white">No logs match that search.</p>
              <p className="mt-2 text-sm text-slate-400">Try a title, author, subsystem or topic.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <div key={post.title} className="m-item">
                  <ArticleCard post={post} onOpen={openPost} log={logOf(post)} />
                </div>
              ))}
            </div>
          ) : (
            <LogIndex posts={filteredPosts} logOf={logOf} onOpen={openPost} />
          )}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto w-full max-w-7xl border-x border-white/10 px-5 sm:px-8 py-24 md:py-32">
          <SectionHeading
            eyebrow="Video"
            title="Meet the team"
            accent="on film."
            description="Watch our team introduction video for RoboSub 2026. More updates coming soon."
          />
          <div ref={videoRef} className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="m-video overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_8px_#f87171] motion-safe:animate-pulse" />
                    Feed 01 // RoboSub 2026
                  </span>
                  <span className="hidden sm:inline">Team AUV MIT-B</span>
                </div>
                <div className="aspect-video">
                  <EmbedFacade
                    label="Play video: Team AUV MIT-B Introduction Video, RoboSub 2026"
                    preview={
                      <>
                        <img
                          src="https://i.ytimg.com/vi/er7BXNt_4Kw/hqdefault.jpg"
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <span className="absolute inset-0 bg-[#020617]/45 transition-colors duration-500 group-hover:bg-[#020617]/25" />
                        <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                          <span className="absolute inset-0 rounded-full border border-white/40 motion-safe:animate-ping" />
                          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-950 shadow-[0_0_40px_-6px_var(--t1)] transition-transform duration-500 group-hover:scale-110">
                            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
                          </span>
                        </span>
                      </>
                    }
                    render={() => (
                      <iframe
                        src="https://www.youtube-nocookie.com/embed/er7BXNt_4Kw?autoplay=1&rel=0"
                        title="Team AUV MIT-B Introduction Video | RoboSub 2026"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full border-0"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="m-video-copy lg:col-span-4">
              <h3 className="text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">
                Team AUV MIT-B Introduction Video | RoboSub 2026
              </h3>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Get to know the team building and representing Manipal Institute of Technology, Bengaluru for the very first time at RoboSub 2026.
              </p>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Built with the effort of all 23 members on the team, Deuterium is the culmination of our work over the last 1.5 years.
              </p>
              <p className="mt-6 font-mono text-xs text-slate-400">Published by Team AUV MIT-B</p>
              <PillButton href="https://www.youtube.com/@TeamAUVMIT-B" variant="ghost" className="mt-6">
                Visit channel
              </PillButton>
            </div>
          </div>
        </div>
      </section>

      <ArticleReader post={activePost} onClose={closePost} posts={allPosts} onNavigate={openPost} logOf={logOf} />
      <Footer />
    </div>
  );
}

/** Newest first; "Coming soon" and undated posts lead, "Various dates" trails. */
function sortPosts(posts: Post[]) {
  const rank = (p: Post) => {
    const d = p.date.toLowerCase();
    if (d.includes("coming soon") || !d) return Infinity;
    if (d === "various dates") return -Infinity;
    const t = Date.parse(p.date);
    return isNaN(t) ? -Infinity : t;
  };
  return [...posts].sort((a, b) => {
    const ra = rank(a);
    const rb = rank(b);
    return ra === rb ? 0 : rb > ra ? 1 : -1;
  });
}
