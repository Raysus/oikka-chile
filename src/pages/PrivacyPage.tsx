import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { contact, site } from '../content'
import styles from './PrivacyPage.module.css'

const UPDATED = '26 de septiembre de 2026'
const PRIVACY_EMAIL = contact.email.label

export function PrivacyPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <article className={styles.doc}>
          <p className={styles.kicker}>Legal · Chile</p>
          <h1>Política de privacidad</h1>
          <p className={styles.lead}>
            Cómo {site.name} trata datos personales conforme a la Ley N° 21.719 y la Ley N° 19.628.
            Actualizado: {UPDATED}.
          </p>

          <h2>1. Responsable</h2>
          <p>
            El responsable del tratamiento es <strong>{site.shortName}</strong>. Contacto de
            privacidad: <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
          </p>

          <h2>2. Qué datos tratamos</h2>
          <ul>
            <li>Datos de contacto que nos envías por WhatsApp, teléfono o correo.</li>
            <li>Cuenta de administración del sitio (correo y contraseña hasheada) para publicar noticias.</li>
            <li>
              Datos de navegación agregados si aceptas analítica (Google Analytics solo con
              consentimiento).
            </li>
            <li>Cookies/sesión técnicas del panel admin.</li>
          </ul>
          <p>
            Este sitio presenta información de la asociación y escuelas afiliadas. Los datos de
            alumnos de cada dojo, si se gestionan en otras plataformas, se rigen por la política de
            esa herramienta y por el dojo respectivo.
          </p>

          <h2>3. Finalidades y bases</h2>
          <ul>
            <li>
              <strong>Consentimiento / relación precontractual:</strong> responder consultas sobre
              la asociación o escuelas.
            </li>
            <li>
              <strong>Ejecución del servicio:</strong> administrar el sitio y publicar contenidos.
            </li>
            <li>
              <strong>Interés legítimo / seguridad:</strong> proteger el panel admin.
            </li>
            <li>
              <strong>Consentimiento:</strong> analítica no esencial.
            </li>
          </ul>

          <h2>4. Menores</h2>
          <p>
            Las escuelas afiliadas pueden enseñar a menores. Las consultas sobre niños deben
            realizarlas padres, madres o tutores. No dirigimos publicidad conductual a menores.
          </p>

          <h2>5. Encargados y transferencias</h2>
          <p>
            El sitio se aloza en infraestructura contratada. Si aceptas Google Analytics, Google
            puede tratar datos en el extranjero bajo sus términos. Preferimos embeds de YouTube en
            modo <code>youtube-nocookie</code>.
          </p>

          <h2>6. Conservación</h2>
          <p>
            Mensajes de contacto: hasta 24 meses o el tiempo necesario para dar seguimiento. Cuentas
            admin: mientras el servicio esté activo.
          </p>

          <h2>7. Derechos (ARCO+)</h2>
          <p>
            Puedes ejercer acceso, rectificación, cancelación, oposición, portabilidad y limitación
            escribiendo a <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. Plazo máximo de
            respuesta: 30 días corridos. También ante la Agencia de Protección de Datos Personales
            cuando opere, o tribunales competentes.
          </p>

          <h2>8. Cookies</h2>
          <p>
            Esenciales para el admin. Analítica solo con tu aceptación en el aviso del sitio.
          </p>

          <p className={styles.back}>
            <Link to="/">Volver al inicio</Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
