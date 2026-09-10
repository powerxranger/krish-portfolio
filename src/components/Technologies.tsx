import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { TiltCard } from '@/components/TiltCard'
import { techCategories } from '@/data'

export function Technologies() {
  return (
    <section
      id="technologies"
      className="bg-background/70 px-6 py-28 sm:px-10 lg:px-20"
    >
      <SectionHeader num="04." title="Technologies" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {techCategories.map((cat, i) => (
          <Reveal key={cat.label} delay={i * 80}>
            <TiltCard className="h-full" max={16}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/70 p-6 transition-colors duration-300 hover:border-[var(--accent-1)] hover:shadow-[0_20px_60px_rgba(108,99,255,.18)]">
                <div className="pointer-events-none absolute inset-0 bg-[image:var(--grad)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.05]" />
                <div className="relative" style={{ transform: 'translateZ(35px)' }}>
                  <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent-1)]">
                    {cat.label}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-border bg-background/60 px-3 py-1.5 text-base text-muted-foreground transition-colors hover:border-[var(--accent-1)] hover:bg-[color:var(--accent-1)]/10 hover:text-foreground"
                      >
                        {item}
                      </span>
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
