import { Link, Navigate, useParams } from 'react-router'
import { useTitle } from '../components/layout/ScrollManager'
import { SectionNav } from '../components/ui/SectionNav'
import { guideAssets, guideBySlug, guideContext, guidePath, guides } from '../data/guides'
import { modlistBySlug, modlistPath, readmePath } from '../data/modlists'
import { pageTitle } from '../data/site'
import { MarkdownArticle, useMarkdownPage } from '../markdown/MarkdownArticle'
import readme from './ReadMePage.module.css'
import styles from './GuidePage.module.css'

/** Renders a guide's markdown with a sticky sidebar table of contents — a list guide from
 *  content/lists/<list>/guides/, or a tool guide from content/guides/. */
export function GuidePage() {
  const { slug } = useParams()
  const guide = slug ? guideBySlug[slug] : undefined
  const file = guide?.file ?? null
  const page = useMarkdownPage(file)

  useTitle(pageTitle(guide ? `${guide.title} — ${guideContext(guide)}` : 'Guide'))

  if (!guide || !file) return <Navigate to="/guides" replace />

  // A list guide sits with the other guides for its list and links back to it. A tool
  // guide has no list, so it sits with the others in its hub section and links there.
  const list = guide.list ? modlistBySlug[guide.list] : undefined
  const siblings = list
    ? guides.filter((g) => g.list === guide.list)
    : guides.filter((g) => g.section === guide.section)
  const backTo = list ? modlistPath(list.slug) : '/guides'
  const backLabel = list ? `Back to ${guide.listName}` : 'Back to Guides'

  return (
    <>
      <section className={readme.band}>
        <div className={`container ${styles.bandInner}`}>
          <Link to={backTo} className={`back-link ${readme.back}`}>← {backLabel}</Link>
          <p className="eyebrow">{guideContext(guide)} · Guide</p>
          <h1 className="h1 head--tight">{guide.title}</h1>
          <p className={styles.blurb}>{guide.blurb}</p>
          {(siblings.length > 1 || list?.readme) && (
          <div className={styles.switcher}>
            {siblings.map((g) => (
              <Link key={g.slug} to={guidePath(g.slug)} className={`pill ${g.slug === guide.slug ? 'pill--on' : ''}`} aria-current={g.slug === guide.slug ? 'page' : undefined}>
                {g.title}
              </Link>
            ))}
            {list?.readme && <Link to={readmePath(list.slug)} className="pill">Read me</Link>}
          </div>
          )}
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
            note={list ? `Written by the ${guide.listName} author — generated from a markdown file.` : 'Written up from the video walkthrough — generated from a markdown file.'}
            cta="Ask in the chats"
          />
        </div>
      </div>
    </>
  )
}
