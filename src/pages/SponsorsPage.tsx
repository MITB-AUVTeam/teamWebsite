import { useRef } from "react";
import { Building2, Code2, Cpu, FlaskConical, GraduationCap, Users, Wrench } from "lucide-react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { PillButton } from "@/components/ui/pill-button";
import { LogoWall } from "@/components/sponsors/logo-wall";
import { SponsorRow } from "@/components/sponsors/sponsor-row";
import { TierCard, type PartnershipTier } from "@/components/sponsors/tier-card";
import { WhySponsor, type SponsorFact, type SponsorReason } from "@/components/sponsors/why-sponsor";
import ansysLogo from "../assets/Background - less sponsors logos/Ansys.png";
import dassaultLogo from "../assets/Background - less sponsors logos/Dassault Systemes.png";
import vicharakLogo from "../assets/Background - less sponsors logos/Vicharak.png";
import wisdomLogo from "../assets/Background - less sponsors logos/Wisdom Technologies.png";
import mitLogo from "../assets/Background - less sponsors logos/MIT.png";

// ---------------------------------------------------------------------------
// PARTNERSHIP TIERS: edit freely. These benefits are a starting draft; the team
// should confirm each one (and add/remove tiers) before pitching. Keep this
// free of prices; amounts are discussed on a call / in the sponsorship deck.
// ---------------------------------------------------------------------------
const tiers: PartnershipTier[] = [
  {
    name: "Surface",
    depth: "0–200 m",
    tagline: "For companies supporting the team with components, tools or services in kind.",
    benefits: [
      "Logo on the Sponsors page of this website",
      "Thank-you shout-out on our social channels",
      "Mention in our technical report acknowledgements",
    ],
  },
  {
    name: "Midwater",
    depth: "200–1000 m",
    tagline: "For partners backing a subsystem, from electronics to fabrication.",
    includes: "Surface",
    benefits: [
      "Logo on the team jerseys",
      "Dedicated sponsor spotlight post on social media",
      "Progress updates on the subsystem you support",
    ],
  },
  {
    name: "Abyssal",
    depth: "1000–6000 m",
    tagline: "For partners invested in the full vehicle and our competition season.",
    includes: "Midwater",
    featured: true,
    benefits: [
      "Logo on the vehicle hull",
      "Featured logo placement on the Home page",
      "A workshop or tech talk with the team on campus",
    ],
  },
  {
    name: "Hadal",
    depth: "6000 m +",
    tagline: "Our principal partners, with the closest working relationship.",
    includes: "Abyssal",
    benefits: [
      "Primary logo placement on vehicle, jerseys and website",
      "Recruiting access: résumé book and hiring sessions",
      "Co-hosted hackathon or event with the team",
    ],
  },
];

// Facts here must stay in sync with the Home and About pages.
const facts: SponsorFact[] = [
  { value: "2", label: "Vehicles built" },
  { value: "20+", label: "Team members" },
  { value: "2025", label: "Established" },
  { value: "RoboSub", label: "2026 · California" },
];

const reasons: SponsorReason[] = [
  {
    icon: Users,
    title: "Meet engineers early",
    body: "Students from mechanical, electrical and software domains design and build our vehicles completely in-house.",
  },
  {
    icon: FlaskConical,
    title: "Your product, proven underwater",
    body: "Partner hardware and software runs on the vehicle itself, from simulation and CAD to the main microcontroller and pressure hull.",
  },
  {
    icon: GraduationCap,
    title: "On the international stage",
    body: "We registered for and competed at the international RoboSub Competition in California in July 2026, and co-host events like our hackathon with Vicharak.",
  },
];

// Sponsorship deck: there is no PDF yet, so the request goes out by email.
// When a deck exists, drop it in /public (e.g. public/AUV-MITB-sponsorship-deck.pdf)
// and change DECK_HREF to "/AUV-MITB-sponsorship-deck.pdf" (add `download` on the button).
const DECK_HREF = "mailto:auv.mitblr@manipal.edu?subject=Sponsorship%20deck%20request";
const CONTACT_TO = "/contact#contact-form";

const sponsors = [
  {
    name: "Manipal Institute of Technology, Bengaluru",
    logo: mitLogo,
    role: "Institutional partner",
    description: "Serves as our primary institutional pillar, providing a state-of-the-art dedicated workshop space equipped with necessary electronic instruments like oscilloscopes, dual-channel power supplies, cabling along with appropriate mechanical tools and equipment. MIT Bengaluru also provides crucial direct funding for critical system components, combined with tireless administrative support, faculty mentorship if and when needed, and active support in bridging connections with industry partners to facilitate seamless development.",
    logoClass: "scale-105 md:scale-115 lg:scale-120",
    // The crest fills its whole canvas, so in the short wall tiles it must not be scaled up
    wallClass: "scale-95",
    href: "https://www.manipal.edu/mu/campuses/mahe-bengaluru/academics/institution-list/mit-blr.html"
  },
  {
    name: "Ansys",
    logo: ansysLogo,
    lightPlate: true,
    role: "Simulation software",
    description: "Empowers our engineering analysis by providing advanced Ansys simulation software. This enables our team to rigorously model, test, and optimize fluid dynamics, mechanical stresses, and structural integrity under extreme deep-water pressures before physical deployment.",
    logoClass: "scale-125 md:scale-135 lg:scale-145",
    href: "https://www.ansys.com/en-in"
  },
  {
    name: "Dassault Systèmes",
    logo: dassaultLogo,
    lightPlate: true,
    role: "CAD software",
    description: "Supports our mechanical modeling and prototyping processes by providing SolidWorks CAD software. This serves as the foundation for our entire 3D engineering lifecycle, enabling complex mechanical design, assembly integration, and precise models for custom 3D-printed vehicle components.",
    logoClass: "scale-115 md:scale-125 lg:scale-130",
    href: "https://www.solidworks.com/product/students"
  },
  {
    name: "Vicharak",
    logo: vicharakLogo,
    role: "Compute hardware",
    description: "Accelerates our computational hardware by providing us with Shrike Lite microcontroller boards featuring an RP2040 MCU coupled with an onboard FPGA. We utilize these high-performance boards as the master/main microcontroller unit (MCU) driving autonomous navigation and real-time sensor processing inside our AUV.",
    logoClass: "scale-135 md:scale-150 lg:scale-160",
    href: "https://vicharak.in/"
  },
  {
    name: "Wisdom Technologies",
    logo: wisdomLogo,
    role: "Hull fabrication",
    description: "Ensures the physical integrity and sealing of our vehicle by fabricating our custom AUV aluminum pressure hull. Their high-precision manufacturing provides the secure, watertight, and robust enclosure needed to protect our onboard electronics and computing hardware.",
    logoClass: "scale-95 md:scale-100",
    href: "https://in.linkedin.com/company/wisdom-technologies-pvt-ltd"
  }
];

