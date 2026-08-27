import { useState } from 'react'
import styles from './SchoolSedes.module.css'

export type Sede = {
  id: string
  name: string
  badge?: string
  address: string
  phone?: string
  phoneHref?: string
  email?: string
  emailHref?: string
  whatsappHref?: string
}

type SchoolSedesProps = {
  sedes: readonly Sede[]
  city?: string
}

const FILTER_THRESHOLD = 8
const AUTO_OPEN_MAX = 2

function SedeActions({ sede }: { sede: Sede }) {
  return (
    <div className={styles.actions}>
      {sede.phone && sede.phoneHref ? <a href={sede.phoneHref}>{sede.phone}</a> : null}
      {sede.email && sede.emailHref ? <a href={sede.emailHref}>{sede.email}</a> : null}
      {sede.whatsappHref ? (
        <a href={sede.whatsappHref} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      ) : null}
    </div>
  )
}

export function SchoolSedes({ sedes, city }: SchoolSedesProps) {
  const [open, setOpen] = useState(sedes.length <= AUTO_OPEN_MAX)
  const [query, setQuery] = useState('')
  const showFilter = sedes.length >= FILTER_THRESHOLD
  const compact = sedes.length > AUTO_OPEN_MAX

  const q = query.trim().toLowerCase()
  const filtered = !q
    ? sedes
    : sedes.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q),
      )

  const countLabel =
    sedes.length === 1
      ? city
        ? `1 sede en ${city}`
        : '1 sede'
      : city
        ? `${sedes.length} sedes en ${city}`
        : `${sedes.length} sedes`

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.toggleMeta}>
          <span className={styles.toggleLabel}>Sedes de práctica</span>
          <span className={styles.toggleCount}>{countLabel}</span>
        </span>
        <span className={styles.toggleAction}>{open ? 'Ocultar' : 'Ver sedes'}</span>
      </button>

      {open ? (
        <div className={styles.panel}>
          {showFilter ? (
            <label className={styles.filter}>
              <span className={styles.srOnly}>Filtrar sede</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filtrar sede…"
                autoComplete="off"
              />
            </label>
          ) : null}

          {filtered.length === 0 ? (
            <p className={styles.empty}>Ninguna sede coincide con la búsqueda.</p>
          ) : (
            <ul className={styles.list}>
              {filtered.map((sede) => (
                <li key={sede.id} className={styles.item}>
                  {compact ? (
                    <details className={styles.details}>
                      <summary className={styles.summary}>
                        <span className={styles.summaryText}>
                          {sede.badge ? (
                            <span className={styles.badge}>{sede.badge}</span>
                          ) : null}
                          <span className={styles.name}>{sede.name}</span>
                          <span className={styles.address}>{sede.address}</span>
                        </span>
                      </summary>
                      <SedeActions sede={sede} />
                    </details>
                  ) : (
                    <div className={styles.flat}>
                      {sede.badge ? <p className={styles.badge}>{sede.badge}</p> : null}
                      <p className={styles.name}>{sede.name}</p>
                      <p className={styles.address}>{sede.address}</p>
                      <SedeActions sede={sede} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}
