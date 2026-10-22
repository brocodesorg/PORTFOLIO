'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent, AchievementItem } from '@/app/content'
import { Trophy, Award, Star, Flame, CheckCircle, Sparkles } from 'lucide-react'

export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGLineElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const line = lineRef.current
    if (!container || !line) return

    // Draw the glowing timeline on scroll
    gsap.fromTo(
      line,
      { strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
          end: 'bottom 85%',
          scrub: 0.8,
        },
      }
    )

    // Stagger in each achievement node
    const nodes = container.querySelectorAll('.timeline-node')
    nodes.forEach((node) => {
      gsap.fromTo(
        node,
        { opacity: 0.2, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill()
      })
    }
  }, [])

  const getBadgeIcon = (index: number) => {
    switch (index % 4) {
      case 0:
        return <Trophy className="w-5 h-5 text-amber-400" />
      case 1:
        return <Award className="w-5 h-5 text-primary" />
      case 2:
        return <Flame className="w-5 h-5 text-orange-400" />
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />
    }
  }

  return (
    <section
      ref={containerRef}
      id="achievements"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 bg-[#080C14] text-white overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              05 // MILESTONES &bull; PROVEN TRACK RECORD
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white mb-4">
            Honors &amp; Milestones
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Consistently recognized by industry leaders, global hackathons, and tier-one venture conferences.
          </p>
        </div>

        {/* Timeline Container with Glowing Center SVG Track */}
        <div className="relative">
          {/* Glowing Animated SVG Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 pointer-events-none z-0">
            <svg className="w-full h-full" preserveAspectRatio="none">
              {/* Dim Base Path */}
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
              />
              {/* Glowing Animated Path */}
              <line
                ref={lineRef}
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="#EC4899"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(236,72,153,0.8))',
                }}
              />
            </svg>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16 relative z-10">
            {siteContent.achievements.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={index}
                  className={`timeline-node flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Left or Right Content Card */}
                  <div
                    className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                      isEven ? 'sm:text-left sm:pl-8' : 'sm:text-right sm:pr-8'
                    }`}
                  >
                    <div
                      className={`group p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(236,72,153,0.15)] ${
                        item.highlight ? 'border-primary/40 bg-primary/[0.03]' : ''
                      }`}
                    >
                      <div
                        className={`flex items-center gap-2 mb-2 ${
                          isEven ? 'sm:justify-start' : 'sm:justify-end'
                        }`}
                      >
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-primary font-bold">
                          {item.badge}
                        </span>
                        <span className="font-mono text-xs text-slate-500">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-display font-black text-xl sm:text-2xl text-white mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>

                      <p className="font-body text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#080C14] border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  </div>

                  {/* Year Tag on Opposing Side */}
                  <div
                    className={`hidden sm:block w-1/2 font-display font-black text-3xl sm:text-4xl text-slate-700 select-none ${
                      isEven ? 'text-right pr-8' : 'text-left pl-8'
                    }`}
                  >
                    {item.year}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
