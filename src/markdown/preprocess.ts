// Normalise a markdown file pasted from the old Jekyll wiki so it renders cleanly.
export function preprocess(source: string): string {
  let src = source.replace(/\r\n?/g, '\n')
  src = stripFrontMatter(src)
  src = stripLiquid(src)
  return src
}

/** Drop a leading YAML front matter block (--- ... ---). */
export function stripFrontMatter(src: string): string {
  if (!src.startsWith('---')) return src
  const end = src.indexOf('\n---', 3)
  if (end === -1) return src
  const nl = src.indexOf('\n', end + 1)
  return nl === -1 ? '' : src.slice(nl + 1)
}

/** Remove Jekyll/Liquid bits that mean nothing outside the Jekyll build. */
export function stripLiquid(src: string): string {
  return src.replace(/\{\{\s*site\.baseurl\s*\}\}/g, '').replace(/\{%[^%]*%\}/g, '')
}
