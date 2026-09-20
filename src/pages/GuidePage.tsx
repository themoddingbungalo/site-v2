import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { useTitle } from '../components/layout/ScrollManager'
import { DiscordIcon, PencilIcon } from '../components/ui/Icons'
import { SectionNav } from '../components/ui/SectionNav'
import { guideAssets, guideBySlug, guidePath, guides } from '../data/guides'
import { modlistBySlug, modlistPath, readmePath } from '../data/modlists'
import { editUrl, pageTitle, site } from '../data/site'
import { extractHeadings } from '../markdown/headings'
import { Markdown } from '../markdown/Markdown'
import { preprocess } from '../markdown/preprocess'
import { useMarkdownFile } from '../markdown/useMarkdownFile'
import readme from './ReadMePage.module.css'
import styles from './GuidePage.module.css'

/** Renders a guide's markdown (content/lists/<list>/guides/<name>.md) with a sticky sidebar table of contents. */
export function GuidePage() {
  const { slug } = useParams()
  const guide = slug ? guideBySlug[slug] : undefined
  const file = guide?.file ?? null
  const { text, error, loading } = useMarkdownFile(file)
  const headings = useMemo(() => (text ? extractHeadings(preprocess(text)).filter((h) => h.level === 2) : []), [text])
  const navItems = useMemo(() => headings.map((h) => ({ id: h.id, label: h.text.replace(/:\s*$/, '') })), [headings])

  useTitle(pageTitle(guide ? `${guide.title} — ${guide.listName}` : 'Guide'))

  if (!guide || !file) return <Navigate to="/guides" replace />

  const list = modlistBySlug[guide.list]
  const siblings = guides.filter((g) => g.list === guide.list)

  return (
    <>
      <section className={readme.band}>
        <div className={`container ${styles.bandInner}`}>
          <Link to={modlistPath(list.slug)} className={`back-link ${readme.back}`}>← Back to {guide.listName}</Link>
          <p className="eyebrow">{guide.listName} · Guide</p>
          <h1 className="h1" style={{ marginBottom: 14 }}>{guide.title}</h1>
          <p className={styles.blurb}>{guide.blurb}</p>
          <div className={styles.switcher}>
            {siblings.map((g) => (
              <Link key={g.slug} to={guidePath(g.slug)} className={`pill ${g.slug === guide.slug ? 'pill--on' : ''}`} aria-current={g.slug === guide.slug ? 'page' : undefined}>
                {g.title}
              </Link>
            ))}
            {list.readme && <Link to={readmePath(list.slug)} className="pill">Read me</Link>}
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.layout}>
          <SectionNav items={navItems} variant="side" />

          <article className={styles.article}>
            {loading && <p className={readme.loading}>Loading the guide…</p>}
            {error && (
              <div className={readme.error}>
                <p className={readme.errorLabel}>Could not load</p>
                <p className={readme.errorText}>{error}</p>
              </div>
            )}
            {text && <Markdown source={text} assets={guideAssets} enlargeImages />}

            <div className={readme.foot}>
              <p className={readme.footText}>
                Written by the {guide.listName} author — generated from a markdown file.
                {' '}
                <a href={editUrl(file)} target="_blank" rel="noopener" className={readme.editLink}>
                  <PencilIcon size={14} /> Edit this page on GitHub
                </a>
              </p>
              <a href={site.discord} target="_blank" rel="noopener" className="btn btn--gold btn--sm">
                <DiscordIcon />
                Ask in the chats
              </a>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
