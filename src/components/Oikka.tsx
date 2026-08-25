import { oikka } from '../content'
import styles from './Oikka.module.css'

export function Oikka() {
  return (
    <section id="oikka" className={styles.section} aria-labelledby="oikka-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Asociación</p>
          <h2 id="oikka-title" className={styles.title}>
            {oikka.title}
          </h2>
          <p className={styles.fullName}>{oikka.fullName}</p>
          <p className={styles.text}>{oikka.history}</p>
          <p className={styles.text}>{oikka.isshinryu}</p>

          <div className={styles.values}>
            <article className={styles.valueCard}>
              <h3 className={styles.valueTitle}>{oikka.mission.title}</h3>
              <p className={styles.valueText}>{oikka.mission.text}</p>
            </article>
            <article className={styles.valueCard}>
              <h3 className={styles.valueTitle}>{oikka.vision.title}</h3>
              <p className={styles.valueText}>{oikka.vision.text}</p>
            </article>
            <article className={`${styles.valueCard} ${styles.valueCardWide}`}>
              <h3 className={styles.valueTitle}>{oikka.identity.title}</h3>
              <p className={styles.valueText}>{oikka.identity.text}</p>
            </article>
          </div>
        </div>

        <aside className={styles.aside}>
          <p className={styles.asideLabel}>Dirección mundial</p>
          <p className={styles.asideName}>{oikka.world.name}</p>
          <p className={styles.asideRole}>{oikka.world.role}</p>
          <a
            className={styles.asideLink}
            href={oikka.world.href}
            target="_blank"
            rel="noreferrer"
          >
            {oikka.world.hrefLabel}
          </a>
        </aside>
      </div>
    </section>
  )
}
