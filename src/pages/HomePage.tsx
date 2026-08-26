import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  angiVideos,
  contact,
  gallery,
  hero,
  heroSlides,
  oikka,
  schools,
  site,
} from '../content'
import { LineageGraph } from '../components/Lineage'
import styles from './HomePage.module.css'

const CHAPTERS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'escuelas', label: 'Escuelas' },
  { id: 'oikka', label: 'OIKKA' },
  { id: 'linaje', label: 'Linaje' },
  { id: 'videos', label: 'Videos' },
  { id: 'contacto', label: 'Contacto' },
] as const

export function HomePage() {
  const scroller = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5200)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash || !scroller.current) return
    const el = scroller.current.querySelector<HTMLElement>(`#${CSS.escape(hash)}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  function go(id: string) {
    setMenuOpen(false)
    scroller.current?.querySelector<HTMLElement>(`#${CSS.escape(id)}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const current = heroSlides[slide]

  return (
    <div className={styles.root}>
      <a className={styles.skip} href="#inicio">
        Saltar al contenido
      </a>

      <header className={styles.bar}>
        <button type="button" className={styles.brand} onClick={() => go('inicio')}>
          {site.shortName}
        </button>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={menuOpen}
          aria-controls="nav-oficial"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? 'Cerrar' : 'Menú'}
        </button>

        <nav
          id="nav-oficial"
          className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}
          aria-label="Principal"
        >
          {CHAPTERS.filter((c) => c.id !== 'inicio').map((c) => (
            <button key={c.id} type="button" className={styles.navLink} onClick={() => go(c.id)}>
              {c.label}
            </button>
          ))}
          <Link className={styles.navLink} to="/historia-y-biografias" onClick={() => setMenuOpen(false)}>
            Historia
          </Link>
        </nav>
      </header>

      <nav className={styles.dots} aria-label="Capítulos">
        {CHAPTERS.map((c) => (
          <button key={c.id} type="button" aria-label={c.label} onClick={() => go(c.id)} />
        ))}
      </nav>

      <div className={styles.scroller} ref={scroller}>
        <section
          id="inicio"
          className={styles.chapter}
          style={{
            backgroundImage: `linear-gradient(120deg,rgba(12,10,6,.85),rgba(12,10,6,.4)), url(${hero.image})`,
          }}
        >
          <div className={styles.inner}>
            <p className={styles.kicker}>{site.shortName}</p>
            <h1>{hero.brand}</h1>
            <p className={styles.heroSub}>{hero.title}</p>
            <p className={styles.heroLead}>{hero.subtitle}</p>
            <div className={styles.card} key={current.id}>
              <p>{current.kicker}</p>
              <h2>{current.title}</h2>
              <p>{current.text}</p>
            </div>
            <div className={styles.slideDots}>
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={s.kicker}
                  className={i === slide ? styles.on : undefined}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="escuelas" className={`${styles.chapter} ${styles.dark}`}>
          <div className={styles.inner}>
            <p className={styles.kicker}>Escuelas</p>
            <h2>Dojos en Chile</h2>
            <div className={styles.schoolGrid}>
              {schools.map((s) => (
                <article key={s.id} className={styles.school}>
                  <p>{s.city}</p>
                  <h3>{s.name}</h3>
                  <p className={styles.lead}>{s.lead}</p>
                  {'pending' in s && s.pending ? (
                    <p className={styles.pending}>{s.pendingNote}</p>
                  ) : (
                    <div className={styles.actions}>
                      {'website' in s && s.website ? (
                        <a href={s.website} target="_blank" rel="noreferrer">
                          {s.websiteLabel}
                        </a>
                      ) : null}
                      {'phone' in s && s.phone && s.phoneHref ? (
                        <a href={s.phoneHref}>{s.phone}</a>
                      ) : null}
                      {'email' in s && s.email && s.emailHref ? (
                        <a href={s.emailHref}>{s.email}</a>
                      ) : null}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="oikka" className={`${styles.chapter} ${styles.warm}`}>
          <div className={styles.inner}>
            <p className={styles.kicker}>Asociación</p>
            <h2>{oikka.title}</h2>
            <p className={styles.big}>{oikka.history}</p>
            <div className={styles.grid3}>
              {[oikka.mission, oikka.vision, oikka.identity].map((v) => (
                <article key={v.title}>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              ))}
            </div>
            <p className={styles.world}>
              Dirección mundial: {oikka.world.name} · {oikka.world.role} ·{' '}
              <a href={oikka.world.href} target="_blank" rel="noreferrer">
                {oikka.world.hrefLabel}
              </a>
            </p>
          </div>
        </section>

        <section id="linaje" className={`${styles.chapter} ${styles.lineageChapter}`}>
          <div className={styles.lineageInner}>
            <div className={styles.lineageHead}>
              <div>
                <p className={styles.kicker}>Linaje</p>
                <h2>Árbol interactivo</h2>
              </div>
              <Link className={styles.link} to="/historia-y-biografias">
                Historia y biografías →
              </Link>
            </div>
            <LineageGraph variant="dark" showHeader={false} />
          </div>
        </section>

        <section id="videos" className={`${styles.chapter} ${styles.warm}`}>
          <div className={styles.inner}>
            <p className={styles.kicker}>Angi Uezu</p>
            <h2>Videos</h2>
            <div className={styles.videoGrid}>
              {angiVideos.slice(0, 2).map((v) => (
                <div key={v.id} className={styles.frame}>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className={`${styles.chapter} ${styles.finale}`}>
          <div className={styles.inner}>
            <p className={styles.kicker}>Comunidad</p>
            <h2>{contact.title}</h2>
            <p className={styles.big}>{contact.text}</p>
            <div className={styles.galleryRow} id="galeria">
              {gallery.map((g) => (
                <img key={g.src} src={g.src} alt={g.alt} />
              ))}
            </div>
            <div className={styles.contactActions}>
              <a className={styles.cta} href={contact.email.href}>
                {contact.email.label}
              </a>
              <a
                className={styles.secondary}
                href={contact.facebook.href}
                target="_blank"
                rel="noreferrer"
              >
                {contact.facebook.label}
              </a>
            </div>
            <p className={styles.copy}>
              © {new Date().getFullYear()} {site.shortName} — {site.tagline}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
