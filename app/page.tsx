'use client'

import React, { useState } from 'react'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import Preloader from '@/components/ui/Preloader'
import ProgressBar from '@/components/ui/ProgressBar'
import Navbar from '@/components/layout/Navbar'

import HeroSection from '@/components/sections/HeroSection'
import AboutManifestoSection from '@/components/sections/AboutManifestoSection'
import ShowcaseSection from '@/components/sections/ShowcaseSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AchievementsSection from '@/components/sections/AchievementsSection'
import TechStackSection from '@/components/sections/TechStackSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  const [preloaderFinished, setPreloaderFinished] = useState(false)

  return (
    <SmoothScrollProvider>
      {/* Cinematic Awwwards Preloader */}
      <Preloader onComplete={() => setPreloaderFinished(true)} />

      {/* Custom Lerping Cursor */}
      <CustomCursor />

      {/* Top Scroll Progress Indicator */}
      <ProgressBar />

      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="relative w-full overflow-hidden">
        {/* 1. Hero Screen */}
        <HeroSection />

        {/* 2. About / Manifesto Section */}
        <AboutManifestoSection />

        {/* 3. 3D Showcase Section (Pinned R3F Scene) */}
        <ShowcaseSection />

        {/* 4. Services (3D Tilt Cards) */}
        <ServicesSection />

        {/* 5. Projects (Pinned Horizontal Scroll Gallery) */}
        <ProjectsSection />

        {/* 6. Achievements (Glowing Timeline) */}
        <AchievementsSection />

        {/* 7. Tech Stack (Infinite Marquee) */}
        <TechStackSection />

        {/* 8. Testimonials (Draggable Carousel) */}
        <TestimonialsSection />

        {/* 9. Contact & Climax Section */}
        <ContactSection />
      </main>
    </SmoothScrollProvider>
  )
}
