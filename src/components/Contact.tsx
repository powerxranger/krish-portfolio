import { ArrowRight, FileText, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/Reveal'
import { Magnetic } from '@/components/Magnetic'
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '@/components/icons'

const RESUME_URL =
  'https://drive.google.com/file/d/1WiYnrRyobiGBmqPKVpAFhqoN7FGkTtXf/view?usp=sharing'

const socials = [
  {
    href: 'https://www.linkedin.com/in/krish-aggarwal-8854a2316/',
    label: 'LinkedIn',
    Icon: LinkedinIcon,
  },
  { href: 'https://github.com/powerxranger', label: 'GitHub', Icon: GithubIcon },
  { href: 'mailto:aggarwalkrish28@gmail.com', label: 'Email', Icon: Mail },
  { href: 'https://leetcode.com/u/powerxranger08/', label: 'LeetCode', Icon: LeetcodeIcon },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border bg-background/70 px-6 py-28 text-center sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-2xl">
        <Reveal className="mb-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="text-grad font-mono text-2xl font-bold sm:text-3xl">06.</span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Get In Touch</h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Let's build something
            <br />
            <span className="text-grad">great together.</span>
          </p>
        </Reveal>

        <Reveal delay={100}>
          <p className="mb-10 text-lg text-muted-foreground">
            Whether you have a project in mind, a question, or just want to say hi. My inbox is
            always open.
          </p>
        </Reveal>

        <Reveal delay={150} className="flex flex-wrap items-center justify-center gap-4">
          <Magnetic strength={0.5} className="inline-block">
            <Button
              asChild
              size="lg"
              className="bg-[image:var(--grad)] text-white shadow-[0_0_30px_rgba(108,99,255,.35)] transition-shadow hover:shadow-[0_0_50px_rgba(108,99,255,.6)]"
            >
              <a href="https://www.linkedin.com/in/krish-aggarwal-8854a2316/" target="_blank" rel="noopener noreferrer">
                Say Hello <ArrowRight className="size-4" />
              </a>
            </Button>
          </Magnetic>

          <Magnetic strength={0.5} className="inline-block">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border bg-background/40 backdrop-blur-sm"
            >
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                View Resume <FileText className="size-4" />
              </a>
            </Button>
          </Magnetic>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 flex justify-center gap-5">
            {socials.map(({ href, label, Icon }) => (
              <Magnetic key={label} strength={0.6}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-[var(--accent-2)] hover:bg-[color:var(--accent-2)]/10 hover:text-[var(--accent-2)]"
                >
                  <Icon className="size-5" />
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
