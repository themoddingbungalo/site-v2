import type { ReactNode } from 'react'
import { ext, site } from '../../data/site'
import { DiscordIcon } from './Icons'
import styles from './DiscordBand.module.css'

export interface BandAction { href: string; label: string; icon?: ReactNode }

interface Props {
  title?: string
  text?: ReactNode
  /**
   * Merged over the Bungalo Discord default, so `{ label }` relabels it and
   * `{ href, label }` points the band somewhere else entirely.
   */
  primary?: Partial<BandAction>
  /** Outlined buttons beside it (a list's Nexus page, a changelog, a Ko-fi). */
  secondary?: BandAction[]
  /** Small credits line under the buttons. */
  credits?: ReactNode
}

const defaultPrimary: BandAction = {
  href: site.discord,
  label: 'Join the Bungalo',
  icon: <DiscordIcon size={19} />,
}

/** The closing "support lives over there" panel on every modlist and community page. */
export function DiscordBand({
  title = 'Support and updates live in Discord',
  text = 'Release pings, changelogs and the people who actually built the list. Bring your MO2 log and someone will help.',
  primary,
  secondary = [],
  credits,
}: Props) {
  const main = { ...defaultPrimary, ...primary }

  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <div className={styles.actions}>
          <a href={main.href} {...ext} className="btn btn--gold">
            {main.icon}
            {main.label}
          </a>
          {secondary.map((s) => (
            <a key={s.href} href={s.href} {...ext} className="btn btn--outline">
              {s.icon}
              {s.label}
            </a>
          ))}
        </div>
        {credits && <p className={styles.credits}>{credits}</p>}
      </div>
    </section>
  )
}
