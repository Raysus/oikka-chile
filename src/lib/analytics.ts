/**
 * Tracking ligero con consentimiento (Ley 21.719).
 */

import { getCookieConsent, onCookieConsent } from './consent'

const STORAGE_KEY = 'oikka_analytics_v1'

type Counters = {
  pageViews: number
  trialClassClicks: number
  lastPageViewAt: string | null
  lastTrialClickAt: string | null
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function readCounters(): Counters {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { pageViews: 0, trialClassClicks: 0, lastPageViewAt: null, lastTrialClickAt: null }
    }
    return { ...{ pageViews: 0, trialClassClicks: 0, lastPageViewAt: null, lastTrialClickAt: null }, ...JSON.parse(raw) }
  } catch {
    return { pageViews: 0, trialClassClicks: 0, lastPageViewAt: null, lastTrialClickAt: null }
  }
}

function writeCounters(next: Counters) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* ignore */
  }
}

function measurementId(): string | undefined {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID
  return typeof id === 'string' && id.startsWith('G-') ? id : undefined
}

function analyticsAllowed() {
  return getCookieConsent()?.analytics === true
}

let gaReady = false

export function initAnalytics() {
  if (typeof window === 'undefined' || gaReady || !analyticsAllowed()) return
  const id = measurementId()
  if (!id) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', id, { send_page_view: false })
  gaReady = true
}

function sendGa(event: string, params?: Record<string, string | number>) {
  if (!analyticsAllowed() || !gaReady || typeof window.gtag !== 'function') return
  window.gtag('event', event, params)
}

export function trackPageView(path = window.location.pathname + window.location.hash) {
  if (!analyticsAllowed()) return
  initAnalytics()
  const next = readCounters()
  next.pageViews += 1
  next.lastPageViewAt = new Date().toISOString()
  writeCounters(next)
  sendGa('page_view', { page_path: path })
}

export function trackTrialClassClick(source: string) {
  if (!analyticsAllowed()) return
  initAnalytics()
  const next = readCounters()
  next.trialClassClicks += 1
  next.lastTrialClickAt = new Date().toISOString()
  writeCounters(next)
  sendGa('trial_class_click', { source })
}

export function getAnalyticsSnapshot(): Counters {
  return readCounters()
}

export function exposeAnalyticsDebug() {
  if (typeof window === 'undefined') return
  ;(window as Window & { __oikkaStats?: () => Counters }).__oikkaStats = getAnalyticsSnapshot
}

export function bindAnalyticsToConsent() {
  if (analyticsAllowed()) trackPageView()
  onCookieConsent((c) => {
    if (c.analytics) trackPageView()
  })
}
