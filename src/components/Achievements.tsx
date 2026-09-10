import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { TiltCard } from '@/components/TiltCard'
import { HighlightNumbers } from '@/components/HighlightNumbers'
import { achievements } from '@/data'

export function Achievements() {
  return (
    <section
      id="achievements"
      className="bg-background/70 px-6 py-28 sm:px-10 lg:px-20"
    >
      <SectionHeader num="05." title="Achievements" />

      <div className="grid gap-6 md:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 100}>
            <TiltCard className="h-full" max={16}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-7 transition-colors duration-300 hover:border-[var(--accent-1)] hover:shadow-[0_20px_60px_rgba(108,99,255,.18)]">
                <div className="pointer-events-none absolute inset-0 bg-[image:var(--grad)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.05]" />
                <div className="relative flex h-full flex-col" style={{ transform: 'translateZ(35px)' }}>
                  {/* Stat badge */}
                  {a.stat && (
                    <span className="mb-4 self-start rounded-full bg-[color:var(--accent-1)]/15 px-3 py-1 font-mono text-sm font-semibold text-[var(--accent-1)]">
                      {a.stat}
                    </span>
                  )}

                  <h3 className="mb-1 text-xl font-bold tracking-tight text-foreground">
                    {a.title}
                  </h3>
                  <p className="mb-3 text-base font-semibold text-[var(--accent-2)]">{a.org}</p>
                  <p className="mb-4 flex-1 text-base leading-relaxed text-muted-foreground">
                    <HighlightNumbers text={a.description} />
                  </p>
                  <p className="mt-auto font-mono text-sm text-foreground/70">{a.period}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
