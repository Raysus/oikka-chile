import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { bindAnalyticsToConsent, exposeAnalyticsDebug } from './lib/analytics'

exposeAnalyticsDebug()
bindAnalyticsToConsent()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
