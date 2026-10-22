'use client'

import React, { useState, useEffect } from 'react'
import { siteContent } from '@/app/content'
import MagneticButton from '@/components/ui/MagneticButton'
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      const sections = ['about', 'showcase', 'services', 'projects', 'achievements', 'stack', 'contact']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'MANIFESTO', href: '#about', id: 'about' },
    { label: '3D LAB', href: '#showcase', id: 'showcase', glow: 'pink' },
    { label: 'SERVICES', href: '#services', id: 'services' },
    { label: 'WORK', href: '#projects', id: 'projects' },
    { label: 'TIMELINE', href: '#achievements', id: 'achievements' },
    { label: 'STACK', href: '#stack', id: 'stack', glow: 'cyan' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? 'py-3 sm:py-3.5 bg-[#080C14]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-4 sm:py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with [BC] Badge */}
          <a
            href="#"
            className="group flex items-center gap-2.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
            aria-label="BROCODES Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-xs font-display tracking-tighter shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:scale-105 transition-transform duration-200">
              BC
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-black text-lg tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-slate-900'
              }`}>
                {siteContent.company.name}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-primary font-bold -mt-1 hidden sm:block">
                STUDIO &bull; 3D LAB
              </span>
            </div>
          </a>

          {/* Desktop Nav Links Pill Container */}
          <nav
            aria-label="Main Navigation"
            className={`hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full border transition-all duration-300 shadow-sm ${
              isScrolled
                ? 'bg-white/5 border-white/10'
                : 'bg-white/70 border-slate-300/60 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.06)]'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white bg-primary shadow-[0_0_15px_rgba(236,72,153,0.6)] font-bold'
                      : link.glow === 'pink'
                      ? 'text-pink-600 bg-pink-500/10 border border-pink-400/40 shadow-[0_0_12px_rgba(236,72,153,0.3)] font-bold'
                      : link.glow === 'cyan'
                      ? 'text-cyan-600 bg-cyan-500/10 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-bold'
                      : isScrolled
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Glowing Neon CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <MagneticButton
              asLink
              href="#contact"
              strength={18}
              className="relative group overflow-hidden px-5 py-2 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-pink-500 via-primary to-fuchsia-600 shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:shadow-[0_0_35px_rgba(236,72,153,0.9)] transition-all duration-300 border border-pink-300/40"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-white" style={{ animationDuration: '6s' }} />
                <span>LET&apos;S TALK</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out" />
            </MagneticButton>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg cursor-pointer transition-colors ${
                isScrolled ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-black/10'
              }`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[990] bg-[#080C14]/95 backdrop-blur-2xl lg:hidden flex flex-col justify-center px-8 transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-x-0'
            : 'opacity-0 pointer-events-none translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-5 text-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display font-bold text-xl uppercase tracking-wider text-slate-200 hover:text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent font-display font-bold text-white text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(236,72,153,0.5)] cursor-pointer"
            >
              Start Project
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
