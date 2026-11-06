import { motion, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import logoAnsys from "../assets/Background - less sponsors logos/Ansys.webp";
import diveStation from "@/assets/sunlit-underwater-station.webp";
import poolSide from "@/assets/Gallery/gallery_pool_side.jpg";
import robosubTeam from "@/assets/Gallery/robosub_team_village.jpg";
import logoDassault from "../assets/Background - less sponsors logos/Dassault Systemes.webp";
import logoMIT from "../assets/Background - less sponsors logos/MIT.webp";
import logoVicharak from "../assets/Background - less sponsors logos/Vicharak.webp";
import logoWisdom from "../assets/Background - less sponsors logos/Wisdom Technologies.webp";
import mechanicalBg from "@/assets/homepage_bento_background/mechanical.webp";
import electricalBg from "@/assets/homepage_bento_background/electrical.webp";
import managementBg from "@/assets/homepage_bento_background/management.webp";
import softwareBg from "@/assets/homepage_bento_background/software.webp";
import { Footer } from "@/components/Footer";
import { LogoSlider } from "@/components/ui/logo-slider";
import { TeamVoices } from "@/components/ui/stagger-testimonials";
import { PhotoGallery } from "@/components/ui/gallery";
import { CountUp } from "@/components/ui/count-up";
import { SectionHeading, Eyebrow } from "@/components/ui/section-heading";
import { SplitHeading } from "@/components/ui/split-heading";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { VelocityMarquee } from "@/components/ui/velocity-marquee";
import { ExpandingMedia } from "@/components/ui/expanding-media";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";
import { ImageTrail } from "@/components/ui/image-trail";
import { AbyssHero } from "@/components/home/abyss-hero";
import { TelemetryStrip } from "@/components/home/telemetry-strip";

const galleryModules = import.meta.glob<{ default: string }>("../assets/Gallery/IMG*.webp", { eager: true });
const trailImages = Object.values(galleryModules).map((m) => m.default).slice(0, 16);

const subsystems = [
  { name: "Mechanical", description: "Structural integrity and fluid dynamics.", href: "/vehicles#mechanical", image: mechanicalBg },
  { name: "Electrical", description: "Power systems and embedded electronics.", href: "/vehicles#electrical", image: electricalBg },
  { name: "Software", description: "Autonomous navigation and computer vision.", href: "/vehicles#software", image: softwareBg },
  { name: "Management & Design", description: "Sponsorships, branding, media production, and outreach.", href: "/vehicles#design", image: managementBg },
];

const sponsors = [
  { logo: logoAnsys, alt: "Ansys", href: "https://www.ansys.com/en-in" },
  { logo: logoDassault, alt: "Dassault Systemes", href: "https://www.solidworks.com/product/students" },
  { logo: logoMIT, alt: "MIT", href: "https://www.manipal.edu/mu/campuses/mahe-bengaluru/academics/institution-list/mit-blr.html" },
  { logo: logoVicharak, alt: "Vicharak", href: "https://vicharak.in/" },
  { logo: logoWisdom, alt: "Wisdom Technologies", href: "https://in.linkedin.com/company/wisdom-technologies-pvt-ltd" },
];

const stats = [
  { value: <CountUp to={2} />, label: "Vehicles built" },
  { value: <CountUp to={20} suffix="+" />, label: "Team members" },
  { value: <CountUp to={1} />, label: "Award won", note: "First prize, IEEE RAS competition" },
  { value: <CountUp to={2025} from={1990} />, label: "Established" },
];

const section = "mx-auto w-full max-w-7xl px-5 sm:px-8";

function SubsystemCard({ item, index }: { item: (typeof subsystems)[number]; index: number }) {
  // The card leans toward the pointer on a spring, so it has weight instead of snapping
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className="shrink-0 snap-start [perspective:1200px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
    <motion.div style={{ rotateX: rx, rotateY: ry }} className="will-change-transform">
    <Link
      to={item.href}
      data-cursor="Explore"
      className="hud-lock group relative flex h-[62vh] min-h-[420px] w-[78vw] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 md:h-[68vh] md:w-[40vw] lg:w-[32vw]"
    >
      <img
        src={item.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
      <span className="absolute left-6 top-6 text-sm tabular-nums text-white/60">0{index + 1}</span>
      <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition duration-300 group-hover:rotate-45 group-hover:border-tone group-hover:bg-tone group-hover:text-slate-950">
        <ArrowUpRight className="h-5 w-5" />
      </span>
      <div className="relative p-6 md:p-8">
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{item.name}</h3>
        <p className="mt-3 max-w-xs text-slate-300">{item.description}</p>
      </div>
    </Link>
    </motion.div>
    </motion.div>
  );
}

export function Home() {
  return (
    <div className="flex w-full flex-col overflow-x-clip text-white">
      <AbyssHero />

      {/* A window onto the pool test widens until it swallows the screen */}
      <ExpandingMedia
        src={diveStation}
        alt="An AUV resting on the sunlit seabed"
        left="Dive"
        right="deeper"
        kicker={
          <div className={`${section} flex items-end justify-between pb-8 text-sm text-slate-400`}>
            <span>Team AUV · MIT Bengaluru</span>
            <span className="flex items-center gap-3">
              Scroll to dive
              <span className="relative block h-8 w-px overflow-hidden bg-white/15">
                <span className="scroll-drop absolute left-0 top-0 h-3 w-px bg-tone" />
              </span>
            </span>
          </div>
        }
      >
        <div className="max-w-5xl text-center">
          <Eyebrow className="mb-6 justify-center">Autonomous underwater vehicles</Eyebrow>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-semibold leading-[0.95] tracking-[-0.045em] text-white">
            Engineering autonomy <span className="font-serif italic font-normal text-water">beneath the surface.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-slate-300">
            We design and build autonomous underwater vehicles, hull to code, as a student team at MIT Bengaluru.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PillButton to="/vehicles">Explore vehicles</PillButton>
            <PillButton to="/team" variant="ghost">Meet the team</PillButton>
          </div>
        </div>
      </ExpandingMedia>

      {/* Mission: words surface one by one */}
      <section className={`${section} relative py-28 md:py-44`}>
        <Eyebrow className="mb-10">Who we are</Eyebrow>
        <ScrollTextReveal text="We are a team of passionate engineers and researchers dedicated to developing effective and affordable autonomous underwater vehicles." />

        <div className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p data-gsap="lines" className="text-lg leading-relaxed text-slate-400">
              Our mission is to create robust, intelligent systems capable of performing complex tasks in the harsh underwater environment, from environmental monitoring to underwater inspection.
            </p>
            <div className="mt-10">
              <PillButton to="/about" variant="ghost">Read our full story</PillButton>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div data-gsap="zoom" className="overflow-hidden rounded-3xl">
              <ParallaxImage src={poolSide} alt="The team at the poolside during testing" className="aspect-[16/11] w-full rounded-none" strength={18} />
            </div>
          </div>
        </div>

        <dl data-gsap="batch" className="mt-20 grid grid-cols-2 gap-y-12 md:mt-28 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <dt className="order-2 text-sm text-slate-400">{stat.label}</dt>
              <dd className="order-1 text-6xl md:text-7xl font-semibold tracking-[-0.05em] text-white tabular-nums">{stat.value}</dd>
              {"note" in stat && <dd className="order-3 font-mono text-[11px] uppercase tracking-[0.15em] text-tone/80">{stat.note}</dd>}
            </div>
          ))}
        </dl>

        <TelemetryStrip className="mt-20 md:mt-28" />
      </section>

      <VelocityMarquee items={["Mechanical", "Electrical", "Software", "Design", "Autonomy"]} className="py-6 md:py-10" />

      {/* Subsystems glide sideways while you scroll down. No top margin: the pinned
          section is a full screen tall with its cards centred, which already leaves room. */}
      <HorizontalScroll
        intro={
          <>
            <Eyebrow className="mb-6">Subsystems</Eyebrow>
            <SplitHeading text="Four teams," accent="one machine." className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1]" />
            <p className="mt-6 max-w-sm text-lg text-slate-400">Each sub-team owns a piece of the vehicle and builds it in-house.</p>
          </>
        }
      >
        {subsystems.map((s, i) => (
          <SubsystemCard key={s.name} item={s} index={i} />
        ))}
      </HorizontalScroll>

      {/* Full-bleed photo moment: the team and Deuterium at RoboSub */}
      <section aria-label="RoboSub 2026" className="relative mt-8 md:mt-12">
        <ParallaxImage
          src={robosubTeam}
          alt="The team with Deuterium at the RoboSub 2026 team village"
          className="h-[72vh] min-h-[440px] w-full rounded-none md:h-[92vh]"
          imgClassName="object-[50%_35%]"
          strength={14}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/25 to-[#030712]/70" />
        <div className={`${section} absolute inset-x-0 bottom-0 pb-12 md:pb-20`}>
          <Eyebrow className="mb-5">RoboSub 2026</Eyebrow>
          <p data-gsap="lines" className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl">
            From a campus workshop <span className="font-serif font-normal italic text-water">to the world stage.</span>
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-300">Team village · Irvine, California</p>
        </div>
      </section>

      <section className={`${section} py-28 md:py-40`}>
        <SectionHeading eyebrow="The crew" title="Meet the minds" accent="behind the machine." />
        <TeamVoices />
      </section>

      {/* Gallery: photos surface wherever the cursor drifts */}
      <section className="border-y border-white/[0.06]">
        <ImageTrail images={trailImages} className="flex min-h-[80vh] items-center justify-center px-5 py-28">
          <div className="text-center">
            <Eyebrow className="mb-6 justify-center">Gallery</Eyebrow>
            <SplitHeading
              text="A journey"
              accent="through the depths."
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-[0.95]"
            />
            <p className="mt-8 hidden text-sm text-slate-500 md:block">Move your cursor through the water</p>
            <div className="mt-8 flex justify-center">
              <PillButton to="/gallery" variant="ghost">View all photos</PillButton>
            </div>
          </div>
        </ImageTrail>
        <div className="pb-24 md:pb-32">
          <PhotoGallery />
        </div>
      </section>

      <section className={`${section} pt-28 md:pt-40`}>
        <SectionHeading
          eyebrow="Thank you"
          title="Backed by"
          accent="our sponsors."
          action={<PillButton to="/sponsors" variant="ghost">Become a sponsor</PillButton>}
        />
      </section>
      <div className="pb-20 md:pb-28">
        <LogoSlider items={sponsors} speed={35} />
      </div>

      <Footer />
    </div>
  );
}
