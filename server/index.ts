import 'dotenv/config'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import multer from 'multer'
import { randomUUID } from 'node:crypto'
import {
  ensureAdminUser,
  ensureDataFiles,
  readNews,
  readUsers,
  writeNews,
  type NewsItem,
} from './store.js'
import { registerMediaRoutes } from './media-routes.js'
import { registerEventRoutes } from './events-routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const uploadsDir = path.join(rootDir, 'uploads')
const port = Number(process.env.PORT ?? 3002)
const isProd = process.env.NODE_ENV === 'production'
const sessionSecret = process.env.SESSION_SECRET ?? 'dev-change-me-oikka-chile'
const cookieSecure = process.env.COOKIE_SECURE === 'true'

ensureDataFiles(rootDir)
ensureAdminUser(rootDir)
fs.mkdirSync(uploadsDir, { recursive: true })

declare module 'express-session' {
  interface SessionData {
    userId?: string
    email?: string
  }
}

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://127.0.0.1:5174',
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    name: 'oikka.sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: cookieSecure,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
)
app.use('/uploads', express.static(uploadsDir))

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || '.jpg'
      cb(null, `${Date.now()}-${randomUUID()}${ext}`)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Solo se permiten imágenes'))
      return
    }
    cb(null, true)
  },
})

const videoUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || '.mp4'
      cb(null, `${Date.now()}-${randomUUID()}${ext}`)
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const allowed = new Set(['.mp4', '.webm', '.mov', '.m4v'])
    if (file.mimetype.startsWith('video/') || allowed.has(ext)) {
      cb(null, true)
      return
    }
    cb(new Error('Solo se permiten videos MP4, WebM o MOV'))
  },
})


function requireAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (!req.session.userId) {
    res.status(401).json({ error: 'No autenticado' })
    return
  }
  next()
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/auth/me', (req, res) => {
  if (!req.session.userId || !req.session.email) {
    res.status(401).json({ error: 'No autenticado' })
    return
  }
  res.json({ id: req.session.userId, email: req.session.email })
})

app.post('/api/auth/login', async (req, res) => {
  const email = String(req.body.email ?? '')
    .trim()
    .toLowerCase()
  const password = String(req.body.password ?? '')

  if (!email || !password) {
    res.status(400).json({ error: 'Email y contraseña son obligatorios' })
    return
  }

  const users = readUsers(rootDir)
  const user = users.find((item) => item.email === email)
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401).json({ error: 'Credenciales inválidas' })
    return
  }

  req.session.userId = user.id
  req.session.email = user.email
  res.json({ id: user.id, email: user.email })
})

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('oikka.sid')
    res.json({ ok: true })
  })
})

app.get('/api/news', (_req, res) => {
  const news = readNews(rootDir).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  res.json(news)
})

app.post('/api/news', requireAuth, upload.single('image'), (req, res) => {
  const title = String(req.body.title ?? '').trim()
  const body = String(req.body.body ?? '').trim()

  if (!title || !body) {
    res.status(400).json({ error: 'Título y contenido son obligatorios' })
    return
  }

  const item: NewsItem = {
    id: randomUUID(),
    title,
    body,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    authorEmail: req.session.email ?? 'admin',
  }

  const news = readNews(rootDir)
  news.unshift(item)
  writeNews(rootDir, news)
  res.status(201).json(item)
})

app.put('/api/news/:id', requireAuth, upload.single('image'), (req, res) => {
  const news = readNews(rootDir)
  const index = news.findIndex((item) => item.id === req.params.id)
  if (index < 0) {
    res.status(404).json({ error: 'Noticia no encontrada' })
    return
  }

  const title = String(req.body.title ?? news[index].title).trim()
  const body = String(req.body.body ?? news[index].body).trim()
  if (!title || !body) {
    res.status(400).json({ error: 'Título y contenido son obligatorios' })
    return
  }

  const current = news[index]
  news[index] = {
    ...current,
    title,
    body,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : current.imageUrl,
    updatedAt: new Date().toISOString(),
  }
  writeNews(rootDir, news)
  res.json(news[index])
})

registerMediaRoutes(app, rootDir, requireAuth, upload, videoUpload)
registerEventRoutes(app, rootDir, requireAuth, upload)

app.delete('/api/news/:id', requireAuth, (req, res) => {
  const news = readNews(rootDir)
  const next = news.filter((item) => item.id !== req.params.id)
  if (next.length === news.length) {
    res.status(404).json({ error: 'Noticia no encontrada' })
    return
  }
  writeNews(rootDir, next)
  res.json({ ok: true })
})

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    res.status(400).json({ error: err.message || 'Error en la solicitud' })
  },
)

if (isProd) {
  const distDir = path.join(rootDir, 'dist')
  app.use(express.static(distDir))
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

const server = app.listen(port, () => {
  console.log(`API listening on http://127.0.0.1:${port}`)
})
server.timeout = 15 * 60 * 1000
server.headersTimeout = 16 * 60 * 1000
server.requestTimeout = 16 * 60 * 1000
