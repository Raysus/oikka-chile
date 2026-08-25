import { Link } from 'react-router-dom'
import styles from './ProposalsHub.module.css'

const items = [
  {
    to: '/',
    tag: 'Actual',
    title: 'Propuesta vigente',
    text: 'Landing actual con hero carrusel, escuelas, OIKKA, linaje, videos e historia.',
  },
  {
    to: '/propuesta-b',
    tag: 'Extra',
    title: 'Cinemática por capítulos',
    text: 'Scroll-snap a pantalla completa, tipografía monumental y linaje interactivo.',
  },
] as const

export function ProposalsHub() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>OIKKA Chile</p>
        <h1 className={styles.title}>Propuestas de diseño</h1>
        <p className={styles.lead}>
          Misma información y requerimientos, distinta estructura y diagramación.
        </p>
        <ul className={styles.grid}>
          {items.map((item) => (
            <li key={item.to}>
              <Link className={styles.card} to={item.to}>
                <span className={styles.tag}>{item.tag}</span>
                <strong className={styles.cardTitle}>{item.title}</strong>
                <span className={styles.cardText}>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
