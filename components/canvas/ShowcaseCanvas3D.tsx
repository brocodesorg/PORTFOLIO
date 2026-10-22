'use client'

import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface ShowcaseCanvas3DProps {
  scrollProgress?: number
  materialMode?: 'cyber' | 'glass' | 'chrome' | 'wireframe'
  activeColor?: string
}

function CoreGeometry({
  scrollProgress = 0,
  materialMode = 'cyber',
  activeColor = '#EC4899',
}: {
  scrollProgress?: number
  materialMode?: 'cyber' | 'glass' | 'chrome' | 'wireframe'
  activeColor?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const outerRingRef = useRef<THREE.Group>(null)
  const innerRingRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    if (meshRef.current) {
      // Rotation influenced by time + scroll progress
      meshRef.current.rotation.x = t * 0.25 + scrollProgress * Math.PI * 2
      meshRef.current.rotation.y = t * 0.35 + scrollProgress * Math.PI * 3
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.2
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.15 + scrollProgress * Math.PI
      outerRingRef.current.rotation.y = -t * 0.2
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = t * 0.2
      innerRingRef.current.rotation.y = t * 0.25
    }
  })

  // Material selection based on mode
  const material = useMemo(() => {
    const color = new THREE.Color(activeColor)

    if (materialMode === 'wireframe') {
      return (
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.8}
        />
      )
    }

    if (materialMode === 'chrome') {
      return (
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.95}
          roughness={0.1}
          wireframe={false}
        />
      )
    }

    if (materialMode === 'glass') {
      return (
        <meshPhysicalMaterial
          color={color}
          transmission={0.85}
          opacity={1}
          transparent
          roughness={0.1}
          ior={1.5}
          thickness={1.2}
          specularIntensity={1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      )
    }

    // Default 'cyber' mode
    return (
      <meshStandardMaterial
        color={color}
        metalness={0.85}
        roughness={0.2}
        wireframe={false}
      />
    )
  }, [materialMode, activeColor])

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <group>
        {/* Central Complex Torus Knot */}
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.2, 0.38, 128, 32, 2, 3]} />
          {material}
        </mesh>

        {/* Orbit Ring 1 */}
        <group ref={outerRingRef}>
          <mesh>
            <torusGeometry args={[2.5, 0.03, 16, 100]} />
            <meshBasicMaterial color={activeColor} transparent opacity={0.4} />
          </mesh>
          <mesh position={[2.5, 0, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color="#0891B2" />
          </mesh>
        </group>

        {/* Orbit Ring 2 with opposite tilt */}
        <group ref={innerRingRef} rotation={[Math.PI / 3, 0, 0]}>
          <mesh>
            <torusGeometry args={[2.0, 0.02, 16, 80]} />
            <meshBasicMaterial color="#0891B2" transparent opacity={0.3} />
          </mesh>
          <mesh position={[-2.0, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#EC4899" />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

function AmbientStars() {
  const count = 120
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2
    }
    return [pos]
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#64748B" transparent opacity={0.4} />
    </points>
  )
}

export default function ShowcaseCanvas3D({
  scrollProgress = 0,
  materialMode = 'cyber',
  activeColor = '#EC4899',
}: ShowcaseCanvas3DProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#080C14']} />
        
        {/* Studio Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-5, -4, 2]} intensity={2.5} color={activeColor} />
        <pointLight position={[5, 3, -2]} intensity={2.0} color="#0891B2" />
        <spotLight
          position={[0, 6, 4]}
          angle={0.6}
          penumbra={0.8}
          intensity={1.2}
          color="#FFFFFF"
        />

        <CoreGeometry
          scrollProgress={scrollProgress}
          materialMode={materialMode}
          activeColor={activeColor}
        />
        <AmbientStars />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.6}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
        />
      </Canvas>
    </div>
  )
}
