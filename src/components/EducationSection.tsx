import { GraduationCap } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { TiltCard } from '@/components/TiltCard'

const coursework = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Database Management Systems',
  'Computer Networks',
  'Operating Systems',
  'Software Engineering',
]

export function EducationSection() {
  return (
    <section
      id="education"
      className="bg-background/70 px-6 py-28 sm:px-10 lg:px-20"
    >
      <SectionHeader num="02." title="Education" />

      <Reveal>
        <TiltCard className="h-full" max={5}>
          <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/70 p-8 transition-colors duration-300 hover:border-[var(--accent-1)] hover:shadow-[0_20px_60px_rgba(108,99,255,.18)]">
            <div className="pointer-events-none absolute inset-0 bg-[image:var(--grad)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.05]" />
            <div className="relative" style={{ transform: 'translateZ(35px)' }}>
              {/* Header row */}
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <GraduationCap className="mt-1 size-7 shrink-0 text-[var(--accent-1)]" />
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      Delhi Technological University
                    </h3>
                    <p className="mt-1 text-base font-semibold text-[var(--accent-1)]">
                      B.Tech, Information Technology
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-[var(--accent-1)]/30 bg-[color:var(--accent-1)]/10 px-3 py-1 font-mono text-sm text-foreground">
                  2022 – 2026
                </span>
              </div>

              {/* Coursework */}
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent-2)]">
                Relevant Coursework
              </p>
              <div className="flex flex-wrap gap-2">
                {coursework.map((c) => (
                  <span
                    key={c}
                    className="rounded-lg border border-border bg-background/60 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-[var(--accent-1)] hover:bg-[color:var(--accent-1)]/10 hover:text-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>
      </Reveal>
    </section>
  )
}
