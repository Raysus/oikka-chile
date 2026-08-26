import { news } from '../content'
import styles from './News.module.css'

export function News() {
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

        <div className={styles.grid}>
          {news.items.map((item) => (
            <article key={item.id} className={styles.card}>
              <p className={styles.date}>{item.date}</p>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
