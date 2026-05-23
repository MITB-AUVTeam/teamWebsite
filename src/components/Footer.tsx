import { Github, Instagram, Linkedin, Mail, Youtube, MapPin } from "lucide-react";
import logoImg from "../assets/hero_parallax/b0b02181d3064ccfa838a5b7d18e44696ad67457.png";

export function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-slate-800/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="flex flex-col items-start">
            <img 
              src={logoImg} 
              alt="AUV Logo" 
              className="h-[40px] w-auto object-contain mb-4" 
            />
            <p className="text-slate-400 mb-6 text-sm leading-relaxed max-w-xs">
              Pioneering autonomous underwater vehicles for exploration and research.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/MITB-AUVTeam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors border border-slate-800">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/team-auv-mit-b/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors border border-slate-800">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/auv_mitb?igsh=azA2d2N3eGlqdDlh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors border border-slate-800">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@TeamAUVMIT-B" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors border border-slate-800">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="mailto:auv.mitblr@manipal.edu" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors border border-slate-800">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:auv.mitblr@manipal.edu" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-500" />
                  auv.mitblr@manipal.edu
                </a>
              </li>
              <li>
                <a href="tel:+918210876521" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-3 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  +91 82108 76521
                </a>
              </li>
              <li>
                <a href="tel:+919113095603" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-3 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  +91 91130 95603
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Location</h4>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-slate-400 text-sm leading-relaxed">
                Manipal Institute of Technology,<br />
                Manipal Academy of Higher Education,<br />
                Bengaluru, Karnataka
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-8 text-center">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} AUV Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
