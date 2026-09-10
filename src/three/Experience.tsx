import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Grid, Icosahedron, Sphere, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { SCENE } from '@/theme/theme'
import type { ScenePalette, Theme } from '@/theme/theme'

type Quality = 'full' | 'lite'

/* Shared pointer (canvas is fixed behind DOM content, so read window events). */
const pointer = { x: 0, y: 0 }
function usePointerTracking() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}

function getScroll() {
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  return max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0
}

const CORE_POS = new THREE.Vector3(1.2, 0.25, 0)

/* Build node positions + synapse lines between near neighbours (stable across themes). */
function buildGraph(count: number, threshold: number, maxPerNode: number) {
  const nodePos = new Float32Array(count * 3)
  const pts: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    const r = 1.7 + Math.pow(Math.random(), 0.6) * 3.1
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const v = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi) * 0.7,
      r * Math.sin(phi) * Math.sin(theta),
    )
    pts.push(v)
    nodePos[i * 3] = v.x
    nodePos[i * 3 + 1] = v.y
    nodePos[i * 3 + 2] = v.z
  }
  const lines: number[] = []
  const degree = new Array(count).fill(0)
  for (let i = 0; i < count; i++) {
    if (degree[i] >= maxPerNode) continue
    for (let j = i + 1; j < count; j++) {
      if (degree[i] >= maxPerNode) break
      if (degree[j] >= maxPerNode) continue
      if (pts[i].distanceTo(pts[j]) < threshold) {
        lines.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        degree[i]++
        degree[j]++
      }
    }
  }
  return { nodePos, linePos: new Float32Array(lines) }
}

function NeuralNet({ count, palette }: { count: number; palette: ScenePalette }) {
  const group = useRef<THREE.Group>(null)
  const { nodePos, linePos } = useMemo(() => buildGraph(count, 1.15, 4), [count])
  const nodeCol = useMemo(() => {
    const cols = new Float32Array(count * 3)
    const pal = palette.nodes.map((c) => new THREE.Color(c))
    for (let i = 0; i < count; i++) {
      const c = pal[(Math.random() * pal.length) | 0]
      cols[i * 3] = c.r
      cols[i * 3 + 1] = c.g
      cols[i * 3 + 2] = c.b
    }
    return cols
  }, [count, palette.nodes])

  useFrame((_s, dt) => {
    if (!group.current) return
    group.current.rotation.y += dt * 0.05 * palette.speed
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.15, 0.03)
  })

  const blending = palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending

  return (
    <group ref={group} position={CORE_POS}>
      <points key={`nodes-${palette.additive}`}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePos, 3]} />
          <bufferAttribute attach="attributes-color" args={[nodeCol, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={blending}
          sizeAttenuation
          toneMapped={false}
        />
      </points>
      <lineSegments key={`lines-${palette.additive}`}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={palette.line}
          transparent
          opacity={palette.lineOpacity}
          depthWrite={false}
          blending={blending}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  )
}

