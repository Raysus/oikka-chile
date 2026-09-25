import { type FormEvent, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAdminAuth } from '../adminAuth/useAdminAuth'
import { AdminAccountMenu } from '../components/AdminAccountMenu'
import styles from './Admin.module.css'

export function AdminAccountPage() {
  const { user, loading, updateProfile } = useAdminAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!user) return
    setName(user.name ?? '')
    setEmail(user.email)
  }, [user])

  if (loading) {
    return (
      <div className={styles.page}>
        <p className={styles.help}>Cargando…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin" replace />
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError(null)
    setMessage(null)
    try {
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error('La confirmación de contraseña no coincide')
        }
        if (!currentPassword) {
          throw new Error('Indica tu contraseña actual para cambiarla')
        }
      }
      await updateProfile({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        currentPassword: newPassword ? currentPassword : undefined,
        newPassword: newPassword || undefined,
      })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setMessage('Datos actualizados.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>Cuenta</p>
            <h1 className={styles.title}>Mis datos</h1>
            <p className={styles.help}>Nombre, correo y contraseña del administrador.</p>
          </div>
          <div className={styles.topActions}>
            <AdminAccountMenu />
            <Link className={styles.back} to="/">
              Ver sitio
            </Link>
          </div>
        </header>

        {error ? <p className={styles.error}>{error}</p> : null}
        {message ? <p className={styles.success}>{message}</p> : null}

        <form className={styles.panelWide} onSubmit={(e) => void onSubmit(e)}>
          <label className={styles.label}>
            Nombre
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Cómo quieres que te vean"
            />
          </label>
          <label className={styles.label}>
            Correo
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className={styles.label}>
            Contraseña actual (solo si cambias la clave)
            <input
              className={styles.input}
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          <label className={styles.label}>
            Nueva contraseña
            <input
              className={styles.input}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
            />
          </label>
          <label className={styles.label}>
            Confirmar nueva contraseña
            <input
              className={styles.input}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
            />
          </label>
          <div className={styles.formActions}>
            <button className={styles.button} type="submit" disabled={busy}>
              {busy ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
