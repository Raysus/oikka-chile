import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Gallery } from '../components/Gallery'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Lineage } from '../components/Lineage'
import { Oikka } from '../components/Oikka'
import { Schools } from '../components/Schools'
import { Videos } from '../components/Videos'
import '../App.css'

export function HomePage() {
  return (
    <>
      <a className="skipLink" href="#inicio">
        Saltar al contenido
      </a>
      <Header />
      <main id="inicio">
        <Hero />
        <Schools />
        <Oikka />
        <Lineage />
        <Videos />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
