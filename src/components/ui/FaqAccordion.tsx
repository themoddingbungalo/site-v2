import { useState, type ReactNode } from 'react'
import styles from './FaqAccordion.module.css'

export interface FaqItem { q: string; a: ReactNode }

interface Props {
  items: FaqItem[]
  eyebrow?: string
  title?: string
  /** Start with every item open. */
  expandAll?: boolean
}

/** Section header (eyebrow + title + "Expand all") and a list of collapsible FAQs. */
export function FaqAccordion({ items, eyebrow = 'FAQs', title = 'Before you ask in Discord', expandAll = false }: Props) {
  const [open, setOpen] = useState<Record<number, boolean>>({})
  const isOpen = (i: number) => open[i] ?? expandAll
  const anyClosed = items.some((_, i) => !isOpen(i))

  return (
    <>
      <div className="section-head" style={{ marginBottom: 'clamp(24px,3vw,34px)' }}>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">{title}</h2>
        </div>
        <button
          type="button"
          className={styles.expandAll}
          onClick={() => setOpen(Object.fromEntries(items.map((_, i) => [i, anyClosed])))}
        >
          {anyClosed ? 'Expand all' : 'Collapse all'}
        </button>
      </div>
      <div className={styles.list}>
        {items.map((it, i) => (
          <div key={i} className={styles.item}>
            <button
              type="button"
              className={styles.q}
              aria-expanded={isOpen(i)}
              onClick={() => setOpen((o) => ({ ...o, [i]: !isOpen(i) }))}
            >
              {it.q}
              <span className={styles.sign} aria-hidden="true">{isOpen(i) ? '−' : '+'}</span>
            </button>
            {isOpen(i) && <div className={`${styles.a} faq-answer`}>{it.a}</div>}
          </div>
        ))}
      </div>
    </>
  )
}
