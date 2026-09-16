import type { ReactNode } from 'react'
import { site } from '../../data/site'
import { DiscordIcon } from './Icons'
import styles from './DiscordBand.module.css'

interface Props {
  title?: string
  text?: ReactNode
  primaryLabel?: string
  /** Optional second, outlined button (e.g. a list's Nexus page). */
  secondary?: { href: string; label: string }
  /** Small credits line under the buttons. */
  credits?: ReactNode
}

/** The "support and updates live in Discord" panel closing each modlist page. */
export function DiscordBand({
  title = 'Support and updates live in Discord',
  text = 'Release pings, changelogs and the people who actually built the list. Bring your MO2 log and someone will help.',
  primaryLabel = 'Join the Bungalo',
  secondary,
  credits,
}: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <div className={styles.actions}>
          <a href={site.discord} target="_blank" rel="noopener" className="btn btn--gold">
            <DiscordIcon size={19} />
            {primaryLabel}
          </a>
          {secondary && (
            <a href={secondary.href} target="_blank" rel="noopener" className="btn btn--outline">{secondary.label}</a>
          )}
        </div>
        {credits && <p className={styles.credits}>{credits}</p>}
      </div>
    </section>
  )
}
