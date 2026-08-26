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
              <img className={styles.insignia} src={school.insignia} alt={school.insigniaAlt} />
              <p className={styles.city}>{school.city}</p>
              <h3 className={styles.name}>{school.name}</h3>
              <p className={styles.lead}>{school.lead}</p>
              <div className={styles.actions}>
                {'website' in school && school.website ? (
                  <a href={school.website} target="_blank" rel="noreferrer">
                    {school.websiteLabel}
                  </a>
                ) : null}
                {'phone' in school && school.phone && school.phoneHref ? (
                  <a href={school.phoneHref}>{school.phone}</a>
                ) : null}
                {'email' in school && school.email && school.emailHref ? (
                  <a href={school.emailHref}>{school.email}</a>
                ) : null}
                {'pending' in school && school.pending ? (
                  <span className={styles.pending}>
                    {'pendingNote' in school ? String(school.pendingNote) : 'Contacto por confirmar'}
                  </span>
                ) : null}
              </div>
              {'subDojos' in school && school.subDojos ? (
                <ul className={styles.subDojos}>
                  {school.subDojos.map((sub) => (
                    <li key={sub.id} className={styles.subDojo}>
                      {sub.badge ? <p className={styles.subBadge}>{sub.badge}</p> : null}
                      <h4 className={styles.subName}>{sub.name}</h4>
                      <p className={styles.subAddress}>{sub.address}</p>
                      <div className={styles.actions}>
                        {sub.phone && sub.phoneHref ? <a href={sub.phoneHref}>{sub.phone}</a> : null}
                        {sub.email && sub.emailHref ? <a href={sub.emailHref}>{sub.email}</a> : null}
                        {sub.whatsappHref ? (
                          <a href={sub.whatsappHref} target="_blank" rel="noreferrer">
                            WhatsApp
                          </a>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
