import { fallbackNews, news } from '../content'
import { imageSrc } from '../lib/api'
import { useNews } from '../lib/useNews'
import styles from './News.module.css'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

export function News() {
  const { items, loading } = useNews()
  const shown = items.length > 0 ? items : fallbackNews

  return (
    <section id="noticias" className={styles.section} aria-labelledby="noticias-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Actualidad</p>
          <h2 id="noticias-title" className={styles.title}>
            {news.title}
          </h2>
          <p className={styles.intro}>{news.intro}</p>
        </header>

        {loading ? <p className={styles.intro}>Cargando noticias…</p> : null}

        <div className={styles.grid}>
          {shown.map((item) => {
            const src = imageSrc(item.imageUrl)
            return (
              <article key={item.id} className={styles.card}>
                {src ? <img className={styles.cardImage} src={src} alt="" loading="lazy" /> : null}
                <p className={styles.date}>
                  <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
                </p>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.body}>{item.body}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
