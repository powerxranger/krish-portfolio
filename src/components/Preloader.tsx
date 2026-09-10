import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface PreloaderProps {
  ready: boolean
  onDone: () => void
}

const BOOT_LINES = [
  'initializing neural core',
  'linking synapse lattice',
  'calibrating render pipeline',
  'system online',
]

export function Preloader({ ready, onDone }: PreloaderProps) {
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)
  const startRef = useRef(performance.now())

  useEffect(() => {
    let raf = 0
    const MIN_MS = 1500
    const tick = () => {
      const elapsed = performance.now() - startRef.current
      // ease toward 90% on a timer; only complete once assets are ready + min time passed.
      const timed = Math.min(90, (elapsed / MIN_MS) * 90)
      const target = ready && elapsed >= MIN_MS ? 100 : timed
      setPct((p) => {
        const next = p + (target - p) * 0.12
        return next > 99.4 ? 100 : next
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready])

  useEffect(() => {
    if (pct >= 99.9) {
      const t = setTimeout(() => setGone(true), 500)
      return () => clearTimeout(t)
    }
  }, [pct])

  const line = BOOT_LINES[Math.min(BOOT_LINES.length - 1, Math.floor((pct / 100) * BOOT_LINES.length))]
  const rounded = Math.round(pct)

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* pulsing core mark */}
          <div className="relative mb-10 flex size-24 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-[var(--accent-2)] opacity-20" />
            <div
              className="absolute inset-3 rounded-full blur-md"
              style={{
                background:
                  'radial-gradient(circle, color-mix(in oklab, var(--accent-2) 80%, transparent), transparent 70%)',
              }}
            />
            <div className="size-4 rounded-full bg-[var(--accent-2)] shadow-[0_0_30px_var(--accent-2)]" />
          </div>

          <div className="w-64 max-w-[70vw]">
            <div className="mb-3 flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span className="uppercase tracking-[0.2em]">{line}</span>
              <span className="text-[var(--accent-2)]">{rounded}%</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-[image:var(--grad)]"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
