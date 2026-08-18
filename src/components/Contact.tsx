import { contact, site } from '../content'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section id="contacto" className={styles.section} aria-labelledby="contacto-title">
      <div className={styles.inner}>
        <div>
          <p className={styles.eyebrow}>{site.shortName}</p>
          <h2 id="contacto-title" className={styles.title}>
            {contact.title}
          </h2>
          <p className={styles.text}>{contact.text}</p>
        </div>
        <div className={styles.actions}>
          <a className={styles.primary} href={contact.email.href}>
            {contact.email.label}
          </a>
          <a
            className={styles.secondary}
            href={contact.facebook.href}
            target="_blank"
            rel="noreferrer"
          >
            {contact.facebook.label}
          </a>
        </div>
      </div>
    </section>
  )
}
