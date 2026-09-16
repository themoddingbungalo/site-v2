import type { ReactNode } from 'react'
import styles from './Specs.module.css'

/** Pill toggle used to switch requirement profiles (1080p / 1440p, Main / Performance…). */
export function SpecToggle<T extends string>({ options, value, onChange }: {
  options: { key: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className={styles.toggle} role="tablist">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          role="tab"
          aria-selected={value === o.key}
          data-on={value === o.key || undefined}
          className={styles.toggleBtn}
          onClick={() => onChange(o.key)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export interface SpecCard { label: string; value: ReactNode; gold?: boolean }

/** Grid of CPU / RAM / Storage / GPU cards. The `gold` card gets the highlight gradient. */
export function SpecCards({ cards }: { cards: SpecCard[] }) {
  return (
    <div className={`grid grid--specs ${styles.cards}`}>
      {cards.map((c) => (
        <div key={c.label} className={`${styles.card} ${c.gold ? styles.cardGold : ''}`}>
          <p className={`label ${c.gold ? styles.labelGold : ''}`}>{c.label}</p>
          <p className={styles.value}>{c.value}</p>
        </div>
      ))}
    </div>
  )
}

export interface SizeCard { label: string; value: ReactNode }

/** Row of big Cinzel numbers: download size, install size, total required. */
export function SizeCards({ sizes }: { sizes: SizeCard[] }) {
  return (
    <div className={`grid grid--sizes ${styles.sizes}`}>
      {sizes.map((s) => (
        <div key={s.label} className={styles.size}>
          <p className={styles.sizeLabel}>{s.label}</p>
          <p className={styles.sizeValue}>{s.value}</p>
        </div>
      ))}
    </div>
  )
}
