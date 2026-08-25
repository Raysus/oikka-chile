import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  angiVideos,
  gallery,
  hero,
  heroSlides,
  oikka,
  schools,
} from '../content'
import { withBase } from '../lib/paths'
import { LineageGraph } from '../components/Lineage'
import styles from './OikkaCinematic.module.css'

export function OikkaCinematic() {
  const scroller = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5200)
    return () => window.clearInterval(id)
  }, [])

  function go(i: number) {
    scroller.current?.querySelectorAll<HTMLElement>('[data-chapter]')[i]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className={styles.root}>
      <header className={styles.bar}>
        <Link to="/propuestas">← Propuestas</Link>
        <span>Extra · Cinemática</span>
        <a href={withBase('/#contacto')}>Contacto</a>
      </header>

      <nav className={styles.dots} aria-label="Capítulos">
        {['Hero', 'Escuelas', 'OIKKA', 'Linaje', 'Videos', 'Cierre'].map((label, i) => (
          <button key={label} type="button" aria-label={label} onClick={() => go(i)} />
        ))}
      </nav>

      <div className={styles.scroller} ref={scroller}>
        <section
          className={styles.chapter}
          data-chapter
          style={{
            backgroundImage: `linear-gradient(120deg,rgba(12,10,6,.85),rgba(12,10,6,.4)), url(${hero.image})`,
          }}
        >
          <div className={styles.inner}>
            <p className={styles.kicker}>OIKKA Chile</p>
            <h1>{hero.brand}</h1>
            <p className={styles.heroSub}>{hero.title}</p>
            <div className={styles.card} key={heroSlides[slide].id}>
              <p>{heroSlides[slide].kicker}</p>
              <h2>{heroSlides[slide].title}</h2>
              <p>{heroSlides[slide].text}</p>
            </div>
          </div>
        </section>

        <section className={`${styles.chapter} ${styles.dark}`} data-chapter>
          <div className={styles.inner}>
            <p className={styles.kicker}>Escuelas</p>
            <h2>En Chile</h2>
            <div className={styles.grid3}>
              {schools.map((s) => (
                <article key={s.id}>
                  <p>{s.city}</p>
                  <h3>{s.name}</h3>
                  <p>{s.lead}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.chapter} ${styles.warm}`} data-chapter>
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
          </div>
        </section>

        <section className={`${styles.chapter} ${styles.lineageChapter}`} data-chapter>
          <div className={styles.lineageInner}>
            <div className={styles.lineageHead}>
              <p className={styles.kicker}>Linaje</p>
              <h2>Árbol interactivo</h2>
              <Link className={styles.link} to="/historia-y-biografias">
                Abrir historia y biografías
              </Link>
            </div>
            <LineageGraph variant="dark" showHeader={false} />
          </div>
        </section>

        <section className={`${styles.chapter} ${styles.warm}`} data-chapter>
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

        <section className={`${styles.chapter} ${styles.finale}`} data-chapter>
          <div className={styles.inner}>
            <p className={styles.kicker}>Comunidad</p>
            <h2>Galería y contacto</h2>
            <div className={styles.galleryRow}>
              {gallery.map((g) => (
                <img key={g.src} src={g.src} alt={g.alt} />
              ))}
            </div>
            <a className={styles.cta} href={withBase('/#contacto')}>
              Contacto
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
