import { useEffect, useState } from 'react'

export type SceneMode = 'full' | 'lite' | 'off'

/**
 * Decides how heavy a 3D experience the device should get.
 * - 'off'  : user prefers reduced motion -> no WebGL, static backdrop instead
 * - 'lite' : coarse pointer / small screen / low memory / few cores -> lighter scene
 * - 'full' : capable desktop -> full scene with post-processing
 */
function detectMode(): SceneMode {
  if (typeof window === 'undefined') return 'full'

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'off'

  const coarse = window.matchMedia('(pointer: coarse)').matches
  const small = window.innerWidth < 768
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const lowMem = typeof deviceMemory === 'number' && deviceMemory <= 4
  const fewCores =
    typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4

  if (coarse || small || lowMem || fewCores) return 'lite'
  return 'full'
}

export function useSceneMode(): SceneMode {
  const [mode, setMode] = useState<SceneMode>('full')

  useEffect(() => {
    setMode(detectMode())

    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setMode(detectMode())
    mqMotion.addEventListener('change', onChange)
    window.addEventListener('resize', onChange)
    return () => {
      mqMotion.removeEventListener('change', onChange)
      window.removeEventListener('resize', onChange)
    }
  }, [])

  return mode
}
