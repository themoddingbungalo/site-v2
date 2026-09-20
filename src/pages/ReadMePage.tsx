import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { useTitle } from '../components/layout/ScrollManager'
import { DiscordIcon, PencilIcon } from '../components/ui/Icons'
import { SectionNav } from '../components/ui/SectionNav'
import { isModlistSlug, modlistBySlug, modlistPath, readmeAssets } from '../data/modlists'
import { editUrl, pageTitle, site } from '../data/site'
import { extractHeadings } from '../markdown/headings'
import { Markdown } from '../markdown/Markdown'
import { preprocess } from '../markdown/preprocess'
import { useMarkdownFile } from '../markdown/useMarkdownFile'
import styles from './ReadMePage.module.css'

/** Renders content/lists/<slug>/readme.md with a sticky "on this page" strip. */
export function ReadMePage() {
  const { slug } = useParams()
  const list = isModlistSlug(slug) ? modlistBySlug[slug] : null
  const file = list?.readme ?? null
  const { text, error, loading } = useMarkdownFile(file)
  const headings = useMemo(() => (text ? extractHeadings(preprocess(text)).filter((h) => h.level === 2) : []), [text])
  const navItems = useMemo(() => headings.map((h) => ({ id: h.id, label: h.text.replace(/:\s*$/, '') })), [headings])

  useTitle(pageTitle(list ? `${list.fullName} — Read Me` : 'Read Me'))

  if (!list || !file) return <Navigate to="/" replace />

  return (
    <>
      <section className={styles.band}>
        <div className={`container ${styles.bandInner}`}>
          <Link to={modlistPath(list.slug)} className={`back-link ${styles.back}`}>← Back to {list.fullName}</Link>
          <div className={styles.titleRow}>
            <div>
              <p className="eyebrow">Read me</p>
              <h1 className="h1">{list.fullName} — Read Me</h1>
            </div>
            <p className={styles.source}>Source: content/{file}</p>
          </div>
        </div>
      </section>

      <SectionNav items={navItems} />

      <div className="container">
        <article className={styles.article}>
          {loading && <p className={styles.loading}>Loading the read me…</p>}
          {error && (
            <div className={styles.error}>
              <p className={styles.errorLabel}>Could not load</p>
              <p className={styles.errorText}>{error}</p>
            </div>
          )}
          {text && <Markdown source={text} assets={readmeAssets} />}

          <div className={styles.foot}>
            <p className={styles.footText}>
              Something out of date or missing? This page is generated from a markdown file — modlist authors can edit it directly.
              {' '}
              <a href={editUrl(file)} target="_blank" rel="noopener" className={styles.editLink}>
                <PencilIcon size={14} /> Edit this page on GitHub
              </a>
            </p>
            <a href={site.discord} target="_blank" rel="noopener" className="btn btn--gold btn--sm">
              <DiscordIcon />
              Ask for help
            </a>
          </div>
        </article>
      </div>
    </>
  )
}
