/** Parse 'YYYY-MM-DD' in local time. `new Date('2026-09-19')` is UTC midnight,
 *  which renders as the 18th anywhere west of Greenwich. */
export function parseDay(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function startOfToday(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function monthShort(iso: string): string {
  return MONTH[parseDay(iso).getMonth()]
}

export function dayOfMonth(iso: string): string {
  return String(parseDay(iso).getDate()).padStart(2, '0')
}

export function weekday(iso: string): string {
  return WEEKDAY[parseDay(iso).getDay()]
}

export function year(iso: string): string {
  return String(parseDay(iso).getFullYear())
}

/** "Saturday, September 19" or "October 24 — 25" for a two-day run. */
export function longRange(iso: string, endIso?: string): string {
  const start = parseDay(iso)
  const head = `${WEEKDAY[start.getDay()]}, ${MONTH[start.getMonth()]} ${start.getDate()}`
  if (!endIso) return head
  const end = parseDay(endIso)
  if (end.getMonth() === start.getMonth()) {
    return `${MONTH[start.getMonth()]} ${start.getDate()} — ${end.getDate()}`
  }
  return `${MONTH[start.getMonth()]} ${start.getDate()} — ${MONTH[end.getMonth()]} ${end.getDate()}`
}

/** "in 20 days" / "this Saturday" / "today". */
export function countdown(iso: string): string {
  const days = Math.round((parseDay(iso).getTime() - startOfToday().getTime()) / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return 'tomorrow'
  if (days < 7) return `in ${days} days`
  if (days < 14) return 'next week'
  if (days < 60) return `in ${Math.round(days / 7)} weeks`
  return `in ${Math.round(days / 30)} months`
}
