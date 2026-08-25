import { useState } from 'react'
import { Link } from 'react-router-dom'
import { historiaEntries, historiaPage } from '../content/historia'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import styles from './HistoriaPage.module.css'

export function HistoriaPage() {
  const [openId, setOpenId] = useState<string | null>(historiaEntries[0]?.id ?? null)

  return (
    <>
      <a className="skipLink" href="#historia">
        Saltar al contenido
      </a>
      <Header />
      <main id="historia" className={styles.main}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>{historiaPage.eyebrow}</p>
          <h1 className={styles.title}>{historiaPage.title}</h1>
          <p className={styles.lead}>{historiaPage.lead}</p>

          <div className={styles.layout}>
            <div className={styles.list} role="list">
              {historiaEntries.map((entry) => {
                const open = entry.id === openId
                return (
                  <button
                    key={entry.id}
                    type="button"
                    role="listitem"
                    className={open ? `${styles.item} ${styles.itemOpen}` : styles.item}
                    onClick={() => setOpenId(entry.id)}
                    aria-pressed={open}
                  >
                    <span className={styles.itemTitle}>{entry.title}</span>
                    <span className={styles.itemSummary}>{entry.summary}</span>
                  </button>
                )
              })}
            </div>

            <article className={styles.panel} aria-live="polite">
              {(() => {
                const entry = historiaEntries.find((e) => e.id === openId) ?? historiaEntries[0]
                if (!entry) return null
                return (
                  <>
                    <h2 className={styles.panelTitle}>{entry.title}</h2>
                    <p className={styles.panelSummary}>{entry.summary}</p>
                    {entry.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)} className={styles.panelBody}>
                        {paragraph}
                      </p>
                    ))}
                  </>
                )
              })()}
            </article>
          </div>

          <div className={styles.actions}>
            <Link className={styles.back} to="/">
              Volver al inicio
            </Link>
            <Link className={styles.cta} to="/#linaje">
              Ver árbol del linaje
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
