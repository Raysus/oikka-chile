import { Link } from 'react-router-dom'
import { footer, site } from '../content'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>{site.name}</p>
          <p className={styles.note}>{footer.note}</p>
          <Link className={styles.proposals} to="/propuestas">
            Ver propuestas de diseño
          </Link>
        </div>
        <p className={styles.copy}>
          © {year} {site.shortName}
        </p>
      </div>
    </footer>
  )
}
