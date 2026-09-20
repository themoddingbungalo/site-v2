import { asset, ext, site } from '../../data/site'
import styles from './BordelloPanel.module.css'

/**
 * The Modding Bordello panel: image on one side, copy and the two links on the other.
 *
 * Shared by the home teaser and the community page rather than written out twice, so
 * the two cannot drift apart. The heading level is a prop because the panel sits under
 * an h2 on the home page and is itself a section heading on the community page.
 */
export function BordelloPanel({
  className = '',
  headingLevel = 2,
}: {
  className?: string
  headingLevel?: 2 | 3
}) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3'

  return (
    <div data-reveal className={`${styles.panel} ${className}`}>
      <div className={styles.media}>
        <img src={asset('assets/themoddingbordello.webp')} alt="The Modding Bordello" className={styles.mediaImg} />
        <div className={styles.scrim} />
      </div>
      <div className={styles.body}>
        <p className={styles.eyebrow}>Sister server</p>
        <Heading className={styles.title}>The Modding Bordello</Heading>
        <p className={styles.text}>
          The Bungalo is rated R, not XXX. Schtevie&rsquo;s server hosts the NSFW modlists so this one stays safe for
          work &mdash; head there for adult content and support.
        </p>
        <div className={styles.actions}>
          <a href={site.bordello.discord} {...ext} className={`${styles.btn} ${styles.btnSolid}`}>
            Join the Bordello
          </a>
          <a href={site.bordello.site} {...ext} className={`${styles.btn} ${styles.btnOutline}`}>
            Visit their site
          </a>
        </div>
      </div>
    </div>
  )
}
