import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { asset, ext, site } from '../../data/site'
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

/**
 * The closing "support lives over there" panel on every modlist and community page.
 *
 * Built as an engraved plate rather than a centred box: the Bungalo sits on the top
 * edge with the gold rule running out from it along the border, and the actions stack
 * into a column on the right so the primary reads as a door rather than a pill. The
 * house is the seal; the Discord mark stays on the button that actually goes there.
 * Everything that varies per list is a prop — pages pass copy, never markup.
 */
export function DiscordBand({
  title = 'Support and updates live in Discord',
  text = 'Release pings, changelogs and the people who actually built the list. Bring your MO2 log and someone will help.',
  primary,
  secondary = [],
  credits,
}: Props) {
  const main = { ...defaultPrimary, ...primary }
  const plate = useRef<HTMLDivElement>(null)

  // The plate's one authored moment: the gold rule draws out from under the house as
  // the band arrives. Self-contained so no page has to opt in. `data-animate` goes on
  // before paint and is the only thing that hides the mark, so if this never runs the
  // plate simply renders finished.
  useLayoutEffect(() => {
    const el = plate.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    el.setAttribute('data-animate', '')
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        el.setAttribute('data-shown', '')
        io.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.plate} ref={plate}>
        <span className={styles.rule} aria-hidden="true" />
        {/* Decorative: the header already names the site, and the heading below carries
            the meaning, so an alt here would only repeat itself into a screen reader. */}
        <img src={asset('assets/themoddingbungalo-vertical.svg')} alt="" className={styles.mark} />

        <div className={styles.body}>
          <div className={styles.copy}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
          </div>
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
        </div>

        {credits && <p className={styles.credits}>{credits}</p>}
      </div>
    </section>
  )
}
