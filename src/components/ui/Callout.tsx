import type { ReactNode } from 'react'
import { InfoIcon } from './Icons'
import styles from './Callout.module.css'

interface Props {
  /** Gold (important), red (warning) or green (note). */
  kind?: 'important' | 'warning' | 'note'
  /** Cinzel heading inside the box. */
  title?: string
  icon?: boolean
  children: ReactNode
  className?: string
}

/** Boxed notice used on the modlist pages ("Read this before you start" etc.). */
export function Callout({ kind = 'important', title, icon = true, children, className = '' }: Props) {
  return (
    <div className={`${styles.box} ${styles[kind]} ${className}`}>
      {icon && <InfoIcon className={styles.icon} stroke={kind === 'warning' ? '#E08A6E' : kind === 'note' ? '#8FC0AE' : '#F0C070'} />}
      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        {children}
      </div>
    </div>
  )
}
