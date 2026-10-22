'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MouseCoords {
  x: number
  y: number
}

function FloatingGeometries({ mouse }: { mouse: React.MutableRefObject<MouseCoords> }) {
  const groupRef = useRef<THREE.Group>(null)
  const octaRef = useRef<THREE.Mesh>(null)
  const dodecaRef = useRef<THREE.Mesh>(null)
  const tetraRef = useRef<THREE.Mesh>(null)
  const ringGroupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return

    // Smooth lerp to mouse
    groupRef.current.rotation.y += (mouse.current.x * 0.35 - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (-mouse.current.y * 0.25 - groupRef.current.rotation.x) * 0.05

    const t = state.clock.getElapsedTime()

    // Floating Octahedron (Diamond Crystal)
    if (octaRef.current) {
      octaRef.current.rotation.x = t * 0.25
      octaRef.current.rotation.y = t * 0.35
      octaRef.current.position.y = 1.3 + Math.sin(t * 1.6) * 0.18
    }

    // Floating Dodecahedron (Faceted Cyber Core)
    if (dodecaRef.current) {
      dodecaRef.current.rotation.y = t * 0.2
      dodecaRef.current.rotation.z = t * 0.3
      dodecaRef.current.position.y = -1.1 + Math.cos(t * 1.3) * 0.2
    }

    // Floating Tetrahedron (Prism Shard)
    if (tetraRef.current) {
      tetraRef.current.rotation.x = t * 0.3
      tetraRef.current.rotation.z = t * 0.2
      tetraRef.current.position.y = 0.2 + Math.sin(t * 1.2) * 0.15
    }

    // Orbital ring
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z = t * 0.08
      ringGroupRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.4) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {/* Upper Right: Floating Diamond Octahedron */}
      <mesh ref={octaRef} position={[2.8, 1.3, -1.2]}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial
          color="#EC4899"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Lower Left: Floating Faceted Dodecahedron */}
      <mesh ref={dodecaRef} position={[-2.9, -1.1, -1.4]}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial
          color="#0891B2"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Subtle Right Center: Cyber Tetrahedron Prism */}
      <mesh ref={tetraRef} position={[3.2, -0.4, -2]}>
        <tetrahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial
          color="#F472B6"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Background Orbital Coordinate Ring */}
      <group ref={ringGroupRef} position={[0, 0, -3.2]}>
        <mesh>
          <ringGeometry args={[3.4, 3.44, 72]} />
          <meshBasicMaterial
            color="#0F172A"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}

function FloatingParticles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const color1 = new THREE.Color('#EC4899')
    const color2 = new THREE.Color('#0891B2')
    const color3 = new THREE.Color('#64748B')

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2.2 + Math.random() * 3.5
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1

      const choice = Math.random()
      const selected = choice < 0.45 ? color1 : choice < 0.75 ? color2 : color3
      col[i * 3] = selected.r
      col[i * 3 + 1] = selected.g
      col[i * 3 + 2] = selected.b
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = t * 0.035
    pointsRef.current.rotation.x = Math.sin(t * 0.025) * 0.04
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function HeroCanvas3D({ mouse }: { mouse: React.MutableRefObject<MouseCoords> }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[10] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingGeometries mouse={mouse} />
        <FloatingParticles count={80} />
      </Canvas>
    </div>
  )
}
