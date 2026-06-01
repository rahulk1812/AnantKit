import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Orb({ color, position, scale, distort, speed }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.12
    ref.current.rotation.y = state.clock.elapsedTime * 0.18
  })
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
      <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          distort={distort || 0.4}
          speed={speed || 2}
          roughness={0.1}
          metalness={0.6}
          transparent
          opacity={0.82}
        />
      </Sphere>
    </Float>
  )
}

function Ring() {
  const ref = useRef()
  const count = 800
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const r = 3.6 + (Math.random() - 0.5) * 1.4
    positions[i * 3]     = Math.cos(angle) * r
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.7
    positions[i * 3 + 2] = Math.sin(angle) * r
  }
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.04 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#6366f1" transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ position: 'absolute', inset: 0 }}>
      <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.4} />
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-4, -4, 3]} intensity={1} color="#a855f7" />
      <pointLight position={[0, 4, -4]} intensity={0.7} color="#06b6d4" />
      <Suspense fallback={null}>
        <Orb color="#6366f1" position={[-2.4, 0.5, 0]} scale={1} distort={0.45} speed={2} />
        <Orb color="#a855f7" position={[2.4, -0.4, -1]} scale={0.7} distort={0.5} speed={2.5} />
        <Orb color="#06b6d4" position={[0, -2, 1]} scale={0.45} distort={0.35} speed={1.8} />
        <Ring />
      </Suspense>
    </Canvas>
  )
}

export function LoadingScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ position: 'absolute', inset: 0 }}>
      <Stars radius={60} depth={40} count={2000} factor={2} fade speed={0.6} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 3]} intensity={2} color="#6366f1" />
      <Suspense fallback={null}>
        <Orb color="#6366f1" position={[0, 0, 0]} scale={1.1} distort={0.5} speed={3} />
      </Suspense>
    </Canvas>
  )
}

export function MiniOrb({ color }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={2} color={color} />
      <Suspense fallback={null}>
        <Orb color={color} position={[0, 0, 0]} scale={0.65} distort={0.5} speed={3} />
      </Suspense>
    </Canvas>
  )
}
