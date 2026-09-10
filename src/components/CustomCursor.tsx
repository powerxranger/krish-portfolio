import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const nextId = useRef(0)

  // Exact cursor position — no lag
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Ring — noticeable lag but not sluggish
  const rx = useSpring(mx, { stiffness: 80, damping: 22, mass: 0.7 })
  const ry = useSpring(my, { stiffness: 80, damping: 22, mass: 0.7 })

  // Global spotlight — lazy drift
  const sx = useSpring(mx, { stiffness: 60, damping: 28, mass: 1.0 })
  const sy = useSpring(my, { stiffness: 60, damping: 28, mass: 1.0 })

  // Comet tail — tight at the head, stretches further back
  const ax = useSpring(mx, { stiffness: 110, damping: 24 })
  const ay = useSpring(my, { stiffness: 110, damping: 24 })
  const bx = useSpring(ax, { stiffness: 80, damping: 24 })
  const by = useSpring(ay, { stiffness: 80, damping: 24 })
  const cx = useSpring(bx, { stiffness: 58, damping: 24 })
  const cy = useSpring(by, { stiffness: 58, damping: 24 })
  const dx = useSpring(cx, { stiffness: 40, damping: 24 })
  const dy = useSpring(cy, { stiffness: 40, damping: 24 })
  const ex = useSpring(dx, { stiffness: 26, damping: 24 })
  const ey = useSpring(dy, { stiffness: 26, damping: 24 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    document.body.classList.add('custom-cursor')
    setEnabled(true)

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      setHover(
        !!t.closest(
          'a[href], button:not(:disabled), [role="button"]:not([aria-disabled="true"]), input, textarea, select, label[for]',
        ),
      )
    }

    const onDown = (e: MouseEvent) => {
      setClicking(true)
      const id = nextId.current++
      setRipples((p) => [...p, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setRipples((p) => p.filter((r) => r.id !== id)), 700)
    }

    const onUp = () => setClicking(false)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [mx, my])

  if (!enabled) return null

  const tail = [
    { x: ax, y: ay, size: 7,   opacity: 0.55 },
    { x: bx, y: by, size: 5.5, opacity: 0.40 },
    { x: cx, y: cy, size: 4,   opacity: 0.27 },
    { x: dx, y: dy, size: 3,   opacity: 0.15 },
    { x: ex, y: ey, size: 2,   opacity: 0.08 },
  ]

  return (
    <>
      {/* ── Global page spotlight ── */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[20] hidden sm:block"
        style={{ x: sx, y: sy }}
      >
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, var(--accent-1) 0%, transparent 70%)',
            opacity: 0.10,
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* ── Comet tail ── */}
      {tail.map((dot, i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed left-0 top-0 z-[9994] hidden sm:block"
          style={{ x: dot.x, y: dot.y }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: dot.size,
              height: dot.size,
              borderRadius: '50%',
              background: 'white',
              mixBlendMode: 'exclusion',
              transform: 'translate(-50%, -50%)',
              opacity: dot.opacity,
            }}
          />
        </motion.div>
      ))}

      {/* ── Outer ring ── */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997] hidden sm:block"
        style={{ x: rx, y: ry }}
      >
        {/* Ring circle */}
        <motion.div
          className="absolute left-0 top-0 rounded-full"
          style={{
            mixBlendMode: 'exclusion',
            border: '1.5px solid white',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            width: hover ? 56 : clicking ? 22 : 38,
            height: hover ? 56 : clicking ? 22 : 38,
            opacity: hover ? 0.9 : 0.7,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        />

        {/* Arrow label — appears on hover */}
        <AnimatePresence>
          {hover && (
            <motion.span
              key="label"
              className="absolute left-0 top-0 flex select-none items-center justify-center text-[11px] font-bold text-white"
              style={{
                mixBlendMode: 'exclusion',
                transform: 'translate(-50%, -50%)',
                width: 56,
                height: 56,
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.15 }}
            >
              ↗
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Crisp center dot ── */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden sm:block"
        style={{ x: mx, y: my }}
      >
        <motion.div
          className="absolute left-0 top-0 rounded-full bg-white"
          style={{ mixBlendMode: 'exclusion', transform: 'translate(-50%, -50%)' }}
          animate={{
            width: 8,
            height: 8,
            scale: clicking ? 0.3 : hover ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      </motion.div>

      {/* ── Click ripples ── */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="pointer-events-none fixed z-[9996] hidden sm:block rounded-full"
          style={{
            mixBlendMode: 'exclusion',
            border: '1px solid white',
            left: r.x,
            top: r.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 14, height: 14, opacity: 0.85 }}
          animate={{ width: 90, height: 90, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.2, 0, 0.8, 1] }}
        />
      ))}
    </>
  )
}
