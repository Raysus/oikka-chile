import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminAuthProvider } from './adminAuth'
import { AuthProvider } from './auth/AuthContext'
import { CookieBanner } from './components/CookieBanner'
import { HomePage } from './pages/HomePage'
import { HistoriaPage } from './pages/HistoriaPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AdminNewsPage } from './pages/AdminNewsPage'
import { AdminAccountPage } from './pages/AdminAccountPage'
import { AdminStatsPage } from './pages/AdminStatsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <BrowserRouter
          basename={import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.slice(0, -1)}
        >
          <CookieBanner />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacidad" element={<PrivacyPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/historia-y-biografias" element={<HistoriaPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/cuenta" element={<AdminAccountPage />} />
            <Route path="/admin/estadisticas" element={<AdminStatsPage />} />
            <Route path="/admin/:section" element={<AdminNewsPage />} />
            <Route path="/propuestas" element={<Navigate to="/" replace />} />
            <Route path="/propuesta-a" element={<Navigate to="/" replace />} />
            <Route path="/propuesta-b" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </AuthProvider>
  )
}

export default App
