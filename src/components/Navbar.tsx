import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Home, Info, Navigation, Users, Image, PlaySquare, Mail, Star } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import logoImg from "../assets/hero_parallax/b0b02181d3064ccfa838a5b7d18e44696ad67457.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "About", url: "/about", icon: Info },
    { name: "Vehicles", url: "/vehicles", icon: Navigation },
    { name: "Team", url: "/team", icon: Users },
    { name: "Gallery", url: "/gallery", icon: Image },
    { name: "Media & Works", url: "/media", icon: PlaySquare },
    { name: "Sponsors", url: "/sponsors", icon: Star },
    { name: "Contact Us", url: "/contact", icon: Mail },
  ];

  return (
    <motion.header
      className={cn(
        "fixed top-0 z-[10000] flex w-full items-center justify-center transition-all duration-500 pt-6"
      )}
    >
      <NavBar items={navItems} className="w-[95%] max-w-6xl" isScrolled={isScrolled}>
        <Link to="/" className="flex items-center justify-center">
          <img 
            src={logoImg} 
            alt="AUV Logo" 
            className="h-[40px] w-auto object-contain hover:opacity-80 transition-opacity" 
          />
        </Link>
      </NavBar>
    </motion.header>
  );
}
