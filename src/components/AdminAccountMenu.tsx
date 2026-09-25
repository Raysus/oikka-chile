import { type FormEvent, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../adminAuth/useAdminAuth'
import styles from './AdminAccountMenu.module.css'

const ADMIN_LINKS = [
  { to: '/admin/noticias', label: 'Noticias' },
  { to: '/admin/eventos', label: 'Eventos' },
  { to: '/admin/galeria', label: 'Galería' },
  { to: '/admin/videos', label: 'Videos' },
  { to: '/admin/estadisticas', label: 'Estadísticas' },
  { to: '/admin/cuenta', label: 'Mis datos' },
] as const

function initialOf(name: string | null | undefined, email: string) {
  const fromName = name?.trim().charAt(0)
  if (fromName) return fromName.toUpperCase()
  return email.trim().charAt(0).toUpperCase() || 'A'
}

type AdminAccountMenuProps = {
  onNavigate?: () => void
  tone?: 'light' | 'dark'
  compact?: boolean
}

export function AdminAccountMenu({
  onNavigate,
  tone = 'light',
  compact = false,
}: AdminAccountMenuProps) {
  const { user, loading, login, logout } = useAdminAuth()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [email, setEmail] = useState('ra.guti.el@gmail.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!open && !loginOpen) return
    function onDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        setLoginOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, loginOpen])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!loginOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [loginOpen])

  if (loading) return null

  const rootClass = [
    styles.account,
    tone === 'dark' ? styles.dark : '',
    compact ? styles.compact : '',
  ]
    .filter(Boolean)
    .join(' ')

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await login(email.trim().toLowerCase(), password)
      setPassword('')
      setLoginOpen(false)
      onNavigate?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleLogout() {
    setOpen(false)
    try {
      await logout()
    } catch {
      /* mantener sesión visible si falla el cierre */
    }
  }

  if (!user) {
    return (
      <div className={rootClass} ref={ref}>
        <button
          type="button"
          className={styles.login}
          onClick={() => {
            setError('')
            setPassword('')
            setLoginOpen(true)
          }}
        >
          <PersonIcon />
          <span>Ingresar</span>
        </button>

        {loginOpen
          ? createPortal(
              <div className={styles.modalRoot} role="presentation">
                <button
                  type="button"
                  className={styles.backdrop}
                  aria-label="Cerrar"
                  onClick={() => setLoginOpen(false)}
                />
                <div
                  className={styles.modal}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                >
                  <h2 id={titleId}>Ingresar</h2>
                  <p className={styles.modalLead}>
                    Acceso de administradores para publicar noticias, eventos, galería y videos.
                  </p>
                  <form className={styles.form} onSubmit={(e) => void handleLogin(e)}>
                    <label>
                      Correo
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                        required
                      />
                    </label>
                    <label>
                      Contraseña
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                      />
                    </label>
                    {error ? <p className={styles.error}>{error}</p> : null}
                    <div className={styles.formActions}>
                      <button
                        type="button"
                        className={styles.secondary}
                        onClick={() => setLoginOpen(false)}
                      >
                        Cancelar
                      </button>
                      <button type="submit" className={styles.primary} disabled={submitting}>
                        {submitting ? 'Entrando…' : 'Entrar'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>,
              document.body,
            )
          : null}
      </div>
    )
  }

  const displayName = user.name?.trim() || 'Administrador'

  return (
    <div className={rootClass} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menú de administración"
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.avatar} aria-hidden="true">
          {initialOf(user.name, user.email)}
        </span>
        <ChevronIcon className={open ? styles.chevOpen : styles.chev} />
      </button>

      {open ? (
        <div className={styles.menu} role="menu" aria-label="Administración">
          <div className={styles.menuHead}>
            <span className={styles.avatarLg} aria-hidden="true">
              {initialOf(user.name, user.email)}
            </span>
            <div className={styles.who}>
              <p className={styles.name}>{displayName}</p>
              <p className={styles.email}>{user.email}</p>
            </div>
          </div>

          <div className={styles.list}>
            {ADMIN_LINKS.map((item) => {
              const active = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  className={active ? `${styles.item} ${styles.itemActive}` : styles.item}
                  role="menuitem"
                  to={item.to}
                  onClick={() => {
                    setOpen(false)
                    onNavigate?.()
                  }}
                >
                  <span>{item.label}</span>
                  {active ? <span className={styles.dot} aria-hidden="true" /> : null}
                </Link>
              )
            })}
          </div>

          <div className={styles.divider} />

          <button
            type="button"
            className={`${styles.item} ${styles.logout}`}
            role="menuitem"
            onClick={() => void handleLogout()}
          >
            <span>Cerrar sesión</span>
            <LogoutIcon />
          </button>
        </div>
      ) : null}
    </div>
  )
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function PersonIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}
