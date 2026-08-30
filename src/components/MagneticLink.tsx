import { useRef, memo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  className?: string
  /** How far the element is allowed to chase the cursor, in pixels. */
  pull?: number
}

/**
 * Pulls toward the cursor. Motion values only — this never re-renders React on
 * pointer move, which is what keeps it cheap on a phone.
 */
function MagneticLinkImpl({ href, children, className = '', pull = 10 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.4 })
  const y = useSpring(my, { stiffness: 180, damping: 18, mass: 0.4 })
  const glowX = useTransform(x, (v) => `${50 + v * 2}%`)

  function track(e: React.MouseEvent<HTMLAnchorElement>) {
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    mx.set(((e.clientX - box.left) / box.width - 0.5) * pull * 2)
    my.set(((e.clientY - box.top) / box.height - 0.5) * pull)
  }

  function release() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={track}
      onMouseLeave={release}
      whileTap={{ scale: 0.97 }}
      className={`relative isolate inline-flex items-center gap-2 overflow-hidden ${className}`}
    >
      <motion.span
        aria-hidden
        style={{ left: glowX }}
        className="pointer-events-none absolute top-1/2 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone-50/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </motion.a>
  )
}

export const MagneticLink = memo(MagneticLinkImpl)
