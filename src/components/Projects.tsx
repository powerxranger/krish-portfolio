import { CirclePlay, ExternalLink, MonitorOff } from 'lucide-react'
import { Tooltip } from 'radix-ui'
import { Badge } from '@/components/ui/badge'
import { HighlightNumbers } from '@/components/HighlightNumbers'
import { Reveal } from '@/components/Reveal'
import { TiltCard } from '@/components/TiltCard'
import { SectionHeader } from '@/components/SectionHeader'
import { GithubIcon } from '@/components/icons'
import { projects } from '@/data'

export function Projects() {
  return (
    <section
      id="projects"
      className="border-y border-border bg-background/70 px-6 py-28 sm:px-10 lg:px-20"
    >
      <SectionHeader num="03." title="Projects" />

      <div className="space-y-6">
        {projects.map((p, i) => {
          const Icon = p.icon
          return (
            <Reveal key={p.title} delay={i * 100}>
              <TiltCard className="h-full" max={5}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/70 p-8 transition-colors duration-300 hover:border-[var(--accent-1)] hover:shadow-[0_20px_60px_rgba(108,99,255,.18)]">
                  <div className="pointer-events-none absolute inset-0 bg-[image:var(--grad)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.05]" />
                  <div className="relative" style={{ transform: 'translateZ(35px)' }}>
                    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <Icon className="mt-1 size-7 shrink-0 text-[var(--accent-1)]" />
                        <div>
                          <h3 className="mb-0.5 text-2xl font-bold tracking-tight text-foreground">{p.title}</h3>
                          <p className="text-base font-semibold text-[var(--accent-1)]">{p.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={p.github}
                          aria-label={`${p.title} on GitHub`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-[color:var(--accent-2)]/40 bg-[color:var(--accent-2)]/10 px-3 py-1.5 font-mono text-xs text-[var(--accent-2)] transition-all hover:border-[var(--accent-2)] hover:bg-[color:var(--accent-2)]/20 hover:shadow-[0_0_12px_rgba(0,212,255,.3)]"
                        >
                          <GithubIcon className="size-3.5" />
                          GitHub
                        </a>
                        {p.video && (
                          <a
                          href={p.video}
                          aria-label={`${p.title} demo video`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-[color:var(--accent-2)]/40 bg-[color:var(--accent-2)]/10 px-3 py-1.5 font-mono text-xs text-[var(--accent-2)] transition-all hover:border-[var(--accent-2)] hover:bg-[color:var(--accent-2)]/20 hover:shadow-[0_0_12px_rgba(0,212,255,.3)]"
                          >
                            <CirclePlay className="size-3.5" />
                            Demo
                          </a>
                        )}
                        {p.demo && (
                          <Tooltip.Provider delayDuration={200}>
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <a
                                  href={p.demo}
                                  aria-label={`${p.title} live demo`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 rounded-lg border border-[color:var(--accent-2)]/40 bg-[color:var(--accent-2)]/10 px-3 py-1.5 font-mono text-xs text-[var(--accent-2)] transition-all hover:
border-[var(--accent-2)] hover:bg-[color:var(--accent-2)]/20 hover:shadow-[0_0_12px_rgba(0,212,255,.3)]"
                                >
                                  <ExternalLink className="size-3.5" />
                                  Live
                                </a>
                              </Tooltip.Trigger>
                              {p.demoNote && (
                                <Tooltip.Portal>
                                  <Tooltip.Content
                                    side="bottom"
                                    sideOffset={8}
                                    className="z-50 max-w-xs rounded-lg border border-[color:var(--accent-2)]/25 bg-card/95 px-3 py-2 font-mono text-xs text-[var(--accent-2)]/80 shadow-[0_8px_32px_rgba(0,212,255,0.15)] backdrop-blur-md data-[state=delayed-
open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                                  >
                                    {p.demoNote}
                                    <Tooltip.Arrow className="fill-[color:var(--accent-2)]/20" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              )}
                            </Tooltip.Root>
                          </Tooltip.Provider>
                        )}
                        {p.notHostedReason && !p.demo && (
                          <Tooltip.Provider delayDuration={200}>
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <span className="flex cursor-default items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 font-mono text-xs text-amber-600/50 transition-all duration-200 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-600 dsrk:text-amber-400/50 dark:hover:text-amber-400">
                                  <MonitorOff className="size-3.5" />
                                  Not Hosted
                                </span>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  side="bottom"
                                  sideOffset={8}
                                  className="z-50 max-w-xs rounded-lg border border-amber-500/25 bg-card/95 px-3 py-2 font-mono text-xs text-amber-700/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md data-[state=delayed-open]:animate-in dark:text-amber-300/80 data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                                >
                                  {p.notHostedReason}
                                  <Tooltip.Arrow className="fill-amber-500/25" />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </Tooltip.Provider>
                        )}
                      </div>
                    </div>
                    <ul className="mb-6 space-y-2.5">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-baseline gap-3 text-base leading-relaxed text-muted-foreground">
                          <span className="shrink-0 text-[var(--accent-1)]">▹</span>
                          <span><HighlightNumbers text={b} /></span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="border-[color:var(--accent-2)]/25 bg-[color:var(--accent-2)]/10 font-mono text-xs font-normal text-[var(--accent-2)]"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>

                  </div>
                </div>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}