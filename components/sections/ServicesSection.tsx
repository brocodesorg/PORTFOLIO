'use client'

import React, { useRef, useState } from 'react'
import { siteContent, ServiceItem } from '@/app/content'
import { Code2, Smartphone, BrainCircuit, Palette, Cloud, CheckCircle2, ArrowRight } from 'lucide-react'

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePos({ x, y })

    // Calculate tilt
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -7
    const rotateY = ((x - centerX) / centerX) * 7

    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  const getIcon = (type: ServiceItem['icon']) => {
    switch (type) {
      case 'code':
        return <Code2 className="w-8 h-8 text-primary" />
      case 'smartphone':
        return <Smartphone className="w-8 h-8 text-cyan-400" />
      case 'brain':
        return <BrainCircuit className="w-8 h-8 text-fuchsia-400" />
      case 'palette':
        return <Palette className="w-8 h-8 text-amber-400" />
      case 'cloud':
        return <Cloud className="w-8 h-8 text-emerald-400" />
      default:
        return <Code2 className="w-8 h-8 text-primary" />
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="EXPLORE"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative rounded-2xl bg-white/[0.02] border border-white/10 p-8 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(236,72,153,0.12)] will-change-transform"
    >
      {/* Cursor Follow Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(236,72,153,0.18), transparent 60%)`,
        }}
      />

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
            {getIcon(service.icon)}
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-semibold group-hover:text-primary group-hover:border-primary/30 transition-colors">
            {service.badge}
          </span>
        </div>

        <div className="font-mono text-xs text-primary font-bold tracking-widest uppercase mb-1">
          CAPABILITY // {service.number}
        </div>

        <h3 className="font-display font-black text-2xl text-white mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        <div className="text-xs font-mono text-cyan-400 mb-4">
          {service.subtitle}
        </div>

        <p className="font-body text-slate-400 text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Feature bullet list */}
        <div className="space-y-2.5 mb-8 border-t border-white/5 pt-6">
          {service.features.map((feature, fIdx) => (
            <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
        <span>LEARN MORE</span>
        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 bg-[#080C14] text-white overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                03 // ARCHITECTURE &bull; FULL-CYCLE SERVICES
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white">
              What We Build
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400 leading-relaxed">
            From high-converting 3D web applications to intelligent multi-agent networks, our full-stack engineering studio turns technical complexity into seamless user delight.
          </p>
        </div>

        {/* 3D Tilt Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
