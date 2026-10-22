'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let animFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Smooth lerp loop for the trailing ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      animFrameId = requestAnimationFrame(render)
    }

    animFrameId = requestAnimationFrame(render)

    // Element hover detection
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]')
      if (interactive) {
        setIsHovered(true)
        const customBadge = interactive.getAttribute('data-cursor')
        if (customBadge) {
          setCursorText(customBadge)
        } else {
          setCursorText('')
        }
      } else {
        setIsHovered(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleOver)

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleOver)
    }
  }, [isVisible])

  return (
    <>
      {/* Central Sharp Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-2.5 h-2.5 -ml-1.25 -mt-1.25 bg-primary rounded-full pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'scale-0' : 'scale-100'}`}
      />

      {/* Trailing Lerped Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -ml-5 -mt-5 flex items-center justify-center transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? 'w-16 h-16 -ml-8 -mt-8 bg-primary/20 border-2 border-primary backdrop-blur-[2px]'
            : 'w-10 h-10 border border-primary/50'
        } rounded-full`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold tracking-wider text-white uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  )
}
