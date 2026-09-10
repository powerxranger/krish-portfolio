import { useEffect, useRef, useState } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#01'

interface ScrambleTextProps {
  text: string
  className?: string
  /** ms before the decode starts */
  startDelay?: number
  /** how fast characters resolve */
  speed?: number
}

/** Animates from random glyphs to the target string (cyber "decode" effect). */
export function ScrambleText({ text, className, startDelay = 0, speed = 1 }: ScrambleTextProps) {
  const [display, setDisplay] = useState('')
  const frame = useRef(0)
  const raf = useRef(0)

  useEffect(() => {
    const queue = text.split('').map((char, i) => ({
      char,
      start: Math.floor(i * 2.2),
      end: Math.floor(i * 2.2 + 12 + Math.random() * 18),
    }))

    let running = true
    frame.current = 0

    const run = () => {
      if (!running) return
      let output = ''
      let done = 0
      for (const item of queue) {
        if (frame.current >= item.end) {
          output += item.char
          done++
        } else if (frame.current >= item.start) {
          output += CHARS[(Math.random() * CHARS.length) | 0]
        } else {
          output += ' '
        }
      }
      setDisplay(output)
      if (done === queue.length) return
      frame.current += speed
      raf.current = requestAnimationFrame(run)
    }

    const timer = setTimeout(() => {
      raf.current = requestAnimationFrame(run)
    }, startDelay)

    return () => {
      running = false
      clearTimeout(timer)
      cancelAnimationFrame(raf.current)
    }
  }, [text, startDelay, speed])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{display || text}</span>
    </span>
  )
}
