import type { ReactNode } from 'react'
import styles from './Steps.module.css'

interface StepListProps {
  /** Big gold number badge next to the heading. */
  number: number | string
  title: string
  steps: ReactNode[]
  className?: string
}

/** Numbered installation column: "1 Pre-installation" heading plus 01/02/03 rows. */
export function StepList({ number, title, steps, className = '' }: StepListProps) {
  return (
    <div className={className}>
      <div className={styles.head}>
        <span className={styles.badge}>{number}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <ol className={styles.list}>
        {steps.map((s, i) => (
          <li key={i} className={styles.row}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

interface TroubleTileProps {
  title: string
  /** Red (error) or gold (advice) left edge. */
  tone?: 'red' | 'gold'
  children: ReactNode
}

/** Troubleshooting tile: mono title on a coloured left edge. */
export function TroubleTile({ title, tone = 'red', children }: TroubleTileProps) {
  return (
    <div className={`${styles.tile} ${tone === 'gold' ? styles.tileGold : styles.tileRed}`}>
      <p className={`${styles.tileTitle} ${tone === 'gold' ? styles.tileTitleGold : styles.tileTitleRed}`}>{title}</p>
      <p className={styles.tileBody}>{children}</p>
    </div>
  )
}

/** "Still stuck?" gold tile that closes a troubleshooting grid. */
export function StuckTile({ title = 'Still stuck?', text, href, label = 'Ask in Discord' }: { title?: string; text: ReactNode; href: string; label?: string }) {
  return (
    <div className={styles.stuck}>
      <p className={styles.stuckTitle}>{title}</p>
      <p className={styles.stuckText}>{text}</p>
      <a href={href} target="_blank" rel="noopener" className="btn btn--gold btn--xs" style={{ alignSelf: 'flex-start' }}>{label}</a>
    </div>
  )
}

interface FeatureCardProps { icon: ReactNode; title: string; children: ReactNode; className?: string }

/** Icon + Cinzel title + paragraph card used in "Key features" grids. */
export function FeatureCard({ icon, title, children, className = '' }: FeatureCardProps) {
  return (
    <div className={`card ${className}`}>
      <div className="icon-box" style={{ marginBottom: 18 }}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureText}>{children}</p>
    </div>
  )
}
