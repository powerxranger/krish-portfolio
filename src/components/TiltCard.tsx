import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
}

export function TiltCard({ children, className, max = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [coarse, setCoarse] = useState(false)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const srx = useSpring(rx, { stiffness: 250, damping: 20 })
  const sry = useSpring(ry, { stiffness: 250, damping: 20 })

  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12), transparent 45%)`

  useEffect(() => {
    setCoarse(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  function handleMove(e: React.PointerEvent) {
    if (coarse) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * (max * 2))
    rx.set((0.5 - py) * (max * 2))
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  function reset() {
    rx.set(0)
    ry.set(0)
    glareX.set(50)
    glareY.set(50)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={cn('relative [transform-style:preserve-3d]', className)}
    >
      {children}
      {!coarse && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{ background: glare }}
        />
      )}
    </motion.div>
  )
}
