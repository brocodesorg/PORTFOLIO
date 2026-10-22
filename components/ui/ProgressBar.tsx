'use client'

import React, { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight <= 0) return
      const current = window.scrollY / totalHeight
      setScrollProgress(Math.min(1, Math.max(0, current)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[99999] pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-fuchsia-500 to-accent origin-left transition-transform duration-75 ease-out shadow-[0_0_10px_rgba(236,72,153,0.8)]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </div>
  )
}
