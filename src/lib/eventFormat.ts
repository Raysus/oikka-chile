import type { EventItem } from './api'

export function formatEventWhen(event: EventItem) {
  const date = new Intl.DateTimeFormat('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${event.date}T12:00:00Z`))
  if (event.time) return `${date} · ${event.time} hrs.`
  return date
}

export function formatEventDay(event: EventItem) {
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${event.date}T12:00:00Z`))
}

export function isUpcomingEvent(event: EventItem) {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Santiago',
  }).format(new Date())
  return event.date >= today
}
