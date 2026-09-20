import type { ReactNode } from 'react'
import { InfoIcon } from './Icons'
import styles from './Callout.module.css'

type Kind = 'important' | 'warning' | 'note'

const iconStroke: Record<Kind, string> = {
  important: 'var(--gold-light)',
  warning: 'var(--red-ink)',
  note: 'var(--green-ink)',
}

interface Props {
  /** Gold (important), red (warning) or green (note). */
  kind?: Kind
  /** Cinzel heading inside the box. */
  title?: string
  /** Uppercase micro-label instead of a title, tinted by `kind`. */
  label?: string
  icon?: boolean
  /** Tighter padding and slightly smaller body copy, for a callout inside a column. */
  compact?: boolean
  children: ReactNode
  className?: string
}

/** Boxed notice used on the modlist pages ("Read this before you start" etc.). */
export function Callout({ kind = 'important', title, label, icon = true, compact, children, className = '' }: Props) {
  return (
    <div className={`${styles.box} ${styles[kind]} ${compact ? styles.compact : ''} ${className}`}>
      {icon && <InfoIcon className={styles.icon} stroke={iconStroke[kind]} />}
      <div className={styles.body}>
        {label && <p className={styles.label}>{label}</p>}
        {title && <p className={styles.title}>{title}</p>}
        {children}
      </div>
    </div>
  )
}
