import { useEffect, useState } from 'react'
import { fallbackNews } from '../content'
import { api, type NewsItem } from './api'

export function useNews() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    api
      .listNews()
      .then((data) => {
        if (alive) setItems(data)
      })
      .catch(() => {
        if (alive) setItems(fallbackNews)
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
