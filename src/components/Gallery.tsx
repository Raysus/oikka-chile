import { imageSrc } from '../lib/api'
import { useMedia } from '../lib/useMedia'
import styles from './Gallery.module.css'

export function Gallery() {
  const { gallery, loading } = useMedia()

  return (
    <section id="galeria" className={styles.section} aria-labelledby="galeria-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Comunidad</p>
          <h2 id="galeria-title" className={styles.title}>
            Galería
          </h2>
        </header>
        {loading ? <p>Cargando galería…</p> : null}
        {!loading && gallery.length === 0 ? <p>Pronto publicaremos fotos de la asociación.</p> : null}
        <div className={styles.grid}>
          {gallery.map((item) => {
            const src = imageSrc(item.imageUrl)
            if (!src) return null
            return <img key={item.id} src={src} alt={item.alt} loading="lazy" />
          })}
        </div>
      </div>
    </section>
  )
}
