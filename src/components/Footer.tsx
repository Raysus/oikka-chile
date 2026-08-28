import { footer, site } from '../content'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <img className={styles.logo} src={site.logo} alt="" width={44} height={44} />
          <div>
            <p className={styles.brand}>{site.name}</p>
            <p className={styles.note}>{footer.note}</p>
          </div>
        </div>
        <p className={styles.copy}>
          © {year} {site.shortName}
        </p>
      </div>
    </footer>
  )
}
