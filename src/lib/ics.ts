/* ---------------------------------------------------------------------------
 * The subscribable ride calendar (/events.ics).
 *
 * Built from `events` in content.ts every time the site is built, so adding,
 * moving, or deleting an event there updates every subscriber's phone on its
 * next refresh. Nothing in here needs editing for routine updates.
 * ------------------------------------------------------------------------- */
import type { Event } from '../content'

/** Where the feed is served from. The subscribe links point here. */
export const CALENDAR_PATH = '/events.ics'

/** Every event is in Missouri, so every time in `time` is read as Central. */
const TZID = 'America/Chicago'

/** Length of the calendar block when `time` gives a start but no end. */
const DEFAULT_MINUTES = 120

/* US Central, with the post-2007 daylight saving rules. Calendar apps need
 * this block to place a TZID time correctly. */
const VTIMEZONE = [
  'BEGIN:VTIMEZONE',
  `TZID:${TZID}`,
  'BEGIN:DAYLIGHT',
  'TZOFFSETFROM:-0600',
  'TZOFFSETTO:-0500',
  'TZNAME:CDT',
  'DTSTART:19700308T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
  'END:DAYLIGHT',
  'BEGIN:STANDARD',
  'TZOFFSETFROM:-0500',
  'TZOFFSETTO:-0600',
  'TZNAME:CST',
  'DTSTART:19701101T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
  'END:STANDARD',
  'END:VTIMEZONE',
]

type Clock = { minutes: number; meridiem?: 'a' | 'p' }

// "noon", "midnight", "10:00 AM", "10am", "4:00". A bare number with neither
// a colon nor am/pm ("Route 7", "Post 499") is not a time.
const CLOCK = /\b(noon|midnight)\b|\b(\d{1,2})(?::(\d{2}))?\s*(?:([ap])\.?m\b\.?)?/gi
const RANGE_WORD = /^\s*(?:-|–|—|to|till?|until|thru|through)\s*$/i

function readClocks(text: string): { clock: Clock; start: number; end: number }[] {
  const found: { clock: Clock; start: number; end: number }[] = []
  for (const m of text.matchAll(CLOCK)) {
    const [whole, word, h, min, ap] = m
    let clock: Clock
    if (word) {
      clock = { minutes: word.toLowerCase() === 'noon' ? 12 * 60 : 0, meridiem: word.toLowerCase() === 'noon' ? 'p' : 'a' }
    } else {
      if (min === undefined && ap === undefined) continue
      const hour = Number(h)
      const minute = Number(min ?? 0)
      if (hour > 12 || minute > 59 || (ap && hour === 0)) continue
      const meridiem = ap?.toLowerCase() as Clock['meridiem']
      clock = { minutes: ((hour % 12) + (meridiem === 'p' ? 12 : 0)) * 60 + minute, meridiem }
    }
    found.push({ clock, start: m.index, end: m.index + whole.trimEnd().length })
  }
  return found
}

/**
 * Pull start and end times, in minutes after midnight, out of the free-text
 * `time` field. Returns null when there is no recognisable time, and the event
 * then goes on the calendar as all-day.
 *
 *   "10:00 AM"                              → 10:00 – 12:00
 *   "12:00 PM to 3:00 PM"                   → 12:00 – 15:00
 *   "noon till 4:00"                        → 12:00 – 16:00
 *   "Meet 11:00 AM, kickstands up at noon"  → 11:00 – 13:00
 */
