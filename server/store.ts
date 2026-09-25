import bcrypt from 'bcryptjs'
import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { ensureMediaFiles, type MediaSeed } from './media.js'
import { ensureEventsFile } from './events.js'

export type User = {
  id: string
  email: string
  passwordHash: string
  role: 'admin'
  name?: string
}

export type NewsItem = {
  id: string
  title: string
  body: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  authorEmail: string
}

function dataDir(rootDir: string) {
  return path.join(rootDir, 'data')
}

function usersPath(rootDir: string) {
  return path.join(dataDir(rootDir), 'users.json')
}

function newsPath(rootDir: string) {
  return path.join(dataDir(rootDir), 'news.json')
}


export function defaultMediaSeed(): MediaSeed {
  return {
    gallery: [
      { id: 'gallery-1', imageUrl: '/images/gallery-1.jpg', alt: 'Entrenamiento Isshin Ryu', sortOrder: 0 },
      { id: 'gallery-2', imageUrl: '/images/gallery-2.jpg', alt: 'Práctica en el dojo', sortOrder: 1 },
      { id: 'gallery-3', imageUrl: '/images/gallery-3.jpg', alt: 'Karate y Kobudo', sortOrder: 2 },
      { id: 'gallery-4', imageUrl: '/images/gallery-4.jpg', alt: 'Comunidad OIKKA Chile', sortOrder: 3 },
    ],
    videos: {
      title: 'Maestro Angi Uezu',
      intro:
        'Clips históricos del Maestro Angi Uezu: kata, kihon y kobudo. Material de archivo para estudiar el Isshin Ryu de Okinawa.',
      items: [
        {
          id: 'video-uezu-1',
          youtubeId: 'GPwsCzTbQ74',
          title: 'Angi Uezu · kata (archivo ~1980)',
          note: 'Reel Super 8 digitalizado: kata de mano vacía y armas.',
          sortOrder: 0,
        },
        {
          id: 'video-uezu-2',
          youtubeId: 'enTBjd2KbSM',
          title: 'Isshinryu Basics · 1970',
          note: 'Fundamentos tempranos del Maestro Uezu.',
          sortOrder: 1,
        },
        {
          id: 'video-uezu-3',
          youtubeId: 'J1CKTP0si7o',
          title: 'Empty hand & Kobudo · años 70',
          note: 'Kata de karate y kobudo en demostración clásica.',
          sortOrder: 2,
        },
        {
          id: 'video-uezu-4',
          youtubeId: 'znZkTBO2iD0',
          title: 'Kobudo kata · años 70',
          note: 'Trabajo de armas Isshin Ryu con el Maestro Uezu.',
          sortOrder: 3,
        },
      ],
    },
  }
}

export function ensureDataFiles(rootDir: string) {
  fs.mkdirSync(dataDir(rootDir), { recursive: true })
  if (!fs.existsSync(usersPath(rootDir))) {
    fs.writeFileSync(usersPath(rootDir), '[]\n', 'utf8')
  }
  if (!fs.existsSync(newsPath(rootDir))) {
    const now = '2026-08-15T12:00:00.000Z'
    const seed: NewsItem[] = [
      {
        id: randomUUID(),
        title: 'Nuevo sitio oficial de OIKKA Chile',
        body: 'Presentamos el espacio digital de la asociación: escuelas, linaje, historia y contacto en un solo lugar.',
        imageUrl: null,
        createdAt: now,
        updatedAt: now,
        authorEmail: 'sistema',
      },
      {
        id: randomUUID(),
        title: 'Árbol del linaje Isshin Ryu',
        body: 'Explora el mapa interactivo del linaje, desde Okinawa hasta la familia OIKKA en Chile.',
        imageUrl: null,
        createdAt: '2026-08-01T12:00:00.000Z',
        updatedAt: '2026-08-01T12:00:00.000Z',
        authorEmail: 'sistema',
      },
    ]
    fs.writeFileSync(newsPath(rootDir), `${JSON.stringify(seed, null, 2)}\n`, 'utf8')
  }
  ensureMediaFiles(rootDir, defaultMediaSeed())
  ensureEventsFile(rootDir)
}

export function readUsers(rootDir: string): User[] {
  return JSON.parse(fs.readFileSync(usersPath(rootDir), 'utf8')) as User[]
}

export function writeUsers(rootDir: string, users: User[]) {
  fs.writeFileSync(usersPath(rootDir), `${JSON.stringify(users, null, 2)}\n`, 'utf8')
}

export function readNews(rootDir: string): NewsItem[] {
  return JSON.parse(fs.readFileSync(newsPath(rootDir), 'utf8')) as NewsItem[]
}

export function writeNews(rootDir: string, news: NewsItem[]) {
  fs.writeFileSync(newsPath(rootDir), `${JSON.stringify(news, null, 2)}\n`, 'utf8')
}

export function ensureAdminUser(rootDir: string) {
  const email = (process.env.ADMIN_EMAIL ?? 'admin@oikka.cl').toLowerCase()
  const password = process.env.ADMIN_PASSWORD ?? 'oikka-admin-2026'
  const users = readUsers(rootDir)
  const existing = users.find((user) => user.email === email)

  if (existing) return

  const passwordHash = bcrypt.hashSync(password, 10)
  users.push({
    id: randomUUID(),
    email,
    passwordHash,
    role: 'admin',
  })
  writeUsers(rootDir, users)
  console.log(`Admin creado: ${email}`)
}
