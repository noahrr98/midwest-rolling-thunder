import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CaretDown, Clock, MapPin, Ticket } from '@phosphor-icons/react'
import { Reveal } from './Reveal'
import { events } from '../content'
import type { Event } from '../content'
import { countdown, dayOfMonth, longRange, monthShort, parseDay, startOfToday, year } from '../lib/date'

type Scope = 'upcoming' | 'past'

function EventRow({ event, isNext }: { event: Event; isNext: boolean }) {
  const [open, setOpen] = useState(false)
  const panelId = `ride-panel-${event.id}`

  return (
    <li id={`ride-${event.id}`} className="group scroll-mt-28">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="grid w-full grid-cols-[auto_1fr_auto] items-start gap-4 py-7 text-left transition-colors duration-300 sm:gap-8 sm:py-9"
      >
        <span className="w-14 shrink-0 sm:w-20">
          <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-steel-400">
            {monthShort(event.date)}
          </span>
          <span className="display mt-1 block text-3xl text-bone-50 sm:text-5xl">{dayOfMonth(event.date)}</span>
          <span className="mt-1 block font-mono text-[0.625rem] text-bone-600">{year(event.date)}</span>
        </span>

        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-bone-600/40 px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-bone-400">
              {event.tag}
            </span>
            {isNext && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-steel-500/15 px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-steel-300">
                <span className="size-1.5 rounded-full bg-steel-400 breathe" />
                {countdown(event.date)}
              </span>
            )}
          </span>
          <span className="display mt-3 block text-xl leading-tight text-bone-50 transition-colors duration-300 group-hover:text-steel-300 sm:text-3xl">
            {event.title}
          </span>
          <span className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-bone-600 sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} weight="bold" />
              {event.location}, {event.city}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} weight="bold" />
              {event.time}
            </span>
          </span>
        </span>

        <span
          className={`mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-bone-600/40 text-bone-400 transition-all duration-300 group-hover:border-bone-400 group-hover:text-bone-50 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <CaretDown size={15} weight="bold" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 130, damping: 22 }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-9 sm:grid-cols-[auto_1fr] sm:gap-8">
              <span className="hidden w-20 sm:block" aria-hidden />
              <div className="max-w-[62ch]">
                <p className="text-sm leading-relaxed text-bone-400 sm:text-base">{event.blurb}</p>
                <dl className="rule mt-6 grid grid-cols-2 gap-6 pt-5 sm:max-w-md">
                  <div>
                    <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-bone-600">Date</dt>
                    <dd className="mt-1.5 text-sm text-bone-200">{longRange(event.date, event.endDate)}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-bone-600">Cost</dt>
                    <dd className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-bone-200">
                      <Ticket size={14} weight="bold" className="text-steel-400" />
                      {event.cost}
                    </dd>
                  </div>
                </dl>
                {event.signupUrl ? (
                  <a
                    href={event.signupUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-bone-50 px-6 py-3 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-steel-300 active:-translate-y-px"
                  >
                    Sign up for this ride
                    <ArrowUpRight size={15} weight="bold" />
                  </a>
                ) : (
                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-2 rounded-full border border-bone-600/40 px-6 py-3 text-sm font-semibold text-bone-200 transition-all duration-300 hover:border-bone-400 hover:text-bone-50 active:-translate-y-px"
                  >
                    Ask about this ride
                    <ArrowUpRight size={15} weight="bold" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function EmptyRides({ scope }: { scope: Scope }) {
  return (
    <div className="rule flex flex-col items-start gap-5 py-16 sm:py-24">
      <span
        aria-hidden
        className="grid size-14 place-items-center rounded-full border border-dashed border-bone-600/40 text-bone-600"
      >
        <CaretDown size={18} weight="bold" className="rotate-[-90deg]" />
      </span>
      <div>
        <h3 className="display text-2xl text-bone-50">
          {scope === 'upcoming' ? 'Nothing on the calendar yet' : 'No rides in the archive yet'}
        </h3>
        <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-bone-400 sm:text-base">
          {scope === 'upcoming'
            ? 'The next run has not been posted. Message the club or come by on a Thursday night and somebody will tell you what is being planned.'
            : 'Past rides show up here on their own once their date has passed.'}
        </p>
      </div>
      {scope === 'upcoming' && (
        <a
          href="#contact"
          className="rounded-full border border-bone-600/40 px-6 py-3 text-sm font-semibold text-bone-200 transition-all duration-300 hover:border-bone-400 hover:text-bone-50 active:-translate-y-px"
        >
          Get the clubhouse details
        </a>
      )}
    </div>
  )
}

export function Events() {
  const [scope, setScope] = useState<Scope>('upcoming')

  const { upcoming, past } = useMemo(() => {
    const today = startOfToday().getTime()
    const sorted = [...events].sort((a, b) => parseDay(a.date).getTime() - parseDay(b.date).getTime())
    return {
      upcoming: sorted.filter((e) => parseDay(e.endDate ?? e.date).getTime() >= today),
      past: sorted.filter((e) => parseDay(e.endDate ?? e.date).getTime() < today).reverse(),
    }
  }, [])

  const list = scope === 'upcoming' ? upcoming : past

  return (
    <section id="events" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">02 — The calendar</p>
            <h2 className="display mt-5 text-[clamp(2rem,5.5vw,3.25rem)]">
              Where we are <span className="text-steel-400">riding next</span>
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Ride calendar"
            className="flex items-center gap-1 rounded-full border border-bone-600/30 p-1"
          >
            {(['upcoming', 'past'] as const).map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={scope === s}
                onClick={() => setScope(s)}
                className={`relative rounded-full px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-wider transition-colors duration-300 ${
                  scope === s ? 'text-ink-950' : 'text-bone-400 hover:text-bone-50'
                }`}
              >
                {scope === s && (
                  <motion.span
                    layoutId="scope-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-bone-50"
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  />
                )}
                {s} ({s === 'upcoming' ? upcoming.length : past.length})
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-12 sm:mt-16">
        {list.length === 0 ? (
          <EmptyRides scope={scope} />
        ) : (
          <ul className="divide-y divide-bone-600/20 border-t border-bone-600/30">
            {list.map((event, i) => (
              <Reveal key={event.id} delay={Math.min(i, 4) * 0.05}>
                <EventRow event={event} isNext={scope === 'upcoming' && i === 0} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
