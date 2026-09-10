import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'motion/react'
import { cn } from '@/lib/utils'

interface GlareCardProps {
  children: ReactNode
  className?: string
}

export function GlareCard({ children, className }: GlareCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [coarse, setCoarse] = useState(false)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const opacity = useMotionValue(0)

  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.10), transparent 55%)`

  useEffect(() => {
    setCoarse(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      onPointerMove={(e) => {
        if (coarse) return
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        glareX.set(((e.clientX - rect.left) / rect.width) * 100)
        glareY.set(((e.clientY - rect.top) / rect.height) * 100)
        opacity.set(1)
      }}
      onPointerLeave={() => opacity.set(0)}
    >
      {children}
      {!coarse && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glare, opacity }}
        />
      )}
    </div>
  )
}
