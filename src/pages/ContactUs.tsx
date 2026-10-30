import { useEffect, useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Github, Instagram, Linkedin, Mail, MapPin, Youtube } from "lucide-react";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillButton } from "@/components/ui/pill-button";
import { useLenis } from "@/components/ui/smooth-scroll";
import { ContactForm } from "@/components/contact/contact-form";
import { EmbedFacade } from "@/components/ui/embed-facade";
import { SocialLinks, type SocialLink } from "@/components/contact/social-links";

const workshopLocationUrl = "https://maps.app.goo.gl/66QbM4rkSU4i7S5o9";

const socialLinks: SocialLink[] = [
  {
    title: "YouTube",
    href: "https://www.youtube.com/@TeamAUVMIT-B",
    subtitle: "Video Content",
    description: "Watch our latest updates and tutorials.",
    icon: Youtube,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/auv_mitb?igsh=azA2d2N3eGlqdDlh",
    subtitle: "Visual Updates",
    description: "Follow our journey and behind the scenes.",
    icon: Instagram,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/team-auv-mit-b-75129b371/",
    subtitle: "Professional Network",
    description: "Connect with our team professionally.",
    icon: Linkedin,
  },
  {
    title: "Gmail",
    href: "mailto:auv.mitblr@manipal.edu",
    subtitle: "Direct Contact",
    description: "Reach out to us directly via email.",
    icon: Mail,
  },
  {
    title: "GitHub",
    href: "https://github.com/MITB-AUVTeam",
    subtitle: "Open Source",
    description: "Check out our open source projects.",
    icon: Github,
  },
];

const linkClass = "transition-colors duration-300 hover:text-tone";

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="dr-row relative grid gap-2 py-6 sm:grid-cols-[120px_1fr] sm:gap-6">
      <span aria-hidden="true" className="dr-rule absolute inset-x-0 top-0 h-px origin-left bg-white/10" />
      <dt className="font-mono text-xs text-slate-400 sm:pt-1.5">{label}</dt>
      <dd className="space-y-1.5 text-base text-white md:text-lg">{children}</dd>
    </div>
  );
}

