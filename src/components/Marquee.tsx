import { memo } from 'react'
import { marquee } from '../content'

/** Isolated so the infinite CSS animation never sits inside a re-rendering tree. */
function MarqueeBandImpl() {
  const run = [...marquee, ...marquee]
  return (
    <div className="rule relative overflow-hidden border-b border-bone-600/30 py-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent sm:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent sm:w-40"
      />
      <div className="marquee-track flex w-max items-center gap-10 sm:gap-16">
        {run.map((phrase, i) => (
          <span key={`${phrase}-${i}`} className="flex items-center gap-10 sm:gap-16">
            <span className="display text-xl whitespace-nowrap text-bone-600 sm:text-2xl">{phrase}</span>
            <span aria-hidden className="size-1.5 shrink-0 rotate-45 bg-steel-500" />
          </span>
        ))}
      </div>
    </div>
  )
}

export const MarqueeBand = memo(MarqueeBandImpl)