// The kinds of support our current partners give, summarised from the descriptions above.
const supportKinds = [
  { icon: Building2, title: "Space & mentorship", body: "A dedicated workshop with instruments and tools, direct funding for critical components, and faculty mentorship.", from: "MIT Bengaluru" },
  { icon: Code2, title: "Engineering software", body: "Simulation and CAD tools to model fluid dynamics and structural loads, and to design every part before it is built.", from: "Ansys · Dassault Systèmes" },
  { icon: Cpu, title: "Compute hardware", body: "Microcontroller boards that run autonomous navigation and real-time sensor processing on the vehicle.", from: "Vicharak" },
  { icon: Wrench, title: "Fabrication", body: "Precision manufacturing of the watertight aluminium pressure hull that protects our electronics.", from: "Wisdom Technologies" },
];

export function SponsorsPage() {
  const cta = useRef<HTMLElement>(null);

  // Signature moment: the CTA panel irises open, its heading rises letter by letter
  // and sonar rings pulse out from behind it.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const split = SplitText.create(".cta-title", { type: "chars,words", mask: "words" });
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: cta.current, start: "top 75%", once: true },
      });
      tl.from(".cta-panel", { clipPath: "inset(20% 20% 20% 20% round 48px)", duration: 1.6 })
        .from(split.chars, { yPercent: 120, rotate: 12, stagger: 0.025, duration: 1.2 }, 0.3)
        .from(".cta-copy > *", { y: 30, autoAlpha: 0, stagger: 0.12, duration: 1 }, 0.7);
      gsap.fromTo(
        ".cta-ring",
        { scale: 0.2, autoAlpha: 0.6 },
        { scale: 2.4, autoAlpha: 0, duration: 4.5, ease: "power2.out", stagger: { each: 1.5, repeat: -1 } },
      );
      return () => split.revert();
    },
    { scope: cta },
  );

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        eyebrow="Sponsors"
        title="The partners behind"
        accent="every dive."
        description="We are deeply grateful for the generous support of our sponsors. Their contributions empower our team to push the boundaries of marine robotics and autonomous underwater vehicles."
      />

      <section className="mx-auto w-full max-w-7xl px-5 pt-16 sm:px-8 md:pt-24">
        <LogoWall items={sponsors} />
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeading eyebrow="Our partners" title="What each partner" accent="makes possible." />
        <div className="border-b border-white/10">
          {sponsors.map((s, i) => (
            <SponsorRow key={s.name} index={i} {...s} />
          ))}
        </div>
      </section>

      <section className="w-full border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <SectionHeading
            eyebrow="Ways to support"
            title="How partners"
            accent="help us build."
            description="Support takes many forms. These are the ways our current partners back the team."
          />
          <div data-gsap="batch" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supportKinds.map(({ icon: Icon, title, body, from }) => (
              <SpotlightCard key={title} className="h-full">
                <div className="flex h-full flex-col p-7">
                  <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10">
                    <Icon className="h-5 w-5 text-tone" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold tracking-[-0.02em] text-white">{title}</h3>
                  <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-400">{body}</p>
                  <p className="font-mono text-xs text-slate-400">{from}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <WhySponsor facts={facts} reasons={reasons} />

      <section className="w-full border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <SectionHeading
            eyebrow="Partnership tiers"
            title="Choose how deep"
            accent="you dive in."
            description="Every partnership is shaped together. These tiers are a starting point; tell us what matters to you and we'll build around it."
          />
          <div data-gsap="batch" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {tiers.map((t, i) => (
              <TierCard key={t.name} index={i} total={tiers.length} to={CONTACT_TO} {...t} />
            ))}
          </div>
        </div>
      </section>

      <section ref={cta} className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="cta-panel relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center sm:px-12 md:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <span key={i} className="cta-ring absolute h-[420px] w-[420px] rounded-full border border-tone/30 opacity-0" />
            ))}
          </div>
          <h2 className="cta-title relative mx-auto max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
            Become a <span className="font-serif italic font-normal text-tone-soft">sponsor.</span>
          </h2>
          <div className="cta-copy relative">
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            Join us in shaping the future of underwater technology. Partnering with our team provides visibility among top engineering talent and demonstrates your commitment to innovation.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PillButton href={DECK_HREF}>Request sponsorship deck</PillButton>
            <PillButton to={CONTACT_TO} variant="ghost">
              Contact us
            </PillButton>
          </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
