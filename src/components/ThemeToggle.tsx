import { Moon, Sun, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { useTheme } from '@/theme/ThemeProvider'
import { THEMES } from '@/theme/theme'
import type { Theme } from '@/theme/theme'
import { cn } from '@/lib/utils'

const ICONS: Record<Theme, typeof Moon> = {
  dark: Moon,
  light: Sun,
  fun: Sparkles,
}

const LABELS: Record<Theme, string> = {
  dark: 'Dark mode',
  light: 'Light mode',
  fun: 'Fun mode',
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-0.5 backdrop-blur-sm"
    >
      {THEMES.map((t) => {
        const Icon = ICONS[t]
        const active = theme === t
        return (
          <button
            key={t}
            role="radio"
            aria-checked={active}
            aria-label={LABELS[t]}
            title={LABELS[t]}
            onClick={() => setTheme(t)}
            className={cn(
              'relative flex size-7 items-center justify-center rounded-full transition-colors',
              active ? 'text-white' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full bg-[image:var(--grad)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className="relative size-3.5" />
          </button>
        )
      })}
    </div>
  )
}
