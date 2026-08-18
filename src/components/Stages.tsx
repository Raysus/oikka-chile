import { stages } from '../content'
import styles from './Stages.module.css'

export function Stages() {
  return (
    <section id="etapas" className={styles.section} aria-labelledby="etapas-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Formación</p>
          <h2 id="etapas-title" className={styles.title}>
            Etapas de entrenamiento
          </h2>
        </header>

        <ol className={styles.list}>
          {stages.map((stage, index) => (
            <li key={stage.id} className={styles.item}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className={styles.itemTitle}>{stage.title}</h3>
                <p className={styles.text}>{stage.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
