import { gallery } from '../content'
import styles from './Gallery.module.css'

export function Gallery() {
  return (
    <section id="galeria" className={styles.section} aria-labelledby="galeria-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Comunidad</p>
          <h2 id="galeria-title" className={styles.title}>
            Galería
          </h2>
        </header>
        <div className={styles.grid}>
          {gallery.map((item) => (
            <img key={item.src} src={item.src} alt={item.alt} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  )
}
