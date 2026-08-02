import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { resolveTeamImage } from "@/lib/team-images";
import * as React from "react";
import { useState } from "react";

const teamCategories = [
  {
    "title": "Faculty Advisors",
    "members": [
      {
        "name": "Dr. Adithya G.S.S",
        "role": "Faculty Advisor",
        "department": "School of Basic Sciences, Humanities and Management (MIT-BLR)",
        "bio": "",
        "image": "src/assets/Personal_photo/gss.jpg",
        "location": "MIT-BLR",
        "skills": ["Faculty Advisor"],
        "gradient": "from-indigo-500/20 via-indigo-500/5 to-transparent",
        "social": {
          "email": "mailto:srinivas.adithya@manipal.edu",
          "linkedin": "https://www.linkedin.com/in/dr-adithya-garimella-696353138/",
          "github": null
        }
      },
      {
        "name": "Dr. Manasa Kongot",
        "role": "Assistant Director - MSP",
        "department": "School of Basic Sciences, Humanities and Management (MIT-BLR)",
        "bio": "",
        "image": "src/assets/Personal_photo/manasa.jpeg",
        "location": "MIT-BLR",
        "skills": ["Faculty Advisor"],
        "gradient": "from-indigo-500/20 via-indigo-500/5 to-transparent",
        "social": {
          "email": "mailto:manasakongot@gmail.com",
          "linkedin": "https://www.linkedin.com/in/manasa-kongot-901715178/",
          "github": null
        }
      },
      {
        "name": "Dr. Ujjwal Verma",
        "role": "Faculty Advisor",
        "department": "Electronics & Communication Engineering Dept (MIT-M)",
        "bio": "",
        "image": "src/assets/Personal_photo/ujwal.jpeg",
        "location": "MIT-Manipal",
        "skills": ["Faculty Advisor"],
        "gradient": "from-indigo-500/20 via-indigo-500/5 to-transparent",
        "social": {
          "email": "mailto:ujjwal.verma@manipal.edu",
          "linkedin": "https://www.linkedin.com/in/ujjwalverma/",
          "github": null
        }
      }
    ]
  },
  {
    "title": "Founding Team / Team Advisors and Mentor",
    "members": [
      {
        "name": "Animesh Mishra",
        "role": "Team Advisor",
        "department": "Computer Science Engineering 27'",
        "bio": "There is no place like 127.0.0.1",
        "image": "src/assets/Personal_photo/placeholder.svg",
        "location": "4th Year",
        "skills": ["Software", "Leadership"],
        "gradient": "from-indigo-500/20 via-indigo-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/animesh-mishra-79028a231/",
          "github": "https://github.com/AnimeshM21"
        }
      },
      {
        "name": "Arunava Maiti",
        "role": "Team Advisor",
        "department": "Electronics and Communication Engineering 27'",
        "bio": "No Risk No Story",
        "image": "/src/assets/Personal_photo/arunava.webp",
        "location": "4th Year",
        "skills": ["Electrical", "Mechanical", "Leadership"],
        "gradient": "from-indigo-500/20 via-indigo-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/arunava-maiti/",
          "github": "https://github.com/arunavamaiti19"
        }
      },
      {
        "name": "Azad Roy",
        "role": "Team Advisor",
        "department": "Electronics and Communication Engineering 27'",
        "bio": "For the last time: there's more to controls than PID",
        "image": "src/assets/Personal_photo/azad.jpeg",
        "location": "4th Year",
        "skills": ["Electrical", "Mechanical", "Leadership"],
        "gradient": "from-indigo-500/20 via-indigo-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/azad-roy-43329b376",
          "github": "https://github.com/Luke5273"
        }
      },
      {
        "name": "Pritha Jaipal",
        "role": "Project Mentor",
        "department": "Electronics and Communication Engineering 25'",
        "bio": "",
        "image": "src/assets/Personal_photo/pritha.jpeg",
        "location": "MIT-BLR",
        "skills": ["Project Mentor"],
        "gradient": "from-indigo-500/20 via-indigo-500/5 to-transparent",
        "social": {
          "email": "mailto:prithajaipal@gmail.com",
          "linkedin": "https://www.linkedin.com/in/pritha-jaipal-058b85187/",
          "github": null
        }
      }
    ]
  },
  {
    "title": "Current Leadership",
    "members": [
      {
        "name": "Chatur Vasireddy",
        "role": "Team Lead / Mechanical Subsystem Lead",
        "department": "Electronics and Communication Engineering 28'",
        "bio": "meow",
        "image": "src/assets/Personal_photo/chatur.jpeg",
        "location": "3rd Year",
        "skills": ["Mechanical"],
        "gradient": "from-cyan-500/20 via-cyan-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/chatur-vasireddy-4845621a5/",
          "github": "https://github.com/ChaturVasireddy"
        }
      },
      {
        "name": "Siddharth P S",
        "role": "Team Manager",
        "department": "Electronics and Communication Engineering 28'",
        "bio": "Float like cadillac, sting like a beamer",
        "image": "/src/assets/Personal_photo/siddarth.webp",
        "location": "3rd Year",
        "skills": ["Management"],
        "gradient": "from-cyan-500/20 via-cyan-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/siddharth-ps-27ba76350/",
          "github": "https://github.com/siddharthps2005"
        }
      },
      {
        "name": "Adwait Bhardwaj",
        "role": "Technical Lead",
        "department": "Computer Science Engineering 28'",
        "bio": "aquamariner",
        "image": "src/assets/Personal_photo/adwait.jpeg",
        "location": "3rd Year",
        "skills": ["Electrical"],
        "gradient": "from-cyan-500/20 via-cyan-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/adwaitbhardwaj",
          "github": "https://github.com/vt-abt"
        }
      }
    ]
  },
  {
    "title": "Mechanical Subsystem",
    "members": [
      {
        "name": "Kshithij Jaitly",
        "role": "Mechanical Subsystem Member",
        "department": "Electronics and Communication Engineering 29'",
        "bio": "Fusion pls dont crash !!!",
        "image": "/src/assets/Personal_photo/kshitij.webp",
        "location": "2nd Year",
        "skills": ["Mechanical"],
        "gradient": "from-teal-500/20 via-teal-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/kshithij-jaitly-84237b376",
          "github": "https://github.com/kshithij-j"
        }
      },
      {
        "name": "Kanishk T R Babu",
        "role": "Mechanical Subsystem Member",
        "department": "Electronics and Communication Engineering 29'",
        "bio": "All you have to do is just try.",
        "image": "/src/assets/Personal_photo/kanishk.webp",
        "location": "2nd Year",
        "skills": ["Mechanical"],
        "gradient": "from-teal-500/20 via-teal-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/kanishk-tr/",
          "github": "https://github.com/K-anishk"
        }
      },
      {
        "name": "Shaurya Veer Singh",
        "role": "Mechanical Subsystem Member",
        "department": "Computer Science Engineering 29'",
        "bio": "Peace",
        "image": "/src/assets/Personal_photo/shaurya.webp",
        "location": "2nd Year",
        "skills": ["Mechanical"],
        "gradient": "from-teal-500/20 via-teal-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/shaurya-veer-singh-23255b356/",
          "github": "https://github.com/ShauryaVS-bit"
        }
      }
    ]
  },
  {
    "title": "Electrical Subsystem",
    "members": [
      {
        "name": "Faizal Yusuf Baig",
        "role": "Electrical Subsystem Lead",
        "department": "Electronics and Communication Engineering 28'",
        "bio": "Time you enjoy wasting is not wasted time.",
        "image": "src/assets/Personal_photo/faizal.jpeg",
        "location": "3rd Year",
        "skills": ["Electrical"],
        "gradient": "from-cyan-500/20 via-cyan-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/faizal-baig-6583b7371?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          "github": "https://github.com/Raavan0105"
        }
      },
      {
        "name": "Serah Saju Jacob",
        "role": "Electrical Subsystem Member",
        "department": "Electronics and Communication Engineering 28'",
        "bio": "reach for the stars",
        "image": "src/assets/Personal_photo/serah.png",
        "location": "2nd Year",
        "skills": ["Electrical"],
        "gradient": "from-teal-500/20 via-teal-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/serah-jacob-08a4bb33a",
          "github": "https://github.com/soeoroah"
        }
      },
      {
        "name": "Aryan Sharma",
        "role": "Electrical Subsystem Member",
        "department": "Electronics and Communication Engineering 29'",
        "bio": "Plugged in.",
        "image": "/src/assets/Personal_photo/aryan.webp",
        "location": "2nd Year",
        "skills": ["Electrical"],
        "gradient": "from-teal-500/20 via-teal-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/aryan-sharma101106",
          "github": "https://github.com/Aryan-061"
        }
      },
      {
        "name": "Kopal Agrawal",
        "role": "Electrical Subsystem Member",
        "department": "Electronics and Communication Engineering 29'",
        "bio": "It's not that deep",
        "image": "/src/assets/Personal_photo/kopal.webp",
        "location": "2nd Year",
        "skills": ["Electrical"],
        "gradient": "from-teal-500/20 via-teal-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/kopal-agrawal-912492252/",
          "github": "https://github.com/kopal1237"
        }
      }
    ]
  },
  {
    "title": "Software and Automation Subsystem",
    "members": [
      {
        "name": "Aditya R Jemshetty",
        "role": "Software Subsystem Lead",
        "department": "Computer Science Engineering 28'",
        "bio": "Life is short— skip DFS, do BFS :)",
        "image": "/src/assets/Personal_photo/aditya.webp",
        "location": "3rd Year",
        "skills": ["Software"],
        "gradient": "from-cyan-500/20 via-cyan-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/aditya-r-jemshetty-036311331/",
          "github": "https://github.com/Aditya5191"
        }
      },
      {
        "name": "Advithiya Duddu",
        "role": "Software Subsystem Senior Member",
        "department": "Computer Science Engineering 28'",
        "bio": "you miss 100% of the shots you don't take",
        "image": "/src/assets/Personal_photo/advithiya.webp",
        "location": "3rd Year",
        "skills": ["Software"],
        "gradient": "from-cyan-500/20 via-cyan-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/advithiya-duddu",
          "github": "https://github.com/codewithadvi"
        }
      },
      {
        "name": "Farha P K",
        "role": "Software Subsystem Member",
        "department": "Computer Science Engineering 29'",
        "bio": "Do it scared",
        "image": "/src/assets/Personal_photo/farha.webp",
        "location": "2nd Year",
        "skills": ["Software"],
        "gradient": "from-teal-500/20 via-teal-500/5 to-transparent",
        "social": {
          "linkedin": "https://in.linkedin.com/in/farha-pk-909b23207",
          "github": "https://github.com/farha215"
        }
      }
    ]
  },
  {
    "title": "Research Subsystem",
    "members": []
  },
  {
    "title": "Management and Design Team",
    "members": [
      {
        "name": "Kaushiki Gupta",
        "role": "Management Team Member",
        "department": "Computer Science Engineering 29'",
        "bio": "I wish I could, but I don't want to.",
        "image": "src/assets/Personal_photo/kaushiki.jpeg",
        "location": "2nd Year",
        "skills": ["Management"],
        "gradient": "from-teal-500/20 via-teal-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.youtube.com/embed/dQw4w9WgXcQ",
          "github": "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      },
      {
        "name": "Sourish Sri Vignesh S",
        "role": "Design Team Member",
        "department": "Computer Science Engineering 28'",
        "bio": "NAH, I'D WIN.",
        "image": "/src/assets/Personal_photo/sourish.webp",
        "location": "3rd Year",
        "skills": ["Design"],
        "gradient": "from-indigo-500/20 via-indigo-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/sourish-sri-vignesh-s-62a57b388/",
          "github": "https://github.com/Sourish-19"
        }
      },
      {
        "name": "Pritisha Kakati",
        "role": "Design Team Member",
        "department": "Computer Science Engineering'",
        "bio": "Professional pixel perfectionist.",
        "image": "/src/assets/Personal_photo/prithisha.webp",
        "location": "3rd Year",
        "skills": ["Design"],
        "gradient": "from-indigo-500/20 via-indigo-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/pritisha-kakati-243571339/",
          "github": "https://github.com/pclowdy"
        }
      }
    ]
  }
];

