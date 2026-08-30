import { useState } from 'react'
import { club } from '../content'

type Props = {
  className?: string
  /** Falls back to a typographic lockup until public/logo.png exists. */
  size?: number
}

export function Logo({ className = '', size = 44 }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={`display grid place-items-center rounded-full border border-steel-500/50 bg-ink-900 text-steel-300 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.34 }}
        aria-label={club.name}
      >
        {club.shortName}
      </span>
    )
  }

  return (
    <img
      src="/logo.png"
      alt={`${club.name} club patch`}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={`object-contain ${className}`}
    />
  )
}
