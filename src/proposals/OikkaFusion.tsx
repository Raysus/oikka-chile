import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { hero, heroSlides, site } from '../content'
import { withBase } from '../lib/paths'
import { Contact } from '../components/Contact'
import { Gallery } from '../components/Gallery'
import { LineageGraph } from '../components/Lineage'
import { Oikka } from '../components/Oikka'
import { Schools } from '../components/Schools'
import { Videos } from '../components/Videos'
import styles from './OikkaFusion.module.css'

const CHAPTERS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'escuelas', label: 'Escuelas' },
  { id: 'oikka', label: 'OIKKA' },
  { id: 'linaje', label: 'Linaje' },
  { id: 'medios', label: 'Medios' },
  { id: 'contacto', label: 'Contacto' },
] as const

export function OikkaFusion() {
  const scroller = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5200)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const root = scroller.current
    if (!root) return

    const chapters = root.querySelectorAll<HTMLElement>('[data-chapter]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const idx = Number((visible.target as HTMLElement).dataset.chapterIndex)
        if (!Number.isNaN(idx)) setActive(idx)
      },
      { root, threshold: [0.35, 0.55, 0.7] },
    )

    chapters.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function go(i: number) {
    scroller.current
      ?.querySelectorAll<HTMLElement>('[data-chapter]')
      [i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const current = heroSlides[slide]

  return (
    <div className={styles.root}>
      <header className={styles.bar}>
        <Link to="/propuestas">← Propuestas</Link>
        <span>Extra · Fusión</span>
        <a href={withBase('/#contacto')}>Contacto</a>
      </header>

      <nav className={styles.dots} aria-label="Capítulos">
        {CHAPTERS.map((c, i) => (
          <button
            key={c.id}
            type="button"
            aria-label={c.label}
            aria-current={i === active ? 'true' : undefined}
            className={i === active ? styles.dotOn : undefined}
            onClick={() => go(i)}
          />
        ))}
      </nav>

      <div className={styles.scroller} ref={scroller}>
        <section
          className={styles.hero}
          data-chapter
          data-chapter-index={0}
          style={{
            backgroundImage: `linear-gradient(115deg, rgba(12,10,6,.88), rgba(12,10,6,.35) 55%, rgba(12,10,6,.7)), url(${hero.image})`,
          }}
        >
          <div className={styles.heroInner}>
            <motion.p
              className={styles.kicker}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {site.shortName}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
            >
              {hero.brand}
            </motion.h1>
            <motion.p
              className={styles.heroSub}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
            >
              {hero.title}
            </motion.p>

            <div className={styles.slideStage}>
              <AnimatePresence mode="wait">
                <motion.article
                  key={current.id}
                  className={styles.slide}
                  initial={{ opacity: 0, x: 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.35 }}
                >
                  <p>{current.kicker}</p>
                  <h2>{current.title}</h2>
                  <p>{current.text}</p>
                </motion.article>
              </AnimatePresence>
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

            <div className={styles.heroActions}>
              <button type="button" className={styles.primary} onClick={() => go(1)}>
                Ver escuelas
              </button>
              <button type="button" className={styles.ghost} onClick={() => go(3)}>
                Explorar linaje
              </button>
            </div>
          </div>
        </section>

        <section className={styles.band} data-chapter data-chapter-index={1}>
          <Schools />
        </section>

        <section className={`${styles.band} ${styles.bandWarm}`} data-chapter data-chapter-index={2}>
          <Oikka />
        </section>

        <section className={styles.lineageChapter} data-chapter data-chapter-index={3}>
          <div className={styles.lineageHead}>
            <div>
              <p className={styles.kickerLight}>Linaje</p>
              <h2>Árbol interactivo</h2>
            </div>
            <Link className={styles.historyLink} to="/historia-y-biografias">
              Historia y biografías →
            </Link>
          </div>
          <LineageGraph variant="dark" showHeader={false} />
        </section>

        <section className={styles.band} data-chapter data-chapter-index={4}>
          <Videos />
          <Gallery />
        </section>

        <section className={`${styles.band} ${styles.bandFinale}`} data-chapter data-chapter-index={5}>
          <Contact />
          <p className={styles.footNote}>
            Fusión de la landing principal con la progresión por capítulos de la propuesta cinemática.
          </p>
        </section>
      </div>
    </div>
  )
}
