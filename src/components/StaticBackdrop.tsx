/** Animation-free backdrop shown when the user prefers reduced motion. Theme-aware via CSS vars. */
export function StaticBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/* core glow */}
      <div
        className="absolute right-[8%] top-[32%] size-[38vw] max-w-[560px] -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--accent-2) 32%, transparent), color-mix(in oklab, var(--accent-1) 14%, transparent) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute right-[16%] top-[30%] size-40 -translate-y-1/2 rounded-full blur-md"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--accent-2) 85%, transparent), transparent 70%)',
        }}
      />
      {/* perspective grid floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-40"
        style={{
          background:
            'linear-gradient(color-mix(in oklab, var(--accent-2) 20%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--accent-2) 20%, transparent) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          transform: 'perspective(320px) rotateX(60deg)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.35))]" />
    </div>
  )
}
