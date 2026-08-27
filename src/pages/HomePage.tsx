import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import {
  angiVideos,
  contact,
  gallery,
  hero,
  heroSlides,
  news,
  oikka,
  schools,
  site,
} from '../content'
import { LineageGraph } from '../components/Lineage'
import styles from './HomePage.module.css'

const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'escuelas', label: 'Escuelas' },
  { id: 'oikka', label: 'OIKKA' },
  { id: 'linaje', label: 'Linaje' },
  { id: 'noticias', label: 'Noticias' },
  { id: 'videos', label: 'Videos' },
  { id: 'contacto', label: 'Contacto' },
] as const

const pillars = [oikka.mission, oikka.vision, oikka.identity]

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)
  const [pillar, setPillar] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
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

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash || !rootRef.current) return
    const el = rootRef.current.querySelector(`#${CSS.escape(hash)}`)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function go(id: string) {
    setMenuOpen(false)
    rootRef.current?.querySelector(`#${CSS.escape(id)}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  const active = heroSlides[slide]

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
          aria-controls="nav-kinetica"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? 'Cerrar' : 'Menú'}
        </button>

        <nav
          id="nav-kinetica"
          className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}
          aria-label="Principal"
        >
          {sections
            .filter((s) => s.id !== 'inicio')
            .map((s) => (
              <button key={s.id} type="button" className={styles.navLink} onClick={() => go(s.id)}>
                {s.label}
              </button>
            ))}
          <Link
            className={styles.navLink}
            to="/historia-y-biografias"
            onClick={() => setMenuOpen(false)}
          >
            Historia y biografías
          </Link>
        </nav>
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
            <motion.p
              className={styles.kicker}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {site.shortName}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
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
            <div className={styles.heroActions}>
              <button type="button" className={styles.primary} onClick={() => go('escuelas')}>
                Ver escuelas
              </button>
              <button type="button" className={styles.ghost} onClick={() => go('linaje')}>
                Explorar linaje
              </button>
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
                  <img className={styles.insignia} src={s.insignia} alt={s.insigniaAlt} />
                  <p className={styles.schoolCity}>{s.city}</p>
                  {'badge' in s && s.badge ? <p className={styles.schoolBadge}>{s.badge}</p> : null}
                  <h3>{s.name}</h3>
                  <p className={styles.schoolLead}>{s.lead}</p>
                  <div className={styles.schoolActions}>
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
                    {'whatsappHref' in s && s.whatsappHref ? (
                      <a href={s.whatsappHref} target="_blank" rel="noreferrer">
                        WhatsApp
                      </a>
                    ) : null}
                  </div>
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
                  {i === pillar ? (
                    <motion.span layoutId="oikka-tab" className={styles.tabLine} />
                  ) : null}
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
            <p className={styles.world}>
              {oikka.world.role}: {oikka.world.name} ·{' '}
              <a href={oikka.world.href} target="_blank" rel="noreferrer">
                {oikka.world.hrefLabel}
              </a>
            </p>
          </div>
        </section>

        <section id="linaje" className={`${styles.section} ${styles.dark}`}>
          <div className={styles.sectionInnerWide}>
            <div className={styles.lineageHead}>
              <div>
                <p className={styles.kickerLight}>Linaje</p>
                <h2>Árbol vivo</h2>
              </div>
              <Link className={styles.historyLink} to="/historia-y-biografias">
                Historia y biografías →
              </Link>
            </div>
            <div className={styles.lineageWrap}>
              <LineageGraph variant="dark" showHeader={false} />
            </div>
          </div>
        </section>

        <section id="noticias" className={styles.section}>
          <div className={styles.sectionInner}>
            <p className={styles.kickerDark}>Actualidad</p>
            <h2>{news.title}</h2>
            <p className={styles.newsIntro}>{news.intro}</p>
            <div className={styles.newsGrid}>
              {news.items.map((item, i) => (
                <motion.article
                  key={item.id}
                  className={styles.newsCard}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p>{item.date}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="videos" className={`${styles.section} ${styles.warm}`}>
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
            <div id="galeria" className={styles.galleryStrip}>
              {gallery.map((g) => (
                <motion.img key={g.src} src={g.src} alt={g.alt} whileHover={{ scale: 1.04 }} />
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className={`${styles.section} ${styles.finale}`}>
          <div className={styles.sectionInner}>
            <p className={styles.kickerDark}>Comunidad</p>
            <h2>{contact.title}</h2>
            <p className={styles.newsIntro}>{contact.text}</p>
            <div className={styles.contactActions}>
              <a className={styles.primary} href={contact.phone.href}>
                {contact.phone.label}
              </a>
              <a className={styles.ghostDark} href={contact.email.href}>
                {contact.email.label}
              </a>
              <a
                className={styles.ghostDark}
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
