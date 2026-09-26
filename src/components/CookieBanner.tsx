import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCookieConsent, setCookieConsent } from '../lib/consent'
import styles from './CookieBanner.module.css'

export function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(getCookieConsent() == null)
  }, [])

  if (!open) return null

  const choose = (analytics: boolean) => {
    setCookieConsent(analytics)
    setOpen(false)
  }

  return (
    <div className={styles.banner} role="dialog" aria-label="Consentimiento de cookies">
      <p>
        Usamos cookies esenciales para el panel de administración. La analítica (si está
        configurada) solo se activa si la aceptas.{' '}
        <Link to="/privacidad">Privacidad</Link>
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.secondary} onClick={() => choose(false)}>
          Solo esenciales
        </button>
        <button type="button" className={styles.primary} onClick={() => choose(true)}>
          Aceptar analítica
        </button>
      </div>
    </div>
  )
}
