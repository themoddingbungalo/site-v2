import { Link, Navigate, useParams } from 'react-router'
import { useTitle } from '../components/layout/ScrollManager'
import { SectionNav } from '../components/ui/SectionNav'
import { guideAssets, guideBySlug, guidePath, guides } from '../data/guides'
import { modlistBySlug, modlistPath, readmePath } from '../data/modlists'
import { pageTitle } from '../data/site'
import { MarkdownArticle, useMarkdownPage } from '../markdown/MarkdownArticle'
import readme from './ReadMePage.module.css'
import styles from './GuidePage.module.css'

/** Renders a guide's markdown (content/lists/<list>/guides/<name>.md) with a sticky sidebar table of contents. */
export function GuidePage() {
  const { slug } = useParams()
  const guide = slug ? guideBySlug[slug] : undefined
  const file = guide?.file ?? null
  const page = useMarkdownPage(file)

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
          <h1 className="h1 head--tight">{guide.title}</h1>
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
          <SectionNav items={page.navItems} variant="side" />

          <MarkdownArticle
            {...page}
            file={file}
            loadingLabel="Loading the guide…"
            assets={guideAssets}
            enlargeImages
            note={`Written by the ${guide.listName} author — generated from a markdown file.`}
            cta="Ask in the chats"
          />
        </div>
      </div>
    </>
  )
}
