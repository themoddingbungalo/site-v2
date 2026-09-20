import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { asset } from '../../data/site'
import styles from './ModlistHero.module.css'

export interface Chip { label: string; gold?: boolean }

interface Props {
  /** Background image path under public/. */
  image: string
  /** CSS object-position for the background, e.g. "center 38%". */
  position?: string
  /** Modlist logo path under public/. */
  logo?: string
  logoAlt?: string
  /** Optional gold eyebrow above the heading. */
  eyebrow?: string
  title: string
  blurb: ReactNode
  chips?: Chip[]
  /** Buttons rendered in the CTA row. */
  children?: ReactNode
  /** A class from the page's own module, when its art needs a different scrim. */
  scrimClassName?: string
  backTo?: string
  backLabel?: string
  /** Extra classes on the section (e.g. to tint the scrim). */
  className?: string
}

/** Full-bleed hero used at the top of every modlist page. */
export function ModlistHero({
  image, position = 'center', logo, logoAlt = '', eyebrow, title, blurb, chips = [], children,
  scrimClassName = '', backTo = '/#modlists', backLabel = '← All modlists', className = '',
}: Props) {
  return (
    <section className={`${styles.hero} ${className}`}>
      <div className={styles.bg}>
        <img src={asset(image)} alt="" style={{ objectPosition: position }} />
      </div>
      <div className={`${styles.scrim} ${scrimClassName}`} />
      <div className={`container ${styles.inner}`}>
        <Link to={backTo} className={`back-link ${styles.back}`}>{backLabel}</Link>
        <div className={styles.content}>
          {logo && <img src={asset(logo)} alt={logoAlt} className={styles.logo} />}
          {eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.blurb}>{blurb}</p>
          {chips.length > 0 && (
            <div className={styles.chips}>
              {chips.map((c) => (
                <span key={c.label} className={`chip ${c.gold ? 'chip--gold' : ''}`}>{c.label}</span>
              ))}
            </div>
          )}
          {children && <div className={styles.actions}>{children}</div>}
        </div>
      </div>
    </section>
  )
}
