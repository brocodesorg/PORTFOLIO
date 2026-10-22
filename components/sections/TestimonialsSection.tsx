'use client'

import React, { useState, useRef } from 'react'
import { siteContent, TestimonialItem } from '@/app/content'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragStartX, setDragStartX] = useState<number | null>(null)
  const items = siteContent.testimonials

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartX(e.clientX)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX === null) return
    const diff = e.clientX - dragStartX
    if (diff > 50) {
      handlePrev()
    } else if (diff < -50) {
      handleNext()
    }
    setDragStartX(null)
  }

  const current = items[currentIndex]

  return (
    <section
      id="testimonials"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#080C14] text-white overflow-hidden select-none"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              07 // ENDORSEMENTS &bull; CLIENT VOICES
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white">
            What Leaders Say
          </h2>
        </div>

        {/* Testimonial Card with Drag Affordance */}
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          data-cursor="DRAG"
          className="relative rounded-3xl bg-white/[0.03] border border-white/10 p-8 sm:p-12 md:p-16 backdrop-blur-md hover:border-primary/40 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing"
        >
          {/* Giant Quote Icon Decor */}
          <div className="absolute top-8 right-8 text-white/5 pointer-events-none">
            <Quote className="w-24 h-24 rotate-180" />
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mb-8">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Quote Body */}
          <blockquote className="font-display font-semibold text-xl sm:text-2xl md:text-3xl leading-snug text-white mb-10">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* Author Details */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-display font-black text-white text-base shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                {current.avatar}
              </div>
              <div>
                <div className="font-display font-bold text-base text-white">
                  {current.author}
                </div>
                <div className="font-mono text-xs text-slate-400">
                  {current.role} &bull; <span className="text-cyan-400">{current.company}</span>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="font-mono text-xs text-slate-400 px-2">
                <span className="text-white font-bold">{currentIndex + 1}</span> / {items.length}
              </div>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/10 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-primary shadow-[0_0_10px_rgba(236,72,153,0.8)]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
