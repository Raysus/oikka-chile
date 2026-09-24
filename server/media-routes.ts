import { randomUUID } from 'node:crypto'
import type { Express, NextFunction, Request, Response } from 'express'
import type { Multer } from 'multer'
import { parseYoutubeId } from './youtube.js'
import {
  moveById,
  nextSort,
  readGallery,
  readVideos,
  removeUpload,
  writeGallery,
  writeVideos,
  type GalleryItem,
  type VideoItem,
} from './media.js'

type AuthHandler = (req: Request, res: Response, next: NextFunction) => void

function resolveVideoSource(
  body: Request['body'],
  file: Express.Multer.File | undefined,
  existing?: VideoItem,
): { youtubeId: string | null; fileUrl: string | null } {
  const youtubeRaw = String(body.youtube ?? body.youtubeId ?? '').trim()
  const youtubeId = youtubeRaw ? parseYoutubeId(youtubeRaw) : null
  if (youtubeRaw && !youtubeId && !file) {
    throw new Error('Pega un enlace o ID de YouTube válido')
  }
  if (file) {
    return { youtubeId: null, fileUrl: `/uploads/${file.filename}` }
  }
  if (youtubeId) {
    return { youtubeId, fileUrl: null }
  }
  if (existing?.fileUrl || existing?.youtubeId) {
    return { youtubeId: existing.youtubeId, fileUrl: existing.fileUrl }
  }
  throw new Error('Sube un archivo de video o pega un enlace de YouTube')
}

export function registerMediaRoutes(
  app: Express,
  rootDir: string,
  requireAuth: AuthHandler,
  upload: Multer,
  videoUpload: Multer,
) {
  app.get('/api/gallery', (_req, res) => {
    res.json(readGallery(rootDir))
  })

  app.post('/api/gallery', requireAuth, upload.single('image'), (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: 'La imagen es obligatoria' })
      return
    }
    const alt = String(req.body.alt ?? '').trim()
    if (!alt) {
      res.status(400).json({ error: 'Describe la foto (texto alternativo)' })
      return
    }
    const items = readGallery(rootDir)
    const item: GalleryItem = {
      id: randomUUID(),
      imageUrl: `/uploads/${req.file.filename}`,
      alt,
      sortOrder: nextSort(items),
    }
    items.push(item)
    writeGallery(rootDir, items)
    res.status(201).json(item)
  })

  app.put('/api/gallery/:id', requireAuth, upload.single('image'), (req, res) => {
    const items = readGallery(rootDir)
    const index = items.findIndex((item) => item.id === req.params.id)
    if (index < 0) {
      res.status(404).json({ error: 'Foto no encontrada' })
      return
    }
    const alt = String(req.body.alt ?? items[index].alt).trim()
    if (!alt) {
      res.status(400).json({ error: 'Describe la foto (texto alternativo)' })
      return
    }
    items[index] = {
      ...items[index],
      alt,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : items[index].imageUrl,
    }
    writeGallery(rootDir, items)
    res.json(items[index])
  })

  app.delete('/api/gallery/:id', requireAuth, (req, res) => {
    const items = readGallery(rootDir)
    const current = items.find((item) => item.id === req.params.id)
    const next = items.filter((item) => item.id !== req.params.id)
    if (next.length === items.length) {
      res.status(404).json({ error: 'Foto no encontrada' })
      return
    }
    removeUpload(rootDir, current?.imageUrl)
    writeGallery(rootDir, next)
    res.json({ ok: true })
  })

  app.post('/api/gallery/:id/move', requireAuth, (req, res) => {
    const direction = req.body.direction === 'down' ? 'down' : 'up'
    const moved = moveById(readGallery(rootDir), req.params.id, direction)
    if (!moved) {
      res.status(404).json({ error: 'Foto no encontrada' })
      return
    }
    writeGallery(rootDir, moved)
    res.json(moved.sort((a, b) => a.sortOrder - b.sortOrder))
  })

  app.get('/api/videos', (_req, res) => {
    res.json(readVideos(rootDir))
  })

  app.put('/api/videos/section', requireAuth, (req, res) => {
    const current = readVideos(rootDir)
    const title = String(req.body.title ?? current.title).trim()
    const intro = String(req.body.intro ?? current.intro).trim()
    if (!title) {
      res.status(400).json({ error: 'El título de la sección es obligatorio' })
      return
    }
    const next = { ...current, title, intro }
    writeVideos(rootDir, next)
    res.json(next)
  })

  app.post('/api/videos', requireAuth, videoUpload.single('video'), (req, res) => {
    const title = String(req.body.title ?? '').trim()
    const note = String(req.body.note ?? '').trim()
    if (!title) {
      res.status(400).json({ error: 'El título del video es obligatorio' })
      return
    }
    let source: { youtubeId: string | null; fileUrl: string | null }
    try {
      source = resolveVideoSource(req.body, req.file)
    } catch (err) {
      if (req.file) removeUpload(rootDir, `/uploads/${req.file.filename}`)
      res.status(400).json({ error: err instanceof Error ? err.message : 'Video inválido' })
      return
    }
    const doc = readVideos(rootDir)
    const item: VideoItem = {
      id: randomUUID(),
      youtubeId: source.youtubeId,
      fileUrl: source.fileUrl,
      title,
      note,
      sortOrder: nextSort(doc.items),
    }
    doc.items.push(item)
    writeVideos(rootDir, doc)
    res.status(201).json(item)
  })

  app.put('/api/videos/:id', requireAuth, videoUpload.single('video'), (req, res) => {
    const doc = readVideos(rootDir)
    const index = doc.items.findIndex((item) => item.id === req.params.id)
    if (index < 0) {
      res.status(404).json({ error: 'Video no encontrado' })
      return
    }
    const current = doc.items[index]
    const title = String(req.body.title ?? current.title).trim()
    const note = String(req.body.note ?? current.note).trim()
    if (!title) {
      res.status(400).json({ error: 'El título del video es obligatorio' })
      return
    }
    let source: { youtubeId: string | null; fileUrl: string | null }
    try {
      source = resolveVideoSource(req.body, req.file, current)
    } catch (err) {
      if (req.file) removeUpload(rootDir, `/uploads/${req.file.filename}`)
      res.status(400).json({ error: err instanceof Error ? err.message : 'Video inválido' })
      return
    }
    if (current.fileUrl && current.fileUrl !== source.fileUrl) {
      removeUpload(rootDir, current.fileUrl)
    }
    doc.items[index] = {
      ...current,
      title,
      note,
      youtubeId: source.youtubeId,
      fileUrl: source.fileUrl,
    }
    writeVideos(rootDir, doc)
    res.json(doc.items[index])
  })

  app.delete('/api/videos/:id', requireAuth, (req, res) => {
    const doc = readVideos(rootDir)
    const current = doc.items.find((item) => item.id === req.params.id)
    const nextItems = doc.items.filter((item) => item.id !== req.params.id)
    if (nextItems.length === doc.items.length) {
      res.status(404).json({ error: 'Video no encontrado' })
      return
    }
    removeUpload(rootDir, current?.fileUrl)
    doc.items = nextItems
    writeVideos(rootDir, doc)
    res.json({ ok: true })
  })

  app.post('/api/videos/:id/move', requireAuth, (req, res) => {
    const direction = req.body.direction === 'down' ? 'down' : 'up'
    const doc = readVideos(rootDir)
    const moved = moveById(doc.items, req.params.id, direction)
    if (!moved) {
      res.status(404).json({ error: 'Video no encontrado' })
      return
    }
    doc.items = moved
    writeVideos(rootDir, doc)
    res.json(doc)
  })
}
