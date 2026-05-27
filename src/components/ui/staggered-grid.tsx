'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imagesLoaded from 'imagesloaded'
import { cn } from '@/lib/utils'
import { Github, Instagram, Linkedin, Mail, Youtube } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export interface BentoItem {
  id: number | string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  content?: React.ReactNode
  image?: string
  href?: string
}

export interface StaggeredGridProps {
  images: string[]
  bentoItems: BentoItem[]
  centerText?: string
  credits?: {
      madeBy: { text: string; href: string }
      moreDemos: { text: string; href: string }
  }
  className?: string
  showFooter?: boolean
}

export function StaggeredGrid({
  images,
  bentoItems,
  centerText = "CONTACT",
  credits = {
      madeBy: { text: "@codrops", href: "https://x.com/codrops" },
      moreDemos: { text: "More demos", href: "https://tympanus.net/codrops/demos" }
  },
  className,
  showFooter = true
}: StaggeredGridProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const gridFullRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const githubIndex = bentoItems?.findIndex(item => item.title.toLowerCase() === 'github');
  const [activeBento, setActiveBento] = useState<number>(githubIndex !== -1 ? githubIndex : 0);

  const splitText = (text: string) => {
      return text.split('').map((char, i) => (
          <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>
              {char === ' ' ? '\u00A0' : char}
          </span>
      ))
  }

  useEffect(() => {
      const handleLoad = () => {
          document.body.classList.remove('loading')
          setIsLoaded(true)
      }
      const imgLoad = imagesLoaded(
          document.querySelectorAll('.grid__item-img'),
          { background: true },
          handleLoad
      )
      return () => { /* Cleanup */ }
  }, [])

  useEffect(() => {
      if (!isLoaded) return

      // Animate Text Element
      if (textRef.current) {
          const chars = textRef.current.querySelectorAll('.char')
          gsap.timeline({
              scrollTrigger: {
                  trigger: textRef.current,
                  start: 'top bottom',
                  end: 'center center-=25%',
                  scrub: 1,
              }
          }).from(chars, {
              ease: 'sine.out',
              yPercent: 300,
              autoAlpha: 0,
              stagger: { each: 0.05, from: 'center' }
          })
      }

      // Animate Full Grid
      if (gridFullRef.current) {
          const gridFullItems = gridFullRef.current.querySelectorAll('.grid__item')
          const numColumns = getComputedStyle(gridFullRef.current)
              .getPropertyValue('grid-template-columns').split(' ').length
          const middleColumnIndex = Math.floor(numColumns / 2)

          const columns: Element[][] = Array.from({ length: numColumns }, () => [])
          gridFullItems.forEach((item: any, index: number) => {
              columns[index % numColumns].push(item)
          })

          columns.forEach((columnItems, columnIndex) => {
              const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2
              gsap.timeline({
                  scrollTrigger: {
                      trigger: gridFullRef.current,
                      start: 'top bottom',
                      end: 'center center',
                      scrub: 1.5,
                  }
              })
              .from(columnItems, {
                  yPercent: 450,
                  autoAlpha: 0,
                  delay: delayFactor,
                  ease: 'sine.out',
              })
              .from(columnItems.map(item => item.querySelector('.grid__item-img')), {
                  transformOrigin: '50% 0%',
                  ease: 'sine.out',
              }, 0)
          })

          // Bento Container Animation
          const bentoContainer = gridFullRef.current.querySelector('.bento-container')
          if (bentoContainer) {
              gsap.timeline({
                  scrollTrigger: {
                      trigger: gridFullRef.current,
                      start: 'top top+=15%',
                      end: 'bottom center',
                      scrub: 1,
                      invalidateOnRefresh: true,
                  }
              }).to(bentoContainer, {
                  y: window.innerHeight * 0.1,
                  scale: 1.5,
                  zIndex: 40,
                  ease: 'power2.out',
                  duration: 1,
                  force3D: true
              }, 0)
          }
      }
  }, [isLoaded])

  const mixedGridItems: (string | 'BENTO_GROUP')[] = 
      [...images, ...images, images[0]].slice(0, 35);
  mixedGridItems[16] = 'BENTO_GROUP';

  const iconsList = [Youtube, Instagram, Linkedin, Mail, Github];
  const labelsList = ["YouTube", "Instagram", "LinkedIn", "Gmail", "GitHub"];

  return (
      <div
          className={cn("shadow relative overflow-hidden w-full", className)}
          style={{ '--grid-item-translate': '0px' } as React.CSSProperties}
      >
          <section className="grid place-items-center w-full relative mt-[10vh]">
              <div ref={textRef} className="text font-alt uppercase flex content-center text-[clamp(3rem,14vw,10rem)] leading-[0.7] text-slate-100">
                  {splitText(centerText)}
              </div>
          </section>

          <section className="hidden lg:grid place-items-center w-full relative">
              <div ref={gridFullRef} className="grid--full relative w-full my-[10vh] h-auto aspect-[1.1] max-w-none p-4 grid gap-4 grid-cols-7 grid-rows-5">
                        <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-black/80 rounded-lg transition-opacity duration-500" />
                  {mixedGridItems.map((item, i) => {
                      if (item === 'BENTO_GROUP') {
                          if (!bentoItems || bentoItems.length === 0) return null;
                          return (
                              <div key="bento-group" className="grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-2 h-full w-full will-change-transform">
                                  {bentoItems.map((bentoItem, index) => {
                                      const isActive = activeBento === index;
                                      return (
                                          <a
                                              href={bentoItem.href || '#'}
                                              target={bentoItem.href ? "_blank" : undefined}
                                              rel={bentoItem.href ? "noopener noreferrer" : undefined}
                                              key={bentoItem.id}
                                              className={cn(
                                                  "block relative cursor-pointer overflow-hidden rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                                                  isActive ? "bg-slate-800 shadow-2xl shadow-blue-900/20" : "bg-slate-950"
                                              )}
                                              style={{ width: isActive ? "60%" : "20%" }}
                                              onClick={(e) => {
                                                  if (activeBento !== index) {
                                                      e.preventDefault();
                                                      e.stopPropagation();
                                                      setActiveBento(index);
                                                  } else if (!bentoItem.href) {
                                                      e.preventDefault();
                                                  }
                                              }}
                                          >
                                              <div className={cn(
                                                  "absolute inset-0 rounded-2xl border z-50 pointer-events-none transition-colors duration-700",
                                                  isActive ? "border-slate-600/50" : "border-slate-800/50"
                                              )} />
                                              <div className="relative z-10 w-full h-full flex flex-col p-0">
                                                  <div className={cn(
                                                      "absolute inset-0 flex flex-col transition-all duration-500 ease-in-out",
                                                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                                                  )}>
                                                      <div className="absolute inset-0 bg-slate-900 overflow-hidden z-0 group/img">
                                                          {bentoItem.image && (
                                                              <>
                                                                  <img src={bentoItem.image} alt={bentoItem.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90" />
                                                                  <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                                                              </>
                                                          )}
                                                      </div>
                                                      <div className="absolute bottom-0 left-0 w-full h-20 flex items-center justify-between px-5 z-20">
                                                          <h3 className="text-sm font-bold text-white drop-shadow-md">{bentoItem.title}</h3>
                                                          <div className="text-white/90">{bentoItem.icon}</div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className={cn(
                                                  "absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500",
                                                  isActive ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                                              )}>
                                                  <div className="text-white/50">{bentoItem.icon}</div>
                                                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{bentoItem.title}</span>
                                              </div>
                                          </a>
                                      )
                                  })}
                              </div>
                          )
                      }
                      if (i === 17 || i === 18) return null;
                      if (typeof item === 'string') {
                          const Icon = iconsList[i % iconsList.length];
                          const label = labelsList[i % labelsList.length];
                          const bentoData = bentoItems?.find((b) => b.title === label);
                          return (
                              <a 
                                  key={`img-${i}`} 
                                  href={bentoData?.href || '#'}
                                  target={bentoData?.href ? "_blank" : undefined}
                                  rel={bentoData?.href ? "noopener noreferrer" : undefined}
                                  className="grid__item block m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer"
                                  onClick={(e) => {
                                      if (activeBento !== mixedGridItems.indexOf('BENTO_GROUP')) {
                                          // Allow clicking other image-icons on the grid to activate the corresponding bento card
                                          const idx = bentoItems?.findIndex(b => b.title === label);
                                          if (idx !== -1 && idx !== undefined) {
                                              e.preventDefault();
                                              setActiveBento(idx);
                                          }
                                      }
                                  }}
                              >
                                  <figure className="w-full h-full m-0">
                                      <div className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-slate-800 bg-slate-900/40 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-blue-900/20">
                                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                                          <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                                              <Icon className="w-8 h-8 text-slate-500 transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
                                              <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                                  <span className="block text-[10px] font-medium text-white/90 uppercase tracking-wider mb-0.5">Connect via</span>
                                                  <span className="block text-sm font-bold text-white tracking-tight">{label}</span>
                                              </div>
                                          </div>
                                      </div>
                                  </figure>
                              </a>
                          )
                      }
                      return null;
                  })}
              </div>
          </section>

          {/* Mobile and Tablet Grid Layout */}
          <section className="lg:hidden w-full relative my-12 px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
                  {bentoItems.map((bentoItem, index) => {
                      const isActive = activeBento === index;
                      const Icon = bentoItem.icon;
                      
                      return (
                          <div
                              key={bentoItem.id}
                              onClick={() => setActiveBento(index)}
                              className={cn(
                                  "group relative cursor-pointer overflow-hidden rounded-3xl p-6 min-h-[220px] flex flex-col justify-between transition-all duration-500 border bg-slate-900/40 backdrop-blur-xl",
                                  isActive 
                                      ? "border-blue-500/50 shadow-lg shadow-blue-500/10 bg-slate-900/80 scale-[1.02]" 
                                      : "border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-900/60"
                              )}
                          >
                              {/* Background Image / Gradient Overlay */}
                              {bentoItem.image && (
                                  <div className="absolute inset-0 z-0 opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.12]">
                                      <img 
                                          src={bentoItem.image} 
                                          alt="" 
                                          className="w-full h-full object-cover pointer-events-none" 
                                      />
                                  </div>
                              )}
                              
                              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/[0.02] pointer-events-none z-0" />
                              
                              {/* Card Content */}
                              <div className="relative z-10 flex flex-col gap-4">
                                  <div className="flex items-center justify-between w-full">
                                      <div className={cn(
                                          "p-3 rounded-2xl border transition-all duration-500",
                                          isActive 
                                              ? "bg-blue-500/10 border-blue-500/30 text-blue-400" 
                                              : "bg-slate-950/60 border-slate-800 text-slate-400 group-hover:text-slate-300"
                                      )}>
                                          {Icon}
                                      </div>
                                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                          {bentoItem.subtitle}
                                      </span>
                                  </div>
                                  
                                  <div className="flex flex-col gap-1">
                                      <h3 className="text-xl font-bold text-white tracking-tight">
                                          {bentoItem.title}
                                      </h3>
                                      {/* Animate description display based on active state */}
                                      <div className={cn(
                                          "transition-all duration-500 ease-in-out overflow-hidden",
                                          isActive ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0"
                                      )}>
                                          <p className="text-sm text-slate-300 leading-relaxed break-words whitespace-normal">
                                              {bentoItem.description}
                                          </p>
                                      </div>
                                  </div>
                              </div>
                              
                              {/* CTA Link Section */}
                              <div className="relative z-10 flex items-center justify-between mt-6 pt-4 border-t border-slate-800/20">
                                  <span className={cn(
                                      "text-xs font-semibold uppercase tracking-wider transition-colors duration-500",
                                      isActive ? "text-blue-400" : "text-slate-500"
                                  )}>
                                      {isActive ? "Tap again to connect" : "Tap to select"}
                                  </span>
                                  
                                  {bentoItem.href && (
                                      <a
                                          href={bentoItem.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => {
                                              // On mobile, if not already active, we intercept the click to expand first.
                                              if (!isActive) {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                  setActiveBento(index);
                                              }
                                          }}
                                          className={cn(
                                              "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300",
                                              isActive 
                                                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/30 scale-105" 
                                                  : "bg-slate-950/40 border border-slate-800 text-slate-400 hover:text-white"
                                          )}
                                      >
                                          Connect <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">➔</span>
                                      </a>
                                  )}
                              </div>
                          </div>
                      );
                  })}
              </div>
          </section>

          {showFooter && (
              <footer className="frame__footer w-full p-8 flex justify-between items-center relative z-50 text-slate-400 uppercase font-medium text-xs tracking-wider">
                  <a href={credits.madeBy.href} className="hover:opacity-60 transition-opacity">{credits.madeBy.text}</a>
                  <a href={credits.moreDemos.href} className="hover:opacity-60 transition-opacity">{credits.moreDemos.text}</a>
              </footer>
          )}
      </div>
  )
}

export default StaggeredGrid
