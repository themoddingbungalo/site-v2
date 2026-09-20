import { Link } from 'react-router'
import { modlistBySlug, readmePath, type ModlistSlug } from '../../data/modlists'
import { BookIcon } from './Icons'
import styles from './ReadMeCard.module.css'

/**
 * The gold band that sends readers from a modlist page's install summary to the full
 * markdown read me. Every list shows the same promise in the same words, so the words
 * live here rather than in six pages that would drift apart.
 */
export function ReadMeCard({ slug, cta = 'Open Read Me' }: { slug: ModlistSlug; cta?: string }) {
  return (
    <Link to={readmePath(slug)} className={styles.card}>
      <div className={styles.lead}>
        <BookIcon size={22} stroke="var(--gold-light)" className={styles.icon} />
        <div>
          <p className={styles.title}>Full {modlistBySlug[slug].fullName} Read Me</p>
          <p className={styles.text}>
            The summary below covers the shape of the install. The Read Me has every step in full,
            maintained by the modlist author.
          </p>
        </div>
      </div>
      <span className={`btn btn--gold btn--xs ${styles.cta}`}>{cta}</span>
    </Link>
  )
}
