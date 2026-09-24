import { useEffect, useState } from 'react'
import { fallbackGallery, fallbackVideos } from '../content'
import { api, type GalleryItem, type VideosDoc } from './api'

export function useMedia() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [videos, setVideos] = useState<VideosDoc>({ title: '', intro: '', items: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    Promise.all([api.listGallery(), api.listVideos()])
      .then(([galleryItems, videoDoc]) => {
        if (!alive) return
        setGallery(galleryItems)
        setVideos(videoDoc)
      })
      .catch(() => {
        if (!alive) return
        setGallery(fallbackGallery)
        setVideos(fallbackVideos)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])

  return {
    gallery,
    videos: videos.items,
    videosTitle: videos.title,
    videosIntro: videos.intro,
    loading,
  }
}

