import type { ReactNode } from 'react'
import styles from './Tile.module.css'

/** Plain card, gold highlight, or a red left edge for something destructive. */
export type TileTone = 'plain' | 'gold' | 'red'

interface Props {
  title: string
  tone?: TileTone
  /** Slightly tighter padding, for tiles stacked in a narrow column. */
  small?: boolean
  className?: string
  children: ReactNode
}

/**
 * Cinzel-titled card used by the "starting out", "optional mods" and "post-install"
 * grids. Bare text or several `<p>`s both work — the body styles either.
 */
export function Tile({ title, tone = 'plain', small, className = '', children }: Props) {
  return (
    <div className={`${styles.tile} ${styles[tone]} ${small ? styles.small : ''} ${className}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export interface KeyRow { key: string; value: ReactNode }

interface KeyRowsProps {
  rows: KeyRow[]
  /**
   * `value` states a fact per row (an at-a-glance table). `note` annotates it instead,
   * and emphasises the last row — the shape a best-to-worst ranking wants.
   */
  variant?: 'value' | 'note'
  className?: string
}

/** Vertical stack of label/value rows on hairline rules. */
export function KeyRows({ rows, variant = 'value', className = '' }: KeyRowsProps) {
  return (
    <div className={`${styles.rows} ${variant === 'note' ? styles.ranked : ''} ${className}`}>
      {rows.map((row) => (
        <div key={row.key} className={styles.row}>
          <span className={styles.rowKey}>{row.key}</span>
          <span className={variant === 'note' ? styles.rowNote : styles.rowValue}>{row.value}</span>
        </div>
      ))}
    </div>
  )
}
