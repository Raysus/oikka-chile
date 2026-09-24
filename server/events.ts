import fs from 'node:fs'
import path from 'node:path'

export type EventItem = {
  id: string
  title: string
  body: string
  date: string
  time: string | null
  place: string | null
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  authorEmail: string
}

function eventsPath(rootDir: string) {
  return path.join(rootDir, 'data', 'events.json')
}

export function todayInChile(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date())
}

export function isUpcoming(event: EventItem, today = todayInChile()) {
  return event.date >= today
}

export function sortEvents(events: EventItem[]) {
  return events
    .slice()
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date) ||
        (a.time ?? '').localeCompare(b.time ?? '') ||
        a.title.localeCompare(b.title),
    )
}

export function parseEventDate(raw: string): string | null {
  const value = raw.trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  const dt = new Date(Date.UTC(year, month - 1, day))
  if (dt.getUTCFullYear() !== year || dt.getUTCMonth() !== month - 1 || dt.getUTCDate() !== day) {
    return null
  }
  return value
}

export function parseEventTime(raw: string): string | null {
  const value = raw.trim()
  if (!value) return null
  if (!/^\d{2}:\d{2}$/.test(value)) return null
  const [hours, minutes] = value.split(':').map(Number)
  if (hours > 23 || minutes > 59) return null
  return value
}

export function ensureEventsFile(rootDir: string) {
  fs.mkdirSync(path.join(rootDir, 'data'), { recursive: true })
  if (!fs.existsSync(eventsPath(rootDir))) {
    fs.writeFileSync(eventsPath(rootDir), '[]\n', 'utf8')
  }
}

export function readEvents(rootDir: string): EventItem[] {
  return JSON.parse(fs.readFileSync(eventsPath(rootDir), 'utf8')) as EventItem[]
}

export function writeEvents(rootDir: string, events: EventItem[]) {
  fs.writeFileSync(eventsPath(rootDir), `${JSON.stringify(events, null, 2)}\n`, 'utf8')
}
