import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import styles from './AccountMenu.module.css'

type AccountMenuProps = {
  /** dark = kinetic home bar; light = shared Header */
  tone?: 'dark' | 'light'
  /** Quieter login control for marketing headers */
  compact?: boolean
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function IconHistoria() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        d="M4 5.5h11.5A2.5 2.5 0 0 1 18 8v11.5H6.5A2.5 2.5 0 0 1 4 17V5.5Z"
      />
      <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M8 9h7M8 12.5h7M8 16h4.5" />
    </svg>
  )
}

function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        d="M10 4.5H6.5A2 2 0 0 0 4.5 6.5v11a2 2 0 0 0 2 2H10"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M12.5 12H20M16.5 8.5 20 12l-3.5 3.5"
      />
    </svg>
  )
}

export function AccountMenu({ tone = 'dark', compact = false }: AccountMenuProps) {
  const { user, login, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!menuOpen && !loginOpen) return
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setLoginOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen, loginOpen])

  useEffect(() => {
    if (!loginOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [loginOpen])

  function openLogin() {
    setError('')
    setPassword('')
    setLoginOpen(true)
    setMenuOpen(false)
  }

  function handleLogin(e: FormEvent) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    if (!trimmedName || !trimmedEmail || !password) {
      setError('Completa nombre, correo y contraseña.')
      return
    }
    if (!trimmedEmail.includes('@')) {
      setError('Ingresa un correo válido.')
      return
    }
    login({ name: trimmedName, email: trimmedEmail })
    setLoginOpen(false)
    setPassword('')
  }

  return (
    <div
      className={`${styles.root} ${tone === 'light' ? styles.light : styles.dark}${compact ? ` ${styles.compact}` : ''}`}
      ref={rootRef}
    >
      {user ? (
        <>
          <button
            type="button"
            className={styles.avatarBtn}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            onClick={() => setMenuOpen((v) => !v)}
            title={user.name}
          >
            <span className={styles.avatar} aria-hidden="true">
              {initials(user.name)}
            </span>
            <span className={styles.srOnly}>Cuenta de {user.name}</span>
          </button>

          {menuOpen ? (
            <div className={styles.menu} role="menu" aria-label="Cuenta">
              <div className={styles.identity}>
                <p className={styles.userName}>{user.name}</p>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
              <div className={styles.divider} />
              <Link
                to="/historia-y-biografias"
                className={styles.item}
                role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                <span>Historia y biografías</span>
                <IconHistoria />
              </Link>
              <button
                type="button"
                className={styles.item}
                role="menuitem"
                onClick={() => {
                  logout()
                  setMenuOpen(false)
                }}
              >
                <span>Cerrar sesión</span>
                <IconLogout />
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <button type="button" className={styles.loginBtn} onClick={openLogin}>
          Iniciar sesión
        </button>
      )}

      {loginOpen ? (
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
            <h2 id={titleId}>Iniciar sesión</h2>
            <p className={styles.modalLead}>
              Acceso provisional para la asociación. Más adelante se conectará al panel de
              miembros.
            </p>
            <form className={styles.form} onSubmit={handleLogin}>
              <label>
                Nombre
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </label>
              <label>
                Correo
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
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
                <button type="button" className={styles.secondary} onClick={() => setLoginOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.primary}>
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
