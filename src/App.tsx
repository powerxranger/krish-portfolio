import { Suspense, lazy, useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ExperienceSection } from '@/components/ExperienceSection'
import { EducationSection } from '@/components/EducationSection'
import { Projects } from '@/components/Projects'
import { Technologies } from '@/components/Technologies'
import { Achievements } from '@/components/Achievements'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { CustomCursor } from '@/components/CustomCursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Preloader } from '@/components/Preloader'
import { StaticBackdrop } from '@/components/StaticBackdrop'
import { useSceneMode } from '@/hooks/useSceneMode'
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider'

const Experience = lazy(() => import('@/three/Experience'))

function AppInner() {
  const mode = useSceneMode()
  const { theme } = useTheme()
  const [sceneReady, setSceneReady] = useState(false)
  const [booted, setBooted] = useState(false)
  const [sceneOpacity, setSceneOpacity] = useState(1)

  const use3D = mode !== 'off'

  useEffect(() => {
    const onScroll = () => {
      const heroH = window.innerHeight
      const scrollY = window.scrollY
      // Fade from 1 → 0.2 over the bottom 40% of the hero
      const fadeStart = heroH * 0.6
      const fadeEnd = heroH * 1.1
      const t = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)))
      setSceneOpacity(1 - t * 0.8) // min opacity 0.2
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[300] rounded-md bg-[var(--accent-1)] px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>

      {/* Immersive backdrop, fixed behind everything */}
      <div className="fixed inset-0 z-0" style={{ opacity: sceneOpacity, transition: 'opacity 0.1s linear' }}>
        {use3D ? (
          <Suspense fallback={null}>
            <Experience
              quality={mode === 'full' ? 'full' : 'lite'}
              theme={theme}
              onReady={() => setSceneReady(true)}
            />
          </Suspense>
        ) : (
          <StaticBackdrop />
        )}
      </div>

      {use3D && !booted && <Preloader ready={sceneReady} onDone={() => setBooted(true)} />}

      <CustomCursor />
      <ScrollProgress />

      <div className="relative z-10">
        <Navbar />
        <main id="main">
          <Hero />
          <ExperienceSection />
          <EducationSection />
          <Projects />
          <Technologies />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}
