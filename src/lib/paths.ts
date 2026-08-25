/** Public asset URL that respects Vite `base` (needed for GitHub Pages). */
export function assetUrl(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}

/** In-page hash on the home route, e.g. `#horarios` → `/repo/#horarios`. */
export function homeHash(hash: string): string {
  const id = hash.replace(/^#/, '')
  return `${import.meta.env.BASE_URL}#${id}`
}

export function withBase(path: string): string {
  if (path.startsWith('/#')) return homeHash(path.slice(1))
  if (path.startsWith('#')) return homeHash(path)
  if (path.startsWith('/')) return `${import.meta.env.BASE_URL}${path.slice(1)}`
  return path
}
