import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { StaggeredGrid, BentoItem } from "@/components/ui/staggered-grid";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { 
  Github, 
  Instagram, 
  Linkedin, 
  Mail, 
  Youtube, 
  MapPin, 
  Phone, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import youtubeImg from "../assets/contacts/youtube.png";
import instagramImg from "../assets/contacts/instagram.png";
import linkedinImg from "../assets/contacts/linkedin.png";
import gmailImg from "../assets/contacts/gmail.png";
import githubImg from "../assets/contacts/github.png";
import { Footer } from "@/components/Footer";

const workshopLocationUrl = "https://maps.app.goo.gl/66QbM4rkSU4i7S5o9";

export function ContactUs() {
  const images = Array.from({ length: 20 }, (_, i) => `https://picsum.photos/seed/contact${i}/400/400`);

  // State management for form inputs and submission states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Smooth scroll to form if hash is present
  useEffect(() => {
    if (window.location.hash === "#contact-form") {
      const element = document.getElementById("contact-form");
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const bentoItems: BentoItem[] = [
    {
      id: 1,
      title: "YouTube",
      href: "https://www.youtube.com/@TeamAUVMIT-B",
      subtitle: "Video Content",
      description: "Watch our latest updates and tutorials.",
      icon: <Youtube className="w-4 h-4" />,
      image: youtubeImg
    },
    {
      id: 2,
      title: "Instagram",
      href: "https://www.instagram.com/auv_mitb?igsh=azA2d2N3eGlqdDlh",
      subtitle: "Visual Updates",
      description: "Follow our journey and behind the scenes.",
      icon: <Instagram className="w-4 h-4" />,
      image: instagramImg
    },
    {
      id: 3,
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/team-auv-mit-b-75129b371/",
      subtitle: "Professional Network",
      description: "Connect with our team professionally.",
      icon: <Linkedin className="w-4 h-4" />,
      image: linkedinImg
    },
    {
      id: 4,
      title: "Gmail",
      href: "mailto:auv.mitblr@manipal.edu",
      subtitle: "Direct Contact",
      description: "Reach out to us directly via email.",
      icon: <Mail className="w-4 h-4" />,
      image: gmailImg
    },
    {
      id: 5,
      title: "GitHub",
      href: "https://github.com/MITB-AUVTeam",
      subtitle: "Open Source",
      description: "Check out our open source projects.",
      icon: <Github className="w-4 h-4" />,
      image: githubImg
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Fetch credentials from environmental configuration securely
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_9c5mufs";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_7si8nb1";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "WaWWR9SKl2a8lUbdO";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: name,
          from_name: name,
          email: email,
          reply_to: email,
          message: message,
        },
        publicKey
      );
      setSubmitStatus("success");
      // Clear fields upon successful dispatch
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("EmailJS dispatch failure:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-transparent pb-0">
        <StaggeredGrid
          images={images}
          bentoItems={bentoItems}
          centerText="CONTACT"
          showFooter={false}
        />

        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Get in <span className="text-blue-500">Touch</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                We're excited to connect with you! If you're considering supporting our work through sponsorship or would like us to host an outreach session at your school, organization, or any other space, we'd be delighted to collaborate.
              </p>

              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Call Us</p>
                  </div>
                  <div className="pl-16 mt-2 space-y-1 text-slate-200 text-base md:text-lg">
                    <p>
                      <a href="tel:+918210876521" className="hover:text-blue-400 transition-colors">+91 82108 76521</a>
                      <span className="ml-2 text-sm text-slate-500">Animesh Mishra</span>
                    </p>
                    <p>
                      <a href="tel:+919113095603" className="hover:text-blue-400 transition-colors">+91 91130 95603</a>
                      <span className="ml-2 text-sm text-slate-500">Siddharth P S</span>
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Email Us</p>
                  </div>
                  <div className="pl-16 mt-2 space-y-1 text-slate-200 text-base md:text-lg">
                    <p>
                      <a href="mailto:auv.mitblr@manipal.edu" className="hover:text-blue-400 transition-colors">auv.mitblr@manipal.edu</a>
                    </p>
                    <p>
                      <a href="mailto:auv.mitb@gmail.com" className="hover:text-blue-400 transition-colors">auv.mitb@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Visit Us</p>
                  </div>
                  <div className="pl-16 mt-2">
                    <a
                      href={workshopLocationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 text-base md:text-lg hover:text-blue-400 transition-colors"
                    >
                      Team AUV Workshop <br/>
                      Room 209, 210 AB-4<br/>
                      Manipal Institute of Technology Bengaluru,<br />
                      Manipal Academy of Higher Education,<br />
                      Bengaluru, Karnataka, India
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div id="contact-form" className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
              
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-300">Name</label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Animesh Mishra"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-300">Your Email</label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="animesh@company.com"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-300">Message</label>
                  <textarea
                    rows={4}
                    required
                    disabled={isSubmitting}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your request..."
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none disabled:opacity-50"
                  />
                </div>

                {/* Submitting Status Banners */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">Message sent successfully! We will get back to you shortly.</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">Failed to send message. Please try again or email us directly.</p>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      Sending Message...
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="w-full h-[400px] md:h-[500px] relative border-t border-slate-800/50 mt-12">
          <iframe
            src="https://www.google.com/maps?q=13.1251035,77.5906235&z=19&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%) opacity(80%)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <a
            href={workshopLocationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-slate-950/85 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur hover:border-blue-400/50 hover:text-blue-300 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Open pinned location
          </a>
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(2,6,23,1)]"></div>
        </div>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