export function ContactUs() {
  const lenis = useLenis();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Contact details: hairlines draw across, then each row slides in after its line.
      const details = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: ".ct-details", start: "top 80%", once: true },
      });
      details
        .from(".ct-details h2", { y: 40, autoAlpha: 0, duration: 1.2 })
        .from(".dr-rule", { scaleX: 0, stagger: 0.15, duration: 1.4, ease: "power3.inOut" }, 0.1)
        .from(".dr-row > :not(.dr-rule)", { x: -40, autoAlpha: 0, stagger: 0.08, duration: 1.1 }, 0.3);

      // Form card rises and un-blurs.
      gsap.from(".ct-card", {
        y: 80,
        autoAlpha: 0,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct-card", start: "top 85%", once: true },
        clearProps: "filter",
      });

      // Map: irises open, then breathes in scale while scrolling through.
      gsap.from(".ct-map", {
        clipPath: "inset(30% 30% 30% 30% round 48px)",
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct-map", start: "top 80%", once: true },
      });
      gsap.fromTo(
        ".ct-map-inner",
        { scale: 1.25 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: ".ct-map", start: "top bottom", end: "bottom center", scrub: 0.8 } },
      );
      gsap.from(".ct-map-chip", {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        delay: 0.6,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct-map", start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  // Scroll to the form when arriving from a "#contact-form" link (e.g. the Sponsors page)
  useEffect(() => {
    if (window.location.hash !== "#contact-form") return;
    const element = document.getElementById("contact-form");
    if (!element) return;
    const timer = setTimeout(() => {
      if (lenis) lenis.scrollTo(element, { offset: -120 });
      else element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => clearTimeout(timer);
  }, [lenis]);

  return (
    <div ref={root} className="flex min-h-screen flex-col">
      <PageHeader
        eyebrow="Contact"
        title="Let's"
        accent="talk."
        description="We're excited to connect with you! If you're considering supporting our work through sponsorship or would like us to host an outreach session at your school, organization, or any other space, we'd be delighted to collaborate."
      />

      <section className="mx-auto w-full max-w-7xl px-5 pt-16 sm:px-8 md:pt-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="ct-details lg:col-span-5">
            <h2 className="mb-8 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">Reach us directly</h2>
            <dl className="border-b border-white/10">
              <DetailRow label="Phone">
                <p>
                  <a href="tel:+918210876521" className={linkClass}>+91 82108 76521</a>
                  <span className="ml-2 text-sm text-slate-400">Animesh Mishra</span>
                </p>
                <p>
                  <a href="tel:+919113095603" className={linkClass}>+91 91130 95603</a>
                  <span className="ml-2 text-sm text-slate-400">Siddharth P S</span>
                </p>
              </DetailRow>
              <DetailRow label="Email">
                <p><a href="mailto:auv.mitblr@manipal.edu" className={`${linkClass} break-all`}>auv.mitblr@manipal.edu</a></p>
                <p><a href="mailto:auv.mitb@gmail.com" className={`${linkClass} break-all`}>auv.mitb@gmail.com</a></p>
              </DetailRow>
              <DetailRow label="Workshop">
                <a href={workshopLocationUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} block text-base leading-relaxed`}>
                  Team AUV Workshop<br />
                  Room 209, 210 AB-4<br />
                  Manipal Institute of Technology Bengaluru,<br />
                  Manipal Academy of Higher Education,<br />
                  Bengaluru, Karnataka, India
                </a>
              </DetailRow>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div id="contact-form" className="ct-card scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:p-10">
              <h2 className="mb-2 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">Send a message</h2>
              <p className="mb-8 text-sm text-slate-400">Sponsorship, outreach sessions, collaborations or questions — it all lands with the team.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 w-full border-y border-white/10 bg-white/[0.02] md:mt-32">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <SectionHeading eyebrow="Elsewhere" title="Follow the" accent="journey." />
          <SocialLinks links={socialLinks} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeading
          eyebrow="Visit"
          title="Find the"
          accent="workshop."
          action={
            <PillButton href={workshopLocationUrl} variant="ghost">
              Open in Maps
            </PillButton>
          }
        />
        <div className="ct-map relative h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] md:h-[520px]">
          <div className="ct-map-inner absolute inset-0">
            <EmbedFacade
              label="Load the interactive map of the workshop location"
              preview={
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                  <span aria-hidden="true" className="holo-grid absolute inset-0" />
                  <span aria-hidden="true" className="relative flex h-28 w-28 items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-tone/20" />
                    <span className="absolute inset-4 rounded-full border border-dashed border-tone/25" />
                    <span className="absolute inset-8 rounded-full border border-tone/50 motion-safe:animate-ping" />
                    <MapPin className="relative h-8 w-8 text-tone drop-shadow-[0_0_12px_var(--t1)]" />
                  </span>
                  <span className="relative font-mono text-xs uppercase tracking-[0.25em] text-slate-400">13.1251° N · 77.5906° E</span>
                  <span className="relative rounded-full border border-white/15 bg-[#020617]/80 px-5 py-2.5 text-sm text-white transition-colors group-hover:border-tone/50">
                    Load interactive map
                  </span>
                </span>
              }
              render={() => (
                <iframe
                  title="Team AUV workshop location"
                  src="https://www.google.com/maps?q=13.1251035,77.5906235&z=19&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(40%) contrast(95%) brightness(90%)" }}
                  allowFullScreen={false}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            />
          </div>
          <div className="ct-map-chip pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#020617]/85 px-4 py-2 font-mono text-xs text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-tone" />
            Room 209, 210 AB-4 · MIT Bengaluru
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
