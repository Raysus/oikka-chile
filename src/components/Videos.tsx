import { angiVideos, videosIntro } from '../content'
import styles from './Videos.module.css'

export function Videos() {
  return (
    <section id="videos" className={styles.section} aria-labelledby="videos-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Maestro Angi Uezu</p>
          <h2 id="videos-title" className={styles.title}>
            Videos
          </h2>
          <p className={styles.intro}>{videosIntro}</p>
        </header>

        <div className={styles.grid}>
          {angiVideos.map((video) => (
            <article key={video.id} className={styles.card}>
              <div className={styles.frame}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className={styles.cardTitle}>{video.title}</h3>
              <p className={styles.cardNote}>{video.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
