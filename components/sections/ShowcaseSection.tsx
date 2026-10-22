'use client'

import React, { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, Layers, Sparkles, Cpu, RotateCw } from 'lucide-react'

// Dynamic import of 3D Canvas with ssr: false
const ShowcaseCanvas3D = dynamic(() => import('@/components/canvas/ShowcaseCanvas3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#080C14] text-slate-500 font-mono text-xs">
      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
      <span>COMPILING WEBGL SHADERS...</span>
    </div>
  ),
})

export default function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [materialMode, setMaterialMode] = useState<'cyber' | 'glass' | 'chrome' | 'wireframe'>('cyber')
  const [activeColor, setActiveColor] = useState('#EC4899')

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const container = containerRef.current
    if (!container) return

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=120%',
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress)
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  const colorOptions = [
    { label: 'Hyper Pink', value: '#EC4899' },
    { label: 'Cyber Cyan', value: '#0891B2' },
    { label: 'Emerald Ray', value: '#10B981' },
    { label: 'Quantum Purple', value: '#A855F7' },
  ]

  const modeOptions: { id: 'cyber' | 'glass' | 'chrome' | 'wireframe'; label: string }[] = [
    { id: 'cyber', label: 'CYBER CORE' },
    { id: 'glass', label: 'OPTICAL GLASS' },
    { id: 'chrome', label: 'TITANIUM CHROME' },
    { id: 'wireframe', label: 'WIREFRAME MESH' },
  ]

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="relative min-h-screen w-full bg-[#080C14] text-white flex flex-col justify-between overflow-hidden"
    >
      {/* Top Header Controls & Info */}
      <div className="relative z-20 pt-20 px-6 sm:px-12 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
              02 // LAB &bull; SPATIAL 3D ENGINE
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
            Morphing 3D Core
          </h2>
          <p className="text-slate-400 text-sm max-w-md mt-2">
            Interactive parametric geometry reacting to your scroll vector and cursor physics in real time.
          </p>
        </div>

        {/* Material Mode Selector Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
          {modeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setMaterialMode(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                materialMode === opt.id
                  ? 'bg-primary text-white shadow-[0_0_12px_rgba(236,72,153,0.5)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive 3D Canvas Area */}
      <div className="relative z-10 w-full h-[60vh] sm:h-[65vh] my-auto">
        <ShowcaseCanvas3D
          scrollProgress={scrollProgress}
          materialMode={materialMode}
          activeColor={activeColor}
        />

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300">
          <RotateCw className="w-3.5 h-3.5 text-primary animate-spin" style={{ animationDuration: '8s' }} />
          <span>DRAG 360&deg; TO ROTATE CORE</span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-20 pb-12 px-6 sm:px-12 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-6">
        {/* Color Palette Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            SPECTRAL COLOR:
          </span>
          <div className="flex gap-2">
            {colorOptions.map((c) => (
              <button
                key={c.value}
                onClick={() => setActiveColor(c.value)}
                aria-label={c.label}
                className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                  activeColor === c.value ? 'scale-125 border-white shadow-[0_0_10px_currentColor]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.value, color: c.value }}
              />
            ))}
          </div>
        </div>

        {/* Real-time stats */}
        <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <span>SCROLL VECTOR: {(scrollProgress * 100).toFixed(0)}%</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" />
            <span>SHADING: PHYSICALLY ACCURATE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
