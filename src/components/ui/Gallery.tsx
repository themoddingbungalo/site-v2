import { useEffect, useState, type ReactNode } from 'react'
import { asset } from '../../data/site'
import styles from './Gallery.module.css'

export interface Shot {
  /** Path under public/, e.g. "assets/heroes/lorerim-gate.webp". */
  src: string
  alt: string
  /** Span two columns in the grid. */
  wide?: boolean
}

interface Props {
  shots: Shot[]
  /** Extra tile rendered after the shots (usually a YouTube embed). */
  extra?: ReactNode
  eyebrow?: string
  title?: string
  hint?: string
}

/** Screenshot grid with a click-to-enlarge lightbox. */
export function Gallery({ shots, extra, eyebrow = 'Showcase', title = 'In-game screenshots', hint = 'Click any shot to view it full size' }: Props) {
  const [open, setOpen] = useState<Shot | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <div className="section-head">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">{title}</h2>
        </div>
        <p className="small-muted">{hint}</p>
      </div>
      <div className={styles.grid}>
        {shots.map((s) => (
          <button key={s.src} type="button" className={`${styles.tile} ${s.wide ? styles.wide : ''}`} onClick={() => setOpen(s)} aria-label={`View ${s.alt} full size`}>
            <img src={asset(s.src)} alt={s.alt} loading="lazy" />
          </button>
        ))}
        {extra}
      </div>
      {open && (
        <div className={styles.lightbox} onClick={() => setOpen(null)} role="dialog" aria-label={open.alt}>
          <img src={asset(open.src)} alt={open.alt} />
          <button type="button" className={styles.close} aria-label="Close" onClick={() => setOpen(null)}>×</button>
        </div>
      )}
    </>
  )
}
