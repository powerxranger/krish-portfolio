import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/Magnetic'
import { ScrambleText } from '@/components/ScrambleText'
import { links } from '@/data'

function useTyping(word: string, startDelay = 700, speed = 80) {
  const [text, setText] = useState('')
  useEffect(() => {
    let i = 0
    let interval: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setText(word.slice(0, i))
        if (i >= word.length) clearInterval(interval)
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [word, startDelay, speed])
  return text
}

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export function Hero() {
  const reduce = useReducedMotion()
  const typed = useTyping('Krish')
  const name = reduce ? 'Krish' : typed

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16 sm:px-10 lg:px-20"
    >
      {/* legibility scrim over the 3D world (stronger on small/tablet screens) */}
      <div className="pointer-events-none absolute inset-0 bg-background/55 md:bg-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background)_18%,transparent_70%)] md:bg-[linear-gradient(90deg,var(--background)_28%,transparent_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--background),transparent)]" />

      <motion.div
        className="relative z-10 max-w-3xl"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
      >
        <motion.div
          variants={fade}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--accent-2)]/25 bg-[color:var(--accent-2)]/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-2)] backdrop-blur-sm"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--accent-2)] opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[var(--accent-2)]" />
          </span>
          Systems online · open to work
        </motion.div>

        <motion.h1
          variants={fade}
          transition={{ duration: 0.5 }}
          className="mb-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Hi, I'm <span className="text-grad">{name}</span>
          {!reduce && <span className="text-grad animate-pulse">|</span>}.
          <br />
          I build AI
          <br />
          {reduce ? (
            <span className="text-grad">that ships.</span>
          ) : (
            <ScrambleText text="that ships." className="text-grad" startDelay={950} />
          )}
        </motion.h1>

        <motion.p
          variants={fade}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          Full-stack engineer and DTU grad shipping production AI. From LLM-powered research platforms to cross-platform security tools. Currently open to full-time roles.
        </motion.p>

        <motion.div variants={fade} transition={{ duration: 0.5 }} className="flex flex-wrap gap-4">
          <Magnetic>
            <Button
              asChild
              size="lg"
              className="bg-[image:var(--grad)] text-white shadow-[0_0_30px_rgba(108,99,255,.4)] transition-shadow hover:shadow-[0_0_60px_rgba(108,99,255,.7)]"
            >
              <a href="#experience">
                Explore my work <ArrowDown className="size-4" />
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border bg-background/40 backdrop-blur-sm"
            >
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume <ArrowRight className="size-4" />
              </a>
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.a
        href="#experience"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="animate-scroll-dot relative h-10 w-6 rounded-full border-2 border-border" />
        scroll
      </motion.a>
    </section>
  )
}
