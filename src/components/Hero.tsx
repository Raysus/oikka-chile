import { useEffect, useState } from 'react'
import { hero, heroSlides } from '../content'
import styles from './Hero.module.css'

const INTERVAL_MS = 6500

export function Hero() {
  const [index, setIndex] = useState(0)
  const slide = heroSlides[index]

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className={styles.hero} aria-labelledby="hero-brand">
      <div
        className={styles.media}
        style={{ backgroundImage: `url(${hero.image})` }}
        role="img"
        aria-label={hero.imageAlt}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p id="hero-brand" className={styles.brand}>
          {hero.brand}
        </p>
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>

        <div className={styles.carousel} aria-roledescription="carrusel" aria-live="polite">
          <p className={styles.slideKicker}>{slide.kicker}</p>
          <p className={styles.slideTitle} key={slide.id + '-t'}>
            {slide.title}
          </p>
          <p className={styles.slideText} key={slide.id + '-x'}>
            {slide.text}
          </p>
          <div className={styles.dots} role="tablist" aria-label="Temas del hero">
            {heroSlides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={item.kicker}
                className={i === index ? `${styles.dot} ${styles.dotActive}` : styles.dot}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <a href="#oikka" className={styles.cta}>
            Qué es OIKKA
          </a>
          <a href="#contacto" className={styles.secondary}>
            Contacto
          </a>
        </div>
      </div>
    </section>
  )
}
