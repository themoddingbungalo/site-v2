import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { asset, ext, site } from '../../data/site'
import { ContributeMenu } from './ContributeButton'
import { DiscordIcon } from './Icons'
import styles from './DiscordBand.module.css'

interface Props {
  /** Anchor for a page's SectionNav — the band is where "Contribute" lands. */
  id?: string
  /** The one thing that varies: the list's own thanks, under the plate's rule. */
  credits?: ReactNode
}

/**
 * The closing panel on every page: where to get help, and how to fix what you just read.
 *
 * Built as an engraved plate rather than a centred box: the Bungalo sits on the top
 * edge with the gold rule running out from it along the border, and the two doors stack
 * into a column on the right so they read as doors rather than pills. The house is the
 * seal; the Discord mark stays on the button that actually goes there.
 *
 * The copy and both buttons are fixed. A closing call to action that is worded six
 * different ways is six things to keep current, and every one of them says the same
 * thing: the Discord for help, the issue forms for a fix. Pages pass their credits and
 * nothing else — anything a single list needs to say belongs in a section of its own,
 * above the band.
 */
export function DiscordBand({ id, credits }: Props) {
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
    <section id={id} className={styles.section}>
      <div className={styles.plate} ref={plate}>
        <span className={styles.rule} aria-hidden="true" />
        {/* Decorative: the header already names the site, and the heading below carries
            the meaning, so an alt here would only repeat itself into a screen reader. */}
        <img src={asset('assets/themoddingbungalo-vertical.svg')} alt="" className={styles.mark} />

        <div className={styles.body}>
          <div className={styles.copy}>
            <h2 className={styles.title}>Support and updates live in Discord</h2>
            <p className={styles.text}>
              Release pings, changelogs and the people who actually built these lists &mdash; bring your MO2 log and
              someone will help. Spotted a wrong step or a typo while reading? Every page here is markdown on GitHub,
              and contributing a fix takes one form.
            </p>
          </div>
          <div className={styles.actions}>
            <a href={site.discord} {...ext} className="btn btn--gold">
              <DiscordIcon size={19} />
              Join the Bungalo
            </a>
            <ContributeMenu />
          </div>
        </div>

        {credits && <p className={styles.credits}>{credits}</p>}
      </div>
    </section>
  )
}