function AICore({ palette }: { palette: ScenePalette }) {
  const group = useRef<THREE.Group>(null)
  const cage = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)
  const coreColor = useMemo(() => new THREE.Color(), [])
  const cageColor = useMemo(() => new THREE.Color(), [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const p = getScroll()

    if (cage.current) {
      cage.current.rotation.y += dt * 0.15 * palette.speed
      cage.current.rotation.x += dt * 0.05 * palette.speed
    }
    if (inner.current) {
      const pulse = 1 + Math.sin(t * 2.2) * 0.08
      inner.current.scale.setScalar(pulse)
      const mat = inner.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity =
        (palette.bloom > 0 ? 2.4 : 0.5) + Math.sin(t * 2.2) * (palette.bloom > 0 ? 0.9 : 0.15)
    }
    if (palette.hueShift > 0) {
      const hue = palette.baseHue + p * palette.hueShift
      if (inner.current) {
        coreColor.setHSL(hue % 1, 0.85, 0.6)
        ;((inner.current.material as THREE.MeshStandardMaterial).emissive as THREE.Color).lerp(
          coreColor,
          0.06,
        )
      }
      if (cage.current) {
        cageColor.setHSL((hue + 0.05) % 1, 0.8, 0.6)
        ;(cage.current.material as THREE.MeshBasicMaterial).color.lerp(cageColor, 0.06)
      }
    }
    if (ring1.current) ring1.current.rotation.z += dt * 0.6 * palette.speed
    if (ring2.current) {
      ring2.current.rotation.x += dt * 0.5 * palette.speed
      ring2.current.rotation.y += dt * 0.25 * palette.speed
    }
    if (ring3.current) {
      ring3.current.rotation.y += dt * 0.7 * palette.speed
      ring3.current.rotation.z -= dt * 0.3 * palette.speed
    }
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.3, 0.04)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.2, 0.04)
    }
  })

  return (
    <group ref={group} position={CORE_POS}>
      <Sphere ref={inner} args={[0.5, 48, 48]}>
        <meshStandardMaterial
          color={palette.additive ? '#0a0f2c' : palette.core}
          emissive={palette.core}
          emissiveIntensity={palette.bloom > 0 ? 2.6 : 0.5}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>
      <Icosahedron ref={cage} args={[1.15, 1]}>
        <meshBasicMaterial color={palette.cage} wireframe toneMapped={false} transparent opacity={0.85} />
      </Icosahedron>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.012, 16, 120]} />
        <meshBasicMaterial color={palette.rings[0]} toneMapped={false} />
      </mesh>
      <mesh ref={ring2} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1.95, 0.01, 16, 120]} />
        <meshBasicMaterial color={palette.rings[1]} toneMapped={false} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.2, 0.008, 16, 120]} />
        <meshBasicMaterial color={palette.rings[2]} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Starfield({ count = 600, palette }: { count?: number; palette: ScenePalette }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [count])

  useFrame((_s, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.01
  })

  return (
    <points ref={ref} key={`stars-${palette.additive}`}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={palette.star}
        transparent
        opacity={palette.starOpacity}
        depthWrite={false}
        blending={palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  )
}

function HoloGrid({ palette }: { palette: ScenePalette }) {
  return (
    <Grid
      position={[0, -2.2, 0]}
      args={[40, 40]}
      cellSize={0.6}
      cellThickness={0.6}
      cellColor={palette.gridCell}
      sectionSize={3}
      sectionThickness={1.1}
      sectionColor={palette.gridSection}
      fadeDistance={34}
      fadeStrength={1.4}
      infiniteGrid
      followCamera={false}
    />
  )
}

function Rig() {
  const target = useMemo(() => new THREE.Vector3(0.8, 0, 0), [])
  useFrame((state) => {
    const p = getScroll()
    const cam = state.camera
    const orbit = Math.sin(p * Math.PI * 1.4) * 2.2
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, orbit + pointer.x * 0.6, 0.05)
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, 0.6 - p * 1.2 + pointer.y * 0.4, 0.05)
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, 7.2 - p * 3.4, 0.05)
    cam.lookAt(target)
  })
  return null
}

function Effects({ intensity }: { intensity: number }) {
  const ca = useMemo(() => new THREE.Vector2(0.0006, 0.0009), [])
  return (
    <EffectComposer>
      <Bloom mipmapBlur intensity={intensity} luminanceThreshold={0.12} luminanceSmoothing={0.35} radius={0.75} />
      <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={ca} radialModulation={false} modulationOffset={0} />
      <Vignette eskil={false} offset={0.22} darkness={0.72} />
    </EffectComposer>
  )
}

export default function Experience({
  quality = 'full',
  theme = 'dark',
  onReady,
}: {
  quality?: Quality
  theme?: Theme
  onReady?: () => void
}) {
  usePointerTracking()
  const palette = SCENE[theme]
  const full = quality === 'full'
  const bloomOn = full && palette.bloom > 0
  const [dpr, setDpr] = useState<number>(full ? 1.5 : 1)

  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <Canvas
      camera={{ position: [0, 0.6, 7.2], fov: 48 }}
      dpr={dpr}
      gl={{ antialias: full, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={[palette.background]} />
      <fog attach="fog" args={[palette.background, palette.fog[0], palette.fog[1]]} />

      {full && (
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.75)}
          flipflops={3}
          onFallback={() => setDpr(1)}
        />
      )}

      <ambientLight intensity={theme === 'light' ? 0.9 : 0.4} />
      <pointLight position={[3, 3, 4]} intensity={40} color={palette.rings[0]} />
      <pointLight position={[-3, -2, 2]} intensity={30} color={palette.cage} />

      <AICore palette={palette} />
      <NeuralNet count={full ? 260 : 120} palette={palette} />
      {full && <Starfield palette={palette} />}
      <HoloGrid palette={palette} />

      <Rig />
      {bloomOn && <Effects intensity={palette.bloom} />}
    </Canvas>
  )
}
