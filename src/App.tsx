import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { HistoriaPage } from './pages/HistoriaPage'
import { ProposalsHub } from './proposals/ProposalsHub'
import { OikkaCinematic } from './proposals/OikkaCinematic'
import { OikkaKinetic } from './proposals/OikkaKinetic'
import './App.css'

function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.slice(0, -1)}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/historia-y-biografias" element={<HistoriaPage />} />
        <Route path="/propuestas" element={<ProposalsHub />} />
        <Route path="/propuesta-a" element={<OikkaKinetic />} />
        <Route path="/propuesta-b" element={<OikkaCinematic />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
