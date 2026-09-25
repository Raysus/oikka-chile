import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../adminAuth/useAdminAuth'
import styles from './AdminAccountMenu.module.css'

const ADMIN_LINKS = [
  { to: '/admin/noticias', label: 'Noticias' },
  { to: '/admin/eventos', label: 'Eventos' },
  { to: '/admin/galeria', label: 'Galería' },
  { to: '/admin/videos', label: 'Videos' },
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
}

export function AdminAccountMenu({ onNavigate, tone = 'light' }: AdminAccountMenuProps) {
  const { user, loading, logout } = useAdminAuth()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  if (loading || !user) return null

  async function handleLogout() {
    setOpen(false)
    try {
      await logout()
    } catch {
      /* mantener sesión visible si falla el cierre */
    }
  }

  const displayName = user.name?.trim() || 'Administrador'
  const rootClass = tone === 'dark' ? `${styles.account} ${styles.dark}` : styles.account

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
