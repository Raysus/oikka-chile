import { type FormEvent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAdminAuth } from '../adminAuth/useAdminAuth'
import styles from './Admin.module.css'

export function AdminLoginPage() {
  const { user, loading, login } = useAdminAuth()
  const [email, setEmail] = useState('ra.guti.el@gmail.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to="/" replace />
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await login(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión')
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.panel} onSubmit={(e) => void onSubmit(e)}>
        <p className={styles.eyebrow}>Acceso restringido</p>
        <h1 className={styles.title}>Admin OIKKA Chile</h1>
        <p className={styles.help}>
          Sensei y administradores pueden publicar noticias, eventos, galería y videos.
        </p>

        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Contraseña
          <input
            className={styles.input}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error ? <p className={styles.error}>{error}</p> : null}

        <button className={styles.button} type="submit" disabled={submitting}>
          {submitting ? 'Entrando…' : 'Entrar'}
        </button>

        <Link className={styles.back} to="/">
          Volver al sitio
        </Link>
      </form>
    </div>
  )
}
