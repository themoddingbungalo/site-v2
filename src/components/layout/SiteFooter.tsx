import { Link } from 'react-router'
import { guideSections } from '../../data/guides'
import { modlistPath, modlists } from '../../data/modlists'
import { asset, site } from '../../data/site'
import { PencilIcon } from '../ui/Icons'
import styles from './SiteFooter.module.css'

export function ContributeButton({ className = '' }: { className?: string }) {
  return (
    <a href={site.repo} target="_blank" rel="noopener" className={`btn btn--gold-tint ${className}`}>
      <PencilIcon size={16} />
      Contribute to the Wiki
    </a>
  )
}

function Legal() {
  return (
    <div className={`container ${styles.legal}`}>
      <p>Copyright © 2026 The Modding Bungalo</p>
      <p>
        Website by{' '}
        <a href={site.author.url} target="_blank" rel="noopener" className={styles.author}>
          {site.author.name}
        </a>
      </p>
    </div>
  )
}

/** Standard footer: logo, four links, contribute button, legal line. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.row}`}>
        <img src={asset('assets/themoddingbungalo-horizontal.svg')} alt="The Modding Bungalo" className={styles.logo} />
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/#modlists">Modlists</Link>
          <Link to="/guides">Guides</Link>
          <a href={site.discord} target="_blank" rel="noopener">Discord</a>
        </div>
        <ContributeButton />
      </div>
      <Legal />
    </footer>
  )
}

/** Home page footer: intro column plus Modlists / Guides / Community columns. */
export function SiteFooterWide() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.wide}`}>
        <div className={styles.intro}>
          <img src={asset('assets/themoddingbungalo-horizontal.svg')} alt="The Modding Bungalo" className={styles.logoLg} />
          <p>A community of modders hosting lists, guides and content creators since 2024.</p>
          <ContributeButton />
        </div>
        <div>
          <p className={styles.colTitle}>Modlists</p>
          <div className={styles.col}>
            {modlists.map((m) => (
              <Link key={m.slug} to={modlistPath(m.slug)}>{m.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className={styles.colTitle}>Guides</p>
          <div className={styles.col}>
            {guideSections.map((g) => (
              <Link key={g.id} to={`/guides#${g.id}`}>{g.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className={styles.colTitle}>Community</p>
          <div className={styles.col}>
            <a href={site.discord} target="_blank" rel="noopener">Discord</a>
            <Link to="/#biggie">Biggie Boss</Link>
            <Link to="/#bordello">The Modding Bordello</Link>
          </div>
        </div>
      </div>
      <Legal />
    </footer>
  )
}
