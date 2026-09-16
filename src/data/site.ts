// Site-wide links and helpers. Change a URL here and every page follows.
export const site = {
  name: 'The Modding Bungalo',
  discord: 'https://discord.gg/bungalo',
  repo: 'https://github.com/themoddingbungalo/site-v2',
  author: { name: 'WhisperDealer', url: 'https://github.com/WhisperDealer' },
  wabbajack: 'https://github.com/wabbajack-tools/wabbajack/releases',
  biggie: {
    youtube: 'https://www.youtube.com/@biggie_boss',
    kofi: 'https://ko-fi.com/biggieboss',
  },
  bordello: {
    discord: 'https://discord.gg/themoddingbordello',
    site: 'https://www.themoddingbordello.com',
  },
  lorerim: 'https://lorerim.com/',
} as const

/** GitHub web-editor URL for a file under content/ (e.g. "readmes/csvp.md"). */
export function editUrl(contentPath: string): string {
  return `${site.repo}/edit/main/content/${contentPath}`
}

/** Prefix a public asset path ("assets/logos/NGVO.webp") with the deploy base. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL
  return base.replace(/\/$/, '') + '/' + path.replace(/^\/+/, '')
}

export function pageTitle(title?: string): string {
  return title ? `${title} | ${site.name}` : site.name
}
