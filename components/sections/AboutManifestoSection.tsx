'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '@/app/content'
import { Terminal, ShieldCheck, Zap, Globe } from 'lucide-react'

export default function AboutManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const manifestoTextRef = useRef<HTMLDivElement>(null)
  const statsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const manifestoElement = manifestoTextRef.current
    const words = manifestoElement?.querySelectorAll('.manifesto-word')

    // 1. Scrubbed Word-by-Word Text Reveal
    if (words && words.length > 0 && section && manifestoElement) {
      gsap.fromTo(
        words,
        { opacity: 0.15, y: 4 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: manifestoElement,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: 0.5,
          },
        }
      )
    }

    // 2. Animated Stats Counters
    const statCards = statsContainerRef.current?.querySelectorAll('.stat-card')
    if (statCards && statCards.length > 0) {
      statCards.forEach((card) => {
        const numElement = card.querySelector('.stat-number')
        const targetValue = parseInt(card.getAttribute('data-value') || '0', 10)

        if (numElement) {
          const counterObj = { count: 0 }
          gsap.to(counterObj, {
            count: targetValue,
            duration: 2.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate: () => {
              numElement.textContent = Math.floor(counterObj.count).toString()
            },
          })
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section || st.trigger === manifestoElement) {
          st.kill()
        }
      })
    }
  }, [])

  // Split the manifesto paragraphs into words
  const fullText = siteContent.company.manifestoHeadline + ' ' + siteContent.company.manifestoParagraphs.join(' ')
  const wordsArray = fullText.split(' ')

  const statIcons = [
    <Zap key="1" className="w-5 h-5 text-primary" />,
    <Globe key="2" className="w-5 h-5 text-accent" />,
    <Terminal key="3" className="w-5 h-5 text-amber-400" />,
    <ShieldCheck key="4" className="w-5 h-5 text-emerald-400" />,
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#080C14] text-white overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Pill Badge */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            01 // CHAPTER &bull; THE MANIFESTO
          </span>
        </div>

        {/* Scrubbed Word-by-Word Reveal Container with Refined Balanced Font Size */}
        <div ref={manifestoTextRef} className="mb-16 sm:mb-20 max-w-4xl">
          <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.35] tracking-tight">
            {wordsArray.map((word, i) => (
              <span
                key={i}
                className="manifesto-word inline-block mr-2 my-0.5 transition-colors duration-150 will-change-[opacity,transform]"
                style={{ opacity: 0.15 }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Animated Counter Stats Grid */}
        <div
          ref={statsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {siteContent.stats.map((stat, idx) => (
            <div
              key={idx}
              data-value={stat.value}
              className="stat-card group relative p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(236,72,153,0.15)] backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest">
                  METRIC // 0{idx + 1}
                </span>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {statIcons[idx % statIcons.length]}
                </div>
              </div>

              <div className="flex items-baseline gap-1 font-display font-black text-3xl sm:text-4xl text-white mb-2">
                <span className="stat-number">0</span>
                <span className="text-primary">{stat.suffix}</span>
              </div>

              <h3 className="font-display font-bold text-sm text-slate-200 mb-1">
                {stat.label}
              </h3>

              <p className="font-body text-xs text-slate-400">
                {stat.description}
              </p>

              <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
