import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Oikka } from './components/Oikka'
import { Schools } from './components/Schools'
import { Stages } from './components/Stages'
import './App.css'

function App() {
  return (
    <>
      <a className="skipLink" href="#inicio">
        Saltar al contenido
      </a>
      <Header />
      <main id="inicio">
        <Hero />
        <Schools />
        <Stages />
        <Oikka />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
