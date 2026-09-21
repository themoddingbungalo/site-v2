import { Link } from 'react-router'
import { modlistBySlug, readmePath, type ModlistSlug } from '../../data/modlists'
import { BookIcon } from './Icons'
import styles from './ReadMeCard.module.css'

/**
 * The gold band that sends readers from a modlist page's install section to the full
 * markdown read me. The read me is the whole of the install — the pages carry no steps
 * of their own — and every list makes that hand-off in the same words, so the words live
 * here rather than in six pages that would drift apart.
 */
export function ReadMeCard({ slug, cta = 'Open Read Me' }: { slug: ModlistSlug; cta?: string }) {
  return (
    <Link to={readmePath(slug)} className={styles.card}>
      <div className={styles.lead}>
        <BookIcon size={22} stroke="var(--gold-light)" className={styles.icon} />
        <div>
          <p className={styles.title}>Full {modlistBySlug[slug].fullName} Read Me</p>
          <p className={styles.text}>
            Every step of the install, in full and kept current by the modlist author.
          </p>
        </div>
      </div>
      <span className={`btn btn--gold btn--xs ${styles.cta}`}>{cta}</span>
    </Link>
  )
}