export function parseTimeRange(text: string): { start: number; end: number } | null {
  const clocks = readClocks(text)
  if (clocks.length === 0) return null

  const first = clocks[0].clock
  // No am/pm: rides and meetings are daytime, so 7–11 is morning and 12–6 is afternoon.
  const start = first.meridiem ? first.minutes : first.minutes < 7 * 60 ? first.minutes + 12 * 60 : first.minutes

  // Only a second time joined to the first by "to" / "till" / a dash is an end
  // time. "Meet 11, kickstands up at noon" is two start times, not a range.
  let end = start + DEFAULT_MINUTES
  const second = clocks[1]
  if (second && RANGE_WORD.test(text.slice(clocks[0].end, second.start))) {
    const c = second.clock
    // An end of "midnight" or "12 AM" means the end of the day, not its start.
    const candidate = c.meridiem ? c.minutes || 24 * 60 : [c.minutes, c.minutes + 12 * 60].find((m) => m > start)
    if (candidate !== undefined && candidate > start) end = candidate
  }
  return { start, end: Math.min(end, 23 * 60 + 59) }
}

function compactDate(iso: string): string {
  return iso.replaceAll('-', '')
}

function nextDay(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10).replaceAll('-', '')
}

function clockStamp(minutes: number): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(Math.floor(minutes / 60))}${pad(minutes % 60)}00`
}

function escapeText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
}

/** The format caps lines at 75 bytes; longer ones continue on a line starting with a space. */
function fold(line: string): string {
  const out: string[] = []
  let current = ''
  let bytes = 0
  for (const ch of line) {
    const cp = ch.codePointAt(0)!
    const size = cp < 0x80 ? 1 : cp < 0x800 ? 2 : cp < 0x10000 ? 3 : 4
    if (bytes + size > 75) {
      out.push(current)
      current = ' '
      bytes = 1
    }
    current += ch
    bytes += size
  }
  out.push(current)
  return out.join('\r\n')
}

function uid(event: Event): string {
  const slug = event.id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${slug}@midwest-rolling-thunder`
}

function vevent(event: Event & { date: string }, stamp: string): string[] {
  const range = event.endDate ? null : parseTimeRange(event.time)
  const when = range
    ? [
        `DTSTART;TZID=${TZID}:${compactDate(event.date)}T${clockStamp(range.start)}`,
        `DTEND;TZID=${TZID}:${compactDate(event.date)}T${clockStamp(range.end)}`,
      ]
    : [
        // All-day, or a multi-day run. The end date is exclusive, hence the extra day.
        `DTSTART;VALUE=DATE:${compactDate(event.date)}`,
        `DTEND;VALUE=DATE:${nextDay(event.endDate ?? event.date)}`,
      ]

  // The original wording always goes first in the notes, so "kickstands up at
  // noon" survives even though the calendar block can only hold one start time.
  const notes = [event.time, event.blurb, `Cost: ${event.cost}`]
  if (event.signupUrl) notes.push(`Sign up: ${event.signupUrl}`)

  return [
    'BEGIN:VEVENT',
    `UID:${uid(event)}`,
    `DTSTAMP:${stamp}`,
    ...when,
    `SUMMARY:${escapeText(event.title)}`,
    `LOCATION:${escapeText(`${event.location}, ${event.city}`)}`,
    `DESCRIPTION:${escapeText(notes.join('\n\n'))}`,
    `CATEGORIES:${escapeText(event.tag)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
  ]
}

/**
 * The whole feed. Events without a date are left out until they get one, so
 * taking the date off a ride also takes it off subscribers' calendars.
 */
export function buildCalendar(events: Event[], calendarName: string, now = new Date()): string {
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${calendarName}//Ride calendar//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(calendarName)}`,
    `X-WR-TIMEZONE:${TZID}`,
    // Ask subscribers' apps to check for changes every few hours. Apple and
    // Outlook honour this; Google checks on its own schedule regardless.
    'REFRESH-INTERVAL;VALUE=DURATION:PT4H',
    'X-PUBLISHED-TTL:PT4H',
    ...VTIMEZONE,
    ...events.filter((e): e is Event & { date: string } => Boolean(e.date)).flatMap((e) => vevent(e, stamp)),
    'END:VCALENDAR',
  ]
  return lines.map(fold).join('\r\n') + '\r\n'
}
