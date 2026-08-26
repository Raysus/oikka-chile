import { schools } from '../content'
import styles from './Schools.module.css'

export function Schools() {
  return (
    <section id="escuelas" className={styles.section} aria-labelledby="escuelas-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Dojo afiliados</p>
          <h2 id="escuelas-title" className={styles.title}>
            Escuelas en Chile
          </h2>
          <p className={styles.intro}>
            Dojos OIKKA Isshin Ryu. Elige tu ciudad y contacta directamente a cada escuela.
          </p>
        </header>

        <ul className={styles.list}>
          {schools.map((school) => (
            <li key={school.id} className={styles.item}>
              <p className={styles.city}>{school.city}</p>
              <h3 className={styles.name}>{school.name}</h3>
              <p className={styles.lead}>{school.lead}</p>
              <div className={styles.actions}>
                <a href={school.website} target="_blank" rel="noreferrer">
                  {school.websiteLabel}
                </a>
                {'phone' in school && school.phone && school.phoneHref ? (
                  <a href={school.phoneHref}>{school.phone}</a>
                ) : null}
                <a href={school.emailHref}>{school.email}</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
