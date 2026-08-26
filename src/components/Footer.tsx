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
        </div>
        <p className={styles.copy}>
          © {year} {site.shortName}
        </p>
      </div>
    </footer>
  )
}
