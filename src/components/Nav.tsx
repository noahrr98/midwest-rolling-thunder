import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import { Logo } from './Logo'
import { club } from '../content'

const LINKS = [
  { href: '#about', label: 'Who we are' },
  { href: '#events', label: 'Rides' },
  { href: '#gallery', label: 'Photos' },
  { href: '#contact', label: 'Clubhouse' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setLifted(v > 24))

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-5">
        <nav
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full pl-3 pr-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pl-5 ${
            lifted ? 'glass py-2' : 'border border-transparent py-3'
          }`}
          aria-label="Primary"
        >
          <a href="#top" className="flex items-center gap-3 outline-offset-4">
            <Logo size={lifted ? 34 : 40} className="transition-all duration-500" />
            <span className="display hidden text-sm leading-none sm:block sm:text-base">
              Midwest Rolling
              <span className="text-steel-400"> Thunder</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-bone-400 transition-colors duration-300 hover:bg-bone-50/5 hover:text-bone-50 active:scale-[0.98]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 rounded-full bg-bone-50 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-steel-300 active:-translate-y-px"
            >
              Ride with us
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full text-bone-200 transition-colors hover:bg-bone-50/5 active:scale-95 md:hidden"
          >
            <List size={22} weight="bold" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-ink-950/97 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-5 pt-6">
              <div className="flex items-center gap-3">
                <Logo size={38} />
                <span className="display text-sm">{club.shortName}</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full text-bone-200 transition-colors hover:bg-bone-50/5 active:scale-95"
              >
                <X size={22} weight="bold" />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="shown"
              variants={{ shown: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
              className="mt-14 flex flex-col gap-2 px-5"
            >
              {[...LINKS, { href: '#contact', label: 'Ride with us' }].map((l) => (
                <motion.li
                  key={l.label}
                  variants={{
                    hidden: { opacity: 0, x: -22 },
                    shown: { opacity: 1, x: 0 },
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block border-b border-bone-600/20 py-5 text-4xl text-bone-50 transition-colors active:text-steel-400"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
