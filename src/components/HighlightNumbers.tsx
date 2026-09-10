const MARKER_RE = /\{([^}]+)\}/g

export function HighlightNumbers({ text }: { text: string }) {
  const parts = text.split(MARKER_RE)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-[var(--accent-2)]">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  )
}
