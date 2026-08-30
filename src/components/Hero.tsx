import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, CalendarBlank, MapPin } from '@phosphor-icons/react'
import { Logo } from './Logo'
import { MagneticLink } from './MagneticLink'
import { club, events, stats } from '../content'
import { countdown, longRange, startOfToday, parseDay } from '../lib/date'

function nextRide() {
  const today = startOfToday().getTime()
  return (
    events
      .filter((e) => parseDay(e.endDate ?? e.date).getTime() >= today)
      .sort((a, b) => parseDay(a.date).getTime() - parseDay(b.date).getTime())[0] ?? null
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const next = nextRide()
  const [line1, line2] = club.headline.split('\n')

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:min-h-[100dvh] lg:pb-16 lg:pt-32"
    >
      {/* Ground: a cold horizon glow behind the patch, never a neon halo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(72% 58% at 78% 34%, rgba(74,135,188,0.20), transparent 68%), radial-gradient(90% 70% at 12% 6%, rgba(41,47,56,0.65), transparent 72%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        {/* Left: the argument. */}
        <div className="lg:pr-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            {club.eyebrow}
          </motion.p>

          <h1 className="display mt-6 text-[clamp(2.5rem,8.6vw,5.25rem)]">
            {[line1, line2].filter(Boolean).map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.08 + i * 0.09 }}
                className="block"
              >
                {i === 1 ? <span className="text-steel-400">{line}</span> : line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[54ch] text-base leading-relaxed text-bone-400 sm:text-lg"
          >
            {club.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticLink
              href="#events"
              className="group rounded-full bg-bone-50 px-7 py-3.5 text-sm font-semibold text-ink-950 transition-colors duration-300 hover:bg-steel-300"
            >
              See the ride calendar
              <ArrowDown size={16} weight="bold" className="transition-transform group-hover:translate-y-0.5" />
            </MagneticLink>
            <a
              href="#contact"
              className="rounded-full border border-bone-600/40 px-7 py-3.5 text-sm font-semibold text-bone-200 transition-all duration-300 hover:border-bone-400 hover:text-bone-50 active:-translate-y-px"
            >
              Find the clubhouse
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="rule mt-12 grid grid-cols-3 gap-4 pt-7 sm:gap-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-xl tracking-tight text-bone-50 sm:text-2xl">{s.value}</dt>
                <dd className="mt-1.5 text-xs leading-snug text-bone-600 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right: the patch. */}
        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[520px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.15 }}
            className="relative aspect-square"
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full border border-dashed border-steel-500/25"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-[10%] rounded-full border border-bone-50/5"
              animate={reduced ? undefined : { rotate: -360 }}
              transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-[6%] grid place-items-center"
              animate={reduced ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Logo size={640} className="h-full w-full drop-shadow-[0_28px_60px_rgba(0,0,0,0.75)]" />
            </motion.div>
          </motion.div>

          {next && (
            <motion.a
              href="#events"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.7 }}
              className="glass group relative -mt-4 block rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1 active:translate-y-0 sm:-mt-8 sm:ml-auto sm:max-w-sm lg:mt-3 lg:ml-0 lg:max-w-none"
            >
              <div className="flex items-center gap-2">
                <span className="relative grid size-2 place-items-center">
                  <span className="absolute size-2 rounded-full bg-steel-400 breathe" />
                  <span className="size-2 rounded-full bg-steel-400" />
                </span>
                <span className="eyebrow">Next ride — {countdown(next.date)}</span>
              </div>
              <p className="display mt-3 text-lg leading-tight text-bone-50 transition-colors group-hover:text-steel-300">
                {next.title}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs text-bone-400">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarBlank size={14} weight="bold" className="text-steel-400" />
                  {longRange(next.date, next.endDate)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} weight="bold" className="text-steel-400" />
                  {next.city}
                </span>
              </div>
            </motion.a>
          )}
        </div>
      </div>
    </section>
  )
}
