'use client'

import React, { useEffect, useState } from 'react'

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)

  useEffect(() => {
    // Quick, snappy counter that finishes in ~450ms
    let current = 0
    const interval = setInterval(() => {
      current += 12
      if (current >= 100) {
        current = 100
        setProgress(100)
        clearInterval(interval)

        setTimeout(() => {
          setIsDone(true)
          if (onComplete) onComplete()
          setTimeout(() => {
            setIsRemoved(true)
          }, 500)
        }, 150)
      } else {
        setProgress(current)
      }
    }, 28)

    return () => clearInterval(interval)
  }, [onComplete])

  if (isRemoved) return null

  return (
    <div
      aria-hidden={isDone}
      className={`fixed inset-0 z-[100000] flex flex-col justify-between p-6 sm:p-12 bg-[#080C14] text-white transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isDone ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
          <span className="font-display font-black tracking-widest text-base text-white">
            BROCODES
          </span>
        </div>
        <div className="font-mono text-xs tracking-widest text-primary font-bold">
          [ SPATIAL CORE ONLINE ]
        </div>
      </div>

      {/* Center: Numeric Counter */}
      <div className="my-auto py-8 flex flex-col items-center justify-center text-center">
        <div className="relative">
          <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 select-none">
            {progress}
            <span className="text-primary text-3xl sm:text-5xl md:text-6xl">%</span>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden mt-6">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xs font-mono text-slate-500">
        <div>&copy; {new Date().getFullYear()} BROCODES</div>
        <div className="text-primary font-bold">60 FPS STATIC RUNTIME</div>
      </div>
    </div>
  )
}
