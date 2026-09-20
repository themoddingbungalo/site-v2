import { useEffect, useState } from 'react'

// Every markdown file under content/ is bundled as a lazily loaded string chunk.
// Editing a file and pushing to main is all an author needs to do; the deploy
// workflow rebuilds the site.
const files = import.meta.glob(['/content/lists/**/*.md', '/content/guides/**/*.md'], { query: '?raw', import: 'default' }) as Record<
  string,
  () => Promise<string>
>

export interface MarkdownFile {
  text: string | null
  error: string | null
  loading: boolean
}

/** Load "lists/csvp/readme.md" (a path relative to content/). */
export function useMarkdownFile(path: string | null): MarkdownFile {
  const [state, setState] = useState<MarkdownFile>({ text: null, error: null, loading: !!path })

  useEffect(() => {
    if (!path) { setState({ text: null, error: null, loading: false }); return }
    let cancelled = false
    const key = `/content/${path}`
    const loader = files[key]
    setState({ text: null, error: null, loading: true })
    if (!loader) {
      setState({ text: null, error: `Expected a markdown file at content/${path}.`, loading: false })
      return
    }
    loader()
      .then((text) => { if (!cancelled) setState({ text, error: null, loading: false }) })
      .catch((err: unknown) => {
        if (!cancelled) setState({ text: null, error: err instanceof Error ? err.message : String(err), loading: false })
      })
    return () => { cancelled = true }
  }, [path])

  return state
}
