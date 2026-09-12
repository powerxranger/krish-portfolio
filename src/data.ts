import { Wand2, ShieldAlert, Building2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ─── Experience ────────────────────────────────────────────────────────────────

export interface ExperienceItem {
  icon: LucideIcon
  company: string
  role: string
  period: string
  location: string
  tech: string[]
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    icon: Building2,
    company: 'Researchspace',
    role: 'Software Engineering Intern',
    period: 'May 2025 – Aug 2025',
    location: 'Bangalore, India (Remote)',
    tech: ['LLMs', 'RAG', 'Python', 'FastAPI', 'React', 'TypeScript', 'TTS', 'WebVTT'],
    bullets: [
      'Built citation and podcast features for an AI research platform indexing {200M+ papers}, enabling citation-backed answers and paper-to-podcast conversion.',
      'Implemented an end-to-end inline citation system linking every AI-generated response to its source paper with {~92% citation accuracy}.',
      'Built a paper-to-podcast pipeline using LLM-generated scripts and TTS to create {~12-minute podcasts} with WebVTT subtitles synchronized via binary search.',
      'Implemented hybrid BM25 + semantic search with query expansion, boosting {Precision@10 by 25%}.',
    ],
  },
]

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface Project {
  icon: LucideIcon
  title: string
  subtitle: string
  bullets: string[]
  tags: string[]
  github: string
  demo?: string
  demoNote?: string
  video?: string
  notHostedReason?: string
}

export const projects: Project[] = [
  {
    icon: Wand2,
    title: 'Picasso AI',
    subtitle: 'AI Image Generator',
    bullets: [
      'Built a full-stack AI image generation platform that turns text prompts into {512×512 images} using Flux AI, with a public community gallery for sharing and remixing.',
      'Architected a REST API with a server-side AI proxy and Cloudinary CDN. Storing URLs instead of raw files {reduces storage costs by ~99%}.',
      'Implemented {debounced search, 4-way sorting, a lightbox viewer, and one-click prompt remix} for a seamless community experience.',
    ],
    tags: ['Flux AI', 'React', 'Node.js', 'MongoDB', 'Cloudinary'],
    github: 'https://github.com/powerxranger/AI-Image-Generation',
    demo: 'https://ai-image-generation-seven-gamma.vercel.app/',
    demoNote: 'Hosted on a free tier - may take a moment to wake up on the first load',
    video: 'https://youtu.be/6UhmIMZTjvg?si=KkbBOTM5UyRFL8MD',
  },
  {
    icon: ShieldAlert,
    title: 'SentinelTrack',
    subtitle: 'Cross-Platform System Monitor',
    bullets: [
      'Built a cross-platform security agent for {Linux, macOS, and Windows} that monitors live processes and network connections at {~0.5% CPU and ~8 MB memory}.',
      'Designed an anomaly detection engine that flags {9 threat types} by comparing current activity against historical baselines.',
      'Implemented a three-tier agent–database–REST API pipeline powering a live dashboard that {refreshes every 3–10 seconds}.',
    ],
    tags: ['C++', 'React', 'TypeScript', 'Node.js', 'SQLite'],
    github: 'https://github.com/powerxranger/Sentinel-Track',
    video: 'https://www.youtube.com/watch?v=NRZ1LQSAQ7M',
    notHostedReason: 'Requires a local system agent; not deployable to cloud platforms',
  },
]

// ─── Links ────────────────────────────────────────────────────────────────────

export const links = {
  resume: 'https://drive.google.com/file/d/1WiYnrRyobiGBmqPKVpAFhqoN7FGkTtXf/view?usp=sharing',
  linkedin: 'https://www.linkedin.com/in/krish-aggarwal-8854a2316/',
  github: 'https://github.com/powerxranger',
  email: 'mailto:aggarwalkrish28@gmail.com',
  leetcode: 'https://leetcode.com/u/powerxranger08/',
}

// ─── Technologies ─────────────────────────────────────────────────────────────

export interface TechCategory {
  label: string
  items: string[]
}

export const techCategories: TechCategory[] = [
  {
    label: 'Languages',
    items: ['C++', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML / CSS'],
  },
  {
    label: 'AI & ML',
    items: ['LLMs', 'RAG', 'TTS', 'Flux AI', 'Prompt Engineering', 'Semantic Search', 'BM25'],
  },
  {
    label: 'Frontend',
    items: ['React.js', 'Vite', 'Tailwind CSS', 'WebVTT', 'REST Integration'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'],
  },
  {
    label: 'Databases & Tools',
    items: ['MongoDB', 'SQLite', 'Cloudinary', 'Git', 'GitHub', 'Vercel', 'Render'],
  },
  {
    label: 'Core CS',
    items: ['Data Structures', 'Algorithms', 'OOPs', 'DBMS', 'Computer Networks', 'OS'],
  },
]

// ─── Achievements ─────────────────────────────────────────────────────────────

export interface Achievement {
  title: string
  org: string
  period: string
  description: string
  stat?: string
}

export const achievements: Achievement[] = [
  {
    title: 'Competitive Programming',
    org: 'LeetCode & GeeksforGeeks',
    period: 'Ongoing',
    description:
      'Solved {650+ problems} across {LeetCode (350+)} and {GeeksforGeeks (300+)}, with a focus on time complexity and efficient problem-solving.',
    stat: '650+ problems',
  },
  {
    title: 'Reliance Foundation Scholarship',
    org: 'Reliance Foundation',
    period: 'Jan 2023 – May 2026',
    description:
      'Awarded the Reliance Foundation Scholarship for {four consecutive years} in recognition of consistent academic excellence.',
    stat: '4× years',
  },
  {
    title: 'Engifest Organiser',
    org: 'Cultural Society, Delhi Technological University',
    period: 'Nov 2022 – Dec 2025',
    description:
      "Served as Corporate Executive for DTU's Cultural Society, co-organizing {Engifest 2023 and 2024}, {North India's largest cultural festival} with {1.5 lakh+ attendees}.",
    stat: '1.5L+ attendees',
  },
]
