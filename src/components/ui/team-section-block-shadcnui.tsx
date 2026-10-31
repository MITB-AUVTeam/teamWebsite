import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { useLenis } from "@/components/ui/smooth-scroll";
import { resolveTeamImage } from "@/lib/team-images";
import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CrewCard, CrewSpotlight } from "@/components/team/crew-card";
import { CrewDossier, type DossierEntry } from "@/components/team/crew-dossier";
import { JoinCrew } from "@/components/team/join-crew";
import { ManifestNav } from "@/components/team/manifest-nav";
import { crewCode } from "@/components/team/types";

const teamCategories = [
  {
    "title": "Faculty Advisors",
    "members": [
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
        "name": "Siddharth P S",
        "role": "Team Lead",
        "department": "Electronics and Communication Engineering 28'",
        "bio": "Float like cadillac, sting like a beamer",
        "image": "/src/assets/Personal_photo/siddarth.webp",
        "location": "3rd Year",
        "skills": ["Leadership"],
        "gradient": "from-cyan-500/20 via-cyan-500/5 to-transparent",
        "social": {
          "linkedin": "https://www.linkedin.com/in/siddharth-ps-27ba76350/",
          "github": "https://github.com/siddharthps2005"
        }
      },
      {
        "name": "Chatur Vasireddy",
        "role": "Technical Lead / Mechanical Subsystem Lead",
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
        "bio": "Life is short, skip DFS, do BFS :)",
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
        "name": "Sourish Sri Vignesh S",
        "role": "Design Team Lead",
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
      },      
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

type Member = (typeof resolvedTeamCategories)[number]["members"][number];

// Floating navbar (~80px) plus the sticky manifest bar, with a little air.
const NAV_OFFSET = -170;

const getCategorySlug = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("mechanical")) return "mechanical";
  if (lower.includes("electrical")) return "electrical";
  if (lower.includes("software")) return "software";
  if (lower.includes("management")) return "management";
  return lower.replace(/[^a-z0-9]+/g, "-");
};

const getShortTitle = (title: string) =>
  title.split(/[/(]/)[0].replace(/subsystem/i, "").trim();

/** Scrolls to an element below the fixed navbar, through Lenis when it is running. */
function useScrollToId() {
  const lenis = useLenis();
  return React.useCallback(
    (id: string, immediate = false) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: NAV_OFFSET, immediate, force: true });
      } else {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const y = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
        window.scrollTo({ top: y, behavior: immediate || reduce ? "auto" : "smooth" });
      }
    },
    [lenis],
  );
}

// Groups that feature one member above the rest.
const FEATURED_LAYOUT_TITLES = [
  "Founding Team / Team Advisors and Mentor",
  "Current Leadership",
  "Software and Automation Subsystem",
];
// Groups whose featured member isn't simply the one with "lead" in their role.
const FEATURED_BY_TITLE: Record<string, string> = {
  "Founding Team / Team Advisors and Mentor": "Pritha Jaipal",
};

function featuredIndexFor(title: string, members: Member[]) {
  if (!FEATURED_LAYOUT_TITLES.includes(title) || members.length === 0) return -1;
  const pinned = FEATURED_BY_TITLE[title];
  const found = pinned ? members.findIndex((m) => m.name === pinned) : members.findIndex((m) => /lead/i.test(m.role));
  return found < 0 ? 0 : found;
}

// Hover scan, card preview and spotlight radar; scoped here so the page stays self-contained.
const TEAM_CSS = `
.cm-card:hover .cm-scan, .cm-spot:hover .cm-scan { animation: cm-scan 1.6s cubic-bezier(0.45,0,0.55,1) infinite; }
.cm-scan-loop { animation: cm-scan 3.2s cubic-bezier(0.45,0,0.55,1) infinite; }
@keyframes cm-scan { from { transform: translateY(-100%); } to { transform: translateY(700%); } }
.cm-radar { animation: cm-radar 6s linear infinite; }
@keyframes cm-radar { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .cm-card:hover .cm-scan, .cm-spot:hover .cm-scan, .cm-scan-loop, .cm-radar { animation: none; }
}
/* Card hover preview: desktop pointers only, opacity and transforms only. */
.cm-peek { display: none; }
@media (hover: hover) and (pointer: fine) and (min-width: 768px) {
  .cm-peek { display: flex; opacity: 0; visibility: hidden; transition: opacity .3s ease, visibility 0s linear .3s; }
  .cm-peek-line { opacity: 0; transform: translate3d(0,10px,0); transition: opacity .25s ease, transform .25s ease; }
  .cm-peek-sweep { transform: translate3d(0,-100%,0); }
  .cm-card:hover .cm-peek, .cm-card:has(:focus-visible) .cm-peek { opacity: 1; visibility: visible; transition: opacity .35s ease, visibility 0s; }
  .cm-card:hover .cm-peek-line, .cm-card:has(:focus-visible) .cm-peek-line {
    opacity: 1; transform: none;
    transition: opacity .5s ease, transform .6s cubic-bezier(0.22,1,0.36,1);
    transition-delay: calc(.12s + var(--i, 0) * .055s);
  }
  .cm-card:hover .cm-peek-sweep, .cm-card:has(:focus-visible) .cm-peek-sweep { animation: cm-peek-sweep .9s cubic-bezier(0.65,0,0.35,1) both; }
}
@keyframes cm-peek-sweep { from { transform: translate3d(0,-100%,0); } to { transform: translate3d(0,0,0); opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .cm-peek, .cm-peek-line, .cm-card:hover .cm-peek-line, .cm-card:has(:focus-visible) .cm-peek-line { transition: none !important; transform: none !important; }
  .cm-peek-sweep { display: none; }
}`;

