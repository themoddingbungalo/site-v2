import { asset } from '../data/site'

/**
 * Turn an image src written by a modlist author into something the browser can load.
 * - GitHub / GitLab "blob" page links are rewritten to their raw file URLs.
 * - Absolute and data: URLs pass through.
 * - Relative paths are looked up in the asset map (old wiki path -> shipped file)
 *   and prefixed with the deploy base. Unmapped local paths return null so the
 *   caller can drop the image instead of rendering a broken one.
 */
export function resolveAsset(src: string | undefined, assets: Record<string, string>): string | null {
  if (!src) return null
  let url = src.trim()
  url = url.replace(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/blob\//, 'https://raw.githubusercontent.com/$1/')
  url = url.replace(/^https:\/\/gitlab\.com\/([^/]+\/[^/]+)\/-\/blob\//, 'https://gitlab.com/$1/-/raw/')
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) return url
  const key = url.replace(/^\.?\//, '')
  const mapped = assets[key]
  return mapped ? asset(mapped) : null
}

export function isExternalHref(href: string | undefined): boolean {
  return !!href && /^(https?:)?\/\//i.test(href)
}
