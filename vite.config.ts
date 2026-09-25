import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { club, events } from './src/content'
import { buildCalendar, CALENDAR_PATH, parseTimeRange } from './src/lib/ics'

/** Writes the subscribable ride calendar into dist/ on build and serves it in dev.
 *  Vite restarts when content.ts changes, so the dev feed stays current too. */
function calendarFeed(): Plugin {
  return {
    name: 'calendar-feed',
    configureServer(server) {
      server.middlewares.use(CALENDAR_PATH, (_req, res) => {
        res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
        res.end(buildCalendar(events, club.name))
      })
    },
    generateBundle() {
      for (const e of events) {
        if (e.date && !e.endDate && !parseTimeRange(e.time)) {
          this.warn(`"${e.title}": no clock time found in "${e.time}", so it goes on the calendar as all-day.`)
        }
      }
      this.emitFile({ type: 'asset', fileName: CALENDAR_PATH.slice(1), source: buildCalendar(events, club.name) })
    },
  }
}

// Port 5174 is reserved for this project in the workspace port table (see ../CLAUDE.md).
export default defineConfig({
  plugins: [react(), tailwindcss(), calendarFeed()],
  server: { port: 5174, strictPort: true },
  preview: { port: 5174, strictPort: true },
})