export function TeamSectionBlock() {
  const scrollToId = useScrollToId();
  const root = React.useRef<HTMLDivElement>(null);
  const [dossier, setDossier] = useState<DossierEntry | null>(null);
  const opener = React.useRef<HTMLElement | null>(null);

  const openDossier = React.useCallback((entry: DossierEntry, trigger: HTMLElement) => {
    opener.current = trigger;
    setDossier(entry);
  }, []);
  const closeDossier = React.useCallback(() => {
    setDossier(null);
    // Give the card its focus back once the drawer has gone.
    window.setTimeout(() => opener.current?.focus({ preventScroll: true }), 0);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      // Header stats count up from zero.
      q(".tm-count").forEach((el: HTMLElement) => {
        const target = Number(el.dataset.count ?? 0);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 2,
          delay: 0.6,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v));
          },
        });
      });

      // Group headers: the big index rolls up, the title words rise, the rule draws across.
      q(".cm-head").forEach((head: HTMLElement) => {
        const title = head.querySelector(".cm-title");
        const split = title ? SplitText.create(title, { type: "words", mask: "words" }) : null;
        gsap
          .timeline({ scrollTrigger: { trigger: head, start: "top 85%", once: true } })
          .from(head.querySelector(".cm-num"), { yPercent: 110, duration: 1.1 })
          .from(split?.words ?? [], { yPercent: 110, stagger: 0.05, duration: 1.1 }, 0.1)
          .from(head.querySelector(".cm-rule"), { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "expo.inOut" }, 0.2)
          .from(head.querySelectorAll(".cm-meta"), { autoAlpha: 0, y: 10, stagger: 0.08, duration: 0.8 }, 0.4);
      });

      // Badge cards: each rises in while its photo settles into the frame. Transform and
      // opacity only, so a whole row can animate at once without repainting the photos.
      gsap.set(q(".cm-card"), { y: 60, autoAlpha: 0 });
      gsap.set(q(".cm-card .cm-shot"), { scale: 1.12, autoAlpha: 0 });
      ScrollTrigger.batch(q(".cm-card"), {
        start: "top 92%",
        once: true,
        onEnter: (batch) => {
          const els = batch as HTMLElement[];
          gsap.to(els, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.08 });
          gsap.to(els.map((c) => c.querySelector(".cm-shot")), { scale: 1, autoAlpha: 1, duration: 1.3, stagger: 0.08, ease: "expo.out" });
        },
      });

      // Spotlights: the card lifts in, then the portrait drifts inside its frame while scrolling.
      q(".cm-spot").forEach((card: HTMLElement) => {
        gsap.from(card, { y: 80, autoAlpha: 0, duration: 1.3, scrollTrigger: { trigger: card, start: "top 88%", once: true } });
        const img = card.querySelector(".cm-img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -6, scale: 1.15 },
            { yPercent: 6, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.8 } },
          );
        }
      });

      q(".cm-soon").forEach((el: HTMLElement) =>
        gsap.from(el, { autoAlpha: 0, scale: 0.94, duration: 1.2, scrollTrigger: { trigger: el, start: "top 88%", once: true } }),
      );
    },
    { scope: root },
  );

  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (!hash) return;
    scrollToId(hash, true);
    // Run again once images above have settled and the preloader has released scrolling.
    const timers = [350, 2200].map((ms) => setTimeout(() => scrollToId(hash), ms));
    return () => timers.forEach(clearTimeout);
  }, [scrollToId]);

  const totalMembers = resolvedTeamCategories.reduce((n, c) => n + c.members.length, 0);
  const subsystemCount = resolvedTeamCategories.filter((c) => /subsystem/i.test(c.title)).length;
  const groups = React.useMemo(
    () => resolvedTeamCategories.map((c) => ({ slug: getCategorySlug(c.title), label: getShortTitle(c.title), count: c.members.length })),
    [],
  );

  return (
    <div ref={root} className="min-h-screen text-white">
      <style>{TEAM_CSS}</style>
      <PageHeader
        eyebrow="Team"
        title="The people behind"
        accent="the vehicles."
        description="A diverse team of talented (and extremely fun) individuals working together to build amazing and sometimes functional robots."
      >
        <dl className="flex gap-10 sm:gap-14">
          {[
            { value: totalMembers, label: "Members" },
            { value: resolvedTeamCategories.length, label: "Groups" },
            { value: subsystemCount, label: "Subsystems" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-slate-400">{stat.label}</dt>
              <dd data-count={stat.value} className="tm-count text-4xl font-semibold tabular-nums tracking-[-0.04em] text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* The group bar only sticks while the crew list is on screen, not over Join or the footer */}
      <div className="relative">
      <ManifestNav groups={groups} onJump={scrollToId} className="mt-10" />

      <section aria-labelledby="team-section-heading" className="mx-auto w-full max-w-7xl px-5 pb-28 pt-14 sm:px-8 md:pt-20">
        <h2 id="team-section-heading" className="sr-only">
          Team members by group
        </h2>

        {resolvedTeamCategories.map((category, idx) => {
          const slug = getCategorySlug(category.title);
          const featuredIndex = featuredIndexFor(category.title, category.members);
          const featured = featuredIndex >= 0 ? category.members[featuredIndex] : null;
          const rest = category.members.map((m, i) => ({ m, i })).filter(({ i }) => i !== featuredIndex);
          const open = (member: Member, i: number) => (trigger: HTMLElement) =>
            openDossier({ member, code: crewCode(idx, i), group: getShortTitle(category.title) }, trigger);

          return (
            <div key={category.title} id={slug} className={cn("scroll-mt-[170px]", idx > 0 && "mt-24 md:mt-32")}>
              <header className="cm-head mb-8 md:mb-10">
                <div className="flex items-end gap-5 md:gap-8">
                  <span className="block overflow-hidden font-mono text-5xl font-light leading-none tabular-nums text-cyan-300/30 md:text-7xl">
                    <span className="cm-num inline-block">{String(idx + 1).padStart(2, "0")}</span>
                  </span>
                  <div className="min-w-0 flex-1 pb-1">
                    <p className="cm-meta mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/60">
                      Sector {String(idx + 1).padStart(2, "0")} //{" "}
                      {category.members.length === 0
                        ? "assembling"
                        : `${category.members.length} ${category.members.length === 1 ? "member" : "members"}`}
                    </p>
                    <h3 className="cm-title text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-5xl">{category.title}</h3>
                  </div>
                </div>
                <div className="cm-rule mt-6 h-px w-full bg-gradient-to-r from-cyan-300/50 via-white/10 to-transparent" />
              </header>

              {category.members.length === 0 ? (
                // A group still forming: empty seats waiting for their crew, and a way to claim one
                <div className="cm-soon grid items-center gap-8 md:grid-cols-12 md:gap-12">
                  <div className="grid grid-cols-3 gap-3 sm:gap-5 md:col-span-7">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="relative flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-[1.25rem] border border-dashed border-cyan-300/20 bg-cyan-300/[0.02]"
                      >
                        <span className="absolute left-2.5 top-2.5 rounded-md border border-white/10 bg-[#020617]/85 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-cyan-100/60">
                          {crewCode(idx, n - 1)}
                        </span>
                        <span aria-hidden="true" className="relative flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12">
                          <span className="absolute inset-0 rounded-full border border-cyan-300/25 motion-safe:animate-ping [animation-duration:3s]" style={{ animationDelay: `${n * 0.6}s` }} />
                          <span className="absolute inset-0 rounded-full border border-cyan-300/30" />
                          <span className="text-lg font-light text-cyan-200/80">+</span>
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500 sm:text-[10px]">Open seat</span>
                      </div>
                    ))}
                  </div>
                  <div className="md:col-span-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">Signal pending · now forming</span>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">These seats are still empty.</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      We're putting this group together. If you'd like to explore new ideas for underwater robotics, there's room for you.
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollToId("join")}
                      className="mt-6 inline-flex items-center gap-2 text-sm text-white underline decoration-cyan-300/40 underline-offset-4 transition-colors hover:text-cyan-200 hover:decoration-cyan-200"
                    >
                      Join the crew <span aria-hidden="true">↓</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {featured && <CrewSpotlight member={featured} code={crewCode(idx, featuredIndex)} onOpen={open(featured, featuredIndex)} />}
                  {rest.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
                      {rest.map(({ m, i }) => (
                        <CrewCard key={m.name} member={m} code={crewCode(idx, i)} group={getShortTitle(category.title)} onOpen={open(m, i)} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>
      </div>
      <JoinCrew onPick={(slug) => scrollToId(slug)} />
      <CrewDossier entry={dossier} onClose={closeDossier} />
      <Footer />
    </div>
  );
}