export const resolvedTeamCategories = teamCategories.map((category) => ({
  ...category,
  members: category.members.map((member) => ({
    ...member,
    image: resolveTeamImage(member.image),
  })),
}));

export function getTeamMemberByName(name: string) {
  return resolvedTeamCategories
    .flatMap((category) => category.members)
    .find((member) => member.name === name);
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function TeamMemberCard({ member }: { member: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const hasBio = Boolean(member.bio?.trim());

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left - width / 2) / (width / 2);
    const y = (e.clientY - rect.top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={itemVariants}
      className="perspective-1000 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
    >
      <motion.div
        style={
          isMobile
            ? { transformStyle: "flat" }
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        onMouseMove={isMobile ? undefined : handleMouseMove}
        onMouseEnter={isMobile ? undefined : () => setIsHovered(true)}
        onMouseLeave={isMobile ? undefined : handleMouseLeave}
        className="group relative h-full"
      >
        <Card className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0a1128] transition-shadow duration-500 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]">
          {/* Animated gradient overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            animate={
              !isMobile && isHovered
                ? { opacity: 1 }
                : { opacity: shouldReduceMotion ? 0.05 : 0 }
            }
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Identity — the photo is its own full-bleed panel with the name
                lettered directly onto it, so name+photo read as one distinct
                unit set apart from the plain card surface below. */}
            <div className="relative w-full aspect-square overflow-hidden">
              <motion.img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                whileHover={isMobile ? undefined : { scale: 1.08 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
              <motion.h3
                className="absolute inset-x-0 bottom-0 px-5 pb-4 text-xl md:text-2xl font-extrabold tracking-tight text-white text-center leading-snug [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]"
                animate={!isMobile && isHovered ? { y: -3 } : { y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {member.name}
              </motion.h3>
            </div>

            {/* Details — plain card surface, clearly separate from the photo above */}
            <div className="text-center flex-grow flex flex-col gap-2.5 px-6 pt-5 pb-4">
              <div className="flex flex-col items-center gap-1">
                <Badge
                  variant="secondary"
                  className="bg-blue-500/10 text-[0.65rem] uppercase tracking-[0.2em] text-blue-200/80 border border-blue-500/20 backdrop-blur font-medium"
                >
                  {member.role}
                </Badge>
                {member.department ? (
                  <p className="text-xs font-semibold tracking-tight text-orange-400/90">
                    {member.department}
                  </p>
                ) : null}
              </div>

              {/* Location removed */}

              {hasBio ? (
                <p className="text-sm text-slate-400 flex-grow">
                  {member.bio}
                </p>
              ) : null}


              {/* Social Links — a clearly-clickable action row, kept small and
                  neutral at rest so it never competes with the name or role;
                  the accent color only shows up on interaction. */}
              <div className={`flex justify-center ${hasBio ? "mt-auto" : "mt-0"} pt-1`}>
                <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1 shadow-sm">
                  {[
                    { icon: Linkedin, label: "LinkedIn", href: member.social?.linkedin },
                    { icon: Github, label: "GitHub", href: member.social?.github },
                    { icon: Mail, label: "Email", href: member.social?.email },
                  ].map((social) => {
                    if (!social.href) return null;

                    let formattedHref = social.href;
                    if (!formattedHref.startsWith('http') && !formattedHref.startsWith('mailto:')) {
                      formattedHref = `https://${formattedHref}`;
                    }

                    return (
                      <a
                        key={social.label}
                        href={formattedHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on ${social.label}`}
                        className="group/social flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_14px_-2px_rgba(59,130,246,0.6)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                      >
                        <social.icon
                          className="h-4 w-4 transition-transform duration-200 group-hover/social:scale-110"
                          aria-hidden
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function TeamSectionBlock() {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-transparent text-slate-50 pb-0 font-sans">
      <section
        aria-labelledby="team-section-heading"
        className="relative w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-10"
      >
        {/* Background decorative elements */}
        {!isMobile && (
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              animate={{
                scale: shouldReduceMotion ? 1 : [1, 1.18, 1],
                rotate: shouldReduceMotion ? 0 : [0, 90, 0],
                opacity: [0.12, 0.3, 0.12],
              }}
              transition={{
                duration: shouldReduceMotion ? 0.6 : 18,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "linear",
              }}
              className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[150px]"
            />
            <motion.div
              animate={{
                scale: shouldReduceMotion ? 1 : [1.1, 1, 1.1],
                rotate: shouldReduceMotion ? 0 : [0, -90, 0],
                opacity: [0.12, 0.32, 0.12],
              }}
              transition={{
                duration: shouldReduceMotion ? 0.6 : 16,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-600/20 blur-[150px]"
            />
          </div>
        )}

        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20"
          >
            <div className="space-y-4">
              <h2 id="team-section-heading" className="text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-none text-white">
                OUR TEAM
              </h2>
              <p className="text-slate-400 text-lg md:text-xl tracking-[0.06em] font-medium ml-1">
                A diverse team of talented (and extremely fun) individuals working together to build
                amazing and sometimes functional robots.
              </p>
            </div>
          </motion.div>

          {/* Team Categories */}
          <div>
            {resolvedTeamCategories.map((category, idx) => {
              // Categories that place their lead on a row of their own, with
              // the remaining members on the line below.
              const leadLayoutTitles = [
                "Founding Team / Team Advisors and Mentor",
                "Current Leadership",
                "Electrical Subsystem",
                "Software and Automation Subsystem",
              ];
              // Explicitly pin the top-row member for categories where it isn't
              // simply the "lead" by role.
              const topMemberByTitle: Record<string, string> = {
                "Founding Team / Team Advisors and Mentor": "Pritha Jaipal",
              };
              const isLeadLayout = leadLayoutTitles.includes(category.title);
              const pinnedName = topMemberByTitle[category.title];
              const foundLeadIndex = pinnedName
                ? category.members.findIndex((m) => m.name === pinnedName)
                : isLeadLayout
                  ? category.members.findIndex((m) => /lead/i.test(m.role))
                  : -1;
              // When a subsystem has no explicit "lead", fall back to the first
              // member so it still gets the top-row-then-rest layout.
              const leadIndex =
                isLeadLayout && foundLeadIndex < 0 && category.members.length > 0
                  ? 0
                  : foundLeadIndex;

              // Every category gets its own distinct, boxed panel. The advisors
              // and current-leadership boxes sit closer together than the rest
              // so the two still read as one connected group.
              const marginTop =
                idx === 0
                  ? ""
                  : category.title === "Current Leadership"
                    ? "mt-6"
                    : "mt-20";
              const panel =
                "rounded-[2.5rem] border border-slate-700 bg-[#0a1128] p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden";

              return (
                <div key={category.title} className={`${marginTop} ${panel}`.trim()}>
                  <div className="absolute inset-0 border border-slate-800/50 rounded-[2.5rem] pointer-events-none z-20 m-2" />
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="mb-10 flex items-center gap-4"
                    >
                      <h3 className="text-3xl font-bold text-white tracking-tight">
                        {category.title}
                      </h3>
                      <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent" />
                    </motion.div>

                    {category.members.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/10 bg-[#0a1128] py-16 text-center"
                      >
                        <span className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                          Coming Soon
                        </span>
                        <span className="text-sm text-slate-400">
                          This subsystem is being assembled — stay tuned.
                        </span>
                      </motion.div>
                    ) : leadIndex >= 0 ? (
                      <div className="space-y-8">
                        {/* First row: subsystem lead on its own line */}
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-100px" }}
                          className="flex flex-wrap justify-center gap-8"
                        >
                          <TeamMemberCard
                            key={`${category.title}-lead`}
                            member={category.members[leadIndex]}
                          />
                        </motion.div>

                        {/* Second row: remaining members */}
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-100px" }}
                          className="flex flex-wrap justify-center gap-8"
                        >
                          {category.members
                            .filter((_, i) => i !== leadIndex)
                            .map((member, index) => (
                              <TeamMemberCard
                                key={`${category.title}-member-${index}`}
                                member={member}
                              />
                            ))}
                        </motion.div>
                      </div>
                    ) : (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-wrap justify-center gap-8"
                      >
                        {category.members.map((member, index) => (
                          <TeamMemberCard key={index} member={member} />
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
}
