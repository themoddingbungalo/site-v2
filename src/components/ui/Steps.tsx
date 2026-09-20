import { isValidElement, type ReactNode } from 'react'
import { ext } from '../../data/site'
import styles from './Steps.module.css'

/** A step is its body, or that body plus a flag marking it as one not to skip. */
export type Step = ReactNode | { body: ReactNode; hot?: boolean }

function normalise(step: Step): { body: ReactNode; hot?: boolean } {
  const isTagged = typeof step === 'object' && step !== null && !isValidElement(step) && 'body' in step
  return isTagged ? (step as { body: ReactNode; hot?: boolean }) : { body: step }
}

interface StepListProps {
  /** Big gold number badge next to the heading. */
  number: number | string
  title: string
  steps: Step[]
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
        {steps.map(normalise).map((s, i) => (
          <li key={i} className={`${styles.row} ${s.hot ? styles.rowHot : ''}`}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
            <span>{s.body}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

interface TroubleTileProps {
  title: string
  /** Red (error), gold (advice) or green (aside) left edge. */
  tone?: 'red' | 'gold' | 'green'
  children: ReactNode
}

/** Troubleshooting tile: mono title on a coloured left edge. */
export function TroubleTile({ title, tone = 'red', children }: TroubleTileProps) {
  return (
    <div className={`${styles.tile} ${styles[tone]}`}>
      <p className={`${styles.tileTitle} ${styles[`${tone}Title`]}`}>{title}</p>
      <div className={styles.tileBody}>{children}</div>
    </div>
  )
}

/** "Still stuck?" gold tile that closes a troubleshooting grid. */
export function StuckTile({ title = 'Still stuck?', text, href, label = 'Ask in Discord' }: { title?: string; text: ReactNode; href: string; label?: string }) {
  return (
    <div className={styles.stuck}>
      <p className={styles.stuckTitle}>{title}</p>
      <p className={styles.stuckText}>{text}</p>
      <a href={href} {...ext} className={`btn btn--gold btn--xs ${styles.stuckBtn}`}>{label}</a>
    </div>
  )
}

interface FeatureCardProps { icon: ReactNode; title: string; children: ReactNode; className?: string }

/** Icon + Cinzel title + paragraph card used in "Key features" grids. */
export function FeatureCard({ icon, title, children, className = '' }: FeatureCardProps) {
  return (
    <div className={`card ${className}`}>
      <div className={`icon-box ${styles.featureIcon}`}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureText}>{children}</p>
    </div>
  )
}
