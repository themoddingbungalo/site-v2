import { Link } from 'react-router'
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
          <Link to="/community">Community</Link>
          <a href={site.discord} target="_blank" rel="noopener">Discord</a>
        </div>
        <ContributeButton />
      </div>
      <Legal />
    </footer>
  )
}
