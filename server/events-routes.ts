import { randomUUID } from 'node:crypto'
import type { Express, NextFunction, Request, Response } from 'express'
import type { Multer } from 'multer'
import {
  isUpcoming,
  parseEventDate,
  parseEventTime,
  readEvents,
  sortEvents,
  todayInChile,
  writeEvents,
  type EventItem,
} from './events.js'

type AuthHandler = (req: Request, res: Response, next: NextFunction) => void

export function registerEventRoutes(
  app: Express,
  rootDir: string,
  requireAuth: AuthHandler,
  upload: Multer,
) {
  app.get('/api/events', (req, res) => {
    let events = sortEvents(readEvents(rootDir))
    if (String(req.query.upcoming ?? '') === '1') {
      const today = todayInChile()
      events = events.filter((item) => isUpcoming(item, today))
    }
    res.json(events)
  })

  app.post('/api/events', requireAuth, upload.single('image'), (req, res) => {
    const title = String(req.body.title ?? '').trim()
    const body = String(req.body.body ?? '').trim()
    const date = parseEventDate(String(req.body.date ?? ''))
    const time = parseEventTime(String(req.body.time ?? ''))
    const place = String(req.body.place ?? '').trim() || null
    if (!title || !body) {
      res.status(400).json({ error: 'Título y descripción son obligatorios' })
      return
    }
    if (!date) {
      res.status(400).json({ error: 'La fecha del evento es obligatoria' })
      return
    }
    if (String(req.body.time ?? '').trim() && !time) {
      res.status(400).json({ error: 'La hora no es válida' })
      return
    }
    const item: EventItem = {
      id: randomUUID(),
      title,
      body,
      date,
      time,
      place,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorEmail: req.session.email ?? 'admin',
    }
    const events = readEvents(rootDir)
    events.push(item)
    writeEvents(rootDir, events)
    res.status(201).json(item)
  })

  app.put('/api/events/:id', requireAuth, upload.single('image'), (req, res) => {
    const events = readEvents(rootDir)
    const index = events.findIndex((item) => item.id === req.params.id)
    if (index < 0) {
      res.status(404).json({ error: 'Evento no encontrado' })
      return
    }
    const current = events[index]
    const title = String(req.body.title ?? current.title).trim()
    const body = String(req.body.body ?? current.body).trim()
    const date = parseEventDate(String(req.body.date ?? current.date))
    const timeRaw = req.body.time === undefined ? current.time ?? '' : String(req.body.time)
    const time = parseEventTime(timeRaw)
    const place = String(req.body.place ?? current.place ?? '').trim() || null
    if (!title || !body) {
      res.status(400).json({ error: 'Título y descripción son obligatorios' })
      return
    }
    if (!date) {
      res.status(400).json({ error: 'La fecha del evento es obligatoria' })
      return
    }
    if (String(timeRaw).trim() && !time) {
      res.status(400).json({ error: 'La hora no es válida' })
      return
    }
    events[index] = {
      ...current,
      title,
      body,
      date,
      time,
      place,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : current.imageUrl,
      updatedAt: new Date().toISOString(),
    }
    writeEvents(rootDir, events)
    res.json(events[index])
  })

  app.delete('/api/events/:id', requireAuth, (req, res) => {
    const events = readEvents(rootDir)
    const next = events.filter((item) => item.id !== req.params.id)
    if (next.length === events.length) {
      res.status(404).json({ error: 'Evento no encontrado' })
      return
    }
    writeEvents(rootDir, next)
    res.json({ ok: true })
  })
}
