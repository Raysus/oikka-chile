import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { HomePage } from './pages/HomePage'
import { HistoriaPage } from './pages/HistoriaPage'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter
        basename={import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.slice(0, -1)}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/historia-y-biografias" element={<HistoriaPage />} />
          <Route path="/propuestas" element={<Navigate to="/" replace />} />
          <Route path="/propuesta-a" element={<Navigate to="/" replace />} />
          <Route path="/propuesta-b" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
