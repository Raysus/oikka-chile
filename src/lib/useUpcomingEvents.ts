import { useEffect, useState } from 'react'
import { fallbackEvents } from '../content'
import { api, type EventItem } from './api'

export function useUpcomingEvents() {
  const [items, setItems] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    api
      .listEvents(true)
      .then((data) => {
        if (alive) setItems(data)
      })
      .catch(() => {
        if (alive) setItems(fallbackEvents)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])

  return { items, loading }
}
