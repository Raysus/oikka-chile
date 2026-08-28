import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
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
import { AccountMenu } from '../components/AccountMenu'
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
const featuredVideo = angiVideos[0]
const sideVideos = angiVideos.slice(1, 3)

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const swipeX = useRef<number | null>(null)
  const [slide, setSlide] = useState(0)
  const [pillar, setPillar] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll({ container: rootRef })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, 70])
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1.08, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(sections.length - 1, Math.floor(v * sections.length))
    setActiveSection(idx)
  })

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5600)
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

  function onSlidePointerDown(e: ReactPointerEvent) {
    swipeX.current = e.clientX
  }

  function onSlidePointerUp(e: ReactPointerEvent) {
    if (swipeX.current == null) return
    const delta = e.clientX - swipeX.current
    swipeX.current = null
    if (Math.abs(delta) < 48) return
    setSlide((s) =>
      delta < 0 ? (s + 1) % heroSlides.length : (s - 1 + heroSlides.length) % heroSlides.length,
    )
  }

  const active = heroSlides[slide]
  const activePillar = pillars[pillar]

  return (
    <div className={styles.root}>
      <a className={styles.skip} href="#inicio">
        Saltar al contenido
      </a>

      <header className={styles.bar}>
        <button type="button" className={styles.brand} onClick={() => go('inicio')}>
          <img className={styles.brandLogo} src={site.logo} alt="" width={40} height={40} />
          <span>{site.shortName}</span>
        </button>

        <div className={styles.barEnd}>
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

          <AccountMenu tone="dark" compact />

          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={menuOpen}
            aria-controls="nav-kinetica"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? 'Cerrar' : 'Menú'}
          </button>
        </div>
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
            <span className={styles.railDot} aria-hidden="true" />
            {s.label}
          </button>
        ))}
      </aside>

      <div className={styles.scroller} ref={rootRef}>
        <section id="inicio" className={styles.hero}>
          <motion.div
            className={styles.heroMedia}
            style={{
              backgroundImage: `url(${hero.image})`,
              y: heroY,
              scale: heroScale,
            }}
          />
          <div className={styles.heroShade} />
          <div className={styles.heroCopy}>
            <motion.h1
              className={styles.heroBrand}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>OIKKA</span>
              <span>Chile</span>
            </motion.h1>
            <motion.p
              className={styles.heroSub}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.65 }}
            >
              {hero.title}
            </motion.p>
            <motion.div
              className={styles.heroActions}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              <button type="button" className={styles.primary} onClick={() => go('escuelas')}>
                Ver escuelas
              </button>
              <button type="button" className={styles.textLink} onClick={() => go('linaje')}>
                Explorar linaje
              </button>
            </motion.div>

            <div
              className={styles.slideStage}
              onPointerDown={onSlidePointerDown}
              onPointerUp={onSlidePointerUp}
            >
              <AnimatePresence mode="wait">
                <motion.article
                  key={active.id}
                  className={styles.slide}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  <p>{active.kicker}</p>
                  <h2>{active.title}</h2>
                  <p>{active.text}</p>
                </motion.article>
              </AnimatePresence>
              <div className={styles.slideDots} role="tablist" aria-label="Destacados">
                {heroSlides.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={i === slide}
                    className={i === slide ? styles.dotOn : styles.dot}
                    onClick={() => setSlide(i)}
                  >
                    <span className={styles.srOnly}>{item.kicker}</span>
                  </button>
                ))}
              </div>
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
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                >
                  <div className={styles.schoolPhotoWrap}>
                    <img className={styles.schoolPhoto} src={s.photo} alt={s.photoAlt} />
                    <img className={styles.insigniaOnPhoto} src={s.insignia} alt="" />
                  </div>
                  <div className={styles.schoolBody}>
                    <p className={styles.schoolCity}>{s.city}</p>
                    {'badge' in s && s.badge ? (
                      <p className={styles.schoolBadge}>{s.badge}</p>
                    ) : null}
                    <h3>{s.name}</h3>
                    <p className={styles.schoolLead}>{s.lead}</p>
                    <div className={styles.schoolActions}>
                      {'whatsappHref' in s && s.whatsappHref ? (
                        <a href={s.whatsappHref} target="_blank" rel="noreferrer">
                          WhatsApp
                        </a>
                      ) : null}
                      {'phone' in s && s.phone && s.phoneHref ? (
                        <a href={s.phoneHref}>Llamar</a>
                      ) : null}
                      {'website' in s && s.website ? (
                        <a href={s.website} target="_blank" rel="noreferrer">
                          {s.websiteLabel}
                        </a>
                      ) : null}
                      {'email' in s && s.email && s.emailHref ? (
                        <a href={s.emailHref}>Correo</a>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.atmosphere} aria-label="Práctica Isshin Ryu">
          <motion.div
            className={styles.atmosphereMedia}
            style={{ backgroundImage: `url(${oikka.atmosphere})` }}
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className={styles.atmosphereShade} />
          <motion.p
            className={styles.atmosphereCopy}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Un solo corazón. Una sola mente.
          </motion.p>
        </section>

        <section id="oikka" className={`${styles.section} ${styles.warm}`}>
          <div className={styles.sectionInner}>
            <div className={styles.oikkaLayout}>
              <div>
                <div className={styles.oikkaHead}>
                  <img className={styles.oikkaLogo} src={site.logo} alt={site.logoAlt} width={88} height={88} />
                  <div>
                    <p className={styles.kickerDark}>{oikka.title}</p>
                    <h2>{oikka.fullName}</h2>
                  </div>
                </div>
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
                    key={activePillar.title}
                    className={styles.pillarText}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {activePillar.text}
                  </motion.p>
                </AnimatePresence>
                <p className={styles.world}>
                  {oikka.world.role}: {oikka.world.name} ·{' '}
                  <a href={oikka.world.href} target="_blank" rel="noreferrer">
                    {oikka.world.hrefLabel}
                  </a>
                </p>
                <Link className={styles.inlineCta} to="/historia-y-biografias">
                  Leer historia y biografías →
                </Link>
              </div>
              <motion.figure
                className={styles.oikkaPortrait}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <img src={oikka.portrait} alt={oikka.portraitAlt} />
                <figcaption>Tatsuo Shimabuku · fundador de Isshin Ryu</figcaption>
              </motion.figure>
            </div>
          </div>
        </section>

        <section id="linaje" className={`${styles.section} ${styles.dark}`}>
          <div className={styles.sectionInnerWide}>
            <div className={styles.lineageHead}>
              <div>
                <p className={styles.kickerLight}>Linaje</p>
                <h2>Árbol vivo</h2>
                <p className={styles.lineageLead}>
                  Desde Okinawa hasta Chile: el hilo de maestros que sostiene Isshin Ryu.
                </p>
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
            <p className={styles.newsIntro}>
              Archivo histórico de kata, kihon y kobudo para estudiar el Isshin Ryu de Okinawa.
            </p>

            <motion.article
              className={styles.videoFeatured}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className={styles.embed}>
                <iframe
                  title={featuredVideo.title}
                  src={`https://www.youtube-nocookie.com/embed/${featuredVideo.id}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3>{featuredVideo.title}</h3>
            </motion.article>

            <div className={styles.videoSide}>
              {sideVideos.map((v, i) => (
                <motion.article
                  key={v.id}
                  initial={{ opacity: 0, scale: 0.97 }}
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
              {gallery.map((g, i) => (
                <motion.img
                  key={g.src}
                  src={g.src}
                  alt={g.alt}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                />
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
              <a className={styles.primary} href={contact.whatsapp.href} target="_blank" rel="noreferrer">
                {contact.whatsapp.label}
              </a>
              <a className={styles.ghostDark} href={contact.phone.href}>
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
