export type Theme = 'dark' | 'light' | 'fun'

export const THEMES: Theme[] = ['dark', 'light', 'fun']

export interface ScenePalette {
  background: string
  fog: [number, number]
  additive: boolean
  bloom: number // 0 disables post-processing bloom
  core: string
  cage: string
  rings: [string, string, string]
  nodes: string[]
  line: string
  lineOpacity: number
  gridCell: string
  gridSection: string
  star: string
  starOpacity: number
  speed: number // ring rotation multiplier
  baseHue: number // starting hue for scroll-driven shift
  hueShift: number // amount of hue shift across scroll (0 = stable colors)
}

export const SCENE: Record<Theme, ScenePalette> = {
  dark: {
    background: '#05050c',
    fog: [9, 22],
    additive: true,
    bloom: 1.15,
    core: '#22d3ee',
    cage: '#6c63ff',
    rings: ['#00d4ff', '#a855f7', '#ff6584'],
    nodes: ['#00d4ff', '#6c63ff', '#ff6584'],
    line: '#3aa0ff',
    lineOpacity: 0.14,
    gridCell: '#1b2a6b',
    gridSection: '#00d4ff',
    star: '#8ea2ff',
    starOpacity: 0.5,
    speed: 1,
    baseHue: 0.52,
    hueShift: 0.38,
  },
  light: {
    background: '#eef2fb',
    fog: [10, 24],
    additive: false,
    bloom: 0,
    core: '#4f46e5',
    cage: '#6366f1',
    rings: ['#0ea5e9', '#8b5cf6', '#f43f7e'],
    nodes: ['#4f46e5', '#0ea5e9', '#db2777'],
    line: '#6366f1',
    lineOpacity: 0.3,
    gridCell: '#c7d2fe',
    gridSection: '#6366f1',
    star: '#94a3b8',
    starOpacity: 0.5,
    speed: 0.85,
    baseHue: 0,
    hueShift: 0,
  },
  fun: {
    background: '#180733',
    fog: [9, 22],
    additive: true,
    bloom: 1.5,
    core: '#ff3db0',
    cage: '#7c4dff',
    rings: ['#ff2d95', '#ffd23d', '#00e0ff'],
    nodes: ['#ff2d95', '#ff9a3d', '#ffe14d', '#4dff88', '#00e0ff', '#c74dff'],
    line: '#ff6ad5',
    lineOpacity: 0.16,
    gridCell: '#3a1d6e',
    gridSection: '#ff2d95',
    star: '#ffd6f5',
    starOpacity: 0.6,
    speed: 1.8,
    baseHue: 0.88,
    hueShift: 0.6,
  },
}
