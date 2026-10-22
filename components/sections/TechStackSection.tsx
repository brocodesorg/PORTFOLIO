'use client'

import React, { useState } from 'react'
import { siteContent } from '@/app/content'
import { Code, Terminal, Cpu, Database, Cloud, Zap, Layers, Globe, Server, Box } from 'lucide-react'

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend'>('all')

  const frontendTech = [
    { name: 'Next.js 14 App Router', level: 'Master', category: 'Framework', icon: Globe },
    { name: 'React 18 Concurrent', level: 'Master', category: 'Library', icon: Zap },
    { name: 'Three.js / WebGL', level: 'Master', category: '3D Spatial', icon: Box },
    { name: 'GSAP + ScrollTrigger', level: 'Master', category: 'Motion Runtime', icon: Layers },
    { name: 'Tailwind CSS', level: 'Expert', category: 'Styling', icon: Code },
    { name: 'TypeScript', level: 'Expert', category: 'Language', icon: Terminal },
    { name: 'Framer Motion', level: 'Master', category: 'Micro-UX', icon: Zap },
    { name: 'GLSL Shaders', level: 'Advanced', category: 'Graphics', icon: Cpu },
  ]

  const backendTech = [
    { name: 'Python / FastAPI', level: 'Master', category: 'AI Backend', icon: Server },
    { name: 'PyTorch & Transformers', level: 'Advanced', category: 'Machine Learning', icon: Cpu },
    { name: 'Node.js & Bun', level: 'Expert', category: 'Runtime', icon: Terminal },
    { name: 'PostgreSQL / pgvector', level: 'Expert', category: 'Database', icon: Database },
    { name: 'Docker & Kubernetes', level: 'Advanced', category: 'Containers', icon: Box },
    { name: 'AWS & Cloudflare', level: 'Master', category: 'Infrastructure', icon: Cloud },
    { name: 'Redis / In-Memory', level: 'Expert', category: 'Caching', icon: Zap },
    { name: 'GraphQL & gRPC', level: 'Expert', category: 'API Protocol', icon: Server },
  ]

  return (
    <section
      id="stack"
      className="relative py-28 bg-[#080C14] text-white overflow-hidden border-t border-b border-white/5"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
            06 // ARSENAL &bull; MODERN TECH STACK
          </span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white mb-4">
          Core Technologies
        </h2>
        <p className="max-w-xl mx-auto text-sm text-slate-400 leading-relaxed">
          We build with the fastest, most reliable battle-tested toolchains. Zero bloat, maximum performance.
        </p>
      </div>

      {/* Infinite Marquee Rows */}
      <div className="space-y-6 overflow-hidden">
        {/* Row 1: Leftward Marquee */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          {[...frontendTech, ...frontendTech].map((tech, i) => {
            const Icon = tech.icon
            return (
              <div
                key={`row1-${i}`}
                className="group mx-3 flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-200 hover:scale-105 hover:bg-primary/[0.05]"
              >
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/40 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white group-hover:text-primary transition-colors">
                    {tech.name}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
                    <span>{tech.category}</span>
                    <span>&bull;</span>
                    <span className="text-cyan-400 font-semibold">{tech.level}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Row 2: Rightward Reverse Marquee */}
        <div className="flex w-max animate-marqueeReverse hover:[animation-play-state:paused] cursor-pointer">
          {[...backendTech, ...backendTech].map((tech, i) => {
            const Icon = tech.icon
            return (
              <div
                key={`row2-${i}`}
                className="group mx-3 flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/50 transition-all duration-200 hover:scale-105 hover:bg-accent/[0.05]"
              >
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/40 transition-colors">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                    {tech.name}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
                    <span>{tech.category}</span>
                    <span>&bull;</span>
                    <span className="text-primary font-semibold">{tech.level}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
