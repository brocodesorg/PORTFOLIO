'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent, Project } from '@/app/content'
import { ArrowUpRight, Github, ExternalLink, Sparkles } from 'lucide-react'

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    // On mobile (< 768px), standard vertical stack or smooth horizontal touch scroll is more accessible
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const totalWidth = track.scrollWidth
      const scrollDistance = totalWidth - window.innerWidth + 120

      const scrollTween = gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Parallax effect on card images during horizontal scroll
      const images = track.querySelectorAll('.project-image-inner')
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              containerAnimation: scrollTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        )
      })

      return () => {
        scrollTween.kill()
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative min-h-screen bg-[#080C14] text-white overflow-hidden py-16 md:py-0 flex flex-col justify-center"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

      {/* Section Header on top of gallery */}
      <div className="px-6 sm:px-12 max-w-7xl mx-auto w-full mb-8 pt-12 md:pt-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              04 // SHOWCASE &bull; SELECTED DEPLOYMENTS
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight">
            Featured Projects
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-400">
          <span>SCROLL HORIZONTALLY</span>
          <span className="animate-pulse">&rarr;</span>
        </div>
      </div>

      {/* Horizontal Track */}
      <div className="w-full overflow-x-auto md:overflow-visible no-scrollbar pb-8 md:pb-0">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-8 px-6 sm:px-12 w-max max-w-none items-center"
        >
          {siteContent.projects.map((project, idx) => (
            <div
              key={project.id}
              data-cursor="VIEW CASE"
              className="group relative w-[88vw] sm:w-[540px] md:w-[640px] lg:w-[720px] rounded-3xl bg-white/[0.03] border border-white/10 hover:border-primary/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_20px_60px_rgba(236,72,153,0.18)]"
            >
              {/* Card Image Area with Parallax and Generative Visual */}
              <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] overflow-hidden bg-slate-950">
                <div className="project-image-inner relative w-full h-full transform scale-105 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 720px"
                    className="object-cover"
                  />
                </div>

                {/* Number Badge */}
                <div className="absolute top-4 left-4 z-10 font-mono text-xs font-bold px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white flex items-center gap-1.5">
                  <span className="text-primary">{project.number}</span>
                  <span className="text-slate-500">/</span>
                  <span>05</span>
                </div>

                {/* Key Metric Pill */}
                <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex flex-col">
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                    {project.metrics.label}
                  </span>
                  <span className="font-display font-black text-sm text-primary">
                    {project.metrics.value}
                  </span>
                </div>

                {/* Year Pill */}
                <div className="absolute top-4 right-4 z-10 font-mono text-xs px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-slate-300">
                  {project.year}
                </div>
              </div>

              {/* Card Content Details */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      CLIENT: {project.client}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>

                  <div className="text-xs sm:text-sm font-medium text-cyan-400 mb-3">
                    {project.tagline}
                  </div>

                  <p className="font-body text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tags and CTA Links */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-pink-600 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)] cursor-pointer"
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
