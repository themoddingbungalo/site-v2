import type { ReactNode } from 'react'
import { asset } from '../../data/site'
import styles from './PageHero.module.css'

export interface HeroStat { value: ReactNode; label: string }

interface Props {
  /** Background image path under public/. */
  image: string
  /** CSS object-position for the background, e.g. "center 38%". */
  position?: string
  /** A class from the page's own module, when its art needs a different scrim. */
  scrimClassName?: string
  eyebrow: string
  title: string
  lead: ReactNode
  stats?: HeroStat[]
}

/** Hero band at the top of a top-level page (Guides, Community). */
export function PageHero({ image, position = 'center', scrimClassName, eyebrow, title, lead, stats = [] }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <img src={asset(image)} alt="" style={{ objectPosition: position }} />
      </div>
      <div className={`${styles.scrim} ${scrimClassName ?? ''}`} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
          <h1 className={`h1 ${styles.title}`}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
          {stats.length > 0 && (
            <div className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
