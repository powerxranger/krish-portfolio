import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { TiltCard } from '@/components/TiltCard'
import { HighlightNumbers } from '@/components/HighlightNumbers'
import { experience } from '@/data'

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="bg-background/70 px-6 py-28 sm:px-10 lg:px-20"
    >
      <SectionHeader num="01." title="Experience" />

      <div className="space-y-10">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 100}>
            <TiltCard className="h-full" max={5}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/70 p-8 transition-colors duration-300 hover:border-[var(--accent-1)] hover:shadow-[0_20px_60px_rgba(108,99,255,.18)]">
                <div className="pointer-events-none absolute inset-0 bg-[image:var(--grad)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.05]" />
                <div className="relative" style={{ transform: 'translateZ(35px)' }}>
                  {/* Header row */}
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <job.icon className="mt-1 size-7 shrink-0 text-[var(--accent-1)]" />
                      <div>
                      <h3 className="text-2xl font-bold tracking-tight text-foreground">
                        {job.role}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-base font-semibold text-[var(--accent-1)]">{job.company}</span>
                        <span>·</span>
                        <span>{job.location}</span>
                      </div>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-[var(--accent-1)]/30 bg-[color:var(--accent-1)]/10 px-3 py-1 font-mono text-sm text-foreground">
                      {job.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="mb-6 space-y-2.5">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex items-baseline gap-3 text-base leading-relaxed text-muted-foreground">
                        <span className="shrink-0 text-[var(--accent-1)]">▹</span>
                        <span><HighlightNumbers text={b} /></span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((t) => (
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
        ))}
      </div>
    </section>
  )
}
