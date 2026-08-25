import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import { angiVideos, gallery, hero, heroSlides, oikka, schools } from '../content'
import { withBase } from '../lib/paths'
import { LineageGraph } from '../components/Lineage'
import styles from './OikkaKinetic.module.css'

const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'escuelas', label: 'Escuelas' },
  { id: 'oikka', label: 'OIKKA' },
  { id: 'linaje', label: 'Linaje' },
  { id: 'videos', label: 'Videos' },
] as const

const pillars = [oikka.mission, oikka.vision, oikka.identity]

export function OikkaKinetic() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)
  const [pillar, setPillar] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll({ container: rootRef })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(sections.length - 1, Math.floor(v * sections.length))
    setActiveSection(idx)
  })

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 4800)
    return () => window.clearInterval(id)
  }, [])

  function go(id: string) {
    rootRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  const active = heroSlides[slide]

  return (
    <div className={styles.root}>
      <header className={styles.bar}>
        <Link to="/propuestas">← Propuestas</Link>
        <span>Extra A · Kinética</span>
        <a href={withBase('/#contacto')}>Contacto</a>
      </header>

      <aside className={styles.rail} aria-label="Secciones">
        <motion.div className={styles.railFill} style={{ scaleY: progress }} />
        {sections.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={i === activeSection ? styles.railOn : undefined}
            onClick={() => go(s.id)}
          >
            {s.label}
          </button>
        ))}
      </aside>

      <div className={styles.scroller} ref={rootRef}>
        <section id="inicio" className={styles.hero}>
          <motion.div
            className={styles.heroMedia}
            style={{ backgroundImage: `url(${hero.image})` }}
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className={styles.heroShade} />
          <div className={styles.heroCopy}>
            <motion.p className={styles.kicker} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              OIKKA Chile
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              {hero.brand}
            </motion.h1>
            <motion.p
              className={styles.heroSub}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
            >
              {hero.title}
            </motion.p>
            <div className={styles.slideStage}>
              <AnimatePresence mode="wait">
                <motion.article
                  key={active.id}
                  className={styles.slide}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -36 }}
                >
                  <p>{active.kicker}</p>
                  <h2>{active.title}</h2>
                  <p>{active.text}</p>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="escuelas" className={styles.section}>
          <div className={styles.sectionInner}>
            <p className={styles.kickerDark}>Escuelas</p>
            <h2>Dojos en Chile</h2>
            <div className={styles.schoolTrack}>
              {schools.map((s, i) => (
                <motion.article
                  key={s.id}
                  className={styles.school}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <p>{s.city}</p>
                  <h3>{s.name}</h3>
                  <p>{s.lead}</p>
                  <a href={s.website} target="_blank" rel="noreferrer">
                    {s.websiteLabel}
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="oikka" className={`${styles.section} ${styles.warm}`}>
          <div className={styles.sectionInner}>
            <p className={styles.kickerDark}>{oikka.title}</p>
            <h2>{oikka.fullName}</h2>
            <div className={styles.pillarTabs}>
              {pillars.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  className={i === pillar ? styles.tabOn : styles.tab}
                  onClick={() => setPillar(i)}
                >
                  {p.title}
                  {i === pillar ? <motion.span layoutId="oikka-a-tab" className={styles.tabLine} /> : null}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={pillars[pillar].title}
                className={styles.pillarText}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                {pillars[pillar].text}
              </motion.p>
            </AnimatePresence>
            <p className={styles.history}>{oikka.history}</p>
          </div>
        </section>

        <section id="linaje" className={`${styles.section} ${styles.dark}`}>
          <div className={styles.sectionInnerWide}>
            <p className={styles.kickerLight}>Linaje</p>
            <h2>Árbol vivo</h2>
            <div className={styles.lineageWrap}>
              <LineageGraph />
            </div>
          </div>
        </section>

        <section id="videos" className={styles.section}>
          <div className={styles.sectionInner}>
            <p className={styles.kickerDark}>Videos</p>
            <h2>Maestro Angi Uezu</h2>
            <div className={styles.videoGrid}>
              {angiVideos.slice(0, 3).map((v, i) => (
                <motion.article
                  key={v.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className={styles.embed}>
                    <iframe
                      title={v.title}
                      src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h3>{v.title}</h3>
                </motion.article>
              ))}
            </div>
            <div className={styles.galleryStrip}>
              {gallery.map((g) => (
                <motion.img key={g.src} src={g.src} alt={g.alt} whileHover={{ scale: 1.04 }} />
              ))}
            </div>
            <motion.a
              className={styles.cta}
              href={withBase('/#contacto')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Contacto
            </motion.a>
          </div>
        </section>
      </div>
    </div>
  )
}
