export function parseYoutubeId(raw: string): string | null {
  const value = raw.trim()
  if (!value) return null
  if (/^[\w-]{11}$/.test(value)) return value
  try {
    const url = new URL(value)
    const host = url.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0] ?? ''
      return /^[\w-]{11}$/.test(id) ? id : null
    }
    if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const v = url.searchParams.get('v')
      if (v && /^[\w-]{11}$/.test(v)) return v
      const parts = url.pathname.split('/').filter(Boolean)
      const idx = parts.findIndex(
        (part) => part === 'embed' || part === 'shorts' || part === 'live',
      )
      const id = idx >= 0 ? (parts[idx + 1] ?? '') : ''
      return /^[\w-]{11}$/.test(id) ? id : null
    }
  } catch {
    return null
  }
  return null
}
