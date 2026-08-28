import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks, site } from '../content'
import { withBase } from '../lib/paths'
import { AccountMenu } from './AccountMenu'
import styles from './Header.module.css'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={scrolled || open ? `${styles.header} ${styles.scrolled}` : styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} onClick={() => setOpen(false)}>
          <img className={styles.logo} src={site.logo} alt="" width={40} height={40} />
          <span className={styles.brandText}>
            <span className={styles.brandName}>{site.shortName}</span>
            <span className={styles.brandSub}>Isshin Ryu · Chile</span>
          </span>
        </Link>

        <div className={styles.actions}>
          <nav
            id="nav-principal"
            className={open ? `${styles.nav} ${styles.navOpen}` : styles.nav}
            aria-label="Principal"
          >
            {navLinks.map((link) =>
              link.href.startsWith('/#') || link.href.startsWith('#') ? (
                <a
                  key={link.href}
                  href={withBase(link.href)}
                  className={styles.link}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={styles.link}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <AccountMenu tone="light" />

          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="nav-principal"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Cerrar' : 'Menú'}
          </button>
        </div>
      </div>
    </header>
  )
}
