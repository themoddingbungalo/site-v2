import { Link } from 'react-router'
import { useTitle } from '../components/layout/ScrollManager'
import { pageTitle } from '../data/site'
import styles from './NotFound.module.css'

export function NotFound() {
  useTitle(pageTitle('Page not found'))
  return (
    <section className={`container ${styles.section}`}>
      <p className="eyebrow">404</p>
      <h1 className={`h1 ${styles.title}`}>That page wandered off</h1>
      <p className={`lead ${styles.lead}`}>
        The link may be from the old wiki. Everything hosted here is one click from the home page.
      </p>
      <div className={styles.actions}>
        <Link to="/" className="btn btn--gold">Back to home</Link>
        <Link to="/#modlists" className="btn btn--outline">Browse modlists</Link>
      </div>
    </section>
  )
}
