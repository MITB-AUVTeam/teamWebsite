import { useRef } from "react";
import { Footer } from "@/components/Footer";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AUV_GROUP_PIC from "@/assets/Group_photo/AUV_GROUP_PIC.webp";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { MilestoneTimeline, type MilestoneYear } from "@/components/about/milestone-timeline";
import { MissionStatements, QuestionsBand } from "@/components/about/mission-statements";

const timelineData: MilestoneYear[] = [
  {
    year: "2025",
    events: [
      {
        date: "JANUARY 2025",
        title: "Team Formation",
        description: "Founded Team AUV MIT-B with passionate students across mechanical, electrical, and software domains."
      },
      {
        date: "FEBRUARY 2025",
        title: "First Prototype Design",
        description: "Completed initial CAD modeling and acoustic simulation for our baseline underwater vehicle."
      },
      {
        date: "APRIL 2025",
        title: "Electronics & Sensor Integration",
        description: "Assembled power distribution boards, thrusters, and hydrophone array test rigs."
      },
      {
        date: "AUGUST 2025",
        title: "In-Pool Autonomous Testing",
        description: "Successfully executed first pool trials demonstrating autonomous depth hold and buoy detection."
      }
    ]
  },
  {
    year: "2026",
    events: [
      {
        date: "JANUARY 2026",
        title: "Hull Fabrication & Assembly",
        description: "Manufactured the primary waterproof carbon fiber/acrylic hull for our competition AUV."
      },
      {
        date: "MARCH 2026",
        title: "Main AUV Hardware Testing",
        description: "Integrated the power distribution boards, sensors, and computer systems for full-system dry tests."
      },
      {
        date: "APRIL 1, 2026",
        title: "Robosub Registration",
        description: "Officially registered for the international RoboSub Competition in California."
      },
      {
        date: "JUNE 2026",
        title: "AUV Fully Developed",
        description: "Finalized autonomous navigation algorithms, object detection, and path planning pipelines."
      },
      {
        date: "JULY 11 - 17, 2026",
        title: "RoboSub Competition",
        description: "Competed at the international RoboSub Arena, demonstrating autonomous tasks underwater."
      }
    ]
  }
];

export function AboutPage() {
  const photo = useRef<HTMLDivElement>(null);

  // Signature moment: the group photo opens from a small porthole to the full frame as you scroll.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const trigger = { trigger: photo.current, start: "top 95%", end: "top 25%", scrub: 0.8 };
      gsap.fromTo(
        photo.current,
        { clipPath: "inset(18% 26% 18% 26% round 999px)" },
        { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none", scrollTrigger: trigger },
      );
      gsap.fromTo(".about-photo-inner", { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: trigger });
    },
    { scope: photo },
  );

  return (
    <div className="flex min-h-screen flex-col text-white">
      <PageHeader
        eyebrow="About"
        title="Built by students,"
        accent="tested underwater."
        description="We are Team AUV MIT-B, a student-led team passionate about underwater robotics, innovation, and hands-on engineering."
      />

      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 pt-16 md:pt-24">
        <div ref={photo} className="overflow-hidden rounded-3xl">
          <div className="about-photo-inner">
            <ParallaxImage
              src={AUV_GROUP_PIC}
              alt="AUV MIT Bengaluru Team Group Photo"
              className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/8] rounded-none"
              strength={8}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 data-gsap="lines" className="text-3xl md:text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white">
              Theory, turned into <span className="font-serif italic font-normal text-water">hardware.</span>
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-slate-400 md:col-span-6 md:col-start-7">
            <p data-gsap="lines">
                Bringing together students from mechanical, electrical, and software domains, we collaboratively design and build autonomous underwater vehicles completely in-house.
            </p>
            <p data-gsap="lines">
                Through continuous development, testing, and competition-driven learning, we turn theoretical knowledge into practical engineering experience. By participating in competitions such as RoboSub Competition, we aim to strengthen our technical skills while pushing the boundaries of student-led underwater robotics.
            </p>
          </div>
        </div>
      </section>

      <div className="border-y border-white/10 bg-white/[0.02]">
      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-24 md:py-36">
        <SectionHeading
          eyebrow="Mission & Vision"
          title="Why we"
          accent="dive in."
          description="Pioneering the future of marine robotics through hands-on engineering and continuous iteration."
        />
        <MissionStatements />
      </section>

      <section className="pb-24 md:pb-36" aria-label="Questions we work through">
        <div className="mx-auto mb-8 max-w-7xl px-5 sm:px-8">
          <p data-gsap="lines" className="font-mono text-sm text-slate-400">Questions we work through, every week.</p>
        </div>
        <QuestionsBand />
      </section>
      </div>

      <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-24 md:py-36">
        <SectionHeading
          eyebrow="Timeline"
          title="Our"
          accent="journey."
          description="From a group of enthusiastic students to building state-of-the-art autonomous underwater vehicles, here is a chronological look at our milestones."
        />
        <MilestoneTimeline data={timelineData} />
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;
