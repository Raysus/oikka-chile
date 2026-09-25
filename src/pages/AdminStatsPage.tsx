import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAdminAuth } from '../adminAuth/useAdminAuth'
import { AdminAccountMenu } from '../components/AdminAccountMenu'
import { getAnalyticsSnapshot } from '../lib/analytics'
import styles from './Admin.module.css'

export function AdminStatsPage() {
  const { user, loading } = useAdminAuth()
  const [stats, setStats] = useState(() => getAnalyticsSnapshot())

  useEffect(() => {
    const refresh = () => setStats(getAnalyticsSnapshot())
    refresh()
    const id = window.setInterval(refresh, 4000)
    return () => window.clearInterval(id)
  }, [])

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

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>Panel</p>
            <h1 className={styles.title}>Estadísticas</h1>
            <p className={styles.help}>
              {user.name ? `${user.name} · ` : ''}
              {user.email}
            </p>
          </div>
          <div className={styles.topActions}>
            <AdminAccountMenu />
            <Link className={styles.back} to="/">
              Ver sitio
            </Link>
          </div>
        </header>

        <div className={styles.panelWide}>
          <h2 className={styles.sectionTitle}>Estadísticas del sitio</h2>
          <p className={styles.help}>
            Contadores locales de este navegador. Con Google Analytics (`VITE_GA_MEASUREMENT_ID`) también se
            envían eventos globales.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(12rem,1fr))',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            <div>
              <p className={styles.help}>Ingresos / visitas</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{stats.pageViews}</p>
              <p className={styles.help}>
                Última:{' '}
                {stats.lastPageViewAt ? new Date(stats.lastPageViewAt).toLocaleString('es-CL') : '—'}
              </p>
            </div>
            <div>
              <p className={styles.help}>Clics “clase de prueba”</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{stats.trialClassClicks}</p>
              <p className={styles.help}>
                Último:{' '}
                {stats.lastTrialClickAt
                  ? new Date(stats.lastTrialClickAt).toLocaleString('es-CL')
                  : '—'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
