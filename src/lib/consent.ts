const STORAGE_KEY = 'site_cookie_consent_v1'

export type CookieConsent = {
  necessary: true
  analytics: boolean
  decidedAt: string
}

export function getCookieConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CookieConsent
    if (typeof parsed?.analytics !== 'boolean') return null
    return { necessary: true, analytics: parsed.analytics, decidedAt: parsed.decidedAt }
  } catch {
    return null
  }
}

export function setCookieConsent(analytics: boolean): CookieConsent {
  const next: CookieConsent = {
    necessary: true,
    analytics,
    decidedAt: new Date().toISOString(),
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new CustomEvent('cookie-consent', { detail: next }))
  return next
}

export function onCookieConsent(handler: (c: CookieConsent) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<CookieConsent>).detail)
  window.addEventListener('cookie-consent', listener)
  return () => window.removeEventListener('cookie-consent', listener)
}
