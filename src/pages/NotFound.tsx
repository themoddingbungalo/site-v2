import { Link } from 'react-router'
import { useTitle } from '../components/layout/ScrollManager'
import { pageTitle } from '../data/site'

export function NotFound() {
  useTitle(pageTitle('Page not found'))
  return (
    <section className="container" style={{ padding: 'clamp(80px,12vw,160px) var(--gutter)', textAlign: 'center' }}>
      <p className="eyebrow">404</p>
      <h1 className="h1" style={{ marginBottom: 18 }}>That page wandered off</h1>
      <p className="lead" style={{ maxWidth: 520, margin: '0 auto 30px' }}>
        The link may be from the old wiki. Everything hosted here is one click from the home page.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn--gold">Back to home</Link>
        <Link to="/#modlists" className="btn btn--outline">Browse modlists</Link>
      </div>
    </section>
  )
}
