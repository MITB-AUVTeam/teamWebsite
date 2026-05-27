

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { TeamSectionBlock } from "@/components/ui/team-section-block-shadcnui";
import { Navbar } from "@/components/Navbar";
import { ContactUs } from "@/pages/ContactUs";
import { Home } from "@/pages/Home";
import { GalleryPage } from "@/pages/GalleryPage";
import { AboutPage } from "@/pages/AboutPage";
import { VehiclesPage } from "@/pages/VehiclesPage";
import { MediaPage } from "@/pages/MediaPage";
import { SponsorsPage } from "@/pages/SponsorsPage";
import ScrollToTop from "@/components/ScrollToTop";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = "AUV-MITB";
  }, []);

  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-black text-slate-50 selection:bg-blue-500/30">
      <ScrollToTop watch={location.pathname} />
      <Navbar />
      <main className={isHome ? "" : "pt-24"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/team" element={<TeamSectionBlock />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
        </Routes>
      </main>
    </div>
  );
}
