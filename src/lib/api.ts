export type NewsItem = {
  id: string
  title: string
  body: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  authorEmail: string
}



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

export type GalleryItem = {
  id: string
  imageUrl: string
  alt: string
  sortOrder: number
}

export type VideoItem = {
  id: string
  youtubeId: string | null
  fileUrl: string | null
  title: string
  note: string
  sortOrder: number
}

export type VideosDoc = {
  title: string
  intro: string
  items: VideoItem[]
}

export type AdminUser = {
  id: string
  email: string
}

const API_BASE = import.meta.env.VITE_API_URL ?? ''

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...init,
  })

  if (!response.ok) {
    let message = 'Error de servidor'
    try {
      const data = (await response.json()) as { error?: string }
      if (data.error) message = data.error
    } catch {
      // ignore parse errors
    }
    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export function imageSrc(imageUrl: string | null): string | null {
  if (!imageUrl) return null
  if (imageUrl.startsWith('http')) return imageUrl
  return `${API_BASE}${imageUrl}`
}

export const api = {
  me: () => request<AdminUser>('/api/auth/me'),
  login: (email: string, password: string) =>
    request<AdminUser>('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<{ ok: boolean }>('/api/auth/logout', { method: 'POST' }),
  listNews: () => request<NewsItem[]>('/api/news'),
  createNews: (formData: FormData) =>
    request<NewsItem>('/api/news', {
      method: 'POST',
      body: formData,
    }),
  updateNews: (id: string, formData: FormData) =>
    request<NewsItem>(`/api/news/${id}`, {
      method: 'PUT',
      body: formData,
    }),
  deleteNews: (id: string) =>
    request<{ ok: boolean }>(`/api/news/${id}`, { method: 'DELETE' }),
  listGallery: () => request<GalleryItem[]>('/api/gallery'),
  createGallery: (formData: FormData) =>
    request<GalleryItem>('/api/gallery', {
      method: 'POST',
      body: formData,
    }),
  updateGallery: (id: string, formData: FormData) =>
    request<GalleryItem>(`/api/gallery/${id}`, {
      method: 'PUT',
      body: formData,
    }),
  deleteGallery: (id: string) =>
    request<{ ok: boolean }>(`/api/gallery/${id}`, { method: 'DELETE' }),
  moveGallery: (id: string, direction: 'up' | 'down') =>
    request<GalleryItem[]>(`/api/gallery/${id}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction }),
    }),
  listVideos: () => request<VideosDoc>('/api/videos'),
  updateVideosSection: (title: string, intro: string) =>
    request<VideosDoc>('/api/videos/section', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, intro }),
    }),
  createVideo: (formData: FormData) =>
    request<VideoItem>('/api/videos', {
      method: 'POST',
      body: formData,
    }),
  updateVideo: (id: string, formData: FormData) =>
    request<VideoItem>(`/api/videos/${id}`, {
      method: 'PUT',
      body: formData,
    }),
  deleteVideo: (id: string) =>
    request<{ ok: boolean }>(`/api/videos/${id}`, { method: 'DELETE' }),
  moveVideo: (id: string, direction: 'up' | 'down') =>
    request<VideosDoc>(`/api/videos/${id}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction }),
    }),
  listEvents: (upcoming = false) =>
    request<EventItem[]>(upcoming ? '/api/events?upcoming=1' : '/api/events'),
  createEvent: (formData: FormData) =>
    request<EventItem>('/api/events', {
      method: 'POST',
      body: formData,
    }),
  updateEvent: (id: string, formData: FormData) =>
    request<EventItem>(`/api/events/${id}`, {
      method: 'PUT',
      body: formData,
    }),
  deleteEvent: (id: string) =>
    request<{ ok: boolean }>(`/api/events/${id}`, { method: 'DELETE' }),
}
