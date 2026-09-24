import fs from 'node:fs'
import path from 'node:path'

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

export type MediaSeed = {
  gallery: GalleryItem[]
  videos: VideosDoc
}

function galleryPath(rootDir: string) {
  return path.join(rootDir, 'data', 'gallery.json')
}

function videosPath(rootDir: string) {
  return path.join(rootDir, 'data', 'videos.json')
}

export function ensureMediaFiles(rootDir: string, seed: MediaSeed) {
  fs.mkdirSync(path.join(rootDir, 'data'), { recursive: true })
  if (!fs.existsSync(galleryPath(rootDir))) {
    fs.writeFileSync(galleryPath(rootDir), `${JSON.stringify(seed.gallery, null, 2)}\n`, 'utf8')
  }
  if (!fs.existsSync(videosPath(rootDir))) {
    fs.writeFileSync(videosPath(rootDir), `${JSON.stringify(seed.videos, null, 2)}\n`, 'utf8')
  }
}

export function readGallery(rootDir: string): GalleryItem[] {
  const items = JSON.parse(fs.readFileSync(galleryPath(rootDir), 'utf8')) as GalleryItem[]
  return items
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id))
}

export function writeGallery(rootDir: string, items: GalleryItem[]) {
  fs.writeFileSync(galleryPath(rootDir), `${JSON.stringify(items, null, 2)}\n`, 'utf8')
}

function normalizeVideo(item: VideoItem): VideoItem {
  return {
    ...item,
    youtubeId: item.youtubeId || null,
    fileUrl: item.fileUrl || null,
  }
}

export function readVideos(rootDir: string): VideosDoc {
  const doc = JSON.parse(fs.readFileSync(videosPath(rootDir), 'utf8')) as VideosDoc
  return {
    title: doc.title ?? '',
    intro: doc.intro ?? '',
    items: (doc.items ?? [])
      .map(normalizeVideo)
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id)),
  }
}

export function removeUpload(rootDir: string, url: string | null | undefined) {
  if (!url || !url.startsWith('/uploads/')) return
  const filePath = path.join(rootDir, url.replace(/^\/+/, ''))
  if (!filePath.startsWith(path.join(rootDir, 'uploads'))) return
  try {
    fs.unlinkSync(filePath)
  } catch {
    // ignore missing files
  }
}

export function writeVideos(rootDir: string, doc: VideosDoc) {
  fs.writeFileSync(videosPath(rootDir), `${JSON.stringify(doc, null, 2)}\n`, 'utf8')
}

export function nextSort(items: { sortOrder: number }[]) {
  return items.reduce((max, item) => Math.max(max, item.sortOrder), -1) + 1
}

export function moveById<T extends { id: string; sortOrder: number }>(
  items: T[],
  id: string,
  direction: 'up' | 'down',
): T[] | null {
  const sorted = items.slice().sort((a, b) => a.sortOrder - b.sortOrder)
  const index = sorted.findIndex((item) => item.id === id)
  if (index < 0) return null
  const swap = direction === 'up' ? index - 1 : index + 1
  if (swap < 0 || swap >= sorted.length) return sorted
  const current = sorted[index]
  const other = sorted[swap]
  const tmp = current.sortOrder
  current.sortOrder = other.sortOrder
  other.sortOrder = tmp
  return sorted
}
