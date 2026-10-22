'use client'

import React, { useRef, useState } from 'react'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  strength?: number
  asLink?: boolean
  href?: string
}

export default function MagneticButton({
  children,
  className = '',
  strength = 30,
  asLink = false,
  href,
  onClick,
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = btnRef.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: (middleX / width) * strength, y: (middleY / height) * strength })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const content = (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className="inline-block"
    >
      {asLink ? (
        <a
          href={href}
          className={`cursor-pointer inline-flex items-center justify-center ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          onClick={onClick}
          className={`cursor-pointer inline-flex items-center justify-center ${className}`}
          {...props}
        >
          {children}
        </button>
      )}
    </div>
  )

  return content
}
