import { Link, Navigate, useParams } from 'react-router'
import { useTitle } from '../components/layout/ScrollManager'
import { SectionNav } from '../components/ui/SectionNav'
import { isModlistSlug, modlistBySlug, modlistPath, readmeAssets } from '../data/modlists'
import { pageTitle } from '../data/site'
import { MarkdownArticle, useMarkdownPage } from '../markdown/MarkdownArticle'
import styles from './ReadMePage.module.css'

/** Renders content/lists/<slug>/readme.md with a sticky "on this page" strip. */
export function ReadMePage() {
  const { slug } = useParams()
  const list = isModlistSlug(slug) ? modlistBySlug[slug] : null
  const file = list?.readme ?? null
  const page = useMarkdownPage(file)

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

      <SectionNav items={page.navItems} />

      <div className="container">
        <MarkdownArticle
          {...page}
          file={file}
          className={styles.article}
          loadingLabel="Loading the read me…"
          assets={readmeAssets}
          note="Something out of date or missing? This page is generated from a markdown file — modlist authors can edit it directly."
          cta="Ask for help"
        />
      </div>
    </>
  )
}
