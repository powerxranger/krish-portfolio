import { Reveal } from '@/components/Reveal'

interface SectionHeaderProps {
  num: string
  title: string
}

export function SectionHeader({ num, title }: SectionHeaderProps) {
  return (
    <Reveal className="mb-14">
      <div className="flex items-center gap-5">
        <span className="text-grad font-mono text-2xl font-bold sm:text-3xl">{num}</span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{title}</h2>
        <div className="h-px flex-1 bg-[linear-gradient(90deg,var(--border),transparent)]" />
      </div>
    </Reveal>
  )
}
