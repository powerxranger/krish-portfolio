import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ThemeToggle'

const links = [
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#technologies', label: 'Technologies' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/70 px-6 backdrop-blur-xl sm:px-10 lg:px-20">
      <a href="#hero" className="text-grad font-mono text-lg font-medium">
        ka.dev
      </a>

      <div className="flex items-center gap-3 sm:gap-6">
        <ul className="hidden gap-8 sm:flex">
          {links.map((l) => {
            const isActive = active === l.href
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group relative text-sm font-medium transition-colors',
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[image:var(--grad)] transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <ThemeToggle />

        <button
          className="sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          'absolute inset-x-0 top-16 flex-col items-end gap-6 border-b border-border bg-background/95 px-8 py-6 backdrop-blur-xl sm:hidden',
          open ? 'flex' : 'hidden',
        )}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={cn(
              'text-sm font-medium transition-colors',
              active === l.href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
