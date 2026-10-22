'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '@/app/content'
import { Activity, Sparkles, Cpu, Layers } from 'lucide-react'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [fps, setFps] = useState(60)
  const [isMounted, setIsMounted] = useState(false)
  const mouseCoords = useRef({ x: 0, y: 0 })

  // Parallax elements refs
  const silhouetteRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLDivElement>(null)
  const leftHudRef = useRef<HTMLDivElement>(null)
  const rightHudRef = useRef<HTMLDivElement>(null)
  const bottomCenterRef = useRef<HTMLDivElement>(null)
  const backgroundMatrixRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
    gsap.registerPlugin(ScrollTrigger)

    // Minor realistic FPS fluctuation (59-60)
    const fpsInterval = setInterval(() => {
      setFps(Math.random() > 0.3 ? 60 : 59)
    }, 2000)

    // Mouse Move Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2
      mouseCoords.current = { x, y }

      if (silhouetteRef.current) {
        gsap.to(silhouetteRef.current, {
          x: x * -18,
          y: y * -10,
          duration: 1.2,
          ease: 'power2.out',
        })
      }

      if (lettersRef.current) {
        gsap.to(lettersRef.current, {
          x: x * 10,
          y: y * 6,
          duration: 1.0,
          ease: 'power2.out',
        })
      }

      if (leftHudRef.current) {
        gsap.to(leftHudRef.current, {
          x: x * -25,
          y: y * -15,
          rotationY: x * 8,
          rotationX: -y * 8,
          duration: 1.4,
          ease: 'power2.out',
        })
      }

      if (rightHudRef.current) {
        gsap.to(rightHudRef.current, {
          x: x * 22,
          y: y * -12,
          rotationY: x * -8,
          rotationX: -y * 8,
          duration: 1.4,
          ease: 'power2.out',
        })
      }

      if (backgroundMatrixRef.current) {
        gsap.to(backgroundMatrixRef.current, {
          x: x * -8,
          y: y * -5,
          duration: 1.6,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Entry animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      lettersRef.current,
      { y: 60, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.2 }
    )
      .fromTo(
        silhouetteRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.3, ease: 'expo.out' },
        '-=0.9'
      )
      .fromTo(
        [leftHudRef.current, rightHudRef.current],
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15 },
        '-=0.7'
      )
      .fromTo(
        bottomCenterRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      )

    return () => {
      clearInterval(fpsInterval)
      window.removeEventListener('mousemove', handleMouseMove)
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[105vh] w-full flex flex-col items-center justify-between overflow-hidden bg-[#F4F6F9] text-slate-900 select-none pt-24 pb-10"
    >
      {/* 1. Subtle High-Key Background Grids & Ambient Lights */}
      <div className="absolute inset-0 bg-grid-pattern-light opacity-60 pointer-events-none" />
      
      {/* Ambient Cyber Light Blooms */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-300/20 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-300/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-blue-200/20 blur-[120px] pointer-events-none" />

      {/* Floating Micro-sparkles in background */}
      <div className="absolute top-36 left-1/3 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-60" />
      <div className="absolute top-48 right-1/3 w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping opacity-50" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-48 right-1/4 w-2 h-2 rounded-full bg-cyan-400 opacity-40 animate-pulse" />

      {/* 2. Top Status Corner Telemetry */}
      <div className="absolute top-24 left-6 sm:left-12 z-20 hidden md:flex flex-col gap-1 text-[11px] font-mono tracking-widest text-slate-500 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-800">SYSTEM: ACTIVE</span>
        </div>
        <span>HQ: SAN FRANCISCO &bull; BENGALURU</span>
        <span>STUDIO: 3D WEB &bull; AI ARCHITECTURE</span>
      </div>

      <div className="absolute top-24 right-6 sm:right-12 z-20 hidden md:flex flex-col items-end gap-1 text-[11px] font-mono tracking-widest text-slate-500 uppercase">
        <span className="text-primary font-bold">EST. 2024 &bull; BROCODES</span>
        <a
          href="https://brocodes.space/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-primary transition-colors cursor-pointer"
        >
          BROCODES.SPACE &rarr;
        </a>
      </div>

      {/* 3. Central Wireframe Elliptical Halo framing the scene */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[1300px] h-[580px] pointer-events-none z-[4] opacity-55">
        <svg viewBox="0 0 1200 500" className="w-full h-full" fill="none">
          {/* Main Elliptical Orbit Track */}
          <ellipse
            cx="600"
            cy="250"
            rx="560"
            ry="220"
            stroke="url(#orbitGradient)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          {/* Subtle Outer Offset Arc */}
          <ellipse
            cx="600"
            cy="250"
            rx="580"
            ry="235"
            stroke="#94A3B8"
            strokeWidth="0.8"
            opacity="0.3"
          />
          {/* Tech Coordinate Markers along orbit */}
          <circle cx="240" cy="120" r="3" fill="#0891B2" />
          <text x="250" y="125" fill="#64748B" fontFamily="monospace" fontSize="9">
            GI.06:11077
          </text>
          <circle cx="940" cy="130" r="3" fill="#EC4899" />
          <text x="950" y="135" fill="#64748B" fontFamily="monospace" fontSize="9">
            AI.09:88291
          </text>

          <defs>
            <linearGradient id="orbitGradient" x1="0" y1="0" x2="1200" y2="500" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0891B2" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 4. Left Floating Glass HUD Widget (FPS & WebGL Telemetry) */}
      <div
        ref={leftHudRef}
        style={{ perspective: 1000 }}
        className="absolute top-28 left-4 sm:left-10 lg:left-16 z-20 pointer-events-none hidden sm:block"
      >
        <div className="w-56 lg:w-64 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-cyan-400/40 shadow-[0_15px_35px_rgba(8,145,178,0.2),0_0_20px_rgba(6,182,212,0.15)] flex flex-col gap-3">
          {/* Top Pill Row */}
          <div className="flex items-center justify-between">
            <div className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 font-mono text-xs font-black tracking-wider flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <span>FPS:</span>
              <span className="text-cyan-400">{fps}</span>
            </div>
            <div className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-700 font-bold uppercase tracking-wider">
              WEBGL ACTIVE
            </div>
          </div>

          {/* Progress bar line */}
          <div className="w-full h-1.5 bg-cyan-900/30 rounded-full overflow-hidden">
            <div className="w-5/6 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse" />
          </div>

          {/* Real-time Frequency Waveform Graph */}
          <div className="h-16 w-full rounded-xl bg-slate-900/80 p-2 flex flex-col justify-between border border-cyan-500/20">
            <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400/70">
              <span>BUFFER STREAM</span>
              <span className="text-emerald-400">OPTIMAL</span>
            </div>
            {/* SVG Animated Audio/Frequency Wave */}
            <svg viewBox="0 0 200 40" className="w-full h-10 overflow-visible" preserveAspectRatio="none">
              <path
                d="M0 25 Q 15 5, 30 20 T 60 15 T 90 28 T 120 10 T 150 25 T 180 8 T 200 20"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2"
                className="drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]"
              />
              <path
                d="M0 25 Q 15 5, 30 20 T 60 15 T 90 28 T 120 10 T 150 25 T 180 8 T 200 20 L 200 40 L 0 40 Z"
                fill="url(#waveFill)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* 5. Right Floating Glass HUD Widget (Telemetry Curve Graph) */}
      <div
        ref={rightHudRef}
        style={{ perspective: 1000 }}
        className="absolute top-28 right-4 sm:right-10 lg:right-16 z-20 pointer-events-none hidden sm:block"
      >
        <div className="w-56 lg:w-64 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-pink-400/40 shadow-[0_15px_35px_rgba(236,72,153,0.2),0_0_20px_rgba(236,72,153,0.15)] flex flex-col gap-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 font-bold">
            <span className="flex items-center gap-1.5 text-pink-600">
              <Activity className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
              <span>QUANTUM ACCEL</span>
            </span>
            <span>XX.98</span>
          </div>

          {/* Precision Telemetry Curve Graph */}
          <div className="h-20 w-full rounded-xl bg-slate-900/85 p-2.5 flex flex-col justify-between border border-pink-500/20 relative overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

            <div className="flex justify-between text-[8px] font-mono text-slate-400 z-10">
              <span>120</span>
              <span>80</span>
              <span>40</span>
            </div>

            {/* Glowing Spline Curve */}
            <svg viewBox="0 0 200 45" className="w-full h-12 z-10 overflow-visible" preserveAspectRatio="none">
              <path
                d="M 5 35 C 40 38, 70 12, 100 20 C 130 28, 160 5, 195 18"
                fill="none"
                stroke="url(#curveGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(236,72,153,0.9)]"
              />
              <circle cx="100" cy="20" r="3.5" fill="#06B6D4" className="animate-ping" />
              <circle cx="195" cy="18" r="4" fill="#EC4899" />
              <defs>
                <linearGradient id="curveGrad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#F43F5E" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex justify-between items-center text-[9px] font-mono text-pink-400 z-10">
              <span>LATENCY: 1.2MS</span>
              <span className="text-cyan-400">60 FPS</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Floating 3D Geometric Crystal Shapes */}
      {/* Top Right: Pink Diamond Wireframe Octahedron */}
      <div className="absolute top-36 right-[22%] z-[6] pointer-events-none hidden lg:block opacity-75 animate-float">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <polygon points="50,10 90,45 50,90 10,45" stroke="#EC4899" strokeWidth="1.5" fill="none" opacity="0.8" />
          <polygon points="50,10 50,90" stroke="#EC4899" strokeWidth="1.2" strokeDasharray="3 3" />
          <polygon points="10,45 90,45" stroke="#F472B6" strokeWidth="1.2" strokeDasharray="3 3" />
          <polygon points="50,10 65,45 50,90 35,45" stroke="#0891B2" strokeWidth="1.2" opacity="0.6" />
        </svg>
      </div>

      {/* Bottom Left: Complex Cyan Wireframe Geodesic Sphere */}
      <div className="absolute bottom-16 left-[6%] z-[6] pointer-events-none hidden md:block opacity-80 animate-float" style={{ animationDelay: '2s' }}>
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
          {/* Geodesic triangular mesh */}
          <circle cx="100" cy="100" r="75" stroke="#0891B2" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.5" />
          <polygon points="100,25 165,65 165,135 100,175 35,135 35,65" stroke="#06B6D4" strokeWidth="1.5" fill="none" />
          <polygon points="100,25 100,175" stroke="#0891B2" strokeWidth="1" strokeDasharray="2 3" />
          <polygon points="35,65 165,135" stroke="#0891B2" strokeWidth="1" strokeDasharray="2 3" />
          <polygon points="35,135 165,65" stroke="#0891B2" strokeWidth="1" strokeDasharray="2 3" />
          <polygon points="100,55 140,80 140,120 100,145 60,120 60,80" stroke="#EC4899" strokeWidth="1.2" fill="none" opacity="0.7" />
          {/* Particle dots */}
          <circle cx="100" cy="25" r="3" fill="#06B6D4" />
          <circle cx="165" cy="65" r="3" fill="#EC4899" />
          <circle cx="35" cy="135" r="3" fill="#06B6D4" />
        </svg>
      </div>

      {/* 7. Center Silhouette with Backlit Cyber HUD Matrix Backdrop */}
      <div
        ref={silhouetteRef}
        className="relative z-[12] w-full max-w-[500px] sm:max-w-[580px] md:max-w-[660px] lg:max-w-[720px] h-[52vh] sm:h-[60vh] md:h-[66vh] flex items-end justify-center pointer-events-none mt-6 sm:mt-0"
      >
        {/* Glowing Backlit Digital Aura behind Head */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-gradient-to-r from-cyan-400/25 via-pink-400/20 to-purple-400/25 blur-3xl pointer-events-none" />

        {/* Cyber Code & HUD Matrix grid behind head/shoulders */}
        <div
          ref={backgroundMatrixRef}
          className="absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[260px] pointer-events-none opacity-40 flex flex-col justify-between text-[8px] font-mono text-slate-500 overflow-hidden select-none"
        >
          <div className="flex justify-between border-b border-slate-400/30 pb-1">
            <span>CORE_ID // 0x7F9B10</span>
            <span>SHDR: GLSL_PHYSICAL</span>
            <span>FREQ: 144HZ</span>
          </div>
          <div className="flex justify-between text-slate-400/60 leading-tight">
            <span>&lt;canvas id=&quot;neural-core&quot; /&gt;</span>
            <span>vec4 color = texture2D();</span>
          </div>
          <div className="flex justify-between text-slate-400/60 leading-tight">
            <span>const float PI = 3.14159265;</span>
            <span>matrix.rotate(time * 0.5);</span>
          </div>
          <div className="flex justify-between border-t border-slate-400/30 pt-1 text-[7px]">
            <span>SYSTEM RUNTIME: POSIX COMPLIANT</span>
            <span>LATITUDE: 37.7749&deg; N</span>
          </div>
        </div>

        {/* Silhouette Image */}
        <div className="relative w-full h-full flex items-end justify-center">
          <Image
            src="/images/hero.png"
            alt="BROCODES Silhouette"
            fill
            priority
            sizes="(max-width: 768px) 95vw, 720px"
            className="object-contain object-bottom select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
          />
        </div>
      </div>

      {/* 8. Giant Styled "BROCODES" Typography with Tech Accents & Interactive Nodes */}
      <div
        ref={lettersRef}
        className="relative z-[16] w-full max-w-7xl px-2 sm:px-6 flex items-center justify-center -mt-16 sm:-mt-20 lg:-mt-24"
      >
        <div className="flex items-center justify-center font-display font-black text-[12.5vw] sm:text-[13.5vw] lg:text-[14.5vw] leading-none tracking-tight text-slate-900 select-none relative">
          
          {/* LETTER B: Deep dark with circuit grid */}
          <span className="relative inline-block hover:scale-105 transition-transform duration-300">
            B
          </span>

          {/* LETTER R: Pierced by Wireframe Mesh */}
          <span className="relative inline-block hover:scale-105 transition-transform duration-300">
            R
            {/* Subtle wireframe overlay on R */}
            <span className="absolute -bottom-3 -left-3 w-10 h-10 border border-cyan-400/50 rounded-lg pointer-events-none opacity-60 hidden sm:block" />
          </span>

          {/* LETTER O (First): Sci-Fi HUD Reactor Ring */}
          <span className="relative inline-block hover:scale-105 transition-transform duration-300 text-slate-900">
            O
            {/* Reactor circular HUD overlay inside O */}
            <span className="absolute inset-0 m-auto w-12 h-12 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-full border border-cyan-400/80 border-dashed animate-spin pointer-events-none opacity-80" style={{ animationDuration: '24s' }} />
            <span className="absolute inset-0 m-auto w-8 h-8 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-full border border-pink-500/60 pointer-events-none" />
          </span>

          {/* LETTER C: Circuit Trace Details */}
          <span className="relative inline-block hover:scale-105 transition-transform duration-300">
            C
          </span>

          {/* LETTER O (Second): Hub with Connected Satellite Pills */}
          <span className="relative inline-block text-slate-900">
            O
            {/* Interactive/Decorative Satellite Badges Orbiting O */}
            <div className="absolute inset-0 pointer-events-auto">
              {/* Pill 1: Three.js */}
              <div className="absolute -top-6 -left-8 sm:-top-8 sm:-left-12 px-2.5 py-1 rounded-full bg-slate-900/90 text-white border border-pink-500/60 text-[9px] sm:text-[11px] font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(236,72,153,0.5)] flex items-center gap-1.5 hover:scale-110 transition-transform cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                <span>Three.js</span>
              </div>

              {/* Pill 2: WebGL */}
              <div className="absolute -top-10 left-6 sm:-top-14 sm:left-10 px-2.5 py-1 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-400/70 text-[9px] sm:text-[11px] font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center gap-1.5 hover:scale-110 transition-transform cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>WebGL</span>
              </div>

              {/* Pill 3: AI Architecture */}
              <div className="absolute top-8 -right-12 sm:top-10 sm:-right-20 px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-200 border border-white/20 text-[9px] sm:text-[11px] font-mono font-bold tracking-wider shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center gap-1.5 hover:scale-110 transition-transform cursor-pointer whitespace-nowrap">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>AI Architecture</span>
              </div>

              {/* Pill 4: 3D Lab */}
              <div className="absolute -bottom-6 right-0 sm:-bottom-8 sm:right-2 px-2.5 py-1 rounded-full bg-pink-950/90 text-pink-300 border border-pink-400/70 text-[9px] sm:text-[11px] font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(236,72,153,0.4)] flex items-center gap-1.5 hover:scale-110 transition-transform cursor-pointer">
                <Layers className="w-3 h-3 text-pink-400" />
                <span>3D Lab</span>
              </div>
            </div>
          </span>

          {/* LETTER D: IDE Syntax Texture */}
          <span className="relative inline-block hover:scale-105 transition-transform duration-300">
            D
          </span>

          {/* LETTER E: Tech Bars */}
          <span className="relative inline-block hover:scale-105 transition-transform duration-300">
            E
          </span>

          {/* LETTER S: Circuit Ribbons */}
          <span className="relative inline-block hover:scale-105 transition-transform duration-300">
            S
          </span>
        </div>
      </div>

      {/* 9. Bottom Center: Capsule Badge, Subheadline, and Animated Mouse Indicator */}
      <div
        ref={bottomCenterRef}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 mt-6 sm:mt-8 gap-3"
      >
        {/* Dark Tech Pill Capsule */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-slate-200 border border-cyan-400/40 shadow-[0_0_20px_rgba(8,145,178,0.25)] text-xs font-mono font-bold tracking-widest uppercase">
          <span className="text-cyan-400">#</span>
          <span>CODE_ARCHITECTURE_QUANTUM</span>
        </div>

        {/* Tagline Paragraph */}
        <p className="max-w-xl text-xs sm:text-sm font-medium text-slate-600 tracking-wide leading-relaxed">
          Bespoke high-performance 3D web applications, spatial systems, and custom AI tools.
        </p>

        {/* Technical Mouse Scroll Indicator flanked by brackets [ (•) ] */}
        <div
          onClick={() => {
            const aboutSection = document.getElementById('about')
            if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' })
          }}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-500 transition-colors cursor-pointer mt-2"
        >
          <span className="font-mono text-cyan-500 font-bold text-sm">[</span>
          <div className="w-6 h-9 rounded-full border-2 border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.4)] flex items-start justify-center p-1 bg-white/40 backdrop-blur-sm">
            <div className="w-1.5 h-2.5 rounded-full bg-cyan-500 animate-bounce" />
          </div>
          <span className="font-mono text-cyan-500 font-bold text-sm">]</span>
        </div>
      </div>

      {/* Bottom Right Floating Star Accent */}
      <div className="absolute bottom-6 right-8 pointer-events-none opacity-40 hidden sm:block">
        <Sparkles className="w-6 h-6 text-slate-400 animate-pulse" />
      </div>
    </section>
  )
}
