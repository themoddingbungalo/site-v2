import { useMemo, type ReactNode } from 'react'
import { DiscordIcon, PencilIcon } from '../components/ui/Icons'
import { ext, editUrl, site } from '../data/site'
import { extractHeadings } from './headings'
import { Markdown } from './Markdown'
import { preprocess } from './preprocess'
import { useMarkdownFile } from './useMarkdownFile'
import styles from './MarkdownArticle.module.css'

/**
 * Loads a markdown file and derives its "on this page" nav from the `##` headings,
 * using the same slugs rehype-slug produces. Both the read mes and the guides need
 * exactly this, so they share it.
 */
export function useMarkdownPage(file: string | null) {
  const { text, error, loading } = useMarkdownFile(file)
  const navItems = useMemo(() => {
    if (!text) return []
    return extractHeadings(preprocess(text))
      .filter((h) => h.level === 2)
      .map((h) => ({ id: h.id, label: h.text.replace(/:\s*$/, '') }))
  }, [text])

  return { text, error, loading, navItems }
}

interface Props {
  /** Path under content/, e.g. "lists/csvp/readme.md". */
  file: string
  text: string | null
  error: string | null
  loading: boolean
  /** Message while the chunk is in flight. */
  loadingLabel: string
  /** Old-wiki image paths mapped onto the assets we ship. */
  assets: Record<string, string>
  enlargeImages?: boolean
  /** The sentence before the "edit on GitHub" link. */
  note: ReactNode
  /** Label on the Discord button. */
  cta: string
  className?: string
}

/**
 * The body of a markdown-backed page: loading and error states, the rendered
 * document, and the footer that points authors at the file on GitHub.
 */
export function MarkdownArticle({
  file, text, error, loading, loadingLabel, assets, enlargeImages, note, cta, className = '',
}: Props) {
  return (
    <article className={`${styles.article} ${className}`}>
      {loading && <p className={styles.loading}>{loadingLabel}</p>}
      {error && (
        <div className={styles.error}>
          <p className={styles.errorLabel}>Could not load</p>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}
      {text && <Markdown source={text} assets={assets} enlargeImages={enlargeImages} />}

      <div className={styles.foot}>
        <p className={styles.footText}>
          {note}{' '}
          <a href={editUrl(file)} {...ext} className={styles.editLink}>
            <PencilIcon size={14} /> Edit this page on GitHub
          </a>
        </p>
        <a href={site.discord} {...ext} className="btn btn--gold btn--sm">
          <DiscordIcon />
          {cta}
        </a>
      </div>
    </article>
  )
}
