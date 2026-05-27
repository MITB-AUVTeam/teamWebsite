import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { LucideIcon, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  children?: React.ReactNode
  isScrolled?: boolean
}

export function NavBar({ items, className, children, isScrolled = false }: NavBarProps) {
  const location = useLocation()
  const currentItem = items.find((item) => {
    const normalize = (p: string) => p.replace(/\/$/, "").toLowerCase() || "/"
    return normalize(item.url) === normalize(location.pathname)
  }) || items[0]
  const activeTab = currentItem.name
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <div
        className={cn(
          "z-[10000]",
          className,
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between py-2 px-4 md:px-2 transition-all duration-300",
            "bg-black/45 rounded-full",
            isScrolled
              ? "border border-white/20 shadow-2xl backdrop-blur-xl bg-black/65"
              : "border border-white/10 shadow-lg backdrop-blur-lg",
          )}
        >
          {children && (
            <div className="pl-2 md:pl-6 pr-4 flex items-center">
              {children}
            </div>
          )}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            {items.map((item) => {
              const isActive = activeTab === item.name

              return (
                <Link
                  key={item.name}
                  to={item.url}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                    "text-slate-300 hover:text-blue-400",
                    isActive && "bg-white/5 text-white",
                  )}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 w-full bg-blue-500/10 rounded-full -z-10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    >
                      {/* removed decorative top tab */}
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden pr-4 flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 text-slate-300 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] flex flex-col bg-black/40 backdrop-blur-xl p-4 pt-6"
          >
            {/* Top Pill */}
            <div className="flex items-center justify-between px-6 py-3 bg-transparent border-transparent rounded-full">
              <div className="uppercase" onClick={() => setIsMobileMenuOpen(false)}>
                {children}
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="text-blue-500" size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Menu Items Box */}
            <div className="mt-4 flex-1 bg-transparent border border-white/10 rounded-[2rem] overflow-y-auto flex flex-col shadow-2xl min-h-0">
              <div className="flex-1 flex flex-col px-6 py-4 md:py-8 justify-start md:justify-center">
                <div className="flex flex-col">
                  {items.map((item) => {
                    const isActive = activeTab === item.name;
                    return (
                      <Link
                        key={item.name}
                        to={item.url}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "relative py-4 sm:py-5 text-center text-sm font-bold tracking-[0.2em] uppercase border-b border-white/5 last:border-b-0 transition-colors flex items-center justify-center",
                          isActive ? "text-white" : "text-slate-300 hover:text-blue-400"
                        )}
                      >
                        {isActive && <span className="absolute left-6 text-white font-normal">[</span>}
                        {item.name}
                        {isActive && <span className="absolute right-6 text-white font-normal">]</span>}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
